import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  CircuitBoard,
  ClipboardCheck,
  Gauge,
  Headphones,
  Layers3,
  Menu,
  Microscope,
  ShieldCheck,
  SlidersHorizontal,
  Target,
  Thermometer,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const img = (name) => `/images/${name}`;
const CONTACT_EMAIL = "sales@buydash.co.kr";
const CONTACT_SUCCESS_MESSAGE = "Thank you. Your request has been submitted successfully. BUYDASH will review your requirements and contact you shortly.";
const CONTACT_ERROR_MESSAGE = "Sorry, your request could not be sent. Please email sales@buydash.co.kr directly.";
const CANONICAL_DOMAIN = "https://www.buydash.co.kr";

const pageMeta = {
  "/": {
    title: "BUYDASH | Semiconductor Test Interface Solutions",
    description: "BUYDASH supplies probe cards, burn-in sockets, HTOL/HAST boards and temperature control systems for semiconductor test and reliability applications.",
  },
  "/probe-cards": {
    title: "Probe Card Solutions | BUYDASH",
    description: "Custom probe card configurations for V93000, Magnum2, Astar/S200, J750/J750HD, 3380/3360, S100, D10, V50 and T5830 wafer test platforms.",
  },
  "/burn-in-sockets": {
    title: "Burn-in Socket Solutions | BUYDASH",
    description: "High-reliability burn-in sockets and probe pins for HTOL, HAST and high-temperature semiconductor reliability test environments.",
  },
  "/htol-hast-boards": {
    title: "HTOL / HAST Burn-in Boards | BUYDASH",
    description: "Custom HTOL and HAST burn-in boards, independent temperature-control HTOL boards and mother-daughter board configurations for reliability testing.",
  },
  "/temperature-controllers": {
    title: "6-Channel Temperature Controller | BUYDASH",
    description: "Independent PID temperature control system for burn-in boards, socket heating setups and semiconductor reliability test applications.",
  },
  "/contact": {
    title: "Contact BUYDASH | Request Semiconductor Test Interface Support",
    description: "Submit semiconductor test interface requirements to BUYDASH for probe cards, burn-in sockets, HTOL/HAST boards, temperature controllers and probe pins.",
  },
};

const requiredMessages = {
  name: "Name is required.",
  company: "Company is required.",
  email: "Email is required.",
  productType: "Product Type is required.",
  message: "Message is required.",
};

