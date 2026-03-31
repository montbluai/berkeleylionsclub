export function TermsOfUse() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl mb-4" style={{ color: '#1740a5' }}>
              Terms of <span style={{ color: '#f2ca47' }}>Use</span>
            </h1>
            <p className="text-gray-600">Last Updated: December 28, 2025</p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {/* LCI Terms of Use Notice */}
            <div className="bg-blue-50 border-l-4 rounded-lg p-6 mb-8" style={{ borderColor: '#1740a5' }}>
              <h2 className="mt-0" style={{ color: '#1740a5' }}>Lions Clubs International Terms of Use</h2>
              <p className="text-gray-700 mb-4">
                Berkeley Lions Club is a chartered member of Lions Clubs International (LCI). We follow the terms of use established by our parent organization to ensure consistent standards and practices across the global Lions network.
              </p>
              <a
                href="https://www.lionsclubs.org/en/footer/terms-of-use"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white transition-all hover:opacity-90"
                style={{ backgroundColor: '#1740a5' }}
              >
                <span>View Lions Clubs International Terms of Use</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
