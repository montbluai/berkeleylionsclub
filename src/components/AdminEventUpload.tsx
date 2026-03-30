import { useState, useEffect } from 'react';
import { Upload, Calendar, MapPin, Users, DollarSign, CheckCircle, AlertCircle, Trash2, Eye, Image as ImageIcon, RefreshCw } from 'lucide-react';
import { supabase, FeaturedEvent, isSupabaseConfigured } from '../lib/supabase';
import { Button } from './ui/button';

export function AdminEventUpload() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const [formData, setFormData] = useState({
    event_name: '',
    event_description: '',
    event_date: '',
    event_time: '',
    location_name: '',
    location_address: '',
    volunteers_needed: '',
    age_requirements: 'All ages welcome!',
    volunteer_tasks: '',
    ticket_price: '',
    is_free: false,
    square_payment_link: '',
    additional_info: '',
    to_go_available: false,
    imageFile: null as File | null,
  });
  
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const [existingEvents, setExistingEvents] = useState<FeaturedEvent[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Password protection - matches AdminGalleryUpload
  const ADMIN_PASSWORD = 'berkeley2025';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError('');
      loadExistingEvents();
    } else {
      setPasswordError('Incorrect password. Please try again.');
    }
  };

  const loadExistingEvents = async () => {
    setLoadingEvents(true);
    try {
      const { data, error } = await supabase
        .from('featured_events')
        .select('*')
        .order('event_date', { ascending: true });

      if (error) throw error;
      setExistingEvents(data || []);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoadingEvents(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, imageFile: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setUploadStatus({ type: null, message: '' });

    try {
      // Upload image to Supabase Storage
      let imageUrl = '';
      if (formData.imageFile) {
        const fileExt = formData.imageFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('event-images')
          .upload(fileName, formData.imageFile);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('event-images')
          .getPublicUrl(fileName);
        
        imageUrl = publicUrl;
      }

      // Parse volunteer tasks (split by newlines)
      const tasksArray = formData.volunteer_tasks
        .split('\n')
        .map(task => task.trim())
        .filter(task => task.length > 0);

      // Insert event into database
      const { error: insertError } = await supabase
        .from('featured_events')
        .insert({
          event_name: formData.event_name,
          event_description: formData.event_description,
          event_date: formData.event_date,
          event_time: formData.event_time,
          location_name: formData.location_name,
          location_address: formData.location_address,
          volunteers_needed: formData.volunteers_needed,
          age_requirements: formData.age_requirements,
          volunteer_tasks: tasksArray,
          ticket_price: formData.is_free ? 'Free' : formData.ticket_price,
          is_free: formData.is_free,
          square_payment_link: formData.square_payment_link || null,
          additional_info: formData.additional_info || null,
          to_go_available: formData.to_go_available,
          image_url: imageUrl,
        });

      if (insertError) throw insertError;

      setUploadStatus({
        type: 'success',
        message: 'Event uploaded successfully! It will appear on the Volunteer page.'
      });

      // Reset form
      setFormData({
        event_name: '',
        event_description: '',
        event_date: '',
        event_time: '',
        location_name: '',
        location_address: '',
        volunteers_needed: '',
        age_requirements: 'All ages welcome!',
        volunteer_tasks: '',
        ticket_price: '',
        is_free: false,
        square_payment_link: '',
        additional_info: '',
        to_go_available: false,
        imageFile: null,
      });
      setPreviewUrl('');

      // Reload events
      loadExistingEvents();

    } catch (error: any) {
      console.error('Upload error:', error);
      setUploadStatus({
        type: 'error',
        message: error.message || 'Failed to upload event. Please try again.'
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event? This cannot be undone.')) {
      return;
    }

    setDeletingId(id);
    try {
      const event = existingEvents.find(e => e.id === id);
      
      // Delete image from storage if exists
      if (event?.image_url) {
        const fileName = event.image_url.split('/').pop();
        if (fileName) {
          await supabase.storage.from('event-images').remove([fileName]);
        }
      }

      // Delete from database
      const { error } = await supabase
        .from('featured_events')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setUploadStatus({
        type: 'success',
        message: 'Event deleted successfully!'
      });

      loadExistingEvents();
    } catch (error: any) {
      console.error('Delete error:', error);
      setUploadStatus({
        type: 'error',
        message: error.message || 'Failed to delete event.'
      });
    } finally {
      setDeletingId(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 py-16">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl mb-2" style={{ color: '#1740a5' }}>
                Admin Access Required
              </h1>
              <p className="text-gray-600">
                Enter the admin password to manage featured events
              </p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="mb-6">
                <label className="block mb-2 text-gray-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {passwordError && (
                  <p className="text-red-600 mt-2 text-sm">{passwordError}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full text-white py-3"
                style={{ backgroundColor: '#1740a5' }}
              >
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl mb-4" style={{ color: '#1740a5' }}>
            Manage Featured <span style={{ color: '#f2ca47' }}>Events</span>
          </h1>
          <p className="text-xl text-gray-700">
            Upload and manage volunteer event information that appears on the Volunteer page
          </p>
        </div>

        {/* Upload Status */}
        {uploadStatus.type && (
          <div className={`max-w-2xl mx-auto mb-8 p-4 rounded-lg flex items-center gap-3 ${
            uploadStatus.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            {uploadStatus.type === 'success' ? (
              <CheckCircle size={24} />
            ) : (
              <AlertCircle size={24} />
            )}
            <p>{uploadStatus.message}</p>
          </div>
        )}

        {/* Upload Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12 max-w-2xl mx-auto">
          <h2 className="text-2xl mb-6 text-center" style={{ color: '#1740a5' }}>
            Add New Featured Event
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Event Image */}
            <div>
              <label className="block mb-2 text-gray-700 font-semibold">
                <ImageIcon className="inline mr-2" size={20} />
                Event Poster Image *
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {previewUrl && (
                <div className="mt-4">
                  <img src={previewUrl} alt="Preview" className="max-w-full h-auto rounded-lg shadow-md" />
                </div>
              )}
            </div>

            {/* Event Name */}
            <div>
              <label className="block mb-2 text-gray-700 font-semibold">Event Name *</label>
              <input
                type="text"
                value={formData.event_name}
                onChange={(e) => setFormData({ ...formData, event_name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Berkeley Lions Club Crab Feed 2026"
                required
              />
            </div>

            {/* Event Description */}
            <div>
              <label className="block mb-2 text-gray-700 font-semibold">Event Description *</label>
              <textarea
                value={formData.event_description}
                onChange={(e) => setFormData({ ...formData, event_description: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Join us for our annual fundraising dinner! Volunteers needed to help make this event a success."
                rows={3}
                required
              />
            </div>

            {/* Date & Time */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  <Calendar className="inline mr-2" size={20} />
                  Event Date *
                </label>
                <input
                  type="date"
                  value={formData.event_date}
                  onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">Event Time *</label>
                <input
                  type="text"
                  value={formData.event_time}
                  onChange={(e) => setFormData({ ...formData, event_time: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Doors at 5pm, Dinner at 7pm"
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block mb-2 text-gray-700 font-semibold">
                <MapPin className="inline mr-2" size={20} />
                Location Name *
              </label>
              <input
                type="text"
                value={formData.location_name}
                onChange={(e) => setFormData({ ...formData, location_name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Northbrae Community Church"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-700 font-semibold">Location Address *</label>
              <input
                type="text"
                value={formData.location_address}
                onChange={(e) => setFormData({ ...formData, location_address: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 941 the Alameda, Berkeley, CA"
                required
              />
            </div>

            {/* Volunteers */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">
                  <Users className="inline mr-2" size={20} />
                  Volunteers Needed *
                </label>
                <input
                  type="text"
                  value={formData.volunteers_needed}
                  onChange={(e) => setFormData({ ...formData, volunteers_needed: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 20-30 people"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">Age Requirements</label>
                <input
                  type="text"
                  value={formData.age_requirements}
                  onChange={(e) => setFormData({ ...formData, age_requirements: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., All ages welcome!"
                />
              </div>
            </div>

            {/* Volunteer Tasks */}
            <div>
              <label className="block mb-2 text-gray-700 font-semibold">Volunteer Tasks *</label>
              <textarea
                value={formData.volunteer_tasks}
                onChange={(e) => setFormData({ ...formData, volunteer_tasks: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter each task on a new line:&#10;Cook and prepare food&#10;Serve dinner to guests&#10;Set up tables and dining room"
                rows={6}
                required
              />
              <p className="text-sm text-gray-600 mt-1">Enter each task on a new line</p>
            </div>

            {/* Pricing */}
            <div>
              <label className="flex items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  checked={formData.is_free}
                  onChange={(e) => setFormData({ ...formData, is_free: e.target.checked })}
                  className="w-5 h-5"
                />
                <span className="text-gray-700 font-semibold">This event is free</span>
              </label>

              {!formData.is_free && (
                <div>
                  <label className="block mb-2 text-gray-700 font-semibold">
                    <DollarSign className="inline mr-2" size={20} />
                    Ticket Price
                  </label>
                  <input
                    type="text"
                    value={formData.ticket_price}
                    onChange={(e) => setFormData({ ...formData, ticket_price: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., $80"
                    required={!formData.is_free}
                  />
                </div>
              )}
            </div>

            {/* Square Payment Link */}
            {!formData.is_free && (
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">Square Payment Link (Optional)</label>
                <input
                  type="url"
                  value={formData.square_payment_link}
                  onChange={(e) => setFormData({ ...formData, square_payment_link: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://square.link/..."
                />
              </div>
            )}

            {/* To-Go Available */}
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.to_go_available}
                  onChange={(e) => setFormData({ ...formData, to_go_available: e.target.checked })}
                  className="w-5 h-5"
                />
                <span className="text-gray-700 font-semibold">To-go orders available</span>
              </label>
            </div>

            {/* Additional Info */}
            <div>
              <label className="block mb-2 text-gray-700 font-semibold">Additional Information (Optional)</label>
              <textarea
                value={formData.additional_info}
                onChange={(e) => setFormData({ ...formData, additional_info: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., No experience necessary! We provide training and all supplies."
                rows={2}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={uploading}
              className="w-full text-white py-4 text-lg"
              style={{ backgroundColor: '#1740a5' }}
            >
              {uploading ? (
                <>
                  <Upload className="animate-spin mr-2" size={20} />
                  Uploading Event...
                </>
              ) : (
                <>
                  <Upload className="mr-2" size={20} />
                  Publish Featured Event
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Existing Events */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl mb-6 text-center" style={{ color: '#1740a5' }}>
            Existing Events
          </h2>

          {loadingEvents ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading events...</p>
            </div>
          ) : existingEvents.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <Calendar size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 text-lg">No events uploaded yet</p>
            </div>
          ) : (
            <div className="space-y-6">
              {existingEvents.map((event) => {
                const eventDate = new Date(event.event_date);
                const isPastEvent = eventDate < new Date();
                
                return (
                  <div
                    key={event.id}
                    className={`bg-white rounded-lg shadow-lg p-6 ${
                      isPastEvent ? 'opacity-60' : ''
                    }`}
                  >
                    <div className="flex gap-6">
                      {event.image_url && (
                        <img
                          src={event.image_url}
                          alt={event.event_name}
                          className="w-48 h-32 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold" style={{ color: '#1740a5' }}>
                            {event.event_name}
                            {isPastEvent && (
                              <span className="ml-3 text-sm text-gray-500">(Past Event)</span>
                            )}
                          </h3>
                          <Button
                            onClick={() => handleDelete(event.id)}
                            disabled={deletingId === event.id}
                            variant="ghost"
                            className="text-red-600 hover:text-red-700"
                          >
                            {deletingId === event.id ? (
                              <RefreshCw className="animate-spin" size={20} />
                            ) : (
                              <Trash2 size={20} />
                            )}
                          </Button>
                        </div>
                        <p className="text-gray-700 mb-2">{event.event_description}</p>
                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                          <div><strong>Date:</strong> {new Date(event.event_date).toLocaleDateString()}</div>
                          <div><strong>Time:</strong> {event.event_time}</div>
                          <div><strong>Location:</strong> {event.location_name}</div>
                          <div><strong>Price:</strong> {event.ticket_price}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}