async function detectSecurity() {
    const securityData = {
      https: location.protocol === 'https:',
      securityHeaders: {
        'Content-Security-Policy': false,
        'Strict-Transport-Security': false,
        'X-Content-Type-Options': false,
        'X-Frame-Options': false,
        'X-XSS-Protection': false,
        'Referrer-Policy': false,
        'Feature-Policy': false
      }
    };
  
    try {
      const response = await fetch(window.location.href);
      const headers = response.headers;
  
      for (const header in securityData.securityHeaders) {
        if (headers.get(header)) {
          securityData.securityHeaders[header] = true;
        }
      }
    } catch (e) {
      console.error("Security headers check failed:", e);
    }
  
    return securityData;
  }
  