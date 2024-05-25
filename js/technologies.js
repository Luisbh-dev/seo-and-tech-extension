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
  