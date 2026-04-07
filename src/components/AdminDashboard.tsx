import { useState } from 'react';
import { Calendar, Image as ImageIcon, LogOut, Star, Users } from 'lucide-react';
import { GalleryManagementContent } from './GalleryManagementContent';
import { EventManagementContent } from './EventManagementContent';
import { FeaturedEventForm } from './FeaturedEventForm';
import { ClubLeadershipContent } from './ClubLeadershipContent';
import { Button } from './ui/button';

type AdminTab = 'gallery' | 'events' | 'featured' | 'leadership';

export function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('leadership');

  // Password protection - matches existing admin pages
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

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    setActiveTab('leadership');
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 py-16">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <img src="https://i.imgur.com/M3Rdn46.png" alt="Berkeley Lions Club" className="h-20 w-20" />
              </div>
              <h1 className="text-3xl mb-2" style={{ color: '#1740a5' }}>
                Admin Dashboard
              </h1>
              <p className="text-gray-600">
                Enter password to manage gallery, events, and leadership
              </p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="mb-6">
                <label className="block mb-2 text-gray-700 font-semibold">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  autoFocus
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
                Login to Admin Dashboard
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
              <p>Board members only</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard with Tabs
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50">
      {/* Header with Tabs */}
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <img src="https://i.imgur.com/M3Rdn46.png" alt="Berkeley Lions Club" className="h-12 w-12" />
              <h1 className="text-2xl" style={{ color: '#1740a5' }}>
                Admin Dashboard
              </h1>
            </div>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="text-gray-600 hover:text-gray-900"
            >
              <LogOut size={20} className="mr-2" />
              Logout
            </Button>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 border-b border-gray-200">
            <button
              disabled
              className="px-6 py-3 font-semibold transition-all flex items-center gap-2 text-gray-400 cursor-not-allowed opacity-50"
            >
              <ImageIcon size={20} />
              Photo Gallery
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`px-6 py-3 font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'events'
                  ? 'border-b-2 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              style={activeTab === 'events' ? { borderColor: '#1740a5', color: '#1740a5' } : {}}
            >
              <Calendar size={20} />
              Calendar Events
            </button>
            <button
              disabled
              className="px-6 py-3 font-semibold transition-all flex items-center gap-2 text-gray-400 cursor-not-allowed opacity-50"
            >
              <Star size={20} />
              Featured Event
            </button>
            <button
              onClick={() => setActiveTab('leadership')}
              className={`px-6 py-3 font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'leadership'
                  ? 'border-b-2 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              style={activeTab === 'leadership' ? { borderColor: '#1740a5', color: '#1740a5' } : {}}
            >
              <Users size={20} />
              Club Leadership
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="py-8">
        {activeTab === 'events' ? (
          <AdminEventContent />
        ) : (
          <AdminLeadershipContent />
        )}
      </div>
    </div>
  );
}

// Wrapper components that strip away the login UI from the original components
function AdminGalleryContent() {
  return <GalleryManagementContent />;
}

function AdminEventContent() {
  return <EventManagementContent />;
}

function AdminFeaturedEventContent() {
  return <FeaturedEventForm />;
}

function AdminLeadershipContent() {
  return <ClubLeadershipContent />;
}