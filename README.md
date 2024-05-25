# SEO & Tech Analyzer

SEO & Tech Analyzer is a Chrome extension designed to provide a comprehensive analysis of the SEO and technology stack of any web page you visit. This tool helps web developers, SEO specialists, and digital marketers understand the structure, technologies, and optimization levels of websites.

## Features

- **SEO Analysis**:
  - Page Title and Meta Description
  - Title and Meta Description Length
  - Heading Tags (H1, H2, H3, H4, H5, H6)
  - Images without Alt Text
  - Internal and External Links
  - Presence of Robots.txt and Sitemap.xml
  - Word Count
  - Canonical Tag
  - Open Graph Tags
  - JSON-LD
  - OWL (Web Ontology Language)

- **Technology Detection**:
  - CMS: WordPress, PrestaShop, Adobe Experience Manager, Drupal, Joomla
  - Front-end Technologies: Angular, React, Vue.js, Next.js, Astro, jQuery

- **CDN Detection**:
  - Cloudflare
  - Akamai
  - Amazon CloudFront
  - Fastly
  - StackPath
  - unpkg
  - jsDelivr
  - Other/Custom domains

- **Analytics Detection**:
  - Google Analytics
  - Google Tag Manager
  - Matomo
  - Matomo Cloud
  - Adobe Tag Manager

- **Security Detection**:
  - HTTPS
  - Security Headers (e.g., Content-Security-Policy, X-Frame-Options, X-XSS-Protection, etc.)

## Installation

1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable "Developer mode" at the top right corner.
4. Click on "Load unpacked" and select the folder where you downloaded this repository.
5. The SEO & Tech Analyzer extension should now appear in your extensions list.

## Usage

1. Navigate to any web page you want to analyze.
2. Click on the SEO & Tech Analyzer extension icon in the Chrome toolbar.
3. The extension will display various tabs with detailed information about the web page's SEO metrics, technologies used, CDN providers, analytics tools, and security measures.

## Permissions Justification

- `activeTab`: This permission is required to access the currently active tab and analyze the web page content.
- `scripting`: This permission is necessary to execute scripts on the active tab to gather SEO and technology data.

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request for any enhancements, bug fixes, or new features.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please contact dev@luisbh.com.

---

Developed by Luis Blanco Hijazo