const initialContactForm = {
  name: "",
  company: "",
  email: "",
  country: "",
  productType: "",
  testPlatform: "",
  packageSize: "",
  pitch: "",
  channelCount: "",
  dpsHvAnalogRequirements: "",
  temperatureRange: "",
  siteCount: "",
  expectedQuantity: "",
  targetApplication: "",
  message: "",
  website: "",
};

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateContactForm(values) {
  const errors = {};

  Object.entries(requiredMessages).forEach(([field, message]) => {
    if (!values[field].trim()) {
      errors[field] = message;
    }
  });

  if (values.email.trim() && !isValidEmail(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  return errors;
}

function setMetaContent(selector, content) {
  const element = document.querySelector(selector);
  if (element) {
    element.setAttribute("content", content);
  }
}

function setCanonicalUrl(url) {
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", url);
}

const navProducts = [
  { label: "Burn-in Sockets", href: "/burn-in-sockets" },
  { label: "HTOL / HAST Boards", href: "/htol-hast-boards" },
  { label: "Temperature Controllers", href: "/temperature-controllers" },
];

const portfolio = [
  {
    title: "Probe Cards",
    text: "Custom wafer test interface solutions.",
    href: "/probe-cards",
    image: "probe-card.png",
  },
  {
    title: "Burn-in Sockets",
    text: "Reliable sockets for HTOL and HAST.",
    href: "/burn-in-sockets",
    image: "burn-in-socket.png",
  },
  {
    title: "HTOL / HAST Boards",
    text: "Custom burn-in boards for reliability testing.",
    href: "/htol-hast-boards",
    image: "htol-hast-board.png",
  },
  {
    title: "Temperature Controllers",
    text: "Independent multi-channel control.",
    href: "/temperature-controllers",
    image: "temperature-controller.png",
  },
  {
    title: "Probe Pins",
    text: "Precision contact components for test interfaces.",
    href: "/burn-in-sockets#probe-pins",
    image: "probe-pins.png",
  },
];

const applications = [
  { title: "Wafer Probe Test", icon: Microscope },
  { title: "HTOL Reliability Test", icon: Thermometer },
  { title: "HAST Stress Test", icon: Gauge },
  { title: "Product Validation", icon: ClipboardCheck },
];

const reasons = [
  {
    title: "Application-Focused Configuration",
    text: "We tailor test interface solutions to match your application and test goals.",
    icon: Target,
  },
  {
    title: "Custom Test Interface Solutions",
    text: "Custom probe cards, sockets, boards and control systems built to your specifications.",
    icon: SlidersHorizontal,
  },
  {
    title: "Reliable Product Quality",
    text: "High-quality materials and strict quality control ensure consistent performance.",
    icon: ShieldCheck,
  },
  {
    title: "Engineering Coordination",
    text: "Our engineering team works closely with you from design to deployment.",
    icon: CircuitBoard,
  },
  {
    title: "Flexible Supply Support",
    text: "Global supply support with responsive communication and on-time delivery.",
    icon: Headphones,
  },
];

const probeGroups = [
  {
    title: "V93000 Probe Cards",
    image: "probe-v93000.png",
    models: ["V93000_PS1600_DPS128_PB_V1", "V93K 12 Inch Generic PCB For WPI"],
  },
  {
    title: "Magnum2 Probe Cards",
    image: "probe-magnum2.png",
    models: ["M2_1280CH_640DPS_PB_V1", "M2_1024CH_512DPS_PB_V1"],
  },
  {
    title: "Astar / S200 Probe Cards",
    image: "probe-card.png",
    models: ["ASTAR_1024CH_64DPS_PB_V1"],
  },
  {
    title: "J750 / J750HD Probe Cards",
    image: "probe-j750hd.png",
    models: [
      "J750HD_1024CH_96DPS_CP_V2",
      "J750HD_300MM_1024CH_96HDDPS_32HDCTO_PC",
      "J750HD-512-W70",
      "J750_512CH_32DPS Rev A",
    ],
  },
  {
    title: "3380 / 3360 Series Probe Cards",
    image: "probe-3380.png",
    models: [
      "C3380P-512 Universal J-Type",
      "C3380P-512-64DPS J-Type",
      "C3380P-512 32x4",
      "C3380-1152 128DPS C-Type",
      "3380P-Q-TYPE-512CH",
      "C3380D-256-CM",
      "C3360-512",
    ],
  },
  {
    title: "S100 / D10 / V50 / T5830",
    image: "hero-probe-card.png",
    models: [
      "YT5100-7D Universal S100-7D",
      "D10_576CH-HDVI_CP",
      "V50-256CH",
      "440MM Universal Probe Card",
    ],
  },
];

const probeSpecs = [
  ["V93000_PS1600_DPS128_PB_V1", "V93000", "1024", "DPS: 128; UR: 64; Analog: 231/431, 232/432", "Ø279.4 mm", "6.35 mm", "Ø70 mm"],
  ["V93K 12 Inch Generic PCB For WPI", "V93000", "1024", "DPS: 225/425, 229/429, MSDPS1, MSDPS2; UR: 48; Analog: 231/431, 232/432", "Ø279.4 mm", "6.35 mm", "Ø60 mm"],
  ["M2_1280CH_640DPS_PB_V1", "Magnum2", "1280", "DPS: 160, 4-way DPS split; HV: N/A", "Ø279.4 mm", "6.35 mm", "140 x 50 mm"],
  ["M2_1024CH_512DPS_PB_V1", "Magnum2", "1024", "DPS: 128, 4-way DPS split; HV: 128, 4-way DPS split", "Ø279.4 mm", "6.35 mm", "140 x 50 mm"],
  ["ASTAR_1024CH_64DPS_PB_V1", "Astar/S200", "1024", "DPS: 64; GPMU: 64; HV: 64; UR: 66", "Ø330 mm", "6.35 mm", "Ø60 mm"],
  ["J750HD_1024CH_96DPS_CP_V2", "J750HD", "1024", "DPS: 96; CTO: 16; BPMU: 16; UR: 40", "Ø304.8 mm", "6.35 mm", "Ø60 mm"],
  ["J750HD_300MM_1024CH_96HDDPS_32HDCTO_PC", "J750HD", "1024", "DPS: 96; CTO: 32; BPMU: 16; UR: 40", "Ø304.8 mm", "6.35 mm", "Ø60 mm"],
  ["J750HD-512-W70", "J750HD", "512", "DPS: 48; CTO: 16; BPMU: 8; UR: 64", "Ø304.8 mm", "6.35 mm", "Ø70 mm"],
  ["J750_512CH_32DPS Rev A", "J750", "512", "DPS: 32; CTO: 8; BPMU: 4; UR: 16", "Ø304.8 mm", "6.35 mm", "Ø50.8 mm"],
  ["C3380P-512 Universal J-Type", "3380P J-Type", "512", "DPS: 64 MLDPS max; UR: 128", "Ø304.8 mm", "6.35 mm", "Ø65 mm"],
  ["C3380P-512-64DPS J-Type", "3380P J-Type", "512", "DPS: 64 MLDPS max; UR: 128", "Ø304.8 mm", "6.35 mm", "112 x 52 mm"],
  ["C3380P-512 32x4", "3380P", "512", "DPS: 128; UR: 128", "Ø304.8 mm", "6.35 mm", "112 x 52 mm"],
  ["C3380-1152 128DPS C-Type", "3380 C-Type", "1152", "DPS: 128 MLDPS max; UR: 128", "Ø337 mm", "6.35 mm", "120 x 60 mm"],
  ["3380P-Q-TYPE-512CH", "3380P Q-Type", "512", "DPS: 64 MLDPS max; UR: 32 + 16", "Ø214 mm", "4.75 mm", "Ø50 mm"],
  ["C3380D-256-CM", "3380D / 3360P2", "256", "DPS: 8 + 16 + 8 DPS for 3380D, 8 DPS for 3360P2; UR: 64 for 3380D, 32 for 3360P2", "313 x 114 mm", "3 mm", "Ø66 mm"],
  ["C3360-512", "3360 G-Type", "512", "DPS: 64 MLDPS max; UR: 32 + 16", "Ø214 mm", "4.75 mm", "Ø50 mm"],
  ["YT5100-7D Universal S100-7D", "S100-7D", "768", "DPS: 48; GPMU: 24; UR: 96", "308 x 238 mm", "5.0 mm", "Ø70 mm"],
  ["D10_576CH-HDVI_CP", "D10-HDVI", "576", "HDVI: 72 Force; MULTIWAVE: 4 Source & 4 Capture; UR: 27", "Ø279.4 mm", "6.35 mm", "Ø72 mm"],
  ["V50-256CH", "V50", "256", "DPS: 8 max; UR: 116", "310 x 114 mm", "3 mm", "Ø41 mm"],
  ["440MM Universal Probe Card", "T5830", "2304", "PPS/DPS: 576; HV: 576 CH", "Ø440 mm", "6.8 mm", "180 x 70 mm"],
];

const socketTypes = [
  {
    title: "Die-cast flip-top rotary shaft type 23 x 30",
    image: "socket-23x30.png",
    specs: ["Chip size: <15 mm", "Pitch: >0.35 mm", "Suitable for signal transmission below 6G", "Metal cover for thermal performance", "Rotary shaft structure reduces lateral chip stress", "HTOL >3000 hours", "HAST >6 cycles", "Temperature: -55°C to 150°C"],
  },
  {
    title: "Injection-molded flip-top knob type 38.5 x 38.5",
    image: "socket-385x385.png",
    specs: ["Chip size: <20 mm", "Pitch: >0.35 mm", "Suitable for signal transmission below 6G", "Adjustable stroke by chip thickness", "HTOL >3000 hours", "HAST >6 cycles", "Temperature: -55°C to 150°C"],
  },
  {
    title: "Injection-molded flip-top knob type 40 x 50",
    image: "socket-40x50.png",
    specs: ["Chip size: <25 mm", "Pitch: >0.35 mm", "Suitable for signal transmission below 6G", "Adjustable stroke by chip thickness", "HTOL >3000 hours", "HAST >6 cycles", "Temperature: -55°C to 150°C", "Optional heater rod and sensor", "Suitable for independent temperature control projects", "Suitable for MCC furnace"],
  },
  {
    title: "Injection-molded flip-top knob type 55 x 65",
    image: "socket-55x65.png",
    specs: ["Chip size: <30 mm", "Pitch: >0.35 mm", "Suitable for signal transmission below 6G", "Knob-axis structure helps prevent chip damage when closing cover", "Suitable for small-size chip multi-site structures", "HTOL >3000 hours", "HAST >6 cycles", "Temperature: -55°C to 150°C", "Optional heater rod and sensor", "Suitable for MCC furnace"],
  },
  {
    title: "High pin count folding type",
    image: "socket-high-pin-count.png",
    specs: ["Chip size: <50 mm", "Pitch: >0.8 mm", "Suitable for signal transmission below 6G", "Metal cover with heat sink for thermal performance", "Rotary shaft pressure structure reduces lateral chip stress", "HTOL >3000 hours", "HAST >6 cycles", "Temperature: -55°C to 150°C", "Optional heater rod and sensor"],
  },
];

const boardSpecs = [
  ["DL600 Platform HTOL Board", "HTOL Burn-in Boards", "450 mm x 570 mm", "10", "HI-TG FR4", "15 x 15 mm", "0.65 mm", "4 Row x 4 Col = 16 positions", "htol-dl600.png"],
  ["DL601H Platform HTOL Board", "HTOL Burn-in Boards", "450 mm x 570 mm", "12", "HI-TG FR4", "19 x 19 mm", "0.65 mm", "3 Row x 4 Col = 12 positions", "htol-dl601h.png"],
  ["HTOL Board", "HTOL Burn-in Boards", "450 mm x 500 mm", "8", "HI-TG FR4", "35 x 35 mm", "1.00 mm", "2 Row x 4 Col = 8 positions", "htol-hast-board.png"],
  ["Independent Temperature-Control HTOL Board", "Independent Temperature-Control HTOL Boards", "610 mm x 540 mm", "14", "HI-TG FR4", "25 x 25 mm", "0.65 mm", "2 Row x 3 Col = 6 positions", "hero-htol-board.png"],
  ["HAST Burn-in Board", "HAST Burn-in Boards", "300 mm x 450 mm", "4", "Polyimide", "20 x 20 mm", "0.40 mm", "4 Row x 5 Col = 20 positions", "hast-board.png"],
  ["HAST Mother-Daughter Board", "HAST Mother-Daughter Boards", "270 mm x 348 mm + 62 mm x 72 mm", "6 + 6", "Polyimide", "14 x 14 mm", "0.55 mm", "6 Row x 4 Col = 24 positions", "hast-mother-daughter.png"],
];

const controllerSpecs = [
  ["Temperature Range", "25°C to 200°C heating mode"],
  ["Temperature Control Accuracy", "±0.2°C"],
  ["Total Power Input", "DC 24V / 15A"],
  ["Single Channel Current Limit", "2.5A"],
  ["Input Signal", "PT100 or K-type thermocouple"],
  ["Control Output", "6-channel PID adjustment, 6-channel control output"],
  ["Max Output Per Channel", "DC 24V / 2.5A"],
  ["Sampling Speed", "1 second for all channels, maximum 6 channels"],
  ["Communication", "RS485, standard MODBUS RTU protocol"],
  ["Size", "180 x 140 x 150 mm"],
  ["Monitoring Software", "Supported"],
];

function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const update = () => setPath(window.location.pathname);
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);

  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => document.querySelector(window.location.hash)?.scrollIntoView({ behavior: "smooth" }), 80);
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [path]);

  useEffect(() => {
    const meta = pageMeta[path] || pageMeta["/"];
    const canonicalUrl = `${CANONICAL_DOMAIN}${path === "/" ? "/" : path}`;

    document.title = meta.title;
    setMetaContent('meta[name="description"]', meta.description);
    setMetaContent('meta[property="og:title"]', meta.title);
    setMetaContent('meta[property="og:description"]', meta.description);
    setMetaContent('meta[property="og:url"]', canonicalUrl);
    setMetaContent('meta[name="twitter:title"]', meta.title);
    setMetaContent('meta[name="twitter:description"]', meta.description);
    setCanonicalUrl(canonicalUrl);
  }, [path]);

  const page = useMemo(() => {
    switch (path) {
      case "/probe-cards":
        return <ProbeCardsPage />;
      case "/burn-in-sockets":
        return <BurnInSocketsPage />;
      case "/htol-hast-boards":
        return <BoardsPage />;
      case "/temperature-controllers":
        return <TemperatureControllersPage />;
      case "/contact":
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  }, [path]);

  return (
    <>
      <Header />
      <main>{page}</main>
      <Footer />
    </>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const go = (event, href) => {
    if (href.startsWith("/")) {
      event.preventDefault();
      history.pushState({}, "", href);
      window.dispatchEvent(new PopStateEvent("popstate"));
      if (href.includes("#")) {
        const [, hash] = href.split("#");
        setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" }), 80);
      }
      setOpen(false);
    }
  };

  return (
    <header className="site-header">
      <a className="brand" href="/" onClick={(e) => go(e, "/")}>
        <span className="brand-mark">B</span>
        <span>
          <strong>BUYDASH</strong>
          <small>Semiconductor Test Interfaces</small>
        </span>
      </a>
      <button className="nav-toggle" type="button" aria-label="Open navigation" onClick={() => setOpen(!open)}>
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      <nav className={open ? "nav open" : "nav"}>
        <a href="/" onClick={(e) => go(e, "/")}>Home</a>
        <a href="/probe-cards" onClick={(e) => go(e, "/probe-cards")}>Probe Cards</a>
        <div className="nav-dropdown">
          <button type="button">Burn-in Solutions <ChevronDown size={15} /></button>
          <div className="dropdown-menu">
            {navProducts.map((item) => (
              <a key={item.href} href={item.href} onClick={(e) => go(e, item.href)}>{item.label}</a>
            ))}
          </div>
        </div>
        <a href="/#applications" onClick={(e) => go(e, "/#applications")}>Applications</a>
        <a href="/#about" onClick={(e) => go(e, "/#about")}>About</a>
        <a href="/contact" onClick={(e) => go(e, "/contact")}>Contact</a>
      </nav>
    </header>
  );
}

function HomePage() {
  return (
    <>
      <section className="hero home-hero">
        <div className="hero-copy">
          <p className="eyebrow">BUYDASH Semiconductor Test Interfaces</p>
          <h1>Probe Card & Burn-in Test Interface Solutions</h1>
          <p className="hero-text">BUYDASH supplies probe cards, burn-in sockets, HTOL/HAST boards and temperature control systems for semiconductor test and reliability applications.</p>
          <div className="hero-actions">
            <a className="primary-btn" href="#products">View Products <ArrowRight size={17} /></a>
            <a className="secondary-btn" href="/contact">Request a Quote</a>
          </div>
          <div className="hero-metrics">
            <Metric value="Up to 2304" label="Digital Channels" />
            <Metric value="-55°C to 150°C" label="Temperature Range" />
            <Metric value="HTOL / HAST" label="Reliability Solutions" />
          </div>
        </div>
        <div className="hero-collage" aria-label="BUYDASH product collage">
          <img className="collage-board" src={img("hero-htol-board.png")} alt="HTOL board" />
          <img className="collage-probe" src={img("hero-probe-card.png")} alt="Probe card" />
          <img className="collage-controller" src={img("hero-temperature-controller.png")} alt="Temperature controller" />
          <img className="collage-socket" src={img("hero-burnin-socket.png")} alt="Burn-in socket" />
          <img className="collage-pins" src={img("probe-pins.png")} alt="Probe pins" />
        </div>
      </section>

      <section id="products" className="section">
        <SectionHeading label="Product Portfolio" title="Configurable test interface supply for wafer test and reliability programs" />
        <div className="portfolio-grid">
          {portfolio.map((item) => (
            <a className="product-card" key={item.title} href={item.href}>
              <img src={img(item.image)} alt={item.title} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <span>View More <ArrowRight size={16} /></span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section id="applications" className="section applications-band">
        <div className="applications-intro">
          <h2>Applications</h2>
          <p>BUYDASH supports interface configurations for wafer probe, burn-in, reliability stress testing and validation workflows.</p>
        </div>
        <div className="application-grid">
          {applications.map(({ title, icon: Icon }) => (
            <article className="application-card" key={title}>
              <Icon size={34} />
              <h3>{title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="section dark-section">
        <SectionHeading label="Why Choose Buydash" title="Technical sourcing support built around your test application" />
        <div className="reason-grid">
          {reasons.map(({ title, text, icon: Icon }) => (
            <article className="reason-card" key={title}>
              <Icon size={30} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <Cta title="Need a custom probe card or burn-in solution?" text="Send us your test requirements and our team will help identify the right configuration for your application." />
    </>
  );
}

function ProbeCardsPage() {
  return (
    <>
      <PageHero
        label="Probe Cards"
        title="Probe Card Solutions"
        text="Custom probe card configurations for semiconductor wafer test platforms, supporting high-density digital channels, DPS/HV resources, custom dimensions and platform-specific interface requirements."
        image="hero-probe-card.png"
      />
      <section className="section split-section">
        <div>
          <p className="eyebrow">Overview</p>
          <h2>Platform-specific probe card configurations</h2>
          <p>BUYDASH supports probe card configurations for major wafer test platforms including V93000, Magnum2, Astar/S200, J750/J750HD, 3380/3360 series, S100-7D, D10-HDVI, V50 and T5830.</p>
        </div>
        <img className="feature-image" src={img("probe-card.png")} alt="Probe card detail" />
      </section>
      <section className="section">
        <SectionHeading label="Model Groups" title="Probe cards grouped by platform" />
        <div className="model-grid">
          {probeGroups.map((group) => <ModelCard key={group.title} {...group} />)}
        </div>
      </section>
      <section className="section table-section">
        <SectionHeading label="Specifications" title="Probe card specification matrix" />
        <ResponsiveTable
          headers={["Model", "Platform", "Digital Channels", "DPS / HV / Analog", "Size", "Thickness", "Window Size"]}
          rows={probeSpecs}
        />
      </section>
      <ApplicationStrip items={["Wafer probe test", "High-density digital test", "Mixed-signal interface", "Platform conversion projects"]} />
      <Cta title="Need a probe card for a specific test platform?" text="Send your platform, channel count, DPS/HV requirements, window size and application details." />
    </>
  );
}

function BurnInSocketsPage() {
  return (
    <>
      <PageHero
        label="Burn-in Sockets"
        title="Burn-in Socket Solutions"
        text="High-reliability burn-in sockets for HTOL, HAST and high-temperature semiconductor reliability test environments."
        image="hero-burnin-socket.png"
      />
      <section className="section table-section">
        <SectionHeading label="Mechanical & Electrical" title="Core socket characteristics" />
        <ResponsiveTable
          headers={["Parameter", "Value"]}
          rows={[
            ["Bandwidth @ -1dB", ">2.5GHz"],
            ["Current", ">2A"],
            ["Inductance", "1.27nH"],
            ["Capacitance", "0.27pF"],
            ["Resistance", "<200mΩ AVG"],
            ["Temperature Range", "-55°C to 150°C"],
            ["Lifetime", ">3000 hours"],
          ]}
        />
      </section>
      <section className="section">
        <SectionHeading label="Socket Types" title="Configurable socket structures for reliability test" />
        <div className="type-grid">
          {socketTypes.map((type) => (
            <article className="type-card" key={type.title}>
              <img src={img(type.image)} alt={type.title} />
              <div>
                <h3>{type.title}</h3>
                <ul>{type.specs.map((spec) => <li key={spec}>{spec}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section id="probe-pins" className="section split-section">
        <div>
          <p className="eyebrow">Contact Components</p>
          <h2>Probe Pins</h2>
          <p>Precision contact components used in burn-in socket and test interface applications, supporting stable electrical contact and long operating lifetime.</p>
          <div className="pill-row">
            <span>0.35 pitch</span>
            <span>0.4 pitch</span>
            <span>0.8 pitch</span>
          </div>
        </div>
        <img className="feature-image contain" src={img("probe-pins.png")} alt="Probe pins" />
      </section>
      <ApplicationStrip items={["HTOL socket programs", "HAST stress testing", "High-temperature validation", "Multi-site burn-in boards"]} />
      <Cta title="Need a burn-in socket configuration?" text="Send package size, pitch, temperature target, site count and reliability test conditions." />
    </>
  );
}

function BoardsPage() {
  const groups = ["HTOL Burn-in Boards", "Independent Temperature-Control HTOL Boards", "HAST Burn-in Boards", "HAST Mother-Daughter Boards"];
  return (
    <>
      <PageHero
        label="HTOL / HAST Boards"
        title="HTOL / HAST Burn-in Boards"
        text="Custom burn-in boards for high-temperature operating life tests and highly accelerated stress test environments."
        image="hero-htol-board.png"
      />
      <section className="section">
        <SectionHeading label="Board Families" title="Reliability board configurations" />
        <div className="board-family-grid">
          {groups.map((group) => (
            <article className="family-card" key={group}>
              <Layers3 size={32} />
              <h3>{group}</h3>
              <p>Custom board layout, socket arrangement and material stack-up can be configured by package and test condition.</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section">
        <SectionHeading label="Product Images" title="Board examples from reliability test applications" />
        <div className="image-card-grid">
          {boardSpecs.map((row) => (
            <article className="image-card" key={row[0]}>
              <img src={img(row[8])} alt={row[0]} />
              <h3>{row[0]}</h3>
              <p>{row[1]}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section table-section">
        <SectionHeading label="Specifications" title="HTOL and HAST board specification table" />
        <ResponsiveTable
          headers={["Product", "Category", "Size", "Layers", "Material", "Package", "Pitch", "Site"]}
          rows={boardSpecs.map((row) => row.slice(0, 8))}
        />
      </section>
      <ApplicationStrip items={["High-temperature operating life", "Highly accelerated stress test", "Independent temperature control", "Mother-daughter board setups"]} />
      <Cta title="Need a custom HTOL or HAST board?" text="Send package, pitch, site count, board size limits, socket type and chamber or platform requirements." />
    </>
  );
}

function TemperatureControllersPage() {
  return (
    <>
      <PageHero
        label="Temperature Controllers"
        title="6-Channel Temperature Controller"
        text="Independent PID temperature control system for burn-in and semiconductor reliability test setups."
        image="hero-temperature-controller.png"
      />
      <section className="section split-section">
        <div>
          <p className="eyebrow">Key Features</p>
          <h2>Independent multi-channel control</h2>
          <ul className="check-list">
            {[
              "6-channel independent control",
              "PID temperature adjustment",
              "PT100 or K-type thermocouple input",
              "RS485 / MODBUS RTU communication",
              "Monitoring software support",
              "Suitable for burn-in and reliability test setups",
            ].map((item) => <li key={item}><CheckCircle2 size={18} /> {item}</li>)}
          </ul>
        </div>
        <img className="feature-image contain" src={img("temperature-controller.png")} alt="6-channel temperature controller" />
      </section>
      <section className="section table-section">
        <SectionHeading label="Technical Specifications" title="Controller specification table" />
        <ResponsiveTable headers={["Item", "Specification"]} rows={controllerSpecs} />
      </section>
      <ApplicationStrip items={["Socket heating setups", "Independent HTOL boards", "Reliability lab fixtures", "Temperature validation workflows"]} />
      <Cta title="Need temperature control for a burn-in setup?" text="Send channel count, input sensor type, power requirements, temperature range and board configuration." />
    </>
  );
}

function ContactPage() {
  const [formData, setFormData] = useState(initialContactForm);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setFieldErrors((current) => {
      if (!current[name]) {
        return current;
      }
      const next = { ...current };
      delete next[name];
      return next;
    });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setFormStatus({ type: "", message: "" });

    const errors = validateContactForm(formData);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setFormData(initialContactForm);
      setFieldErrors({});
      setFormStatus({ type: "success", message: CONTACT_SUCCESS_MESSAGE });
    } catch (error) {
      setFormStatus({ type: "error", message: CONTACT_ERROR_MESSAGE });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputFields = [
    { label: "Name", name: "name", required: true },
    { label: "Company", name: "company", required: true },
    { label: "Email", name: "email", type: "email", required: true },
    { label: "Country", name: "country" },
  ];

  const secondaryFields = [
    { label: "Target Application", name: "targetApplication" },
    { label: "Test Platform", name: "testPlatform" },
    { label: "Package Size", name: "packageSize" },
    { label: "Pitch", name: "pitch" },
    { label: "Channel Count", name: "channelCount" },
    { label: "DPS / HV / Analog Requirements", name: "dpsHvAnalogRequirements" },
    { label: "Temperature Range", name: "temperatureRange" },
    { label: "Site Count", name: "siteCount" },
    { label: "Expected Quantity", name: "expectedQuantity" },
  ];

  return (
    <>
      <PageHero
        label="Request a Quote"
        title="Contact / Request a Quote"
        text="Submit your technical requirements through the request form. BUYDASH will review your application and help identify the right configuration."
        visual={<ContactHeroVisual />}
      />
      <section className="section contact-section">
        <form className="quote-form" onSubmit={submitForm} noValidate>
          <div className="form-intro full">
            <p className="eyebrow">Technical Request Form</p>
            <h2>Share your test requirements through the request form</h2>
            <p>Use the request form to submit package details, pitch, platform, channel count, DPS/HV needs, temperature range, site count and application goals. The BUYDASH team will review the information and follow up by email.</p>
            <p className="form-note">For drawings or technical documents, please mention them in the message. Our team will follow up by email.</p>
          </div>
          <label className="honeypot" aria-hidden="true">
            <span>Website</span>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={updateField}
              tabIndex="-1"
              autoComplete="off"
            />
          </label>
          {inputFields.map((field) => (
            <label key={field.name}>
              <span>{field.label}{field.required ? " *" : ""}</span>
              <input
                type={field.type || "text"}
                name={field.name}
                value={formData[field.name]}
                onChange={updateField}
                placeholder={field.label}
                aria-invalid={fieldErrors[field.name] ? "true" : "false"}
                aria-describedby={fieldErrors[field.name] ? `${field.name}-error` : undefined}
              />
              {fieldErrors[field.name] ? <span className="field-error" id={`${field.name}-error`}>{fieldErrors[field.name]}</span> : null}
            </label>
          ))}
          <label>
            <span>Product Type *</span>
            <select
              name="productType"
              value={formData.productType}
              onChange={updateField}
              aria-invalid={fieldErrors.productType ? "true" : "false"}
              aria-describedby={fieldErrors.productType ? "productType-error" : undefined}
            >
              <option value="" disabled>Select product type</option>
              {["Probe Card", "Burn-in Socket", "HTOL / HAST Board", "Temperature Controller", "Probe Pins", "Custom Solution"].map((type) => <option key={type}>{type}</option>)}
            </select>
            {fieldErrors.productType ? <span className="field-error" id="productType-error">{fieldErrors.productType}</span> : null}
          </label>
          {secondaryFields.map((field) => (
            <label key={field.name}>
              <span>{field.label}</span>
              <input
                type="text"
                name={field.name}
                value={formData[field.name]}
                onChange={updateField}
                placeholder={field.label}
              />
            </label>
          ))}
          <label className="full">
            <span>Message *</span>
            <textarea
              name="message"
              value={formData.message}
              onChange={updateField}
              rows="6"
              placeholder="Share test conditions, package details, target schedule and any special requirements."
              aria-invalid={fieldErrors.message ? "true" : "false"}
              aria-describedby={fieldErrors.message ? "message-error" : undefined}
            />
            {fieldErrors.message ? <span className="field-error" id="message-error">{fieldErrors.message}</span> : null}
          </label>
          {formStatus.message ? (
            <p className={`form-status ${formStatus.type}`} role="status">{formStatus.message}</p>
          ) : null}
          <button className="primary-btn form-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Submit Request"} <ArrowRight size={17} />
          </button>
        </form>
        <aside className="contact-aside">
          <h2>BUYDASH</h2>
          <p>Semiconductor Test Interfaces</p>
          <dl>
            <div><dt>Email</dt><dd><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></dd></div>
            <div><dt>Business Registration No.</dt><dd>189-07-02993</dd></div>
            <div><dt>Mail-order Business Registration No.</dt><dd>2024-Gyeonggi Ansan-3370</dd></div>
            <div><dt>Location</dt><dd>Ansan-si, Gyeonggi-do, Republic of Korea</dd></div>
          </dl>
        </aside>
      </section>
    </>
  );
}

function PageHero({ label, title, text, image, visual }) {
  return (
    <section className="hero page-hero">
      <div className="hero-copy">
        <p className="eyebrow">{label}</p>
        <h1>{title}</h1>
        <p className="hero-text">{text}</p>
        <div className="hero-actions">
          <a className="primary-btn" href="/contact">Request a Quote <ArrowRight size={17} /></a>
        </div>
      </div>
      <div className="page-hero-visual">
        {visual || <img src={img(image)} alt={title} />}
      </div>
    </section>
  );
}

function ContactHeroVisual() {
  return (
    <div className="contact-hero-visual" aria-label="BUYDASH test interface products">
      <img className="contact-hero-probe" src={img("probe-card.png")} alt="Probe card" />
      <img className="contact-hero-socket" src={img("burn-in-socket.png")} alt="Burn-in socket" />
      <img className="contact-hero-controller" src={img("temperature-controller.png")} alt="Temperature controller" />
    </div>
  );
}

function Metric({ value, label }) {
  return (
    <div>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function SectionHeading({ label, title }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{label}</p>
      <h2>{title}</h2>
    </div>
  );
}

function ModelCard({ title, image, models }) {
  return (
    <article className="model-card">
      <img src={img(image)} alt={title} />
      <h3>{title}</h3>
      <ul>{models.map((model) => <li key={model}>{model}</li>)}</ul>
    </article>
  );
}

function ResponsiveTable({ headers, rows }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={`${row[0]}-${idx}`}>{row.map((cell, cellIdx) => <td key={`${cell}-${cellIdx}`}>{cell || "—"}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ApplicationStrip({ items }) {
  return (
    <section className="section application-strip">
      {items.map((item) => (
        <article key={item}>
          <Zap size={22} />
          <span>{item}</span>
        </article>
      ))}
    </section>
  );
}

function Cta({ title, text }) {
  return (
    <section className="cta-section">
      <div>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <a className="primary-btn" href="/contact">Request a Quote <ArrowRight size={17} /></a>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <h2>BUYDASH</h2>
        <p>Semiconductor Test Interfaces</p>
      </div>
      <div className="footer-info">
        <p><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
        <p>Business Registration No. 189-07-02993</p>
        <p>Mail-order Business Registration No. 2024-Gyeonggi Ansan-3370</p>
        <p>Ansan-si, Gyeonggi-do, Republic of Korea</p>
      </div>
    </footer>
  );
}

export default App;
