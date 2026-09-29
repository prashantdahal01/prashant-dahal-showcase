import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Check, Code2, Database, Menu, Send, Server, ShieldCheck, Terminal, Wrench, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";

import busImage from "../assets/bus-booking-editorial.jpg";
import portfolioImage from "../assets/portfolio-editorial.jpg";
import { PortfolioButton } from "../components/PortfolioButton";

const description =
  "Portfolio of Prashant Dahal, a BCA graduate and junior full-stack developer from Nepal focused on React, Node.js, APIs, databases, testing and technical support.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prashant Dahal — Software & Web Developer" },
      { name: "description", content: description },
      { property: "og:title", content: "Prashant Dahal — Software & Web Developer" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.prashant-dahal.com.np/" },
      { property: "og:image", content: "https://www.prashant-dahal.com.np/profile-favicon.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://www.prashant-dahal.com.np/profile-favicon.png" },
    ],
    links: [{ rel: "canonical", href: "https://www.prashant-dahal.com.np/" }],
  }),
  component: Portfolio,
});

const GITHUB_URL = "https://github.com/prashantdahal01";
const LINKEDIN_URL = "https://www.linkedin.com/in/prashant-dahal-ba7564234/";
const EMAIL = "prashantdahal27@gmail.com";
const RESUME_PATH = "/assets/Prashant_Dahal_CV.pdf";
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xrpbkbwk";
const PHONE = "Phone available on request";
const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

function ResumeButton({ solid }: { solid?: boolean }) {
  return <a className={`portfolio-link ${solid ? "portfolio-link--solid" : ""}`} href={RESUME_PATH} download>DOWNLOAD CV <ArrowDown size={14} /></a>;
}

const technologies = ["React.js", "JavaScript", "Node.js", "Express.js", "MongoDB", "REST APIs", "Testing"];

const skillGroups = [
  { label: "Frontend", icon: Code2, skills: ["HTML", "CSS", "JavaScript", "React.js", "Vite", "Responsive Design"] },
  { label: "Backend", icon: Server, skills: ["Node.js", "Express.js", "REST APIs"] },
  { label: "Database", icon: Database, skills: ["MongoDB", "Mongoose", "MySQL"] },
  { label: "Development Tools", icon: Terminal, skills: ["Git", "GitHub", "VS Code", "Postman"] },
  { label: "Testing", icon: ShieldCheck, skills: ["Functional Testing", "UI Testing", "API Testing", "Bug Identification", "Debugging"] },
  { label: "Development", icon: Wrench, skills: ["API Integration", "Full Stack Development", "CMS", "Computer Troubleshooting", "Technical Support", "Documentation"] },
];

const services = [
  ["01", "Full-Stack Web Development", "Practical web applications built from interface to API and database."],
  ["02", "Front-End Development", "Responsive, accessible interfaces using React and modern JavaScript."],
  ["03", "Back-End & REST APIs", "Clear server logic, integrations and data flows with Node.js and Express."],
  ["04", "Database Integration", "Connected MongoDB and MySQL data models for real product workflows."],
  ["05", "Software Testing", "Functional, UI and API checks that help find issues before release."],
  ["06", "Technical Support", "Troubleshooting, documentation and practical IT problem solving."],
  ["07", "UI / Responsive Design", "Clear interfaces that adapt across phones, tablets and large screens."],
  ["08", "Software Development", "Small, focused systems shaped around useful workflows and real needs."],
];

const professionalRoles = [
  "Full Stack Developer", "Web Developer", "Front-End Developer", "Back-End Developer",
  "Software Developer", "IT Support / Technical Support", "QA / Software Testing", "MERN Stack Developer",
];

