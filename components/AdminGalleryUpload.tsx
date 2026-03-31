import { useState, useEffect } from 'react';
import { Upload, Image as ImageIcon, X, CheckCircle, AlertCircle, Trash2, RefreshCw } from 'lucide-react';

interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
  category: string;
}

export function AdminGalleryUpload() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
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

  // Photo management state
  const [existingPhotos, setExistingPhotos] = useState<GalleryPhoto[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // GHL Configuration - CHANGE THESE VALUES
  const GHL_API_KEY = 'YOUR_GHL_API_KEY_HERE';
  const GHL_LOCATION_ID = 'YOUR_GHL_LOCATION_ID_HERE';
  const PIPELINE_ID = 'YOUR_PIPELINE_ID_HERE';

  // Password protection - CHANGE THIS to your desired password
  const ADMIN_PASSWORD = 'berkeley2025';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password. Please try again.');
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setUploadStatus({
          type: 'error',
          message: 'File is too large. Please use an image under 10MB.',
        });
        return;
      }
      
      setFormData({ ...formData, imageFile: file });
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
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
        Authorization: 'Client-ID 4e7e6e7e0a8f7e7', // Public Imgur Client ID - you can use your own
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
    // Check if configured
    if (GHL_API_KEY === 'YOUR_GHL_API_KEY_HERE') {
      console.log('GHL API not configured - would create opportunity with:', {
        imageUrl,
        caption,
        category,
      });
      // Store in localStorage as fallback
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
      // Check if GHL is configured
      if (GHL_API_KEY === 'YOUR_GHL_API_KEY_HERE') {
        // Use localStorage fallback
        const stored = localStorage.getItem('gallery_photos');
        const photos = stored ? JSON.parse(stored) : [];
        setExistingPhotos(photos);
        setLoadingPhotos(false);
        return;
      }

      // Fetch from GHL
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
      
      // Transform GHL opportunities to photos
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
      // Try localStorage as fallback
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
      // Check if GHL is configured
      if (GHL_API_KEY === 'YOUR_GHL_API_KEY_HERE') {
        // Delete from localStorage
        const stored = localStorage.getItem('gallery_photos');
        const photos = stored ? JSON.parse(stored) : [];
        const updated = photos.filter((p: GalleryPhoto) => p.id !== id);
        localStorage.setItem('gallery_photos', JSON.stringify(updated));
        setExistingPhotos(updated);
        setDeletingId(null);
        return;
      }

      // Delete from GHL
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

      // Remove from local state
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
      // Step 1: Upload to Imgur
      const imageUrl = await uploadToImgur(formData.imageFile);
      
      // Step 2: Create GHL Opportunity (or store in localStorage)
      await createGHLOpportunity(imageUrl, formData.caption, formData.category);
      
      setUploadStatus({
        type: 'success',
        message: 'Photo uploaded successfully! It will appear on the gallery page.',
      });
      
      // Refresh photo list
      fetchExistingPhotos();
      
      // Clear form after 2 seconds
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
    if (isAuthenticated) {
      fetchExistingPhotos();
    }
  }, [isAuthenticated]);

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-yellow-50 px-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#1740a5' }}>
              <ImageIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl mb-2" style={{ color: '#1740a5' }}>
              Gallery Admin
            </h1>
            <p className="text-gray-600">
              Berkeley Lions Club Photo Management
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter admin password"
              />
              {passwordError && (
                <p className="text-red-600 text-sm mt-2">{passwordError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#1740a5' }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Upload Form (after authentication)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-white rounded-lg shadow-xl p-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl" style={{ color: '#1740a5' }}>
                  Upload Photo
                </h1>
                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  Logout
                </button>
              </div>
              <p className="text-gray-600">
                Add photos to the gallery
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Image Upload Area */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">
                  Photo
                </label>
                
                {!previewUrl ? (
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 transition-colors cursor-pointer"
                    onClick={() => document.getElementById('fileInput')?.click()}
                  >
                    <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600 mb-2">
                      Drag and drop an image here, or click to browse
                    </p>
                    <p className="text-sm text-gray-500">
                      JPG, PNG, or GIF (Max 10MB)
                    </p>
                    <input
                      id="fileInput"
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={clearForm}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Caption */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">
                  Caption
                </label>
                <input
                  type="text"
                  value={formData.caption}
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Community Volunteer Day"
                  required
                />
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Service">Service</option>
                  <option value="Fellowship">Fellowship</option>
                  <option value="Events">Events</option>
                  <option value="Fundraising">Fundraising</option>
                </select>
              </div>

              {/* Status Messages */}
              {uploadStatus.type && (
                <div
                  className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
                    uploadStatus.type === 'success'
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-red-50 border border-red-200'
                  }`}
                >
                  {uploadStatus.type === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  )}
                  <p
                    className={uploadStatus.type === 'success' ? 'text-green-800' : 'text-red-800'}
                  >
                    {uploadStatus.message}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={uploading || !formData.imageFile}
                className="w-full py-3 rounded-lg text-white transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ backgroundColor: '#1740a5' }}
              >
                {uploading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Upload Photo
                  </>
                )}
              </button>
            </form>

            {/* Instructions */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">How it works:</h3>
              <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                <li>Select or drag a photo into the upload area</li>
                <li>Add a descriptive caption</li>
                <li>Choose the appropriate category</li>
                <li>Click "Upload Photo" - it will automatically appear on the gallery page!</li>
              </ol>
            </div>
          </div>

          {/* Manage Photos Section */}
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl" style={{ color: '#1740a5' }}>
                Manage Photos
              </h2>
              <button
                onClick={fetchExistingPhotos}
                className="text-gray-600 hover:text-gray-800"
                title="Refresh"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>

            {loadingPhotos ? (
              <div className="flex items-center justify-center py-12">
                <RefreshCw className="animate-spin w-8 h-8 text-gray-400" />
              </div>
            ) : existingPhotos.length === 0 ? (
              <div className="text-center py-12">
                <ImageIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500">No photos yet</p>
                <p className="text-sm text-gray-400 mt-2">Upload your first photo to get started!</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {existingPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-4">
                      <img
                        src={photo.url}
                        alt={photo.caption}
                        className="w-24 h-24 object-cover rounded flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {photo.caption}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          <span
                            className="inline-block px-2 py-1 rounded text-xs"
                            style={{ backgroundColor: '#f2ca47', color: '#1740a5' }}
                          >
                            {photo.category}
                          </span>
                        </p>
                      </div>
                      <button
                        onClick={() => deletePhoto(photo.id)}
                        disabled={deletingId === photo.id}
                        className="flex-shrink-0 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 h-fit"
                        title="Delete photo"
                      >
                        {deletingId === photo.id ? (
                          <RefreshCw className="w-5 h-5 animate-spin" />
                        ) : (
                          <Trash2 className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}