import { Mail } from 'lucide-react';

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
              <iframe
                src="https://links.montbluai.com/widget/form/2OYFhNp8XUcECmuKQTrc"
                style={{ width: '100%', height: '400px', border: 'none', borderRadius: '3px' }}
                id="inline-2OYFhNp8XUcECmuKQTrc" 
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="Berkeley Lions Newsletter Sign Up"
                data-height="undefined"
                data-layout-iframe-id="inline-2OYFhNp8XUcECmuKQTrc"
                data-form-id="2OYFhNp8XUcECmuKQTrc"
                title="Berkeley Lions Newsletter Sign Up"
              >
              </iframe>
              <script src="https://links.montbluai.com/js/form_embed.js"></script>
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