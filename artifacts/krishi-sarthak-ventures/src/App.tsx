import './site.css';
import { useEffect, useState, type FormEvent } from 'react';
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Check, Globe2, Menu, MoveUpRight, Sprout, X } from 'lucide-react';
import { articles, categories, company, legacyMarkets, navItems, products, services, strategy } from '@/data/siteContent';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
const imagePath = '/market-harvest.jpg';

function BrandMark() {
  return <a href="#home" aria-label="Krishi Sarthak Ventures home" className="brand-mark" data-testid="link-brand-home">
    <span className="brand-symbol" aria-hidden="true"><Sprout size={22} strokeWidth={1.8} /></span>
    <span className="brand-name"><strong>KRISHI SARTHAK</strong><small>VENTURES LLP <i>·</i> PUNE, INDIA</small></span>
  </a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <div className="topline"><span>TRADE ROOTED IN TRUST</span><span><span className="top-dot" /> Pune, Maharashtra <span className="top-divider">/</span> India</span></div>
    <div className="nav-shell">
      <BrandMark />
      <nav aria-label="Main navigation" className={open ? 'main-nav nav-open' : 'main-nav'}>
        {navItems.map(([label, href]) => <a key={href} onClick={() => setOpen(false)} href={href} data-testid={`link-nav-${label.toLowerCase().replaceAll(' ', '-')}`}>{label}</a>)}
        <a href="#contact" className="nav-cta" onClick={() => setOpen(false)}>Start a conversation <ArrowUpRight size={15} /></a>
      </nav>
      <button className="mobile-menu" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} onClick={() => setOpen(!open)} data-testid="button-mobile-menu">{open ? <X /> : <Menu />}</button>
    </div>
  </header>;
}

function Eyebrow({ children, light = false }: { children: string; light?: boolean }) {
  return <div className={`eyebrow ${light ? 'eyebrow-light' : ''}`}><span className="eyebrow-rule" />{children}</div>;
}

function Hero() {
  return <section id="home" className="hero">
    <div className="hero-image" role="img" aria-label="Fresh produce arranged for an agricultural trade market" />
    <div className="hero-wash" />
    <div className="hero-copy">
      <Eyebrow light>AGRICULTURE · FOOD · GLOBAL TRADE</Eyebrow>
      <h1 className="reveal">Global Trade <em>Solutions</em></h1>
      <p className="hero-description reveal reveal-delay-1"><strong className="hero-tagline">Global trade, made human.</strong> A considered approach to agricultural products, food sourcing and international trade — connecting people, products and possibility.</p>
      <div className="hero-actions reveal reveal-delay-2">
        <a className="button button-clay" href="#products">Explore our products <ArrowRight size={16} /></a>
        <a className="button button-quiet" href="#contact">Contact us <ArrowUpRight size={16} /></a>
      </div>
    </div>
    <div className="hero-caption"><span>01 / 04</span><span>From the source, to the world</span><a href="#categories" aria-label="Scroll to product categories"><ArrowDown size={16} /></a></div>
    <div className="hero-stamp"><span>ROOTED<br />IN INDIA</span><span className="stamp-line" /><Globe2 size={17} /></div>
  </section>;
}

function IntroBand() {
  return <section className="intro-band" id="categories">
    <div className="intro-kicker"><span>01</span><span>WHAT WE WORK WITH</span></div>
    <div className="intro-main"><h2 className="font-display">Good trade begins<br />with <em>good understanding.</em></h2>
      <p>From farm-fresh produce to industrial materials, we bring a clear, thoughtful lens to sourcing and cross-border trade opportunities.</p></div>
    <a href="#products" className="text-link">Discover our range <ArrowDownRight size={17} /></a>
  </section>;
}

function Categories() {
  return <section className="section categories-section">
    <div className="section-heading"><div><Eyebrow>THE RANGE</Eyebrow><h2 className="font-display">Products with <em>purpose.</em></h2></div><p>Explore a diverse portfolio shaped by agricultural knowledge and evolving international demand.</p></div>
    <div className="category-grid">
      {categories.map((item) => <a href="#products" className={`category-card ${item.className}`} key={item.number} data-testid={`card-category-${item.number}`}>
        <span className="category-number">{item.number}</span><span className="category-graphic" aria-hidden="true"><span /></span>
        <span className="category-info"><strong>{item.title}</strong><small>{item.sub}</small></span><ArrowUpRight className="category-arrow" size={18} />
      </a>)}
    </div>
  </section>;
}

