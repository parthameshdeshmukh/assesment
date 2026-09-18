/* ==========================================================================
   ClassIQ Google Analytics 4 (GA4) & Google Tag Manager (GTM) Tracker
   Handles dynamic event tracking for page views, user auth, course enrollments,
   and newsletter subscriptions.
   ========================================================================== */

const GA_MEASUREMENT_ID = 'G-CLASS1Q2024';

// Initialize Google Analytics gtag script dynamically
(function initGA() {
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: true
  });

  console.log(`[Google Analytics] Initialized GA4 with ID: ${GA_MEASUREMENT_ID}`);
})();

/**
 * Custom Event Tracker Helper
 * @param {string} eventName - Name of the custom analytics event
 * @param {object} eventParams - Payload parameters (e.g. course_id, auth_type)
 */
function trackAnalyticsEvent(eventName, eventParams = {}) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, {
      timestamp: new Date().toISOString(),
      ...eventParams
    });
    console.log(`[Google Analytics Event]: ${eventName}`, eventParams);
  }
}
