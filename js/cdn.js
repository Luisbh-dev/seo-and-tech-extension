function detectCDNs() {
    const cdnData = {
      "Cloudflare": !!document.querySelector('script[src*="cloudflare.com"]'),
      "Akamai": !!document.querySelector('script[src*="akamaized.net"]'),
      "Amazon CloudFront": !!document.querySelector('script[src*="cloudfront.net"]'),
      "Fastly": !!document.querySelector('script[src*="fastly.net"]'),
      "StackPath": !!document.querySelector('script[src*="stackpathdns.com"]'),
      "unpkg": !!document.querySelector('script[src*="unpkg.com"]'),
      "jsDelivr": !!document.querySelector('script[src*="cdn.jsdelivr.net"]'),
      "Other/Custom domain": !!document.querySelector('script[src*="cdn."]') || 
                             !!document.querySelector('script[src*="media."]') || 
                             !!document.querySelector('script[src*="assets."]') || 
                             !!document.querySelector('script[src*="content."]')
    };
    return cdnData;
  }
  