document.addEventListener('DOMContentLoaded', () => {
	document.getElementById('openSEO').addEventListener('click', (event) => openTab(event, 'SEO'));
	document.getElementById('openTech').addEventListener('click', (event) => openTab(event, 'Tech'));
	document.getElementById('openCDN').addEventListener('click', (event) => openTab(event, 'CDN'));
	document.getElementById('openAnalytics').addEventListener('click', (event) => openTab(event, 'Analytics'));
	document.getElementById('openSecurity').addEventListener('click', (event) => openTab(event, 'Security'));
	document.getElementById('openSEO').click();
  
	chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
	  const tabId = tabs[0].id;
	  showLoading();
  
	  chrome.scripting.executeScript(
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
  
			const seoRecommendations = generateSEORecommendations(seoData);
			const seoScore = calculateSEOScore(seoData);
  
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
  
			const recommendationContainer = document.getElementById('seoRecommendations');
			recommendationContainer.innerHTML = '<h2>SEO Recommendations</h2>';
			seoRecommendations.forEach(rec => {
			  recommendationContainer.innerHTML += `<div class="recommendation-item">${rec}</div>`;
			});
  
			const seoScoreContainer = document.getElementById('seoScore');
			seoScoreContainer.innerHTML = '<h2>SEO Score</h2>' + createProgressBar(seoScore);
		  }
		  hideLoading();
		}
	  );
  
	  chrome.scripting.executeScript(
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
			resultContainer.innerHTML += '<h3>Content Management Systems (CMS)</h3>';
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
			resultContainer.innerHTML += '<h3>Front-end Technologies</h3>';
			const frontEndOrder = ["Angular", "React", "Vue.js", "Next.js", "Astro", "jQuery"];
			frontEndOrder.forEach(tech => {
			  if (techData.hasOwnProperty(tech)) {
				const div = document.createElement('div');
				div.className = 'result-item';
				div.innerHTML = `<strong>${tech}:</strong> ${getIcon(techData[tech])}`;
				resultContainer.appendChild(div);
			  }
			});
  
			// CSS Frameworks
			resultContainer.innerHTML += '<h3>CSS Frameworks</h3>';
			const cssFrameworks = ["Bootstrap", "Foundation", "Bulma", "Tailwind CSS"];
			cssFrameworks.forEach(tech => {
			  if (techData.hasOwnProperty(tech)) {
				const div = document.createElement('div');
				div.className = 'result-item';
				div.innerHTML = `<strong>${tech}:</strong> ${getIcon(techData[tech])}`;
				resultContainer.appendChild(div);
			  }
			});
  
			// JavaScript Libraries
			resultContainer.innerHTML += '<h3>JavaScript Libraries</h3>';
			const jsLibraries = ["Lodash", "D3.js", "Chart.js", "Three.js", "Moment.js"];
			jsLibraries.forEach(tech => {
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
  
	  chrome.scripting.executeScript(
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
  
	  chrome.scripting.executeScript(
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
  
	  chrome.scripting.executeScript(
		{
		  target: { tabId: tabId },
		  function: detectSecurity
		},
		(results) => {
		  if (results && results[0] && results[0].result) {
			const securityData = results[0].result;
			const resultContainer = document.getElementById('securityResults');
			resultContainer.innerHTML = '';
  
			resultContainer.innerHTML += `<div class="result-item"><strong>HTTPS:</strong> ${getIcon(securityData.https)}</div>`;
  
			for (const header in securityData.securityHeaders) {
			  resultContainer.innerHTML += `<div class="result-item"><strong>${header}:</strong> ${getIcon(securityData.securityHeaders[header])}</div>`;
			}
		  }
		  hideLoading();
		}
	  );
	});
  });
  
  function showLoading() {
	document.getElementById('loading').style.display = 'flex';
  }
  
  function hideLoading() {
	document.getElementById('loading').style.display = 'none';
  }
  
  function openTab(evt, tabName) {
	const tabcontent = document.getElementsByClassName('tabcontent');
	for (let i = 0; i < tabcontent.length; i++) {
	  tabcontent[i].classList.remove('active');
	}
	const tablinks = document.getElementsByClassName('tablinks');
	for (let i = 0; i < tablinks.length; i++) {
	  tablinks[i].classList.remove('active');
	}
	document.getElementById(tabName).classList.add('active');
	evt.currentTarget.classList.add('active');
  }
  
  function getIcon(value) {
	if (value) {
	  return '<span class="tick">&#10003;</span>';  // HTML entity for tick
	} else {
	  return '<span class="cross">&#10007;</span>';  // HTML entity for cross
	}
  }
  