function Products() {
  return <section className="section products-section" id="products">
    <div className="section-heading"><div><Eyebrow>SELECTED COMMODITIES</Eyebrow><h2 className="font-display">A closer look at<br /><em>what moves.</em></h2></div>
      <p>Product details here are a starting point for conversation. Specifications, origin and availability are confirmed case by case.</p></div>
    <div className="product-grid">
      {products.map((product, i) => <article className="product-card" key={product.name} data-testid={`card-product-${product.name.toLowerCase().replaceAll(' ', '-')}`}>
        <div className={`product-visual product-visual-${i}`} style={{ backgroundImage: `linear-gradient(180deg, transparent 55%, rgba(20,45,36,.19)), url("${imagePath}")`, backgroundPosition: `${product.pos}` }} role="img" aria-label={`${product.name} product visual`}>
          <span className="product-tag">{product.tag}</span><span className="product-index">0{i + 1}</span>
          <span className="product-visual-mark" aria-hidden="true"><Sprout size={26} strokeWidth={1.4} /></span>
        </div>
        <div className="product-copy"><div><h3>{product.name}</h3><p>{product.note}</p></div><a href="#contact" aria-label={`Enquire about ${product.name}`}><ArrowUpRight size={17} /></a></div>
      </article>)}
    </div>
    <div className="product-footnote"><span className="mini-dot" /> Interested in a product not listed? <a href="#contact">Tell us what you’re looking for <ArrowRight size={14} /></a></div>
  </section>;
}

function About() {
  return <section className="about-section" id="about">
    <div className="about-art"><div className="about-photo" role="img" aria-label="Produce sourced from Indian farms" /><div className="about-overprint"><span>FIELD NOTES</span><strong>From Pune,<br />with perspective.</strong><span className="about-overprint-bottom">INDIA <span>18°31′N 73°51′E</span></span></div><div className="about-note">A thoughtful link between<br />origin and opportunity.</div></div>
    <div className="about-copy"><Eyebrow>02 / ABOUT US</Eyebrow><h2 className="font-display">About Us</h2><p className="about-tagline font-display">Trade is more<br />than a <em>transaction.</em></p>
      <div className="about-paragraphs">{company.intro.map((text) => <p key={text}>{text}</p>)}</div>
      <a href="#services" className="text-link">How we approach trade <ArrowUpRight size={16} /></a>
    </div>
  </section>;
}

function Services() {
  return <section className="section services-section" id="services">
    <div className="section-heading"><div><Eyebrow>WAYS WE CAN HELP</Eyebrow><h2 className="font-display">A partner for the<br /><em>whole process.</em></h2></div><p>Practical guidance, considered coordination and a human point of contact at every step.</p></div>
    <div className="services-list">{services.map(([name, text], i) => <article className="service-row" key={name} data-testid={`service-${i + 1}`}><span className="service-n">0{i + 1}</span><h3>{name}</h3><p>{text}</p><ArrowUpRight size={19} className="service-arrow" /></article>)}</div>
  </section>;
}

function Strategy() {
  return <section className="strategy-section">
    <div className="strategy-head"><Eyebrow light>BUILT AROUND CLARITY</Eyebrow><h2 className="font-display">Good decisions<br />travel <em>farther.</em></h2><p>International trade can feel complex. Our approach makes room for better questions, informed choices and dependable connections.</p><a href="#contact" className="button button-outline-light">Talk through an opportunity <ArrowUpRight size={16} /></a></div>
    <div className="strategy-list">{strategy.map(([n, title, text]) => <div className="strategy-item" key={n}><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div><ArrowUpRight size={17} /></div>)}</div>
    <div className="strategy-decoration" aria-hidden="true">K</div>
  </section>;
}

