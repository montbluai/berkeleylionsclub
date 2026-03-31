import { FileJson, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

export function AdminEventUpload() {
  const goToDashboard = () => {
    window.location.hash = 'admin';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-100 p-6 rounded-full">
                <FileJson size={48} style={{ color: '#1740a5' }} />
              </div>
            </div>
            <h1 className="text-3xl mb-4" style={{ color: '#1740a5' }}>
              Event Management Has Moved
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Featured event management is now part of the unified Admin Dashboard 
              and uses a simpler JSON-based system.
            </p>
          </div>

          <div className="bg-blue-50 border-l-4 p-6 rounded mb-8" style={{ borderColor: '#1740a5' }}>
            <h3 className="font-semibold mb-3" style={{ color: '#1740a5' }}>
              What Changed?
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>✅ No more database errors in preview mode</li>
              <li>✅ Simpler form-based interface</li>
              <li>✅ Generate JSON files for easy deployment</li>
              <li>✅ All admin tools in one place</li>
            </ul>
          </div>

          <div className="text-center">
            <Button
              onClick={goToDashboard}
              className="text-white px-8 py-4 text-lg"
              style={{ backgroundColor: '#1740a5' }}
            >
              Go to Admin Dashboard
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              Password: <code className="bg-gray-100 px-2 py-1 rounded">berkeley2025</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
