document.addEventListener('DOMContentLoaded', () => {
	document.getElementById('openSEO').addEventListener('click', (event) => openTab(event, 'SEO'));
	document.getElementById('openTech').addEventListener('click', (event) => openTab(event, 'Tech'));
	document.getElementById('openCDN').addEventListener('click', (event) => openTab(event, 'CDN'));
	document.getElementById('openAnalytics').addEventListener('click', (event) => openTab(event, 'Analytics'));
	document.getElementById('openSEO').click();
  
	chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
	  const tabId = tabs[0].id;
	  showLoading();
  
	  await chrome.scripting.executeScript(
		{
		  target: { tabId: tabId },
		  function: extractSEOData
		},
		async (results) => {
		  if (results && results[0] && results[0].result) {
			const seoData = results[0].result;
  
			seoData.robotsTxt = await checkFileExistence(tabs[0].url, '/robots.txt');
			seoData.sitemapXml = await checkFileExistence(tabs[0].url, '/sitemap.xml');
			seoData.owl = await checkOWL();
  
			const resultContainer = document.getElementById('seoResults');
			resultContainer.innerHTML = '';
			resultContainer.innerHTML += `<div class="result-item"><strong>Page Title:</strong> ${seoData.title}</div>`;
			resultContainer.innerHTML += `<div class="result-item"><strong>Meta Description:</strong> ${seoData.metaDescription}</div>`;
			resultContainer.innerHTML += `<div class="result-item"><strong>Title Length:</strong> ${seoData.titleLength}</div>`;
			resultContainer.innerHTML += `<div class="result-item"><strong>Meta Description Length:</strong> ${seoData.metaDescriptionLength}</div>`;
			resultContainer.innerHTML += `<div class="result-item"><strong>H1 Tags:</strong> ${seoData.h1}</div>`;
			resultContainer.innerHTML += `<div class="result-item"><strong>H2 Tags:</strong> ${seoData.h2}</div>`;
			resultContainer.innerHTML += `<div class="result-item"><strong>H3 Tags:</strong> ${seoData.h3}</div>`;
			resultContainer.innerHTML += `<div class="result-item"><strong>H4 Tags:</strong> ${seoData.h4}</div>`;
			resultContainer.innerHTML += `<div class="result-item"><strong>H5 Tags:</strong> ${seoData.h5}</div>`;
			resultContainer.innerHTML += `<div class="result-item"><strong>H6 Tags:</strong> ${seoData.h6}</div>`;
			resultContainer.innerHTML += `<div class="result-item"><strong>Images without Alt:</strong> ${seoData.imagesWithoutAlt}</div>`;
			resultContainer.innerHTML += `<div class="result-item"><strong>Internal Links:</strong> ${seoData.internalLinks}</div>`;
			resultContainer.innerHTML += `<div class="result-item"><strong>External Links:</strong> ${seoData.externalLinks}</div>`;
			resultContainer.innerHTML += `<div class="result-item"><strong>Robots.txt:</strong> ${getIcon(seoData.robotsTxt)}</div>`;
			resultContainer.innerHTML += `<div class="result-item"><strong>Sitemap.xml:</strong> ${getIcon(seoData.sitemapXml)}</div>`;
			resultContainer.innerHTML += `<div class="result-item"><strong>Word Count:</strong> ${seoData.wordCount}</div>`;
			resultContainer.innerHTML += `<div class="result-item"><strong>Canonical Tag:</strong> ${getIcon(seoData.canonical)}</div>`;
			resultContainer.innerHTML += `<div class="result-item"><strong>Open Graph Tags:</strong> ${getIcon(seoData.openGraph)}</div>`;
			resultContainer.innerHTML += `<div class="result-item"><strong>JSON-LD:</strong> ${getIcon(seoData.jsonLd)}</div>`;
			resultContainer.innerHTML += `<div class="result-item"><strong>OWL (Web Ontology Language):</strong> ${getIcon(seoData.owl)}</div>`;
		  }
		  hideLoading();
		}
	  );
  
	  await chrome.scripting.executeScript(
		{
		  target: { tabId: tabId },
		  function: detectTechnologies
		},
		(results) => {
		  if (results && results[0] && results[0].result) {
			const techData = results[0].result;
			const resultContainer = document.getElementById('techResults');
			resultContainer.innerHTML = '';
  
			// CMS
			const cmsOrder = ["WordPress", "PrestaShop", "Adobe Experience Manager", "Drupal", "Joomla"];
			cmsOrder.forEach(tech => {
			  if (techData.hasOwnProperty(tech)) {
				const div = document.createElement('div');
				div.className = 'result-item';
				div.innerHTML = `<strong>${tech}:</strong> ${getIcon(techData[tech])}`;
				resultContainer.appendChild(div);
			  }
			});
  
			// Front-end Technologies
			const frontEndOrder = ["Angular", "React", "Vue.js", "Next.js", "Astro", "jQuery"];
			frontEndOrder.forEach(tech => {
			  if (techData.hasOwnProperty(tech)) {
				const div = document.createElement('div');
				div.className = 'result-item';
				div.innerHTML = `<strong>${tech}:</strong> ${getIcon(techData[tech])}`;
				resultContainer.appendChild(div);
			  }
			});
		  }
		  hideLoading();
		}
	  );
  
	  await chrome.scripting.executeScript(
		{
		  target: { tabId: tabId },
		  function: detectCDNs
		},
		(results) => {
		  if (results && results[0] && results[0].result) {
			const cdnData = results[0].result;
			const resultContainer = document.getElementById('cdnResults');
			resultContainer.innerHTML = '';
  
			const cdnOrder = ["Cloudflare", "Akamai", "Amazon CloudFront", "Fastly", "StackPath", "unpkg", "jsDelivr", "Other/Custom domain"];
			cdnOrder.forEach(cdn => {
			  if (cdnData.hasOwnProperty(cdn)) {
				const div = document.createElement('div');
				div.className = 'result-item';
				div.innerHTML = `<strong>${cdn}:</strong> ${getIcon(cdnData[cdn])}`;
				resultContainer.appendChild(div);
			  }
			});
		  }
		  hideLoading();
		}
	  );
  
	  await chrome.scripting.executeScript(
		{
		  target: { tabId: tabId },
		  function: detectAnalytics
		},
		(results) => {
		  if (results && results[0] && results[0].result) {
			const analyticsData = results[0].result;
			const resultContainer = document.getElementById('analyticsResults');
			resultContainer.innerHTML = '';
  
			const analyticsOrder = ["Google Analytics", "Google Tag Manager", "Matomo", "Matomo Cloud", "Adobe Tag Manager"];
			analyticsOrder.forEach(analytics => {
			  if (analyticsData.hasOwnProperty(analytics)) {
				const div = document.createElement('div');
				div.className = 'result-item';
				div.innerHTML = `<strong>${analytics}:</strong> ${getIcon(analyticsData[analytics])}`;
				resultContainer.appendChild(div);
			  }
			});
		  }
		  hideLoading();
		}
	  );
	});
  });
  
  function openTab(evt, tabName) {
	const tabcontent = document.getElementsByClassName('tabcontent');
	for (let i = 0; i < tabcontent.length; i++) {
	  tabcontent[i].style.display = 'none';
	}
	const tablinks = document.getElementsByClassName('tablinks');
	for (let i = 0; i < tablinks.length; i++) {
	  tablinks[i].className = tablinks[i].className.replace(' active', '');
	}
	document.getElementById(tabName).style.display = 'block';
	evt.currentTarget.className += ' active';
  }
  
  function extractSEOData() {
	const seoData = {
	  title: document.title,
	  metaDescription: document.querySelector('meta[name="description"]')?.content || 'No meta description',
	  h1: document.querySelectorAll('h1').length,
	  h2: document.querySelectorAll('h2').length,
	  h3: document.querySelectorAll('h3').length,
	  h4: document.querySelectorAll('h4').length,
	  h5: document.querySelectorAll('h5').length,
	  h6: document.querySelectorAll('h6').length,
	  imagesWithoutAlt: [...document.querySelectorAll('img')].filter(img => !img.alt).length,
	  internalLinks: [...document.querySelectorAll('a')].filter(a => a.href.includes(window.location.hostname)).length,
	  externalLinks: [...document.querySelectorAll('a')].filter(a => !a.href.includes(window.location.hostname)).length,
	  titleLength: document.title.length,
	  metaDescriptionLength: document.querySelector('meta[name="description"]')?.content.length || 0,
	  robotsTxt: false, // Valor por defecto, se actualizará después
	  sitemapXml: false, // Valor por defecto, se actualizará después
	  wordCount: document.body.innerText.split(/\s+/).length,
	  canonical: document.querySelector('link[rel="canonical"]') !== null,
	  openGraph: document.querySelector('meta[property^="og:"]') !== null,
	  jsonLd: document.querySelector('script[type="application/ld+json"]') !== null,
	  owl: false // Valor por defecto, se actualizará después
	};
	return seoData;
  }
  
  async function checkFileExistence(baseUrl, filePath) {
	const url = new URL(filePath, baseUrl);
	try {
	  const response = await fetch(url.href, { method: 'HEAD' });
	  return response.ok;
	} catch (error) {
	  return false;
	}
  }
  
  async function checkOWL() {
	return document.querySelector('link[type="application/rdf+xml"], script[type="application/ld+json"][src*="owl"]') !== null ||
		   document.querySelector('[typeof], [property], [resource]') !== null ||
		   [...document.querySelectorAll('script, link')].some(el => /owl/i.test(el.src || el.href));
  }
  
  function detectTechnologies() {
	const techData = {
	  "WordPress": !!document.querySelector('meta[name="generator"][content*="WordPress"]') ||
					!!document.querySelector('link[href*="/wp-content"]') ||
					!!document.querySelector('link[href*="/wp-includes"]') ||
					!!document.querySelector('script[src*="/wp-content"]') ||
					!!document.querySelector('script[src*="/wp-includes"]'),
	  "PrestaShop": !!document.querySelector('meta[name="generator"][content*="PrestaShop"]') ||
					!!document.querySelector('link[rel="stylesheet"][href*="prestashop"]') ||
					!!document.querySelector('script[src*="prestashop"]') ||
					!!document.querySelector('body[data-controller*="ps_"]') ||
					!!document.querySelector('div#prestashop') ||
					!!document.querySelector('meta[content*="PrestaShop"]'),
	  "Adobe Experience Manager": !!document.querySelector('meta[name="generator"][content*="AEM"]'),
	  "Drupal": !!document.querySelector('meta[name="Generator"][content*="Drupal"]') || 
				!!document.querySelector('script[src*="/misc/drupal.js"]'),
	  "Joomla": !!document.querySelector('meta[name="generator"][content*="Joomla"]') || 
				!!document.querySelector('link[href*="/templates/joomla"]') || 
				!!document.querySelector('script[src*="media/system/js/core.js"]'),
	  "Angular": !!document.querySelector('[ng-version]'),
	  "React": !!document.querySelector('[data-reactroot], [data-reactid]'),
	  "Vue.js": !!document.querySelector('[data-vue-root], [data-vue-version]'),
	  "Next.js": !!document.querySelector('script[src*="_next/static"]'),
	  "Astro": !!document.querySelector('astro-island') || !!document.querySelector('script[src*="astro/client"]'),
	  "jQuery": !!window.jQuery
	};
	return techData;
  }
  
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
  
  function detectAnalytics() {
	const analyticsData = {
	  "Google Analytics": !!document.querySelector('script[src*="google-analytics.com/ga.js"], script[src*="google-analytics.com/analytics.js"]'),
	  "Google Tag Manager": !!document.querySelector('script[src*="googletagmanager.com/gtm.js"]'),
	  "Matomo": !!document.querySelector('script[src*="matomo.js"]') || !!document.querySelector('script[src*="cdn.matomo.cloud"]'),
	  "Adobe Tag Manager": !!document.querySelector('script[src*="assets.adobedtm.com"]')
	};
	return analyticsData;
  }
  
  function getIcon(value) {
	if (value) {
	  return '<span class="tick">&#10003;</span>';  // HTML entity for tick
	} else {
	  return '<span class="cross">&#10007;</span>';  // HTML entity for cross
	}
  }
  
  function showLoading() {
	document.getElementById('loading').style.display = 'flex';
  }
  
  function hideLoading() {
	document.getElementById('loading').style.display = 'none';
  }
  