function LegacyDetails() {
  return <section className="legacy-section">
    <div className="legacy-top"><div><Eyebrow>FOR REVIEW BEFORE PUBLISHING</Eyebrow><h2 className="font-display">A note on <em>legacy details.</em></h2></div>
      <p>The figures, credentials, market references, contact details and article topics below were inherited from previous website content. They are editable placeholders only—not verified claims or current operations of KRISHI SARTHAK VENTURES LLP.</p></div>
    <div className="legacy-columns">
      <div className="legacy-block"><div className="legacy-label">LEGACY STATISTICS <span>VERIFY BEFORE USE</span></div><div className="stats-grid">{company.legacyStats.map(([val, label]) => <div className="stat" key={label}><strong>{val}</strong><span>{label}</span></div>)}</div></div>
      <div className="legacy-block"><div className="legacy-label">REGISTRATIONS & CERTIFICATIONS <span>VERIFY BEFORE USE</span></div><ul className="credentials-list">{company.credentials.map((c) => <li key={c}><span>{c}</span><span className="pending-mark">PENDING</span></li>)}</ul></div>
    </div>
  </section>;
}

function News() {
  return <section className="section news-section" id="news">
    <div className="section-heading"><div><Eyebrow>NOTES FROM THE TRADE</Eyebrow><h2 className="font-display">Stories still<br /><em>being checked.</em></h2></div><p>These legacy article topics are retained as editable editorial drafts. Historical claims are not attributed to the company pending confirmation.</p></div>
    <div className="news-grid">{articles.map(([title, copy, label], i) => <article className={`news-card news-card-${i}`} key={title} data-testid={`card-article-${i + 1}`}><div className="news-art" aria-hidden="true"><span className="news-serial">0{i + 1}</span><span className="news-art-word">{i === 0 ? 'ORIGIN' : i === 1 ? 'HARVEST' : 'ROUTE'}</span><MoveUpRight size={24} /></div><div className="news-meta"><span>{label}</span><span>LEGACY DRAFT · VERIFY</span></div><h3>{title}</h3><p>{copy}</p><a href="#contact" className="text-link">Discuss a trade story <ArrowRight size={14} /></a></article>)}</div>
  </section>;
}

function GlobalReach() {
  return <section className="global-section"><div className="global-intro"><Eyebrow light>INTERNATIONAL PERSPECTIVE</Eyebrow><h2 className="font-display">Many markets.<br /><em>One clear start.</em></h2><p>A connection starts with understanding the opportunity, the product and the people on both sides.</p><a href="#contact" className="button button-clay">Start a conversation <ArrowUpRight size={16} /></a></div>
    <div className="global-map" aria-label="Illustrative map of global trade routes"><div className="map-grid" /><div className="map-orbit orbit-one" /><div className="map-orbit orbit-two" /><div className="map-center"><span>KS</span><small>PUNE, INDIA</small></div><span className="map-node node-uae">UAE</span><span className="map-node node-eu">EUROPE</span><span className="map-node node-vn">VIETNAM</span><span className="map-node node-ca">CANADA</span><span className="map-route route-one" /><span className="map-route route-two" /><span className="map-route route-three" /></div>
    <div className="markets-panel"><div className="markets-head">MARKET REFERENCES <span>LEGACY LIST · UNVERIFIED</span></div><div className="market-chips">{legacyMarkets.map((market, i) => <span key={market}><i>0{i + 1}</i>{market}</span>)}</div></div>
  </section>;
}

