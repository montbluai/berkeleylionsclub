import { useState, useEffect } from 'react';
import { Upload, Image as ImageIcon, X, CheckCircle, AlertCircle, Trash2, RefreshCw, Info } from 'lucide-react';

interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
  category: string;
}

export function GalleryManagementContent() {
  const [formData, setFormData] = useState({
    caption: '',
    category: 'Service',
    imageFile: null as File | null,
  });
  
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const [existingPhotos, setExistingPhotos] = useState<GalleryPhoto[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Photo limit constants
  const MAX_PHOTOS = 40;
  const RECOMMENDED_PHOTOS = 30;

  // GHL Configuration - CHANGE THESE VALUES
  const GHL_API_KEY = 'YOUR_GHL_API_KEY_HERE';
  const GHL_LOCATION_ID = 'YOUR_GHL_LOCATION_ID_HERE';
  const PIPELINE_ID = 'YOUR_PIPELINE_ID_HERE';

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setUploadStatus({
          type: 'error',
          message: 'File is too large. Please use an image under 10MB.',
        });
        return;
      }
      
      setFormData({ ...formData, imageFile: file });
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    
    // Block drop if at maximum capacity
    if (existingPhotos.length >= MAX_PHOTOS) {
      return;
    }
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const fakeEvent = {
        target: { files: [file] },
      } as any;
      handleImageSelect(fakeEvent);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const clearForm = () => {
    setFormData({
      caption: '',
      category: 'Service',
      imageFile: null,
    });
    setPreviewUrl('');
    setUploadStatus({ type: null, message: '' });
  };

  const uploadToImgur = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('https://api.imgur.com/3/upload', {
      method: 'POST',
      headers: {
        Authorization: 'Client-ID 4e7e6e7e0a8f7e7',
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload to Imgur');
    }

    const data = await response.json();
    return data.data.link;
  };

  const createGHLOpportunity = async (imageUrl: string, caption: string, category: string) => {
    if (GHL_API_KEY === 'YOUR_GHL_API_KEY_HERE') {
      const stored = localStorage.getItem('gallery_photos');
      const photos = stored ? JSON.parse(stored) : [];
      const newPhoto = {
        id: Date.now().toString(),
        url: imageUrl,
        caption,
        category,
      };
      photos.push(newPhoto);
      localStorage.setItem('gallery_photos', JSON.stringify(photos));
      return newPhoto;
    }

    const response = await fetch('https://services.leadconnectorhq.com/opportunities/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GHL_API_KEY}`,
        Version: '2021-07-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        location_id: GHL_LOCATION_ID,
        name: caption,
        pipeline_id: PIPELINE_ID,
        status: 'open',
        customFields: [
          { key: 'photo_url', field_value: imageUrl },
          { key: 'caption', field_value: caption },
          { key: 'category', field_value: category },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create GHL opportunity');
    }

    return await response.json();
  };

  const fetchExistingPhotos = async () => {
    setLoadingPhotos(true);
    try {
      if (GHL_API_KEY === 'YOUR_GHL_API_KEY_HERE') {
        const stored = localStorage.getItem('gallery_photos');
        const photos = stored ? JSON.parse(stored) : [];
        setExistingPhotos(photos);
        setLoadingPhotos(false);
        return;
      }

      const response = await fetch(
        `https://services.leadconnectorhq.com/opportunities/search?location_id=${GHL_LOCATION_ID}&pipelineId=${PIPELINE_ID}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${GHL_API_KEY}`,
            Version: '2021-07-28',
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch photos from GHL');
      }

      const data = await response.json();
      
      const photos: GalleryPhoto[] = data.opportunities?.map((opp: any) => {
        const customFields = opp.customFields || [];
        return {
          id: opp.id,
          url: customFields.find((f: any) => f.key === 'photo_url')?.value || '',
          caption: customFields.find((f: any) => f.key === 'caption')?.value || opp.name,
          category: customFields.find((f: any) => f.key === 'category')?.value || 'Events',
        };
      }) || [];

      setExistingPhotos(photos);
    } catch (error) {
      console.error('Error fetching photos:', error);
      const stored = localStorage.getItem('gallery_photos');
      const photos = stored ? JSON.parse(stored) : [];
      setExistingPhotos(photos);
    } finally {
      setLoadingPhotos(false);
    }
  };

  const deletePhoto = async (id: string) => {
    if (!confirm('Are you sure you want to delete this photo?')) {
      return;
    }

    setDeletingId(id);
    try {
      if (GHL_API_KEY === 'YOUR_GHL_API_KEY_HERE') {
        const stored = localStorage.getItem('gallery_photos');
        const photos = stored ? JSON.parse(stored) : [];
        const updated = photos.filter((p: GalleryPhoto) => p.id !== id);
        localStorage.setItem('gallery_photos', JSON.stringify(updated));
        setExistingPhotos(updated);
        setDeletingId(null);
        return;
      }

      const response = await fetch(
        `https://services.leadconnectorhq.com/opportunities/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${GHL_API_KEY}`,
            Version: '2021-07-28',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete photo from GHL');
      }

      setExistingPhotos(existingPhotos.filter(p => p.id !== id));
      
      setUploadStatus({
        type: 'success',
        message: 'Photo deleted successfully!',
      });
      
      setTimeout(() => {
        setUploadStatus({ type: null, message: '' });
      }, 3000);
    } catch (error) {
      console.error('Error deleting photo:', error);
      setUploadStatus({
        type: 'error',
        message: 'Failed to delete photo. Please try again.',
      });
    } finally {
      setDeletingId(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if at maximum capacity
    if (existingPhotos.length >= MAX_PHOTOS) {
      setUploadStatus({
        type: 'error',
        message: 'Maximum capacity reached (40 photos). Please delete some photos before adding new ones.',
      });
      return;
    }
    
    if (!formData.imageFile || !formData.caption) {
      setUploadStatus({
        type: 'error',
        message: 'Please select an image and provide a caption.',
      });
      return;
    }

    setUploading(true);
    setUploadStatus({ type: null, message: '' });

    try {
      const imageUrl = await uploadToImgur(formData.imageFile);
      await createGHLOpportunity(imageUrl, formData.caption, formData.category);
      
      setUploadStatus({
        type: 'success',
        message: 'Photo uploaded successfully! It will appear on the gallery page.',
      });
      
      fetchExistingPhotos();
      
      setTimeout(() => {
        clearForm();
      }, 2000);
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus({
        type: 'error',
        message: 'Failed to upload photo. Please try again or contact support.',
      });
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    fetchExistingPhotos();
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Upload Status */}
      {uploadStatus.type && (
        <div className={`mb-8 p-4 rounded-lg flex items-center gap-3 ${
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

      {/* Photo Counter and Limit Warning */}
      <div className="mb-8">
        <div className={`p-4 rounded-lg flex items-center gap-3 ${
          existingPhotos.length >= MAX_PHOTOS 
            ? 'bg-red-50 border-2 border-red-200' 
            : existingPhotos.length >= RECOMMENDED_PHOTOS 
            ? 'bg-blue-50 border-2 border-blue-200' 
            : 'bg-gray-50 border-2 border-gray-200'
        }`}>
          <ImageIcon size={24} className={
            existingPhotos.length >= MAX_PHOTOS 
              ? 'text-red-600' 
              : existingPhotos.length >= RECOMMENDED_PHOTOS 
              ? 'text-blue-600' 
              : 'text-gray-600'
          } />
          <div className="flex-1">
            <p className={`font-semibold ${
              existingPhotos.length >= MAX_PHOTOS 
                ? 'text-red-800' 
                : existingPhotos.length >= RECOMMENDED_PHOTOS 
                ? 'text-blue-800' 
                : 'text-gray-800'
            }`}>
              Gallery Photos: {existingPhotos.length} / {MAX_PHOTOS}
            </p>
            {existingPhotos.length >= MAX_PHOTOS && (
              <p className="text-red-700 text-sm mt-1">
                Maximum capacity reached. Gallery is getting large. Consider removing older photos for a better visitor experience.
              </p>
            )}
            {existingPhotos.length >= RECOMMENDED_PHOTOS && existingPhotos.length < MAX_PHOTOS && (
              <p className="text-blue-700 text-sm mt-1">
                You have {existingPhotos.length} photos - this is ideal! Consider replacing older photos instead of adding more.
              </p>
            )}
          </div>
        </div>
        
        {/* Social Media Note */}
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
          <Info size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800">
            <strong>Note for Board Members:</strong> This website gallery is designed as a curated showcase for potential members and donors. For sharing all your event photos with current members and the community, continue using the official Berkeley Lions Facebook, Instagram, and other social media - those platforms have unlimited storage!
          </p>
        </div>
      </div>

      {/* Upload Form */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
        <h2 className="text-2xl mb-6" style={{ color: '#1740a5' }}>
          Upload New Photo
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload Area */}
          <div>
            <label className="block mb-2 text-gray-700 font-semibold">
              Select Image *
            </label>
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                existingPhotos.length >= MAX_PHOTOS
                  ? 'border-red-300 bg-red-50 cursor-not-allowed'
                  : 'border-gray-300 hover:border-blue-500 cursor-pointer'
              }`}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
                id="imageUpload"
                disabled={existingPhotos.length >= MAX_PHOTOS}
              />
              <label htmlFor={existingPhotos.length >= MAX_PHOTOS ? '' : 'imageUpload'} className={existingPhotos.length >= MAX_PHOTOS ? 'cursor-not-allowed' : 'cursor-pointer'}>
                <Upload className={`mx-auto mb-4 ${existingPhotos.length >= MAX_PHOTOS ? 'text-red-400' : 'text-gray-400'}`} size={48} />
                <p className={existingPhotos.length >= MAX_PHOTOS ? 'text-red-600 mb-2' : 'text-gray-600 mb-2'}>
                  {existingPhotos.length >= MAX_PHOTOS 
                    ? 'Upload disabled - Maximum capacity reached' 
                    : 'Drag and drop your image here, or click to select'
                  }
                </p>
                <p className="text-sm text-gray-500">
                  Maximum file size: 10MB
                </p>
              </label>
            </div>
            
            {previewUrl && (
              <div className="mt-4 relative">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-w-full h-auto rounded-lg shadow-md"
                />
                <button
                  type="button"
                  onClick={clearForm}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            )}
          </div>

          {/* Caption */}
          <div>
            <label className="block mb-2 text-gray-700 font-semibold">
              Caption *
            </label>
            <input
              type="text"
              value={formData.caption}
              onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe this photo..."
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-2 text-gray-700 font-semibold">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Service</option>
              <option>Fundraising</option>
              <option>Community</option>
              <option>Events</option>
              <option>Fellowship</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={uploading || !formData.imageFile}
            className="w-full text-white py-4 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#1740a5' }}
          >
            {uploading ? (
              <>
                <RefreshCw className="animate-spin" size={20} />
                Uploading...
              </>
            ) : (
              <>
                <Upload size={20} />
                Upload Photo
              </>
            )}
          </button>
        </form>
      </div>

      {/* Existing Photos */}
      <div>
        <h2 className="text-2xl mb-6" style={{ color: '#1740a5' }}>
          Existing Gallery Photos
        </h2>

        {loadingPhotos ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading photos...</p>
          </div>
        ) : existingPhotos.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <ImageIcon size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 text-lg">No photos uploaded yet</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {existingPhotos.map((photo) => (
              <div
                key={photo.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden group relative"
              >
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <p className="text-gray-800 mb-2">{photo.caption}</p>
                  <span
                    className="inline-block px-3 py-1 rounded-full text-sm text-white"
                    style={{ backgroundColor: '#f2ca47', color: '#1740a5' }}
                  >
                    {photo.category}
                  </span>
                </div>
                <button
                  onClick={() => deletePhoto(photo.id)}
                  disabled={deletingId === photo.id}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                >
                  {deletingId === photo.id ? (
                    <RefreshCw className="animate-spin" size={20} />
                  ) : (
                    <Trash2 size={20} />
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}