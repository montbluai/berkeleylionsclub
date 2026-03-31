import { FileJson, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

export function EventManagementContent() {
  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-3" style={{ color: '#1740a5' }}>
            <FileJson size={32} />
            Calendar Event Management
          </CardTitle>
          <CardDescription>
            Manage your calendar events and featured volunteer events
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-white border rounded-lg p-6">
            <h4 className="font-semibold mb-4" style={{ color: '#1740a5' }}>
              How to Manage Events:
            </h4>
            
            <div className="space-y-4">
              <div>
                <h5 className="font-medium mb-2">📅 Calendar Events</h5>
                <p className="text-gray-700 text-sm">
                  All volunteer and fundraising events appear on the calendar automatically from 
                  your Google Calendar integration via GoHighLevel. No action needed here. 
                  To modify the Google Calendar, simply log into Google Calendar and update the calendar events.
                </p>
              </div>

              <div>
                <h5 className="font-medium mb-2">⭐ Featured Volunteer Event</h5>
                <p className="text-gray-700 text-sm mb-2">
                  To feature a specific event at the top of the Volunteer page:
                </p>
                <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1 ml-2">
                  <li>Click the <strong>"Featured Event"</strong> tab at the top</li>
                  <li>Fill out the event form and upload the event flyer</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="text-center py-8">
            <p className="text-gray-600 text-sm">
              This simplified system makes event management seamless for board members.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}