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
    const rdfElement = document.querySelector('rdf\\:RDF');
    const rdfaElements = document.querySelectorAll('[typeof]');
    const owlFiles = Array.from(document.querySelectorAll('link[rel="alternate"][type="application/rdf+xml"], link[rel="alternate"][type="application/owl+xml"], script[type="application/ld+json"]'))
      .filter(link => link.href && link.href.endsWith('.owl'));
    const owlClasses = document.querySelectorAll('[typeof*="owl:"]');
    const owlProperties = document.querySelectorAll('[property*="owl:"]');
  
    return rdfElement !== null ||
           rdfaElements.length > 0 ||
           owlFiles.length > 0 ||
           owlClasses.length > 0 ||
           owlProperties.length > 0 ||
           document.querySelector('link[type="application/rdf+xml"], script[type="application/ld+json"][src*="owl"]') !== null ||
           document.querySelector('[typeof], [property], [resource]') !== null ||
           [...document.querySelectorAll('script, link')].some(el => /owl/i.test(el.src || el.href));
  }
  
  
  function generateSEORecommendations(seoData) {
    const recommendations = [];
  
    if (seoData.titleLength < 50 || seoData.titleLength > 60) {
      recommendations.push("The title should be between 50 and 60 characters long.");
    }
  
    if (seoData.metaDescriptionLength < 150 || seoData.metaDescriptionLength > 160) {
      recommendations.push("The meta description should be between 150 and 160 characters long.");
    }
  
    if (seoData.h1 === 0) {
      recommendations.push("Add at least one H1 tag.");
    }
  
    if (seoData.imagesWithoutAlt > 0) {
      recommendations.push(`Add alt tags to the ${seoData.imagesWithoutAlt} images that are missing them.`);
    }
  
    if (!seoData.sitemapXml) {
      recommendations.push("Consider adding a sitemap.xml file.");
    }
  
    if (!seoData.openGraph) {
      recommendations.push("Consider using Open Graph tags for better social media integration.");
    }
  
    if (!seoData.jsonLd) {
      recommendations.push("Consider using JSON-LD for structured data.");
    }
  
    return recommendations;
  }
  
  function calculateSEOScore(seoData) {
    let score = 0;
    if (seoData.titleLength >= 50 && seoData.titleLength <= 60) score += 15;
    if (seoData.metaDescriptionLength >= 150 && seoData.metaDescriptionLength <= 160) score += 15;
    if (seoData.h1 > 0) score += 15;
    if (seoData.imagesWithoutAlt === 0) score += 10;
    if (seoData.canonical) score += 10;
    if (seoData.sitemapXml) score += 10;
    if (seoData.openGraph) score += 5;
    if (seoData.jsonLd) score += 10;
    if (seoData.robotsTxt) score += 10;
    return score;
  }
  
  function createProgressBar(score) {
    return `<div class="progress-bar-container">
              <div class="progress-bar" style="width: ${score}%;"></div>
            </div>
            <div class="progress-score">${score}/100</div>`;
  }
  