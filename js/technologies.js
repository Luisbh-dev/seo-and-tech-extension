function detectTechnologies() {
  const techData = {
    // CMS
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

    // Front-end Technologies
    "Angular": !!document.querySelector('[ng-version]'),
    "React": !!document.querySelector('[data-reactroot], [data-reactid]'),
    "Vue.js": !!document.querySelector('[data-vue-root], [data-vue-version]'),
    "Next.js": !!document.querySelector('script[src*="_next/static"]'),
    "Astro": !!document.querySelector('astro-island') || !!document.querySelector('script[src*="astro/client"]') || 
             !!document.querySelector('[data-astro]') || 
             !!Array.from(document.querySelectorAll('*')).some(el => Array.from(el.attributes).some(attr => attr.name.startsWith('data-astro'))),
    "jQuery": !!window.jQuery || !!document.querySelector('script[src*="jquery.js"]') || 
              !!document.querySelector('script[src*="jquery-migrate"]') || 
              !!document.querySelector('script[src*="jquery"]'),

    // CSS Frameworks
    "Bootstrap": !!document.querySelector('link[href*="bootstrap"]') || !!document.querySelector('script[src*="bootstrap"]'),
    "Foundation": !!document.querySelector('link[href*="foundation"]'),
    "Bulma": !!document.querySelector('link[href*="bulma"]'),
    "Tailwind CSS": !!document.querySelector('link[href*="tailwind"]'),

    // JavaScript Libraries
    "Lodash": !!document.querySelector('script[src*="lodash"]'),
    "D3.js": !!document.querySelector('script[src*="d3"]'),
    "Chart.js": !!document.querySelector('script[src*="chart"]'),
    "Three.js": !!document.querySelector('script[src*="three"]'),
    "Moment.js": !!document.querySelector('script[src*="moment"]')
  };

  return techData;
}
