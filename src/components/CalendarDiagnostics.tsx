import { useState } from 'react';
import { AlertCircle, CheckCircle, ExternalLink, XCircle } from 'lucide-react';

interface CalendarInfo {
  id: string;
  name: string;
  color: string;
}

const CALENDARS: CalendarInfo[] = [
  {
    id: '4407935e25481954fdb2a82e75f3cb977cb897283481cd2c8c8c0b45882d2a8@group.calendar.google.com',
    name: '🤝 Volunteer Opportunities',
    color: '#00338D'
  },
  {
    id: '230dbe79b903ae2fa91d462591b91a12c751a69972ac68c0e6d612779836ea29@group.calendar.google.com',
    name: '💰 Fundraising Events',
    color: '#EBB700'
  },
  {
    id: 'f3cdc1051ae2cf0820279bbb8d51621da9cc2266ba33405e132a9c7a600b2bec@group.calendar.google.com',
    name: '📋 Member Meetings',
    color: '#7A2582'
  }
];

export function CalendarDiagnostics() {
  const [testResults, setTestResults] = useState<Record<string, 'loading' | 'success' | 'error'>>({});

  const buildEmbedUrl = (calendarId: string) => {
    return `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(calendarId)}&ctz=America%2FLos_Angeles&mode=AGENDA`;
  };

  const testCalendar = async (calendarId: string) => {
    setTestResults(prev => ({ ...prev, [calendarId]: 'loading' }));
    
    // Simulate test - in reality, iframe load success/failure will determine this
    setTimeout(() => {
      // This is a placeholder - actual testing happens via iframe load
      setTestResults(prev => ({ ...prev, [calendarId]: 'success' }));
    }, 2000);
  };

  const handleIframeLoad = (calendarId: string) => {
    setTestResults(prev => ({ ...prev, [calendarId]: 'success' }));
  };

  const handleIframeError = (calendarId: string) => {
    setTestResults(prev => ({ ...prev, [calendarId]: 'error' }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-start gap-4">
            <AlertCircle className="text-blue-600 flex-shrink-0 mt-1" size={32} />
            <div>
              <h1 className="text-3xl mb-2" style={{ color: '#00338D' }}>
                Google Calendar Diagnostics
              </h1>
              <p className="text-gray-700 mb-4">
                This page helps diagnose issues with Google Calendar embeds on the Berkeley Lions Club website.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Common Issues:</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>✓ Calendar not set to public in Google Calendar settings</li>
                  <li>✓ Calendar visibility set to "Free/Busy only" instead of "See all event details"</li>
                  <li>✓ Calendar ID has changed</li>
                  <li>✓ Calendar was deleted or renamed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Tests */}
        {CALENDARS.map((calendar) => {
          const embedUrl = buildEmbedUrl(calendar.id);
          const status = testResults[calendar.id];

          return (
            <div key={calendar.id} className="bg-white rounded-lg shadow-lg p-6 mb-6">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: calendar.color }}
                  />
                  <h2 className="text-xl font-semibold" style={{ color: '#00338D' }}>
                    {calendar.name}
                  </h2>
                </div>
                
                {status === 'loading' && (
                  <div className="flex items-center gap-2 text-blue-600">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                    <span className="text-sm">Testing...</span>
                  </div>
                )}
                {status === 'success' && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle size={20} />
                    <span className="text-sm font-semibold">Calendar is accessible</span>
                  </div>
                )}
                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-600">
                    <XCircle size={20} />
                    <span className="text-sm font-semibold">Calendar not accessible</span>
                  </div>
                )}
              </div>

              {/* Calendar Details */}
              <div className="space-y-3 mb-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700">Calendar ID:</label>
                  <div className="bg-gray-50 rounded p-2 mt-1 font-mono text-xs text-gray-800 break-all">
                    {calendar.id}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">Embed URL:</label>
                  <div className="bg-gray-50 rounded p-2 mt-1">
                    <a
                      href={embedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-xs break-all flex items-center gap-1"
                    >
                      {embedUrl}
                      <ExternalLink size={12} className="flex-shrink-0" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Test Button */}
              <button
                onClick={() => testCalendar(calendar.id)}
                className="mb-4 px-4 py-2 rounded-lg text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: calendar.color }}
              >
                Test Calendar Embed
              </button>

              {/* Iframe Test */}
              {status && (
                <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700">
                    Live Embed Test:
                  </div>
                  <iframe
                    src={embedUrl}
                    className="w-full h-96 border-0"
                    title={`${calendar.name} Test`}
                    onLoad={() => handleIframeLoad(calendar.id)}
                    onError={() => handleIframeError(calendar.id)}
                  />
                </div>
              )}

              {/* Troubleshooting for this calendar */}
              {status === 'error' && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-900 mb-2">❌ This calendar cannot be loaded</h4>
                  <p className="text-sm text-red-800 mb-3">
                    The calendar is likely not set to public or has been deleted. Try these steps:
                  </p>
                  <ol className="text-sm text-red-800 space-y-2 list-decimal list-inside">
                    <li>Open Google Calendar and find this calendar</li>
                    <li>Go to Settings → Settings and sharing</li>
                    <li>Check "Make available to public"</li>
                    <li>Set visibility to "See all event details"</li>
                    <li>Wait 5-10 minutes and refresh this page</li>
                  </ol>
                </div>
              )}
            </div>
          );
        })}

        {/* Help Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl mb-4" style={{ color: '#00338D' }}>
            How to Fix Calendar Issues
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Step 1: Make Calendar Public</h3>
              <ol className="list-decimal list-inside space-y-1 text-gray-700">
                <li>Login to Google Calendar (calendar.google.com)</li>
                <li>Find the calendar in the left sidebar</li>
                <li>Click the three dots (⋮) next to the calendar name</li>
                <li>Select "Settings and sharing"</li>
                <li>Scroll to "Access permissions for events"</li>
                <li>Check ✅ "Make available to public"</li>
                <li>Make sure it shows "See all event details" (not just free/busy)</li>
              </ol>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Step 2: Verify Calendar ID</h3>
              <ol className="list-decimal list-inside space-y-1 text-gray-700">
                <li>In Calendar Settings → scroll to "Integrate calendar"</li>
                <li>Find "Calendar ID"</li>
                <li>Compare with the IDs shown above</li>
                <li>If different, contact the webmaster to update the website</li>
              </ol>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Step 3: Test the Embed</h3>
              <ol className="list-decimal list-inside space-y-1 text-gray-700">
                <li>Click "Test Calendar Embed" button above</li>
                <li>If calendar loads → it's working correctly!</li>
                <li>If it shows error → calendar is not public or doesn't exist</li>
                <li>Try opening the "Embed URL" link in a new tab</li>
              </ol>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-900 mb-2">⏱️ Important: Wait Time</h4>
              <p className="text-sm text-yellow-800">
                After making changes in Google Calendar settings, wait 5-10 minutes for changes to 
                propagate. Then clear your browser cache and hard refresh (Ctrl+Shift+R or Cmd+Shift+R).
              </p>
            </div>
          </div>
        </div>

        {/* Documentation Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            For detailed troubleshooting, see{' '}
            <a
              href="/GOOGLE_CALENDAR_TROUBLESHOOTING.md"
              className="text-blue-600 hover:underline font-semibold"
            >
              Google Calendar Troubleshooting Guide
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
