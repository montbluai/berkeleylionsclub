import { useState, FormEvent } from 'react';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';

export function BecomeLionForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // TODO: Replace with your GoHighLevel webhook URL
      // Get your webhook URL from GHL: Settings > Integrations > Webhooks
      const GHL_WEBHOOK_URL = 'YOUR_GHL_WEBHOOK_URL_HERE';

      const response = await fetch(GHL_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Map your form data to GHL fields
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          // You can add custom fields as needed
          customField: formData.message,
          // Add any additional GHL-specific fields here
          source: 'Website - Become a Lion Form',
          tags: ['Website Lead', 'Membership Interest']
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl mb-4" style={{ color: '#1740a5' }}>
              Become a <span style={{ color: '#f2ca47' }}>Lion</span> Today
            </h2>
            <p className="text-lg text-gray-700">
              Ready to make a difference? Fill out the form below and we'll get in touch with you about membership opportunities.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-8 shadow-md">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="firstName" className="block mb-2 text-gray-700">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                  style={{ focusRing: '#1740a5' }}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block mb-2 text-gray-700">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                  style={{ focusRing: '#1740a5' }}
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-gray-700">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{ focusRing: '#1740a5' }}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="phone" className="block mb-2 text-gray-700">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{ focusRing: '#1740a5' }}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block mb-2 text-gray-700">
                Tell us why you're interested in joining (Optional)
              </label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 resize-none"
                style={{ focusRing: '#1740a5' }}
                placeholder="Share what motivates you to become a Lion..."
              />
            </div>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 rounded-md bg-green-50 border border-green-200">
                <p className="text-green-800">
                  Thank you for your interest! We'll be in touch soon.
                </p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 rounded-md bg-red-50 border border-red-200">
                <p className="text-red-800">
                  Something went wrong. Please try again or contact us directly.
                </p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full text-white py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#1740a5' }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="inline-block mr-2 animate-spin" size={20} />
                  Submitting...
                </>
              ) : (
                'Submit Interest'
              )}
            </Button>

            <p className="text-sm text-gray-600 mt-4 text-center">
              Membership fee: $30 entrance + $120/year
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