const capabilities = [
  ["01", "Full-Stack Development", "Building complete web applications from frontend to backend."],
  ["02", "Frontend Development", "Creating responsive and interactive interfaces using React and modern JavaScript."],
  ["03", "Backend Development", "Building REST APIs, authentication, business logic and database systems."],
  ["04", "UI / Web Experience", "Creating clean, usable and modern interfaces."],
  ["05", "Problem Solving", "Designing practical technical solutions for real-world problems."],
];

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const cursorRef = useRef<HTMLDivElement>(null);
  const heroBackdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.classList.add("js-enabled");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const introSeen = window.sessionStorage.getItem("pd-intro-seen") === "true";
    const finishIntro = () => {
      window.sessionStorage.setItem("pd-intro-seen", "true");
      setLoading(false);
    };
    const timer = reducedMotion || introSeen ? undefined : window.setTimeout(finishIntro, 1900);
    if (reducedMotion || introSeen) setLoading(false);

    const moveCursor = (event: PointerEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      }
    };
    let frame = 0;
    const moveHeroBackdrop = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (heroBackdropRef.current) {
          const offset = Math.min(window.scrollY * 0.16, 150);
          heroBackdropRef.current.style.transform = `translate3d(0, ${offset}px, 0) scale(1.08)`;
        }
      });
    };
    window.addEventListener("pointermove", moveCursor);
    window.addEventListener("scroll", moveHeroBackdrop, { passive: true });
    return () => {
      document.documentElement.classList.remove("js-enabled");
      if (timer) window.clearTimeout(timer);
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", moveCursor);
      window.removeEventListener("scroll", moveHeroBackdrop);
    };
  }, []);

  const skipIntro = () => {
    window.sessionStorage.setItem("pd-intro-seen", "true");
    setLoading(false);
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navigateTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formState === "sending") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim().slice(0, 100);
    const email = String(data.get("email") ?? "").trim().slice(0, 255);
    const message = String(data.get("message") ?? "").trim().slice(0, 2000);
    if (!FORMSPREE_ENDPOINT) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
      const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
      return;
    }
    setFormState("sending");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 12000);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
        signal: controller.signal,
      });
      if (!res.ok) throw new Error();
      form.reset();
      setFormState("sent");
    } catch {
      setFormState("error");
    } finally {
      window.clearTimeout(timeout);
    }
  };

  return (
    <div className="portfolio-shell">
      <a href="#main" className="skip-link">Skip to content</a>
      <div className={`loader ${loading ? "" : "loader--hidden"}`} aria-hidden={!loading}>
        <div className="loader__grid" aria-hidden="true" />
        <div className="loader__content">
          <p className="loader__eyebrow">PRASHANT DAHAL / PORTFOLIO</p>
          <div className="loader__name"><span>PRASHANT</span><span>DAHAL<i>.</i></span></div>
          <div className="loader__line"><span /></div>
          <p className="loader__caption">FULL-STACK DEVELOPER · NEPAL</p>
        </div>
        <button className="loader__skip" type="button" onClick={skipIntro}>SKIP INTRO <ArrowUpRight size={14} /></button>
      </div>

      <div ref={cursorRef} className="custom-cursor" aria-hidden="true"><span>VIEW</span></div>

      <header className="site-header">
        <PortfolioButton className="wordmark" tone="ghost" onClick={() => navigateTo("top")} aria-label="Go to top">PRASHANT DAHAL<span>.</span></PortfolioButton>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {[["HOME", "top"], ["ABOUT", "about"], ["SKILLS", "skills"], ["PROJECTS", "work"], ["EXPERIENCE", "experience"], ["CONTACT", "contact"]].map(([label, id]) => (
            <PortfolioButton key={id} tone="ghost" onClick={() => id && navigateTo(id)}>{label}</PortfolioButton>
          ))}
          <PortfolioButton tone="ghost" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            MENU <Menu size={15} strokeWidth={1.5} />
          </PortfolioButton>
        </nav>
        <PortfolioButton className="mobile-menu-button" tone="ghost" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <Menu size={20} />
        </PortfolioButton>
      </header>

      <div className={`menu-overlay ${menuOpen ? "menu-overlay--open" : ""}`} aria-hidden={!menuOpen}>
        <PortfolioButton className="menu-close" tone="ghost" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X /></PortfolioButton>
        <p className="eyebrow">NAVIGATION / 2026</p>
        <nav aria-label="Mobile navigation">
          {[["01", "HOME", "top"], ["02", "ABOUT", "about"], ["03", "SKILLS", "skills"], ["04", "PROJECTS", "work"], ["05", "EXPERIENCE", "experience"], ["06", "CONTACT", "contact"]].map(([number, label, id]) => (
            <PortfolioButton key={id} tone="ghost" onClick={() => id && navigateTo(id)}><span>{number}</span>{label}<ArrowUpRight /></PortfolioButton>
          ))}
        </nav>
      </div>

      <main id="main">
        <section id="top" className="hero" aria-labelledby="hero-title">
          <div ref={heroBackdropRef} className="hero__backdrop" aria-hidden="true" style={{ backgroundImage: `url(${portfolioImage})` }} />
          <div className="hero__kicker"><span>PORTFOLIO / 2026</span><span>FULL-STACK DEVELOPMENT</span></div>
          <h1 id="hero-title" className="hero__title">
            <span className="hero-line">PRASHANT</span>
            <span className="hero-line hero-line--indent">DAHAL<span className="accent-dot">.</span></span>
          </h1>
          <div className="hero__lower">
            <div className="hero__role"><span>FULL-STACK DEVELOPER</span><small>WEB · SOFTWARE · MERN</small></div>
            <div className="hero__intro">
              <p>I build modern web applications and solve practical technical problems across front-end, back-end, databases, APIs, testing and support.</p>
              <div className="hero__roles" aria-label="Professional focus areas">{professionalRoles.slice(0, 3).map((role) => <span key={role}>{role}</span>)}</div>
            </div>
            <div className="hero__cta"><PortfolioButton tone="solid" onClick={() => navigateTo("work")}>VIEW PROJECTS <ArrowUpRight size={15} /></PortfolioButton><ResumeButton /><PortfolioButton tone="ghost" onClick={() => navigateTo("contact")}>CONTACT ME <ArrowUpRight size={15} /></PortfolioButton></div>
          </div>
          <div className="hero__footer">
            <span>BASED IN NEPAL</span><span className="status"><i /> AVAILABLE FOR OPPORTUNITIES</span>
            <PortfolioButton tone="ghost" onClick={() => navigateTo("about")}>SCROLL TO EXPLORE <ArrowDown size={15} /></PortfolioButton>
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="section-index"><span>01</span><span>ABOUT</span></div>
          <div className="about-grid">
            <h2 data-reveal>ABOUT<br /><em>ME</em><span className="accent-dot">.</span></h2>
            <div className="about-copy" data-reveal>
              <p className="lead">I&apos;m Prashant Dahal, a BCA graduate building a foundation in full-stack web and software development.</p>
              <div className="about-copy__columns">
                <p>My work spans React interfaces, Node.js backends, REST API development, MongoDB and MySQL integration, software testing, debugging and technical support.</p>
                <p>I&apos;m continuously learning through real projects, with a focus on clear systems, usable experiences and reliable problem solving.</p>
              </div>
              <div className="contact-actions"><ResumeButton solid /><a className="portfolio-link" href={GITHUB_URL} {...ext}>GITHUB <ArrowUpRight /></a></div>
            </div>
            <div className="orbit" aria-hidden="true" data-reveal><span className="orbit__core">PD</span><i /><i /><i /></div>
          </div>
        </section>

        <section className="stack-section" aria-labelledby="stack-title">
          <div className="section-index"><span>02</span><span id="stack-title">WHAT I WORK WITH</span></div>
          {[0, 1].map((row) => (
            <div className={`marquee ${row ? "marquee--reverse" : ""}`} key={row} aria-hidden={row === 1}>
              <div className="marquee__track">{[...technologies, ...technologies].map((technology, index) => <span key={`${technology}-${index}`}>{technology}<i>✦</i></span>)}</div>
            </div>
          ))}
        </section>

        <section id="work" className="section work-section">
          <div className="section-index"><span>03</span><span>FEATURED PROJECTS</span></div>
          <div className="section-heading" data-reveal><h2>SELECTED<br /><em>WORK</em><span className="accent-dot">.</span></h2><p>Real projects. Thoughtful systems.<br />Built to solve practical problems.</p></div>
          <Project number="01" title="BUS BOOKING SYSTEM" category="FULL-STACK WEB APPLICATION" description="A MERN-based bus ticket booking platform designed for customers, operators and administrators. Includes route and schedule search, seat selection, temporary seat locking, booking management, online payment flow and e-ticket generation." technologies={["React.js", "Node.js", "Express.js", "MongoDB"]} features={["Booking and seat management", "Route and schedule management", "Payment integration", "Admin dashboard"]} liveUrl="https://smartbusbooking-1.onrender.com/" repoUrl="https://github.com/prashantdahal01/smartbusbooking" image={busImage} alt="Abstract map, bus and seat layout artwork representing a bus booking platform" />
          <Project number="02" title="PERSONAL PORTFOLIO" category="WEB DEVELOPMENT" description="A modern personal portfolio designed to showcase my development work, technical skills and projects through an interactive user experience." technologies={["React", "JavaScript", "CSS", "Vite"]} features={["Responsive editorial layout", "Accessible contact form", "Project showcase"]} image={portfolioImage} alt="Abstract browser and typographic artwork representing a creative developer portfolio" reverse />
        </section>

        <section id="services" className="section services-section">
          <div className="section-index"><span>04</span><span>SERVICES / FOCUS</span></div>
          <div className="section-heading"><h2>WHAT I<br /><em>CAN DO</em><span className="accent-dot">.</span></h2><p>Junior-friendly, practical support across the product lifecycle — from first interface to testing and troubleshooting.</p></div>
          <div className="services-grid">{services.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
        </section>

        <section id="experience" className="section journey-section">
          <div className="section-index"><span>05</span><span>EDUCATION & GROWTH</span></div>
          <h2 data-reveal>MY <em>JOURNEY</em><span className="accent-dot">.</span></h2>
          <div className="timeline" data-reveal>
              {[["BCA", "Bachelor of Computer Application (BCA) · Ambition College", "2078 – Present · Currently Pursuing"], ["+2", "Ekta Academy", "2077 – 78 · GPA: 2.84"], ["GRADE 10", "Damak Adarsha Boarding School", "2074 – 75 · GPA: 3.05"], ["FULL-STACK DEVELOPMENT", "Learning and building with the MERN stack", "In progress"], ["PROJECT DEVELOPMENT", "Building real-world web applications", "Ongoing"]].map(([title, text, status], index) => (
              <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p><small>{status}</small></article>
            ))}
          </div>
        </section>

        <section id="skills" className="section capabilities-section">
          <div className="section-index"><span>06</span><span>SKILLS & CAPABILITIES</span></div>
          <h2 data-reveal>WHAT I <em>KNOW</em><span className="accent-dot">.</span></h2>
          <div className="skill-groups" data-reveal>{skillGroups.map(({ label, icon: Icon, skills }) => <article key={label}><div className="skill-group__title"><Icon size={19} /><h3>{label}</h3></div><ul>{skills.map((skill) => <li key={skill}><Check size={13} />{skill}</li>)}</ul></article>)}</div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="section-index"><span>07</span><span>GET IN TOUCH</span></div>
          <div className="contact-heading" data-reveal>
            <h2>LET&apos;S BUILD<br /><em>SOMETHING</em><span className="accent-dot">.</span></h2>
            <p>Have an idea, project, internship opportunity or collaboration in mind? I&apos;d love to hear from you.</p>
          </div>
          <div className="contact-grid" data-reveal>
            <div className="contact-details">
              <div><span>EMAIL</span><a href="mailto:prashantdahal27@gmail.com">prashantdahal27@gmail.com <ArrowUpRight /></a></div>
              <div><span>PHONE</span><p>{PHONE}</p></div>
              <div><span>LOCATION</span><p>Nepal</p></div>
              <div className="contact-actions">
                <a className="portfolio-link portfolio-link--solid" href="mailto:prashantdahal27@gmail.com">EMAIL ME <ArrowUpRight /></a>
                <a className="portfolio-link" href={GITHUB_URL} {...ext}>GITHUB <ArrowUpRight /></a>
                <a className="portfolio-link" href={LINKEDIN_URL} {...ext}>LINKEDIN <ArrowUpRight /></a>
                <ResumeButton />
              </div>
            </div>
            <form action={FORMSPREE_ENDPOINT} method="POST" onSubmit={sendMessage}>
              <label><span>YOUR NAME</span><input name="name" type="text" autoComplete="name" placeholder="Enter your name" required /></label>
              <label><span>YOUR EMAIL</span><input name="email" type="email" autoComplete="email" placeholder="Enter your email" required /></label>
              <label><span>YOUR MESSAGE</span><textarea name="message" rows={4} placeholder="Tell me about your idea" required /></label>
              <PortfolioButton type="submit" tone="solid" disabled={formState === "sending"}>{formState === "sending" ? "SENDING…" : "SEND MESSAGE"} <Send size={16} /></PortfolioButton>
              <p className="form-status" role="status" aria-live="polite">{formState === "sent" ? "Thanks — your message was sent." : formState === "error" ? `Something went wrong. Please email ${EMAIL} directly.` : ""}</p>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div><strong>PRASHANT DAHAL</strong><span>FULL-STACK DEVELOPER</span></div>
        <p>© 2026 PRASHANT DAHAL</p>
        <div className="footer-links"><a href={GITHUB_URL} {...ext}>GITHUB</a><a href={LINKEDIN_URL} {...ext}>LINKEDIN</a><a href="mailto:prashantdahal27@gmail.com">EMAIL</a></div>
      </footer>
    </div>
  );
}

