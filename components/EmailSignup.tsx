import { Mail } from 'lucide-react';
import { GHLForm } from './GHLForm';

export function EmailSignup() {
  return (
    <section className="py-16" style={{ backgroundColor: '#1740a5' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white mb-6">
            <Mail size={32} style={{ color: '#1740a5' }} />
          </div>
          <h2 className="text-3xl md:text-4xl text-white mb-4">
            Stay Connected
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Get monthly updates on volunteer opportunities, events, and club news
          </p>
          
          {/* GHL Form Container - styled to match your design */}
          <div className="bg-white rounded-lg p-6 md:p-8">
            {/* GoHighLevel Newsletter Form */}
            <div style={{ minHeight: '400px' }}>
              <GHLForm
                formId="2OYFhNp8XUcECmuKQTrc"
                formName="Berkeley Lions Newsletter Sign Up"
                height={400}
              />
            </div>
            
            <p className="text-sm text-gray-600 mt-4">
              We respect <a href="/privacy" className="hover:underline" style={{ color: '#1740a5' }}>your privacy</a>. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