function Careers() {
  return <section className="careers-section" id="careers"><div className="careers-no">JOIN THE CONVERSATION <span>—</span> 03</div><div><h2 className="font-display">Curious about<br /><em>working together?</em></h2><p>For career conversations and future opportunities, send a note. We’ll be glad to hear from you.</p></div><a href="#contact" className="round-link" aria-label="Contact us about opportunities"><ArrowUpRight /></a></section>;
}

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (event.currentTarget.reportValidity()) {
      setSubmitted(true);
      event.currentTarget.reset();
    }
  }
  return <section className="contact-section" id="contact">
    <div className="contact-head"><Eyebrow light>LET’S TALK TRADE</Eyebrow><h2 className="font-display">An opportunity<br />starts with <em>a hello.</em></h2><p>Share a little about what you’re looking for. This form is prepared for future integration; it does not send or store your details yet.</p>
      <div className="contact-direct"><span>LEGACY CONTACT DETAILS <i>VERIFY BEFORE USE</i></span>{company.contacts.phones.map((p) => <a key={p} href={`tel:${p.replaceAll(' ', '')}`}>{p}</a>)}{company.contacts.emails.map((e) => <a key={e} href={`mailto:${e}`}>{e}</a>)}<address>{company.contacts.address}</address></div>
    </div>
    <div className="form-panel"><div className="form-title"><span>YOUR INQUIRY</span><span>01 — 07</span></div>
      {submitted && <div className="form-confirm" role="status" data-testid="status-form-ready"><Check size={18} /><div><strong>Inquiry details are ready.</strong><span>Form validated locally. Connect an approved endpoint to enable sending.</span></div><button type="button" aria-label="Dismiss confirmation" onClick={() => setSubmitted(false)}><X size={16} /></button></div>}
      <form onSubmit={handleSubmit}>
        <div className="form-row"><label>Full name <input name="fullName" autoComplete="name" required placeholder="Your name" data-testid="input-full-name" /></label><label>Company name <input name="companyName" autoComplete="organization" required placeholder="Your organization" data-testid="input-company-name" /></label></div>
        <div className="form-row"><label>Phone / WhatsApp <input name="phone" type="tel" autoComplete="tel" required pattern="[+0-9() .-]{7,}" placeholder="+91 00000 00000" data-testid="input-phone" /></label><label>Business email <input name="email" type="email" autoComplete="email" required placeholder="you@company.com" data-testid="input-email" /></label></div>
        <div className="form-row"><label>Inquiry type <select name="inquiryType" required defaultValue="" data-testid="select-inquiry-type"><option value="" disabled>Select one</option><option>Product sourcing</option><option>Export opportunity</option><option>Import opportunity</option><option>Trade consultancy</option><option>Logistics & shipment</option><option>Training</option><option>Other</option></select></label><label>Product / category <input name="product" required placeholder="What are you looking for?" data-testid="input-product" /></label></div>
        <label className="message-label">A little more about your inquiry <textarea name="message" required minLength={10} rows={4} placeholder="Tell us about the product, destination, or opportunity..." data-testid="input-message" /></label>
        <div className="form-submit-row"><span>All fields are required. Your details stay in this browser and are not transmitted.</span><button className="button button-clay" type="submit" data-testid="button-submit-inquiry">Prepare inquiry <ArrowUpRight size={16} /></button></div>
      </form>
    </div>
  </section>;
}

function Footer() {
  return <footer className="site-footer"><div className="footer-main"><div className="footer-brand"><BrandMark /><p>A thoughtful approach to agricultural products and international trade, from Pune, India.</p></div><div className="footer-links"><span>EXPLORE</span>{navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</div><div className="footer-reach"><span>GET IN TOUCH</span><a href="#contact">Share an inquiry <ArrowUpRight size={14} /></a><small>Contact details currently listed on this site are legacy placeholders awaiting verification.</small></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} KRISHI SARTHAK VENTURES LLP</span><span>PUNE, MAHARASHTRA · INDIA</span><a href="#home">BACK TO TOP ↑</a></div></footer>;
}

function Home() {
  useEffect(() => {
    document.title = 'KRISHI SARTHAK VENTURES LLP | Global Trade Solutions';
    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement('meta');
      description.setAttribute('name', 'description');
      document.head.appendChild(description);
    }
    description.setAttribute('content', 'KRISHI SARTHAK VENTURES LLP — agricultural products, food sourcing and international trade from Pune, India.');
    const ogTitle = document.querySelector('meta[property="og:title"]') ?? document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    ogTitle.setAttribute('content', 'KRISHI SARTHAK VENTURES LLP | Global Trade Solutions');
    if (!ogTitle.parentNode) document.head.appendChild(ogTitle);
  }, []);
  return <main className="site-grain"><Header /><Hero /><IntroBand /><Categories /><Products /><About /><Services /><Strategy /><LegacyDetails /><News /><GlobalReach /><Careers /><Contact /><Footer /></main>;
}

function Router() {
  return <ErrorBoundary resetKey={useLocation()[0]}><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;