type ProjectProps = { number: string; title: string; category: string; description: string; technologies: string[]; features: string[]; image: string; alt: string; reverse?: boolean; liveUrl?: string; repoUrl?: string };

function Project({ number, title, category, description, technologies, features, image, alt, reverse, liveUrl, repoUrl }: ProjectProps) {
  return (
    <article className={`project ${reverse ? "project--reverse" : ""}`} data-reveal data-cursor="view">
      <div className="project__image"><img src={image} alt={alt} loading="lazy" width={1600} height={1104} /></div>
      <div className="project__content">
        <div className="project__meta"><span>PROJECT / {number}</span><span>{category}</span></div>
        <h3>{title}</h3><p>{description}</p>
        <ul aria-label="Technologies used">{technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
        <ul className="project__features" aria-label="Key features">{features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
        <div className="project__actions">{liveUrl ? <a className="portfolio-link portfolio-link--solid" href={liveUrl} aria-label={`View live demo for ${title}`} {...ext}>VIEW PROJECT <ArrowUpRight /></a> : <span className="portfolio-link portfolio-link--disabled" aria-disabled="true">VIEW PROJECT</span>}{repoUrl ? <a className="portfolio-link" href={repoUrl} aria-label={`View GitHub repository for ${title}`} {...ext}>GITHUB <ArrowUpRight /></a> : <span className="portfolio-link portfolio-link--disabled" aria-disabled="true">GITHUB</span>}{!liveUrl && !repoUrl && <small className="project__soon">Live demo &amp; repo coming soon</small>}</div>
      </div>
    </article>
  );
}