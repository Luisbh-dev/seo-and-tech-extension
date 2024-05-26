function detectCDNs() {
	const patterns = [
	  { name: "Cloudflare", pattern: /cloudflare\.com/ },
	  { name: "Akamai", pattern: /akamaized\.net/ },
	  { name: "Amazon CloudFront", pattern: /cloudfront\.net/ },
	  { name: "Fastly", pattern: /fastly\.net/ },
	  { name: "StackPath", pattern: /stackpathdns\.com/ },
	  { name: "unpkg", pattern: /unpkg\.com/ },
	  { name: "jsDelivr", pattern: /cdn\.jsdelivr\.net/ },
	  { name: "Other/Custom domain", pattern: /cdn\d*\..*|media\d*\..*|assets\d*\..*|content\d*\..*/ }
	];
  
	const cdnData = {};
	
	patterns.forEach(cdn => {
	  cdnData[cdn.name] = !!Array.from(document.querySelectorAll('script[src], link[href]')).find(el => cdn.pattern.test(el.src || el.href));
	});
  
	return cdnData;
  }
  