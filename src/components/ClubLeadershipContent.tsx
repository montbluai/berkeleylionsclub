import { useState, useEffect } from 'react';
import { Users, Edit2, Trash2, Plus, Save, X, CheckCircle, AlertCircle, Shield } from 'lucide-react';

interface LeadershipPosition {
  id: string;
  title: string;
  name: string;
  isEssential: boolean;
  order: number;
}

export function ClubLeadershipContent() {
  const [positions, setPositions] = useState<LeadershipPosition[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [addingNew, setAddingNew] = useState(false);
  const [newPosition, setNewPosition] = useState({ title: '', name: '' });
  const [uploadStatus, setUploadStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Essential positions that cannot be deleted
  const ESSENTIAL_POSITIONS = [
    'President',
    'Vice President',
    'Secretary',
    'Treasurer',
    'Membership Chairman',
    'Service Chair',
    'District 4-C3 District Governor',
  ];

  // Default leadership data
  const getDefaultPositions = (): LeadershipPosition[] => [
    { id: '1', title: 'President', name: 'Vivian Freeman', isEssential: true, order: 1 },
    { id: '2', title: 'Vice President', name: 'Joe Santini', isEssential: true, order: 2 },
    { id: '3', title: 'Secretary', name: 'Lion Jay Touriel', isEssential: true, order: 3 },
    { id: '4', title: 'Treasurer', name: 'Mark Fujikawa', isEssential: true, order: 4 },
    { id: '5', title: 'Membership Chairman', name: 'Vivian Freeman', isEssential: true, order: 5 },
    { id: '6', title: 'Service Chair', name: 'Karen Roze', isEssential: true, order: 6 },
    { id: '7', title: 'District 4-C3 District Governor', name: 'Darlene Ridle', isEssential: true, order: 7 },
  ];

  // Load positions from localStorage
  const loadPositions = () => {
    try {
      const stored = localStorage.getItem('club_leadership');
      if (stored) {
        const parsed = JSON.parse(stored);
        setPositions(parsed);
      } else {
        const defaultPositions = getDefaultPositions();
        setPositions(defaultPositions);
        localStorage.setItem('club_leadership', JSON.stringify(defaultPositions));
      }
    } catch (error) {
      console.error('Error loading positions:', error);
      setPositions(getDefaultPositions());
    }
  };

  // Save positions to localStorage
  const savePositions = (updatedPositions: LeadershipPosition[]) => {
    localStorage.setItem('club_leadership', JSON.stringify(updatedPositions));
    setPositions(updatedPositions);
  };

  // Start editing a position
  const startEdit = (position: LeadershipPosition) => {
    setEditingId(position.id);
    setEditName(position.name);
  };

  // Save edited name
  const saveEdit = (id: string) => {
    if (!editName.trim()) {
      setUploadStatus({
        type: 'error',
        message: 'Name cannot be empty.',
      });
      return;
    }

    const updated = positions.map(p =>
      p.id === id ? { ...p, name: editName.trim() } : p
    );
    savePositions(updated);
    setEditingId(null);
    setEditName('');
    
    setUploadStatus({
      type: 'success',
      message: 'Position updated successfully!',
    });
    
    setTimeout(() => {
      setUploadStatus({ type: null, message: '' });
    }, 3000);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
  };

  // Add new position
  const addPosition = () => {
    if (!newPosition.title.trim() || !newPosition.name.trim()) {
      setUploadStatus({
        type: 'error',
        message: 'Both position title and name are required.',
      });
      return;
    }

    const newPos: LeadershipPosition = {
      id: Date.now().toString(),
      title: newPosition.title.trim(),
      name: newPosition.name.trim(),
      isEssential: false,
      order: positions.length + 1,
    };

    const updated = [...positions, newPos];
    savePositions(updated);
    setAddingNew(false);
    setNewPosition({ title: '', name: '' });
    
    setUploadStatus({
      type: 'success',
      message: 'New position added successfully!',
    });
    
    setTimeout(() => {
      setUploadStatus({ type: null, message: '' });
    }, 3000);
  };

  // Delete position
  const deletePosition = (id: string) => {
    const position = positions.find(p => p.id === id);
    
    if (position?.isEssential) {
      setUploadStatus({
        type: 'error',
        message: 'Cannot delete essential positions.',
      });
      setTimeout(() => {
        setUploadStatus({ type: null, message: '' });
      }, 3000);
      return;
    }

    if (!confirm('Are you sure you want to delete this position?')) {
      return;
    }

    const updated = positions.filter(p => p.id !== id);
    savePositions(updated);
    
    setUploadStatus({
      type: 'success',
      message: 'Position deleted successfully!',
    });
    
    setTimeout(() => {
      setUploadStatus({ type: null, message: '' });
    }, 3000);
  };

  useEffect(() => {
    loadPositions();
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Status Messages */}
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

      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl mb-4" style={{ color: '#1740a5' }}>
          Manage Club Leadership
        </h2>
        <p className="text-gray-600 mb-4">
          Update officer names and manage leadership positions. Essential positions cannot be deleted.
        </p>
        
        {/* Info Box */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
          <Shield size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-blue-800">
              <strong>Essential Positions (Protected):</strong> President, Vice President, Secretary, Treasurer, Membership Chairman, Service Chair, and District 4-C3 District Governor cannot be deleted.
            </p>
          </div>
        </div>
      </div>

      {/* Leadership Positions */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div className="space-y-4">
          {positions.map((position) => (
            <div
              key={position.id}
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
            >
              {editingId === position.id ? (
                // Editing Mode
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold" style={{ color: '#1740a5' }}>
                        {position.title}
                      </h4>
                      {position.isEssential && (
                        <Shield size={16} className="text-blue-600" title="Essential Position" />
                      )}
                    </div>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter officer name"
                      autoFocus
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveEdit(position.id)}
                      className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                      title="Save"
                    >
                      <Save size={20} />
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                      title="Cancel"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              ) : (
                // Display Mode
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold" style={{ color: '#1740a5' }}>
                        {position.title}
                      </h4>
                      {position.isEssential && (
                        <Shield size={16} className="text-blue-600" title="Essential Position" />
                      )}
                    </div>
                    <p className="text-gray-700">{position.name}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(position)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="Edit Name"
                    >
                      <Edit2 size={20} />
                    </button>
                    {!position.isEssential && (
                      <button
                        onClick={() => deletePosition(position.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete Position"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Add New Position */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h3 className="text-xl mb-4" style={{ color: '#1740a5' }}>
          Add New Position
        </h3>
        
        {addingNew ? (
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-gray-700 font-semibold">
                Position Title *
              </label>
              <input
                type="text"
                value={newPosition.title}
                onChange={(e) => setNewPosition({ ...newPosition, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Assistant Secretary, Board Member"
              />
            </div>
            
            <div>
              <label className="block mb-2 text-gray-700 font-semibold">
                Officer Name *
              </label>
              <input
                type="text"
                value={newPosition.name}
                onChange={(e) => setNewPosition({ ...newPosition, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter officer name"
              />
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={addPosition}
                className="flex-1 text-white py-3 rounded-lg flex items-center justify-center gap-2"
                style={{ backgroundColor: '#1740a5' }}
              >
                <Save size={20} />
                Save Position
              </button>
              <button
                onClick={() => {
                  setAddingNew(false);
                  setNewPosition({ title: '', name: '' });
                }}
                className="flex-1 bg-gray-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-600 transition-colors"
              >
                <X size={20} />
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setAddingNew(true)}
            className="w-full text-white py-4 rounded-lg flex items-center justify-center gap-2"
            style={{ backgroundColor: '#1740a5' }}
          >
            <Plus size={20} />
            Add New Position
          </button>
        )}
      </div>
    </div>
  );
}
