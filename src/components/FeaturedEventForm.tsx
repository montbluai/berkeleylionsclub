import { useState, useEffect } from 'react';
import { Star, Upload, Trash2, Plus, X, CheckCircle, AlertCircle, Calendar, Edit } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

interface FeaturedEvent {
  id: string;
  posterUrl: string;
  eventName: string;
  description: string;
  date: string;
  time: string;
  locationName: string;
  address: string;
  volunteersNeeded: string;
  ageRequirement: string;
  volunteerTasks: string[];
  isFree: boolean;
  ticketPrice?: string;
  squarePaymentLink?: string;
  togoAvailable: boolean;
  additionalInfo?: string;
}

export function FeaturedEventForm() {
  const [eventQueue, setEventQueue] = useState<FeaturedEvent[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  
  // Form state
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [posterPreview, setPosterPreview] = useState('');
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [locationName, setLocationName] = useState('');
  const [address, setAddress] = useState('');
  const [volunteersNeeded, setVolunteersNeeded] = useState('');
  const [ageRequirement, setAgeRequirement] = useState('');
  const [volunteerTasks, setVolunteerTasks] = useState<string[]>(['']);
  const [isFree, setIsFree] = useState(true);
  const [ticketPrice, setTicketPrice] = useState('');
  const [squarePaymentLink, setSquarePaymentLink] = useState('');
  const [togoAvailable, setTogoAvailable] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState('No experience necessary! We provide training and all supplies.');

  // Load event queue on mount
  useEffect(() => {
    loadEventQueue();
  }, []);

  const loadEventQueue = () => {
    const stored = localStorage.getItem('featured_event_queue');
    if (stored) {
      try {
        const events = JSON.parse(stored);
        // Sort by date
        events.sort((a: FeaturedEvent, b: FeaturedEvent) => 
          new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        
        // Auto-cleanup: Keep only the most recent past event
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const pastEvents = events.filter((event: FeaturedEvent) => {
          const eventDate = new Date(event.date);
          eventDate.setHours(0, 0, 0, 0);
          return eventDate < today;
        });
        
        const upcomingEvents = events.filter((event: FeaturedEvent) => {
          const eventDate = new Date(event.date);
          eventDate.setHours(0, 0, 0, 0);
          return eventDate >= today;
        });
        
        // Keep only the most recent past event (last one in the sorted array)
        const mostRecentPastEvent = pastEvents.length > 0 ? [pastEvents[pastEvents.length - 1]] : [];
        
        const cleanedQueue = [...mostRecentPastEvent, ...upcomingEvents];
        
        // Save cleaned queue if we removed any events
        if (cleanedQueue.length !== events.length) {
          localStorage.setItem('featured_event_queue', JSON.stringify(cleanedQueue));
        }
        
        setEventQueue(cleanedQueue);
      } catch (e) {
        console.error('Error loading event queue:', e);
      }
    }
  };

  const getActiveEvent = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Find the first event that hasn't passed yet
    return eventQueue.find(event => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate >= today;
    });
  };

  const isPastEvent = (dateString: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDate = new Date(dateString);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate < today;
  };

  const getUpcomingEventCount = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventQueue.filter(event => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate >= today;
    }).length;
  };

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Resize if too large (max 800px width)
          const maxWidth = 800;
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
          
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          // Convert to base64 with compression
          let quality = 0.8;
          let result = canvas.toDataURL('image/jpeg', quality);
          
          // If still too large, reduce quality further
          while (result.length > 300000 && quality > 0.3) {
            quality -= 0.1;
            result = canvas.toDataURL('image/jpeg', quality);
          }
          
          if (result.length > 500000) {
            reject(new Error('Image is too large. Please use a smaller file (max 2MB recommended).'));
          } else {
            resolve(result);
          }
        };
      };
      reader.onerror = error => reject(error);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage('');
    
    try {
      const compressed = await compressImage(file);
      setPosterFile(file);
      setPosterPreview(compressed);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Error processing image');
      setPosterFile(null);
      setPosterPreview('');
    }
  };

  const handleAddTask = () => {
    setVolunteerTasks([...volunteerTasks, '']);
  };

  const handleRemoveTask = (index: number) => {
    setVolunteerTasks(volunteerTasks.filter((_, i) => i !== index));
  };

  const handleTaskChange = (index: number, value: string) => {
    const newTasks = [...volunteerTasks];
    newTasks[index] = value;
    setVolunteerTasks(newTasks);
  };

  const handleEditEvent = (event: FeaturedEvent) => {
    setEditingEventId(event.id);
    setPosterPreview(event.posterUrl);
    setEventName(event.eventName);
    setDescription(event.description);
    setDate(event.date);
    setTime(event.time);
    setLocationName(event.locationName);
    setAddress(event.address);
    setVolunteersNeeded(event.volunteersNeeded);
    setAgeRequirement(event.ageRequirement);
    setVolunteerTasks(event.volunteerTasks.length > 0 ? event.volunteerTasks : ['']);
    setIsFree(event.isFree);
    setTicketPrice(event.ticketPrice || '');
    setSquarePaymentLink(event.squarePaymentLink || '');
    setTogoAvailable(event.togoAvailable);
    setAdditionalInfo(event.additionalInfo || 'No experience necessary! We provide training and all supplies.');
    setErrorMessage('');
    
    // Scroll to top to show the form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingEventId(null);
    handleClearForm();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    // Check event queue limit (max 6 UPCOMING events) only when adding new
    const upcomingCount = getUpcomingEventCount();
    if (!editingEventId && upcomingCount >= 6) {
      setErrorMessage('Maximum of 6 upcoming events allowed. Please remove an existing event before adding a new one.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    // Validation
    if (!posterPreview) {
      setErrorMessage('Please upload an event poster image');
      return;
    }

    const filteredTasks = volunteerTasks.filter(task => task.trim() !== '');
    
    const eventData: FeaturedEvent = {
      id: editingEventId || Date.now().toString(),
      posterUrl: posterPreview,
      eventName,
      description,
      date,
      time,
      locationName,
      address,
      volunteersNeeded,
      ageRequirement,
      volunteerTasks: filteredTasks,
      isFree,
      ticketPrice: isFree ? undefined : ticketPrice,
      squarePaymentLink: squarePaymentLink || undefined,
      togoAvailable,
      additionalInfo: additionalInfo || undefined,
    };

    let newQueue;
    if (editingEventId) {
      // Update existing event
      newQueue = eventQueue.map(event => 
        event.id === editingEventId ? eventData : event
      );
      setEditingEventId(null);
    } else {
      // Add new event to queue
      newQueue = [...eventQueue, eventData];
    }
    
    localStorage.setItem('featured_event_queue', JSON.stringify(newQueue));
    setEventQueue(newQueue);
    handleClearForm();
    setShowSuccess(true);
    
    // Hide success message after 5 seconds
    setTimeout(() => setShowSuccess(false), 5000);
    
    // Scroll to top to show success message
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearForm = () => {
    setPosterFile(null);
    setPosterPreview('');
    setEventName('');
    setDescription('');
    setDate('');
    setTime('');
    setLocationName('');
    setAddress('');
    setVolunteersNeeded('');
    setAgeRequirement('');
    setVolunteerTasks(['']);
    setIsFree(true);
    setTicketPrice('');
    setSquarePaymentLink('');
    setTogoAvailable(false);
    setAdditionalInfo('No experience necessary! We provide training and all supplies.');
    setErrorMessage('');
    setEditingEventId(null);
  };

  const handleRemoveEvent = (eventId: string) => {
    if (confirm('Are you sure you want to remove this event from the Volunteer page?')) {
      const newQueue = eventQueue.filter(event => event.id !== eventId);
      localStorage.setItem('featured_event_queue', JSON.stringify(newQueue));
      setEventQueue(newQueue);
      setShowSuccess(false);
      
      // If editing this event, cancel edit mode
      if (editingEventId === eventId) {
        handleCancelEdit();
      }
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded shadow-md">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-600" size={24} />
            <div>
              <h3 className="font-semibold text-green-900">
                {editingEventId ? 'Event Updated!' : 'Featured Event Published!'}
              </h3>
              <p className="text-green-800 text-sm mt-1">
                The event is now live on the Volunteer page. Visit{' '}
                <a href="/volunteer" className="underline font-medium">berkeleylionsclub.org/volunteer</a>{' '}
                to see it.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <div className="flex items-center gap-3">
            <AlertCircle className="text-red-600" size={24} />
            <p className="text-red-800">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Editing Mode Banner */}
      {editingEventId && (
        <div className="mb-6 bg-blue-50 border-l-4 p-4 rounded" style={{ borderColor: '#1740a5' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Edit size={24} style={{ color: '#1740a5' }} />
              <div>
                <h3 className="font-semibold" style={{ color: '#1740a5' }}>
                  Editing Event
                </h3>
                <p className="text-sm text-gray-700">
                  Make your changes below and click "Update Event" to save.
                </p>
              </div>
            </div>
            <Button
              onClick={handleCancelEdit}
              variant="outline"
              size="sm"
            >
              Cancel Edit
            </Button>
          </div>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-3" style={{ color: '#1740a5' }}>
            <Star size={32} />
            Featured Event Manager
          </CardTitle>
          <CardDescription>
            Create and publish a featured volunteer event that appears at the top of the Volunteer page. 
            {eventQueue.length > 0 && (
              <span className="block mt-2">
                <strong>Upcoming events: {getUpcomingEventCount()}/6</strong>
                {getUpcomingEventCount() >= 5 && (
                  <span className="text-orange-600 ml-2">
                    ({6 - getUpcomingEventCount()} slot{6 - getUpcomingEventCount() !== 1 ? 's' : ''} remaining)
                  </span>
                )}
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Queue limit warning */}
          {!editingEventId && getUpcomingEventCount() >= 5 && getUpcomingEventCount() < 6 && (
            <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
              <div className="flex items-center gap-3">
                <AlertCircle className="text-yellow-600" size={24} />
                <div>
                  <h3 className="font-semibold text-yellow-900">
                    Approaching Queue Limit
                  </h3>
                  <p className="text-yellow-800 text-sm mt-1">
                    You can add {6 - getUpcomingEventCount()} more upcoming event{6 - getUpcomingEventCount() !== 1 ? 's' : ''}. 
                    Maximum of 6 upcoming events recommended for optimal performance.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Current Event Status */}
          {!editingEventId && getActiveEvent() && (
            <div className="mb-6 bg-blue-50 border-l-4 p-4 rounded" style={{ borderColor: '#1740a5' }}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: '#1740a5' }}>
                    Current Featured Event:
                  </h3>
                  <p className="text-gray-700 font-medium">{getActiveEvent()?.eventName}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(getActiveEvent()?.date as string).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEditEvent(getActiveEvent()!)}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Edit size={16} />
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleRemoveEvent(getActiveEvent()?.id as string)}
                    variant="destructive"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Trash2 size={16} />
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Event Poster Upload */}
            <div>
              <label className="block font-semibold mb-2 text-gray-700">
                Event Flyer Image *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {posterPreview ? (
                  <div className="space-y-3">
                    <img 
                      src={posterPreview} 
                      alt="Poster preview" 
                      className="max-h-64 mx-auto rounded"
                    />
                    <Button
                      type="button"
                      onClick={() => {
                        setPosterFile(null);
                        setPosterPreview('');
                      }}
                      variant="outline"
                      size="sm"
                    >
                      <X size={16} className="mr-2" />
                      Remove Image
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Upload className="mx-auto mb-3 text-gray-400" size={48} />
                    <p className="text-gray-600 mb-2">Upload event poster/flyer</p>
                    <p className="text-sm text-gray-500 mb-4">
                      JPG, PNG, or GIF • Max 2MB • Will be automatically compressed
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="poster-upload"
                    />
                    <label htmlFor="poster-upload">
                      <span className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors">
                        Choose Image
                      </span>
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Event Details */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block font-semibold mb-2 text-gray-700">
                  Event Name *
                </label>
                <input
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="e.g., Community Food Drive"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-semibold mb-2 text-gray-700">
                  Event Description *
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                  required
                  placeholder="Brief description of the event..."
                />
              </div>

              <div>
                <label className="block font-semibold mb-2 text-gray-700">
                  Event Date *
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-2 text-gray-700">
                  Event Time *
                </label>
                <input
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="e.g., 10:00 AM - 2:00 PM"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2 text-gray-700">
                  Location Name *
                </label>
                <input
                  type="text"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="e.g., Berkeley Community Center"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2 text-gray-700">
                  Address *
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="e.g., 123 Main St, Berkeley, CA"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2 text-gray-700">
                  Volunteers Needed *
                </label>
                <input
                  type="text"
                  value={volunteersNeeded}
                  onChange={(e) => setVolunteersNeeded(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="e.g., 10-15 volunteers"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2 text-gray-700">
                  Age Requirement *
                </label>
                <input
                  type="text"
                  value={ageRequirement}
                  onChange={(e) => setAgeRequirement(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="e.g., All ages welcome"
                />
              </div>
            </div>

            {/* Volunteer Tasks */}
            <div>
              <label className="block font-semibold mb-2 text-gray-700">
                What You'll Do (Volunteer Tasks) *
              </label>
              <div className="space-y-2">
                {volunteerTasks.map((task, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={task}
                      onChange={(e) => handleTaskChange(index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Help set up tables and chairs"
                    />
                    {volunteerTasks.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => handleRemoveTask(index)}
                        variant="outline"
                        size="sm"
                      >
                        <X size={16} />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={handleAddTask}
                  variant="outline"
                  size="sm"
                  className="mt-2"
                >
                  <Plus size={16} className="mr-2" />
                  Add Task
                </Button>
              </div>
            </div>

            {/* Ticket Information */}
            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4 text-gray-700">Ticket Information</h3>
              
              <div className="mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFree}
                    onChange={(e) => setIsFree(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700">This is a FREE event</span>
                </label>
              </div>

              {!isFree && (
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block font-semibold mb-2 text-gray-700">
                      Ticket Price
                    </label>
                    <input
                      type="text"
                      value={ticketPrice}
                      onChange={(e) => setTicketPrice(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., $15 per person"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-2 text-gray-700">
                      Square Payment Link
                    </label>
                    <input
                      type="url"
                      value={squarePaymentLink}
                      onChange={(e) => setSquarePaymentLink(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://square.link/..."
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={togoAvailable}
                    onChange={(e) => setTogoAvailable(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700">To-go orders available</span>
                </label>
              </div>
            </div>

            {/* Additional Info */}
            <div>
              <label className="block font-semibold mb-2 text-gray-700">
                Additional Information (Optional)
              </label>
              <textarea
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
                placeholder="Any extra details volunteers should know..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              <Button
                type="submit"
                className="flex-1 text-white py-3"
                style={{ backgroundColor: '#1740a5' }}
              >
                <Star size={20} className="mr-2" />
                {editingEventId ? 'Update Event' : 'Publish Featured Event'}
              </Button>
              {editingEventId ? (
                <Button
                  type="button"
                  onClick={handleCancelEdit}
                  variant="outline"
                  className="px-6"
                >
                  Cancel
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleClearForm}
                  variant="outline"
                  className="px-6"
                >
                  Clear Form
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Event Queue Display */}
      {eventQueue.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-3" style={{ color: '#1740a5' }}>
              <Calendar size={24} />
              Event Queue ({eventQueue.length} event{eventQueue.length !== 1 ? 's' : ''})
            </CardTitle>
            <CardDescription>
              Events are displayed automatically based on date. The next upcoming event appears on the Volunteer page.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {eventQueue.map((event, index) => {
                const isActive = event.id === getActiveEvent()?.id;
                const isPast = isPastEvent(event.date);
                const isEditing = event.id === editingEventId;
                
                return (
                  <div 
                    key={event.id}
                    className={`border rounded-lg p-4 ${
                      isEditing ? 'border-purple-500 bg-purple-50' :
                      isActive ? 'border-blue-500 bg-blue-50' : 
                      isPast ? 'border-gray-300 bg-gray-50 opacity-60' : 
                      'border-gray-300'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <img 
                        src={event.posterUrl} 
                        alt={event.eventName}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-gray-900">{event.eventName}</h4>
                              {isEditing && (
                                <span className="px-2 py-0.5 text-xs font-semibold bg-purple-600 text-white rounded">
                                  EDITING
                                </span>
                              )}
                              {isActive && !isEditing && (
                                <span className="px-2 py-0.5 text-xs font-semibold rounded" style={{ backgroundColor: '#1740a5', color: 'white' }}>
                                  ACTIVE
                                </span>
                              )}
                              {isPast && (
                                <span className="px-2 py-0.5 text-xs font-semibold bg-gray-400 text-white rounded">
                                  PAST
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">
                              {new Date(event.date).toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">{event.time}</p>
                          </div>
                          <div className="flex gap-2">
                            {!isEditing && (
                              <Button
                                onClick={() => handleEditEvent(event)}
                                variant="ghost"
                                size="sm"
                                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                              >
                                <Edit size={16} />
                              </Button>
                            )}
                            <Button
                              onClick={() => handleRemoveEvent(event.id)}
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}