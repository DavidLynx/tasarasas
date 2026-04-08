document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY = 'tasara-language';
  const pageName = (() => {
    const raw = window.location.pathname.split('/').pop();
    return raw && raw.length ? raw : 'index.html';
  })();

  const originalNodes = new WeakMap();
  const originalHead = {
    title: document.title,
    lang: document.documentElement.lang,
    description: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
    ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute('content') || '',
    ogDescription: document.querySelector('meta[property="og:description"]')?.getAttribute('content') || '',
    ogLocale: document.querySelector('meta[property="og:locale"]')?.getAttribute('content') || '',
    twitterTitle: document.querySelector('meta[name="twitter:title"]')?.getAttribute('content') || '',
    twitterDescription: document.querySelector('meta[name="twitter:description"]')?.getAttribute('content') || ''
  };

  const pageTranslations = {
    'index.html': {
      head: {
        title: 'TASARA | Colombian specialty coffee with origin and purpose',
        description: 'TASARA brings together Colombian specialty coffee, origin in Risaralda and Caldas, social impact, and solutions for customers, partners, and businesses.',
        ogTitle: 'TASARA | Colombian specialty coffee with origin and purpose',
        ogDescription: 'Colombian specialty coffee, traceability, social impact, and solutions for customers and businesses from Risaralda and Caldas.',
        ogLocale: 'en_US',
        twitterTitle: 'TASARA | Colombian specialty coffee with origin and purpose',
        twitterDescription: 'We connect origin, quality, and social impact through Cafe Leonor and coffee-based solutions.'
      },
      rules: [
        { selector: '.nav-links a[href="#inicio"], .nav-mobile a[href="#inicio"], .footer-links a[href="#inicio"]', text: 'Home' },
        { selector: '.nav-links a[href="#impacto"], .nav-mobile a[href="#impacto"]', text: 'Impact' },
        { selector: '.nav-links a[href="#contacto"], .nav-mobile a[href="#contacto"], .footer-links a[href="#contacto"]', text: 'Contact' },
        { selector: '.nav-cta', text: 'Shop' },
        { selector: '#heroBadge', text: 'Colombia · Specialty coffee · Origin with purpose' },
        { selector: '#heroTitle', html: 'Colombian coffee<br><em>for moments that truly matter.</em>' },
        { selector: '#heroSubtitle', text: 'TASARA was born from the meeting of people, places, and a more conscious way of enjoying Colombian coffee. We work with origin in Risaralda and Caldas to bring quality, closeness, and purpose to customers, partners, and businesses.' },
        { selector: '#heroCtas .btn-primary', text: 'Go to shop' },
        { selector: '#heroCtas .btn-outline', text: 'Discover TASARA' },
        { selector: '.hero-stats .stat:nth-child(1) .stat-label', text: 'Colombian coffee' },
        { selector: '.hero-stats .stat:nth-child(3) .stat-label', text: 'Business model' },
        { selector: '.hero-stats .stat:nth-child(5) .stat-label', text: 'Quality and presentation' },
        { selector: '#heroScroll span', text: 'Discover' },
        { selector: '.pilares .pilar:nth-child(1) .pilar-trigger-title', text: 'Company' },
        { selector: '.pilares .pilar:nth-child(1) .pilar-trigger-text', text: 'A brand that brings together story, territory, and coffee expertise.' },
        { selector: '.pilares .pilar:nth-child(1) h3', text: 'The company' },
        { selector: '.pilares .pilar:nth-child(1) p', text: 'TASARA SAS was created by Angela Maria Arango Jaramillo and Camilo Ernesto Tascon Devia. Its story begins with a friendship, a bond between Cali and the coffee region, and years of close work with producing families who have made coffee their way of life.' },
        { selector: '.pilares .pilar:nth-child(2) .pilar-trigger-title', text: 'Origin' },
        { selector: '.pilares .pilar:nth-child(2) .pilar-trigger-text', text: 'Risaralda and Caldas as the starting point of every experience.' },
        { selector: '.pilares .pilar:nth-child(2) h3', text: 'Our story' },
        { selector: '.pilares .pilar:nth-child(2) p', text: 'The brand brings that closeness between regions into a proposal with its own identity. From Risaralda and Caldas, TASARA builds a real connection with origin and turns it into products that combine tradition, design, and a vision for the future. That is how Cafe Leonor was born.' },
        { selector: '.pilares .pilar:nth-child(3) .pilar-trigger-title', text: 'Purpose' },
        { selector: '.pilares .pilar:nth-child(3) .pilar-trigger-text', text: 'Quality, continuity, and social impact from the territory.' },
        { selector: '.pilares .pilar:nth-child(3) h3', text: 'Commitment' },
        { selector: '.pilares .pilar:nth-child(3) p', text: 'TASARA works to build bridges between the effort of the Colombian countryside and those looking for better coffee. We do it with a long-term view, respect for coffee-growing communities, and a clear commitment to quality in every detail.' },
        { selector: '.productos .section-label', text: 'Business lines' },
        { selector: '.productos .section-title', html: 'One coffee vision,<br><em>expressed in different ways.</em>' },
        { selector: '.productos-sub', text: 'From Cafe Leonor to business-focused solutions, TASARA brings together products created for daily enjoyment, gifting, commercial partnerships, and brand development around Colombian coffee.' },
        { selector: '.productos-header .btn-primary', text: 'View shop' },
        { selector: '.productos-grid .producto-card:nth-child(1) .producto-badge', text: 'Own brand' },
        { selector: '.productos-grid .producto-card:nth-child(1) .producto-tipo', text: 'Roasted coffee' },
        { selector: '.productos-grid .producto-card:nth-child(1) .producto-notas', text: 'Specialty arabica coffee created for home, office, gifts, and those everyday moments that deserve a better cup.' },
        { selector: '.productos-grid .producto-card:nth-child(1) .btn', text: 'View detail' },
        { selector: '.productos-grid .producto-card:nth-child(2) .producto-tipo', text: 'Green coffee' },
        { selector: '.productos-grid .producto-card:nth-child(2) h3', text: 'Lots for business' },
        { selector: '.productos-grid .producto-card:nth-child(2) .producto-notas', text: 'An offer for buyers and partners who need traceability, clear farm information, and Colombian coffee selected according to their goals.' },
        { selector: '.productos-grid .producto-card:nth-child(2) .btn', text: 'Explore origin' },
        { selector: '.productos-grid .producto-card:nth-child(3) .producto-badge', text: 'Business' },
        { selector: '.productos-grid .producto-card:nth-child(3) .producto-tipo', text: 'Custom brand' },
        { selector: '.productos-grid .producto-card:nth-child(3) h3', text: 'TASARA solutions' },
        { selector: '.productos-grid .producto-card:nth-child(3) .producto-notas', text: 'We develop proposals for businesses that want to offer coffee with a careful presentation, their own identity, and commercial support.' },
        { selector: '.productos-grid .producto-card:nth-child(3) .btn', text: 'Talk B2B' },
        { selector: '.marca .section-label', text: 'Featured product' },
        { selector: '.marca .section-title', html: 'Cafe Leonor,<br><em>a cup with Colombian identity.</em>' },
        { selector: '.marca-texto > p:nth-of-type(1)', text: 'Cafe Leonor is TASARA in its closest expression: a specialty coffee that brings together origin, careful presentation, and a more human way of sharing who we are.' },
        { selector: '.marca-texto > p:nth-of-type(2)', text: 'It is a brand created to accompany everyday moments with quality, trust, and a visual identity that honors the work of coffee-growing communities.' },
        { selector: '.marca-specs .spec:nth-child(1) .spec-label', text: 'Variety' },
        { selector: '.marca-specs .spec:nth-child(2) .spec-label', text: 'Origin' },
        { selector: '.marca-specs .spec:nth-child(3) .spec-label', text: 'Formats' },
        { selector: '.marca-specs .spec:nth-child(4) .spec-label', text: 'Line' },
        { selector: '.marca-specs .spec:nth-child(4) .spec-val', text: 'Own brand and business' },
        { selector: '.marca-texto .hero-ctas .btn-primary', text: 'Buy now' },
        { selector: '.marca-texto .hero-ctas .btn-outline', text: 'See more details' },
        { selector: '.marca-note p', text: 'Available formats' },
        { selector: '.origen .section-label', text: 'Origin and traceability' },
        { selector: '.origen .section-title', html: 'Risaralda and Caldas,<br><em>the origin behind every lot.</em>' },
        { selector: '.origen-label > p', text: 'The coffee worked by TASARA comes from farms in Risaralda and Caldas. That is where each lot begins, with dates, names, landscapes, and processes worth exploring more closely.' },
        { selector: '.origen-label .btn', text: 'Explore lots' },
        { selector: '.origen-timeline .timeline-item:nth-child(1) h4', text: 'Timeline by farm' },
        { selector: '.origen-timeline .timeline-item:nth-child(1) p', text: 'A record of lots by period, farm, and key moments to follow the coffee journey more closely.' },
        { selector: '.origen-timeline .timeline-item:nth-child(2) h4', text: 'Photos and videos by lot' },
        { selector: '.origen-timeline .timeline-item:nth-child(2) p', text: 'Farm galleries and short video links so origin also feels close, visual, and easy to explore.' },
        { selector: '.origen-timeline .timeline-item:nth-child(3) .tl-lote', text: 'Connection' },
        { selector: '.origen-timeline .timeline-item:nth-child(3) h4', text: 'A more human perspective' },
        { selector: '.origen-timeline .timeline-item:nth-child(3) p', text: 'A warmer look at the territory, the people, and the processes that make every cup possible.' },
        { selector: '.impacto .section-label', text: 'Social impact' },
        { selector: '.impacto .section-title', html: 'Coffee with meaning,<br><em>made to stay in memory.</em>' },
        { selector: '.impacto-content > p:nth-of-type(1)', text: 'At TASARA, we believe a good coffee should also create value around it. That is why we work alongside coffee-growing communities, especially women heads of household, promoting opportunities for economic and social development.' },
        { selector: '.impacto-content > p:nth-of-type(2)', text: 'We want every product to reflect quality, origin, trust, and a responsible relationship with the people who make coffee possible.' },
        { selector: '.impacto-content .btn', text: 'Let us talk partnerships' },
        { selector: '.impacto-pillars .impacto-pilar:nth-child(1) p', text: 'Rigorous processes and consistency to offer reliable coffee, well presented and easy to enjoy again.' },
        { selector: '.impacto-pillars .impacto-pilar:nth-child(2) h4', text: 'Origin and purpose' },
        { selector: '.impacto-pillars .impacto-pilar:nth-child(2) p', text: 'A close relationship with producing communities and recognition of Colombian rural work.' },
        { selector: '.impacto-pillars .impacto-pilar:nth-child(3) p', text: 'Contemporary products, thoughtful packaging, and solutions adapted to different moments and market channels.' },
        { selector: '.contacto .section-label', text: 'Contact' },
        { selector: '.contacto .section-title', html: 'Let us talk coffee,<br><em>shopping, business, or a new alliance.</em>' },
        { selector: '.contacto-grid .contacto-card:nth-child(1) h3', text: 'Quick purchase' },
        { selector: '.contacto-grid .contacto-card:nth-child(1) p', text: 'For Cafe Leonor orders, questions about formats, or direct support for final customers.' },
        { selector: '.contacto-grid .contacto-card:nth-child(1) .btn-whatsapp', text: 'WhatsApp · Buy', attrs: { href: 'https://wa.me/573054402145?text=Hello%2C%20I%20would%20like%20to%20buy%20Cafe%20Leonor' } },
        { selector: '.contacto-grid .contacto-card:nth-child(2) h3', text: 'Business and custom brand' },
        { selector: '.contacto-grid .contacto-card:nth-child(2) p:nth-of-type(1)', text: 'For green coffee, brand development, solutions for businesses, hotels, restaurants, distributors, and export opportunities.' },
        { selector: '.contacto-grid .contacto-card:nth-child(2) .btn-primary', text: 'Request a quote', attrs: { href: 'https://wa.me/573054402145?text=Hello%2C%20I%20would%20like%20B2B%20information%20from%20TASARA' } },
        { selector: '.contacto-grid .contacto-card:nth-child(2) .contacto-micro', text: 'Commercial support for business development and growth.' },
        { selector: '.contacto-grid .contacto-card:nth-child(3) .datos-list li:nth-child(1)', html: '<span>Tax ID</span> 901940133-2' },
        { selector: '.contacto-grid .contacto-card:nth-child(3) .datos-list li:nth-child(2)', html: '<span>Address</span> Cra 35 Tv 24-314, Dosquebradas' },
        { selector: '.contacto-grid .contacto-card:nth-child(3) .datos-list li:nth-child(3)', html: '<span>City</span> Risaralda, Colombia' },
        { selector: '.footer-brand p', html: 'TASARA SAS · Colombian specialty coffee<br>Origin, quality, and social impact with a long-term vision' },
        { selector: '.footer-links a[href="tienda.html"]', text: 'Shop' },
        { selector: '.footer-links a[href="cafe-leonor.html"]', text: 'Cafe Leonor' },
        { selector: '.footer-links a[href="origen.html"]', text: 'Origin' }
      ]
    },
    'cafe-leonor.html': {
      head: {
        title: 'Cafe Leonor | Colombian specialty coffee',
        description: 'Cafe Leonor is a Colombian specialty coffee inspired by women coffee growers, with origin in Caldas and Risaralda and an experience made to be enjoyed slowly.',
        ogLocale: 'en_US'
      },
      rules: [
        { selector: '.nav-links a[href="index.html"], .nav-mobile a[href="index.html"]', text: 'Home' },
        { selector: '.nav-links a[href="tienda.html"], .nav-mobile a[href="tienda.html"], .footer-links a[href="tienda.html"]', text: 'Shop' },
        { selector: '.nav-links a[href="cafe-leonor.html"], .nav-mobile a[href="cafe-leonor.html"], .footer-links a[href="cafe-leonor.html"]', text: 'Cafe Leonor' },
        { selector: '.nav-links a[href="origen.html"], .nav-mobile a[href="origen.html"], .footer-links a[href="origen.html"]', text: 'Origin' },
        { selector: '.nav-links a[href="index.html#contacto"], .nav-mobile a[href="index.html#contacto"]', text: 'Contact' },
        { selector: '.nav-cta', text: 'Buy' },
        { selector: '#heroBadge', text: 'Cafe Leonor · Colombian specialty' },
        { selector: '#heroTitle', html: 'Cafe Leonor<br><em>Colombian excellence in every cup.</em>' },
        { selector: '#heroSubtitle', text: 'A specialty coffee created for people who value flavor, tradition, and the moments that deserve to be enjoyed slowly.' },
        { selector: '#heroCtas .btn-primary', text: 'Buy Cafe Leonor' },
        { selector: '#heroCtas .btn-outline', text: 'Discover your lot origin' },
        { selector: '#heroStats .stat:nth-child(1) .stat-label', text: 'Arabica' },
        { selector: '#heroStats .stat:nth-child(3) .stat-label', text: 'and Risaralda' },
        { selector: '#heroStats .stat:nth-child(5) .stat-label', text: 'to 2.5 kg' },
        { selector: '.leonor-signature span', text: 'Ideal for breakfast, after-meal moments, and those pauses that deserve a good coffee.' },
        { selector: '.leonor-showcase-main figcaption', text: 'Core identity' },
        { selector: '.leonor-showcase-side.showcase-left figcaption', text: 'Everyday brewing' },
        { selector: '.leonor-showcase-side.showcase-right figcaption', text: 'Ritual and grinding' },
        { selector: '.leonor-story-card .section-label', text: 'The story behind Leonor' },
        { selector: '.leonor-story-card h3', text: 'A brand inspired by Colombian women coffee growers' },
        { selector: '.leonor-story-card p:nth-of-type(1)', text: 'Cafe Leonor places a female figure at the center, representing work, tradition, and closeness to origin. Her image does not only identify the brand; it also honors the women who sustain Colombian coffee culture with consistency and character.' },
        { selector: '.leonor-story-card p:nth-of-type(2)', text: 'That is why every cup aims to carry more than good flavor. It also carries an authentic story, a clear identity, and a more human relationship with coffee.' },
        { selector: '.leonor-brand-copy .section-label', text: 'Brand symbol' },
        { selector: '.leonor-brand-copy h3', text: 'The hat as a gesture of identity' },
        { selector: '.leonor-brand-copy p', text: 'The current logo reinforces the rural origin and coffee heritage of the brand. Its reading is direct, warm, and memorable, which helps Cafe Leonor stay recognizable in product, content, and display.' },
        { selector: '.leonor-divider-title:nth-of-type(1) .section-label', text: 'Why choose it' },
        { selector: '.leonor-divider-title:nth-of-type(1) .section-title', html: 'Three reasons to come back to it<br><em>beyond the first cup.</em>' },
        { selector: '.leonor-grid:nth-of-type(1) .leonor-grid-card:nth-child(1) h3', text: 'Balanced flavor' },
        { selector: '.leonor-grid:nth-of-type(1) .leonor-grid-card:nth-child(1) p', text: 'A profile designed to be easy to enjoy, with a pleasant cup expression and a friendly experience for different moments of the day.' },
        { selector: '.leonor-grid:nth-of-type(1) .leonor-grid-card:nth-child(2) h3', text: 'Colombian origin' },
        { selector: '.leonor-grid:nth-of-type(1) .leonor-grid-card:nth-child(2) p', text: 'Coming from Caldas and Risaralda, Cafe Leonor connects the cup with coffee regions known for quality and tradition.' },
        { selector: '.leonor-grid:nth-of-type(1) .leonor-grid-card:nth-child(3) h3', text: 'Clear identity' },
        { selector: '.leonor-grid:nth-of-type(1) .leonor-grid-card:nth-child(3) p', text: 'A brand with its own character, easy to recognize and coherent across product, photography, shop, and consumer experience.' },
        { selector: '.leonor-divider-title:nth-of-type(2) .section-label', text: 'Leonor moments' },
        { selector: '.leonor-divider-title:nth-of-type(2) .section-title', html: 'A coffee that feels right<br><em>in simple and memorable scenes.</em>' },
        { selector: '.leonor-moments .leonor-moment-card:nth-child(1) span', text: 'Breakfast' },
        { selector: '.leonor-moments .leonor-moment-card:nth-child(1) h3', text: 'Starting the day with a well-made cup' },
        { selector: '.leonor-moments .leonor-moment-card:nth-child(1) p', text: 'Its balanced profile works beautifully in everyday brewing and makes coffee feel naturally part of the daily routine.' },
        { selector: '.leonor-moments .leonor-moment-card:nth-child(2) span', text: 'Pause' },
        { selector: '.leonor-moments .leonor-moment-card:nth-child(2) h3', text: 'Taking time to grind and pour' },
        { selector: '.leonor-moments .leonor-moment-card:nth-child(2) p', text: 'The Cafe Leonor experience also lives in the simple things: grinding, smelling, pouring, and slowing down for a moment.' },
        { selector: '.leonor-moments .leonor-moment-card:nth-child(3) span', text: 'After-meal' },
        { selector: '.leonor-moments .leonor-moment-card:nth-child(3) h3', text: 'A coffee that looks good when shared' },
        { selector: '.leonor-moments .leonor-moment-card:nth-child(3) p', text: 'Its visual presence works strongly on the table, as a gift, or in a display that naturally accompanies conversation.' },
        { selector: '.leonor-divider-title:nth-of-type(3) .section-label', text: 'Design and identity' },
        { selector: '.leonor-divider-title:nth-of-type(3) .section-title', html: 'A thoughtful presentation that supports<br><em>the story of the brand without distracting from it.</em>' },
        { selector: '.leonor-gallery-card:nth-of-type(1) h3', text: 'Product views' },
        { selector: '.leonor-gallery-card:nth-of-type(1) > p', text: 'The front, side, and group product shots show a consistent identity. The information is clear, the logo has presence, and the brand stays recognizable from every angle.' },
        { selector: '.leonor-frame.frame-a figcaption', text: 'Front' },
        { selector: '.leonor-frame.frame-c figcaption', text: 'Set' },
        { selector: '.leonor-gallery-card:nth-of-type(2) h3', text: 'Product scenes' },
        { selector: '.leonor-gallery-card:nth-of-type(2) > p', text: 'These images help Cafe Leonor feel more real and more approachable. They do not only show the product; they show how it can live on a table, in a brew ritual, or in a display with coherence and elegance.' },
        { selector: '.leonor-divider-title:nth-of-type(4) .section-label', text: 'Essential information' },
        { selector: '.leonor-divider-title:nth-of-type(4) .section-title', html: 'What matters most, explained clearly<br><em>and easy to scan.</em>' },
        { selector: '.leonor-grid:nth-of-type(2) .leonor-grid-card:nth-child(1) h3', text: 'What it is' },
        { selector: '.leonor-grid:nth-of-type(2) .leonor-grid-card:nth-child(1) .spec-item:nth-child(1)', html: '<strong>Commercial name</strong>Cafe Leonor' },
        { selector: '.leonor-grid:nth-of-type(2) .leonor-grid-card:nth-child(1) .spec-item:nth-child(2)', html: '<strong>Type</strong>Arabica coffee' },
        { selector: '.leonor-grid:nth-of-type(2) .leonor-grid-card:nth-child(1) .spec-item:nth-child(3)', html: '<strong>Scientific name</strong>Coffea arabica' },
        { selector: '.leonor-grid:nth-of-type(2) .leonor-grid-card:nth-child(1) .spec-item:nth-child(4)', html: '<strong>Composition</strong>100% Colombian coffee' },
        { selector: '.leonor-grid:nth-of-type(2) .leonor-grid-card:nth-child(2) .spec-item:nth-child(1)', html: '<strong>Origin</strong>Caldas and Risaralda' },
        { selector: '.leonor-grid:nth-of-type(2) .leonor-grid-card:nth-child(2) .spec-item:nth-child(2)', html: '<strong>Altitude</strong>1400 to 1650 masl' },
        { selector: '.leonor-grid:nth-of-type(2) .leonor-grid-card:nth-child(2) .spec-item:nth-child(3)', html: '<strong>Process</strong>Washed' },
        { selector: '.leonor-grid:nth-of-type(2) .leonor-grid-card:nth-child(2) .spec-item:nth-child(4)', html: '<strong>Variety</strong>Castillo and related varieties' },
        { selector: '.leonor-grid:nth-of-type(2) .leonor-grid-card:nth-child(3) h3', text: 'In the cup' },
        { selector: '.leonor-grid:nth-of-type(2) .leonor-grid-card:nth-child(3) .spec-item:nth-child(1)', html: '<strong>Roast</strong>Medium' },
        { selector: '.leonor-grid:nth-of-type(2) .leonor-grid-card:nth-child(3) .spec-item:nth-child(2)', html: '<strong>Profile</strong>Balanced' },
        { selector: '.leonor-grid:nth-of-type(2) .leonor-grid-card:nth-child(3) .spec-item:nth-child(3)', html: '<strong>Formats</strong>50 g to 2.5 kg' },
        { selector: '.leonor-grid:nth-of-type(2) .leonor-grid-card:nth-child(3) .spec-item:nth-child(4)', html: '<strong>Use</strong>Gift, home, and frequent use' },
        { selector: '.leonor-cta-band p', text: 'If you want to take Cafe Leonor home, choose a format, or learn more about the origin of your lot, you can continue from here.' },
        { selector: '.leonor-cta-band .btn-primary', text: 'View formats' },
        { selector: '.leonor-cta-band .btn-outline', text: 'Explore origin and traceability' },
        { selector: '.subpage-grid .subpage-card:nth-child(1) h3', text: 'YouTube and social media' },
        { selector: '.subpage-grid .subpage-card:nth-child(1) p', text: 'If you arrived here by scanning the QR code, you can also follow Cafe Leonor on these channels:' },
        { selector: '.subpage-grid .subpage-card:nth-child(1) li:nth-child(1) a', text: 'Cafe Leonor Instagram' },
        { selector: '.subpage-grid .subpage-card:nth-child(1) li:nth-child(2) a', text: 'Cafe Leonor TikTok' },
        { selector: '.subpage-grid .subpage-card:nth-child(1) li:nth-child(3) a', text: 'Cafe Leonor YouTube' },
        { selector: '.subpage-grid .subpage-card:nth-child(2) h3', text: 'Next step' },
        { selector: '.subpage-grid .subpage-card:nth-child(2) p', text: 'From here you can go straight to the shop, review the available formats, or explore the origin and traceability story behind the coffee.' },
        { selector: '.subpage-grid .subpage-card:nth-child(2) .btn-primary', text: 'Buy Cafe Leonor' },
        { selector: '.subpage-grid .subpage-card:nth-child(2) .btn-outline', text: 'View origin' },
        { selector: '.footer-brand p', html: 'Cafe Leonor · TASARA specialty line<br>Brand, origin, tribute, and traceability' },
        { selector: '.footer-links a[href="index.html"]', text: 'Home' }
      ]
    },
    'tienda.html': {
      head: {
        title: 'Shop | TASARA',
        description: 'Buy Cafe Leonor in its available formats or request information about green coffee and business solutions with TASARA.',
        ogLocale: 'en_US'
      },
      rules: [
        { selector: '.nav-links a[href="index.html"], .nav-mobile a[href="index.html"]', text: 'Home' },
        { selector: '.nav-links a[href="tienda.html"], .nav-mobile a[href="tienda.html"], .footer-links a[href="tienda.html"]', text: 'Shop' },
        { selector: '.nav-links a[href="cafe-leonor.html"], .nav-mobile a[href="cafe-leonor.html"], .footer-links a[href="cafe-leonor.html"]', text: 'Cafe Leonor' },
        { selector: '.nav-links a[href="origen.html"], .nav-mobile a[href="origen.html"], .footer-links a[href="origen.html"]', text: 'Origin' },
        { selector: '.nav-links a[href="index.html#contacto"], .nav-mobile a[href="index.html#contacto"]', text: 'Contact' },
        { selector: '.nav-cta', text: 'Contact' },
        { selector: '.leonor-kicker', text: 'TASARA shop · Direct purchase · WhatsApp' },
        { selector: '.leonor-title', html: 'Choose the format<br><em>that fits your moment best.</em>' },
        { selector: '.leonor-shell .hero-subtitle', text: 'Cafe Leonor is the main product in this shop. Here you will find options for gifting, frequent use, larger-volume formats, and commercial solutions for businesses, hotels, restaurants, and private label projects.' },
        { selector: '.leonor-shell .hero-ctas .btn-primary', text: 'View Cafe Leonor' },
        { selector: '.leonor-shell .hero-ctas .btn-outline', text: 'View business solutions' },
        { selector: '.leonor-shell .hero-stats .stat:nth-child(1) .stat-label', text: 'gift pack · 1.76 oz' },
        { selector: '.leonor-shell .hero-stats .stat:nth-child(3) .stat-label', text: '12 oz · and 500 g' },
        { selector: '.leonor-shell .hero-stats .stat:nth-child(5) .stat-label', text: '88.2 oz · large format' },
        { selector: '.leonor-showcase-main figcaption', text: 'Cafe Leonor · Core format' },
        { selector: '.leonor-showcase-side.showcase-left figcaption', text: 'Gift pack · 50 g' },
        { selector: '.leonor-showcase-side.showcase-right figcaption', text: 'Green coffee · Commercial line' },
        { selector: '#cafe-leonor-tienda + .leonor-divider-title .section-label', text: 'Featured product' },
        { selector: '#cafe-leonor-tienda + .leonor-divider-title .section-title', html: 'Cafe Leonor<br><em>in its purchase formats.</em>' },
        { selector: '.leonor-grid .leonor-grid-card:nth-child(1) h3', text: 'Gift pack 50 g' },
        { selector: '.leonor-grid .leonor-grid-card:nth-child(1) p', text: 'A format created for institutional gifts, brand activations, or special deliveries. Compact, elegant, and easy to integrate into gifting experiences.' },
        { selector: '.leonor-grid .leonor-grid-card:nth-child(1) .spec-item:nth-child(1)', html: '<strong>Format</strong>50 g · 1.76 oz' },
        { selector: '.leonor-grid .leonor-grid-card:nth-child(1) .spec-item:nth-child(2)', html: '<strong>Suggested use</strong>Gift or institutional' },
        { selector: '.leonor-grid .leonor-grid-card:nth-child(1) .spec-item:nth-child(3)', html: '<strong>Type</strong>Roasted coffee' },
        { selector: '.leonor-grid .leonor-grid-card:nth-child(1) .spec-item:nth-child(4)', html: '<strong>Purchase</strong>Via WhatsApp' },
        { selector: '.leonor-grid .leonor-grid-card:nth-child(1) .btn', text: 'WhatsApp · Buy 50 g', attrs: { href: 'https://wa.me/573054402145?text=Hello%2C%20I%20want%20to%20buy%20the%2050%20g%20gift%20pack%20of%20Cafe%20Leonor' } },
        { selector: '.leonor-grid .leonor-grid-card:nth-child(2) h3', text: 'Cafe Leonor 340 g' },
        { selector: '.leonor-grid .leonor-grid-card:nth-child(2) p', text: 'A format designed for those who want good coffee at home or in the office with a comfortable purchase rhythm and a clear product reading.' },
        { selector: '.leonor-grid .leonor-grid-card:nth-child(2) .spec-item:nth-child(2)', html: '<strong>Suggested use</strong>Frequent use' },
        { selector: '.leonor-grid .leonor-grid-card:nth-child(2) .spec-item:nth-child(4)', html: '<strong>Profile</strong>Balanced' },
        { selector: '.leonor-grid .leonor-grid-card:nth-child(2) .btn', text: 'WhatsApp · Buy 340 g', attrs: { href: 'https://wa.me/573054402145?text=Hello%2C%20I%20want%20to%20buy%20Cafe%20Leonor%20340%20g' } },
        { selector: '.leonor-grid .leonor-grid-card:nth-child(3) h3', text: 'Cafe Leonor 500 g' },
        { selector: '.leonor-grid .leonor-grid-card:nth-child(3) p', text: 'The most representative standard format of the brand. Great for home, office, or spaces that want more yield and stronger product presence.' },
        { selector: '.leonor-grid .leonor-grid-card:nth-child(3) .spec-item:nth-child(2)', html: '<strong>Suggested use</strong>Home or office' },
        { selector: '.leonor-grid .leonor-grid-card:nth-child(3) .spec-item:nth-child(3)', html: '<strong>Type</strong>Ground or whole bean' },
        { selector: '.leonor-grid .leonor-grid-card:nth-child(3) .spec-item:nth-child(4)', html: '<strong>Purchase</strong>Direct via WhatsApp' },
        { selector: '.leonor-grid .leonor-grid-card:nth-child(3) .btn', text: 'WhatsApp · Buy 500 g', attrs: { href: 'https://wa.me/573054402145?text=Hello%2C%20I%20want%20to%20buy%20Cafe%20Leonor%20500%20g' } },
        { selector: '.leonor-grid .leonor-grid-card:nth-child(4) h3', text: 'Cafe Leonor 2.5 kg' },
        { selector: '.leonor-grid .leonor-grid-card:nth-child(4) p', text: 'A higher-capacity format for work teams, intensive use, or spaces that need more volume without losing the identity of the product.' },
        { selector: '.leonor-grid .leonor-grid-card:nth-child(4) .spec-item:nth-child(2)', html: '<strong>Suggested use</strong>Intensive use' },
        { selector: '.leonor-grid .leonor-grid-card:nth-child(4) .spec-item:nth-child(3)', html: '<strong>Ideal for</strong>Office or service' },
        { selector: '.leonor-grid .leonor-grid-card:nth-child(4) .spec-item:nth-child(4)', html: '<strong>Request</strong>Made to order' },
        { selector: '.leonor-grid .leonor-grid-card:nth-child(4) .btn', text: 'WhatsApp · Buy 2.5 kg', attrs: { href: 'https://wa.me/573054402145?text=Hello%2C%20I%20want%20to%20buy%20Cafe%20Leonor%202.5%20kg' } },
        { selector: '.leonor-cta-band p', text: 'If you want to learn more about the brand story or review coffee traceability before buying, you can complement this page with the other Cafe Leonor sections.' },
        { selector: '.leonor-cta-band .btn-outline', text: 'View the Cafe Leonor story' },
        { selector: '.leonor-cta-band .btn-primary', text: 'Discover origin and lots' },
        { selector: '#soluciones-negocio + .leonor-divider-title .section-label', text: 'Commercial solutions' },
        { selector: '#soluciones-negocio + .leonor-divider-title .section-title', html: 'Options for businesses,<br><em>hospitality, and supply.</em>' },
        { selector: '.leonor-duo .leonor-gallery-card:nth-child(1) h3', text: 'Green coffee' },
        { selector: '.leonor-duo .leonor-gallery-card:nth-child(1) p', text: 'An option aimed at clients who require Colombian coffee selected according to their needs, with a more technical, commercial, and supply-focused approach.' },
        { selector: '.leonor-duo .leonor-gallery-card:nth-child(1) .leonor-bullet:nth-child(1) span:last-child', text: 'Packed in 70 kg sacks.' },
        { selector: '.leonor-duo .leonor-gallery-card:nth-child(1) .leonor-bullet:nth-child(2) span:last-child', text: 'Selection according to client needs.' },
        { selector: '.leonor-duo .leonor-gallery-card:nth-child(1) .leonor-bullet:nth-child(3) span:last-child', text: 'Ideal for technical or commercial purchasing.' },
        { selector: '.leonor-duo .leonor-gallery-card:nth-child(1) .btn', text: 'WhatsApp · Ask about green coffee', attrs: { href: 'https://wa.me/573054402145?text=Hello%2C%20I%20would%20like%20information%20about%20TASARA%20green%20coffee' } },
        { selector: '.leonor-duo .leonor-gallery-card:nth-child(2) h3', text: 'Custom brand' },
        { selector: '.leonor-duo .leonor-gallery-card:nth-child(2) p', text: 'A solution for businesses, hotels, restaurants, corporate gifts, or projects that want roasted coffee with packaging, materials, and finishes agreed with the client.' },
        { selector: '.leonor-duo .leonor-gallery-card:nth-child(2) .leonor-bullet:nth-child(1) span:last-child', text: 'Packaging and colors according to need.' },
        { selector: '.leonor-duo .leonor-gallery-card:nth-child(2) .leonor-bullet:nth-child(2) span:last-child', text: 'B2B and corporate focus.' },
        { selector: '.leonor-duo .leonor-gallery-card:nth-child(2) .leonor-bullet:nth-child(3) span:last-child', text: 'Ideal for hospitality, events, and private label.' },
        { selector: '.leonor-duo .leonor-gallery-card:nth-child(2) .btn', text: 'WhatsApp · Request a quote', attrs: { href: 'https://wa.me/573054402145?text=Hello%2C%20I%20would%20like%20information%20about%20custom%20coffee%20branding%20with%20TASARA' } },
        { selector: '.subpage-grid .subpage-card:nth-child(1) h3', text: 'What you can request here' },
        { selector: '.subpage-grid .subpage-card:nth-child(1) li:nth-child(1)', text: 'Cafe Leonor for gifts or frequent use.' },
        { selector: '.subpage-grid .subpage-card:nth-child(1) li:nth-child(2)', text: 'Higher-capacity formats for office or service.' },
        { selector: '.subpage-grid .subpage-card:nth-child(1) li:nth-child(3)', text: 'Green coffee for commercial needs.' },
        { selector: '.subpage-grid .subpage-card:nth-child(1) li:nth-child(4)', text: 'Custom brand for businesses and hospitality.' },
        { selector: '.subpage-grid .subpage-card:nth-child(2) h3', text: 'Guided purchase' },
        { selector: '.subpage-grid .subpage-card:nth-child(2) p', text: 'Each WhatsApp button already includes a preselected message according to the product or service. That way the conversation starts with clear context and the purchase process feels smoother.' },
        { selector: '.subpage-grid .subpage-card:nth-child(2) .btn-primary', text: 'WhatsApp · I need advice', attrs: { href: 'https://wa.me/573054402145?text=Hello%2C%20I%20need%20help%20choosing%20the%20right%20Cafe%20Leonor%20format' } },
        { selector: '.footer-brand p', html: 'TASARA shop<br>Cafe Leonor, green coffee, and business solutions' },
        { selector: '.footer-links a[href="index.html"]', text: 'Home' }
      ]
    },
    'origen.html': {
      head: {
        title: 'Origin | TASARA',
        description: 'Explore the origin of Cafe Leonor through its farms, lots, and cup profiles in a visual timeline of traceability.',
        ogLocale: 'en_US'
      },
      rules: [
        { selector: '.nav-links a[href="index.html"], .nav-mobile a[href="index.html"]', text: 'Home' },
        { selector: '.nav-links a[href="tienda.html"], .nav-mobile a[href="tienda.html"], .footer-links a[href="tienda.html"]', text: 'Shop' },
        { selector: '.nav-links a[href="cafe-leonor.html"], .nav-mobile a[href="cafe-leonor.html"], .footer-links a[href="cafe-leonor.html"]', text: 'Cafe Leonor' },
        { selector: '.nav-links a[href="origen.html"], .nav-mobile a[href="origen.html"], .footer-links a[href="origen.html"]', text: 'Origin' },
        { selector: '.nav-links a[href="index.html#contacto"], .nav-mobile a[href="index.html#contacto"]', text: 'Contact' },
        { selector: '.nav-cta', text: 'Buy' },
        { selector: '#heroBadge', text: 'Origin and traceability · Cafe Leonor' },
        { selector: '#heroTitle', html: 'Every lot has<br><em>a farm, a landscape, and a story.</em>' },
        { selector: '#heroSubtitle', text: 'This page brings together the journey of Cafe Leonor between 2025 and 2026 across three farms: La Sociedad, La Siria, and La Esperanza. Here you can see which producer was behind each lot, which municipality it comes from, and how that origin shows up in the cup.' },
        { selector: '#heroCtas .btn-primary', text: 'View timeline' },
        { selector: '#heroCtas .btn-outline', text: 'Go to shop' },
        { selector: '#heroStats .stat:nth-child(1) .stat-label', text: 'registered lots' },
        { selector: '#heroStats .stat:nth-child(3) .stat-label', text: 'core farms' },
        { selector: '#heroStats .stat:nth-child(5) .stat-label', text: 'to 2026' },
        { selector: '.origin-hero-card.card-a figcaption', text: 'La Siria · House viewpoint' },
        { selector: '.origin-hero-card.card-b figcaption', text: 'La Esperanza · Main house' },
        { selector: '.origin-hero-card.card-c figcaption', text: 'La Sociedad · Coffee field and landscape' },
        { selector: '.origin-band .origin-band-inner p', text: 'Traceability here is not presented as a cold technical sheet: it reads more like an origin journal. Each farm gathers one or more lots, and each image helps explain the production context, the landscape, and the hands behind the coffee from cultivation to cup.' },
        { selector: '.origin-entry:nth-of-type(1) .origin-rail-range', text: 'June · July' },
        { selector: '.origin-entry:nth-of-type(1) .origin-card-top h2', html: 'Risaralda, Caldas<br><em>Alejandra Rios</em>' },
        { selector: '.origin-entry:nth-of-type(1) .origin-body-copy', text: 'La Sociedad offers a very open reading of the coffee landscape. Its records combine portrait, drying area, and mountain views, showing an origin with human presence and a direct relationship between the producer and the environment.' },
        { selector: '.origin-entry:nth-of-type(1) .spec-item:nth-child(2)', html: '<strong>Municipality</strong>Risaralda, Caldas' },
        { selector: '.origin-entry:nth-of-type(1) .spec-item:nth-child(3)', html: '<strong>Altitude</strong>1640 masl' },
        { selector: '.origin-entry:nth-of-type(1) .spec-item:nth-child(5)', html: '<strong>Cup profile</strong>Caramel, panela, chocolate, and red fruits' },
        { selector: '.origin-entry:nth-of-type(1) .spec-item:nth-child(6)', html: '<strong>Visual reading</strong>Landscape, coffee field, and drying area' },
        { selector: '.origin-entry:nth-of-type(1) .origin-shot:nth-child(1) figcaption', text: 'Portrait in the coffee field' },
        { selector: '.origin-entry:nth-of-type(1) .origin-shot:nth-child(2) figcaption', text: 'Drying area and control' },
        { selector: '.origin-entry:nth-of-type(2) .origin-rail-range', text: 'September · March' },
        { selector: '.origin-entry:nth-of-type(2) .origin-card-top h2', html: 'Belalcazar, Caldas<br><em>Gloria Jaramillo de Arango</em>' },
        { selector: '.origin-entry:nth-of-type(2) .origin-body-copy', text: 'La Siria has a very special visual strength: its house open to the valley, the view from the balcony, and the hillside setting connect the coffee with a broad, luminous, deeply coffee-growing landscape. Here origin is felt in both the farm and the atmosphere.' },
        { selector: '.origin-entry:nth-of-type(2) .spec-item:nth-child(2)', html: '<strong>Area</strong>El Madrono' },
        { selector: '.origin-entry:nth-of-type(2) .spec-item:nth-child(3)', html: '<strong>Municipality</strong>Belalcazar, Caldas' },
        { selector: '.origin-entry:nth-of-type(2) .spec-item:nth-child(4)', html: '<strong>Altitude</strong>1600 masl' },
        { selector: '.origin-entry:nth-of-type(2) .spec-item:nth-child(6)', html: '<strong>Cup profile</strong>Panela, chocolate, and yellow fruits' },
        { selector: '.origin-entry:nth-of-type(2) .origin-shot:nth-child(1) figcaption', text: 'Sunset from the balcony' },
        { selector: '.origin-entry:nth-of-type(2) .origin-shot:nth-child(2) figcaption', text: 'Main viewpoint' },
        { selector: '.origin-entry:nth-of-type(2) .origin-shot:nth-child(3) figcaption', text: 'House corridor' },
        { selector: '.origin-entry:nth-of-type(2) .origin-shot:nth-child(4) figcaption', text: 'View over the coffee valley' },
        { selector: '.origin-entry:nth-of-type(3) .origin-rail-range', text: 'November · January' },
        { selector: '.origin-entry:nth-of-type(3) .origin-card-top h2', html: 'Pereira, Risaralda<br><em>Amparo Bermudez</em>' },
        { selector: '.origin-entry:nth-of-type(3) .origin-body-copy', text: 'La Esperanza shows an origin that is both more technical and very human: the main house, the planted hillside, and the drying space where coffee takes shape. It is a farm that reveals both structure and care in every stage of the process.' },
        { selector: '.origin-entry:nth-of-type(3) .spec-item:nth-child(2)', html: '<strong>Area</strong>La Convencion' },
        { selector: '.origin-entry:nth-of-type(3) .spec-item:nth-child(3)', html: '<strong>Municipality</strong>Pereira, Risaralda' },
        { selector: '.origin-entry:nth-of-type(3) .spec-item:nth-child(4)', html: '<strong>Altitude</strong>1707 masl' },
        { selector: '.origin-entry:nth-of-type(3) .spec-item:nth-child(6)', html: '<strong>Cup profile</strong>Panela, citrus, and chocolate' },
        { selector: '.origin-entry:nth-of-type(3) .origin-shot:nth-child(1) figcaption', text: 'Main house' },
        { selector: '.origin-entry:nth-of-type(3) .origin-shot:nth-child(2) figcaption', text: 'Coffee field view' },
        { selector: '.origin-band--closing .origin-band-inner p', text: 'As TASARA adds new lots and more audiovisual material, this timeline can keep growing with videos, lot codes, new farms, and more origin moments so the experience stays traceable and alive.' },
        { selector: '.origin-band--closing .btn-outline', text: 'Back to Cafe Leonor' },
        { selector: '.origin-band--closing .btn-primary', text: 'Go to shop' },
        { selector: '.footer-brand p', html: 'Origin and traceability of Cafe Leonor<br>Farms, lots, and coffee landscape' },
        { selector: '.footer-links a[href="index.html"]', text: 'Home' }
      ]
    }
  };

  const config = pageTranslations[pageName];
  if (!config) return;

  const rememberOriginals = () => {
    config.rules.forEach((rule) => {
      document.querySelectorAll(rule.selector).forEach((element) => {
        if (!originalNodes.has(element)) {
          originalNodes.set(element, {
            html: element.innerHTML,
            text: element.textContent,
            attrs: {}
          });
        }

        if (rule.attrs) {
          const stored = originalNodes.get(element);
          Object.keys(rule.attrs).forEach((attr) => {
            if (!(attr in stored.attrs)) {
              stored.attrs[attr] = element.getAttribute(attr);
            }
          });
        }
      });
    });
  };

  const setMeta = (selector, value) => {
    const node = document.querySelector(selector);
    if (node && value) node.setAttribute('content', value);
  };

  const restoreSpanish = () => {
    document.documentElement.lang = originalHead.lang || 'es';
    document.title = originalHead.title;
    setMeta('meta[name="description"]', originalHead.description);
    setMeta('meta[property="og:title"]', originalHead.ogTitle);
    setMeta('meta[property="og:description"]', originalHead.ogDescription);
    setMeta('meta[property="og:locale"]', originalHead.ogLocale);
    setMeta('meta[name="twitter:title"]', originalHead.twitterTitle);
    setMeta('meta[name="twitter:description"]', originalHead.twitterDescription);

    config.rules.forEach((rule) => {
      document.querySelectorAll(rule.selector).forEach((element) => {
        const original = originalNodes.get(element);
        if (!original) return;
        if (rule.html !== undefined) element.innerHTML = original.html;
        if (rule.text !== undefined) element.textContent = original.text;
        if (rule.attrs) {
          Object.keys(rule.attrs).forEach((attr) => {
            const originalAttr = original.attrs[attr];
            if (originalAttr === null || originalAttr === undefined) {
              element.removeAttribute(attr);
            } else {
              element.setAttribute(attr, originalAttr);
            }
          });
        }
      });
    });
  };

  const applyEnglish = () => {
    document.documentElement.lang = 'en';
    document.title = config.head.title || document.title;
    setMeta('meta[name="description"]', config.head.description);
    setMeta('meta[property="og:title"]', config.head.ogTitle || config.head.title);
    setMeta('meta[property="og:description"]', config.head.ogDescription || config.head.description);
    setMeta('meta[property="og:locale"]', config.head.ogLocale || 'en_US');
    setMeta('meta[name="twitter:title"]', config.head.twitterTitle || config.head.title);
    setMeta('meta[name="twitter:description"]', config.head.twitterDescription || config.head.description);

    config.rules.forEach((rule) => {
      document.querySelectorAll(rule.selector).forEach((element) => {
        if (rule.html !== undefined) element.innerHTML = rule.html;
        if (rule.text !== undefined) element.textContent = rule.text;
        if (rule.attrs) {
          Object.entries(rule.attrs).forEach(([attr, value]) => {
            element.setAttribute(attr, value);
          });
        }
      });
    });
  };

  const syncButtons = (lang) => {
    document.querySelectorAll('[data-lang-switch]').forEach((button) => {
      const isActive = button.dataset.langSwitch === lang;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
  };

  const applyLanguage = (lang) => {
    if (lang === 'en') {
      applyEnglish();
    } else {
      restoreSpanish();
      lang = 'es';
    }

    window.localStorage.setItem(STORAGE_KEY, lang);
    syncButtons(lang);
  };

  rememberOriginals();

  const savedLanguage = window.localStorage.getItem(STORAGE_KEY);
  applyLanguage(savedLanguage === 'en' ? 'en' : 'es');

  document.querySelectorAll('[data-lang-switch]').forEach((button) => {
    button.addEventListener('click', () => {
      applyLanguage(button.dataset.langSwitch);
    });
  });
});
