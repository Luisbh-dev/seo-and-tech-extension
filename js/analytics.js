function detectAnalytics() {
  const analyticsData = {
      "Google Analytics": !!document.querySelector('script[src*="google-analytics.com/ga.js"], script[src*="google-analytics.com/analytics.js"]'),
      "Google Tag Manager": !!document.querySelector('script[src*="googletagmanager.com/gtm.js"], script[src*="googletagmanager.com/gtag/js"]'),
      "Matomo": !!document.querySelector('script[src*="matomo.js"]') || !!document.querySelector('script[src*="cdn.matomo.cloud"]'),
      "Adobe Tag Manager": !!document.querySelector('script[src*="assets.adobedtm.com"]')
  };
  return analyticsData;
}
