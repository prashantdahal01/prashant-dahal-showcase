import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Menu, Send, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";

import busImage from "../assets/bus-booking-editorial.jpg";
import portfolioImage from "../assets/portfolio-editorial.jpg";
import { PortfolioButton } from "../components/PortfolioButton";

const description =
  "Portfolio of Prashant Dahal, a full-stack developer from Nepal building modern web applications with React, Node.js, Express and MongoDB.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prashant Dahal — Full-Stack Developer" },
      { name: "description", content: description },
      { property: "og:title", content: "Prashant Dahal — Full-Stack Developer" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Portfolio,
});

const GITHUB_URL = "https://github.com/prashantdahal01";
const LINKEDIN_URL = "https://www.linkedin.com/in/prashant-dahal-ba7564234/";
const EMAIL = "prashantdahal27@gmail.com";
// Drop the PDF at public/Prashant-Dahal-Resume.pdf — the button activates automatically.
const RESUME_PATH = "/Prashant-Dahal-Resume.pdf";
// Paste your Formspree endpoint here, e.g. "https://formspree.io/f/abcdwxyz".
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xrpbkbwk";
const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

function ResumeButton({ available, solid }: { available: boolean; solid?: boolean }) {
  if (!available) {
    return <span className="portfolio-link portfolio-link--disabled" title="Resume coming soon" aria-disabled="true">DOWNLOAD CV · SOON</span>;
  }
  return <a className={`portfolio-link ${solid ? "portfolio-link--solid" : ""}`} href={RESUME_PATH} download>DOWNLOAD CV <ArrowDown size={14} /></a>;
}

const technologies = [
  "React", "JavaScript", "HTML", "CSS", "Node.js", "Express.js", "MongoDB",
  "Mongoose", "Git", "GitHub", "REST APIs", "Vite", "Tailwind CSS",
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
  const [resumeAvailable, setResumeAvailable] = useState(false);
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(RESUME_PATH, { method: "HEAD" })
      .then((r) => setResumeAvailable(r.ok && (r.headers.get("content-type") ?? "").includes("pdf")))
      .catch(() => setResumeAvailable(false));
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1450);
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));

    const moveCursor = (event: PointerEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      }
    };
    window.addEventListener("pointermove", moveCursor);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener("pointermove", moveCursor);
    };
  }, []);

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
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error();
      form.reset();
      setFormState("sent");
    } catch {
      setFormState("error");
    }
  };

  return (
    <div className="portfolio-shell">
      <a href="#main" className="skip-link">Skip to content</a>
      <div className={`loader ${loading ? "" : "loader--hidden"}`} aria-hidden={!loading}>
        <div className="loader__mark">PD<span>.</span></div>
        <div className="loader__line"><span /></div>
        <p>FULL-STACK DEVELOPER · NEPAL</p>
      </div>

      <div ref={cursorRef} className="custom-cursor" aria-hidden="true"><span>VIEW</span></div>

      <header className="site-header">
        <PortfolioButton className="wordmark" tone="ghost" onClick={() => navigateTo("top")} aria-label="Go to top">PRASHANT DAHAL<span>.</span></PortfolioButton>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {[["ABOUT", "about"], ["WORK", "work"], ["SKILLS", "skills"], ["CONTACT", "contact"]].map(([label, id]) => (
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
          {[["01", "ABOUT", "about"], ["02", "WORK", "work"], ["03", "SKILLS", "skills"], ["04", "CONTACT", "contact"]].map(([number, label, id]) => (
            <PortfolioButton key={id} tone="ghost" onClick={() => id && navigateTo(id)}><span>{number}</span>{label}<ArrowUpRight /></PortfolioButton>
          ))}
        </nav>
      </div>

      <main id="main">
        <section id="top" className="hero" aria-labelledby="hero-title">
          <div className="hero__kicker"><span>PORTFOLIO / 2026</span><span>FULL-STACK DEVELOPMENT</span></div>
          <h1 id="hero-title" className="hero__title">
            <span className="hero-line">PRASHANT</span>
            <span className="hero-line hero-line--indent">DAHAL<span className="accent-dot">.</span></span>
          </h1>
          <div className="hero__lower">
            <div className="hero__role"><span>FULL-STACK</span><span>DEVELOPER</span></div>
            <p>I build modern web applications that combine clean interfaces, practical functionality, and reliable backend systems.</p>
            <div className="hero__cta"><ResumeButton available={resumeAvailable} /></div>
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
              <p className="lead">I&apos;m Prashant Dahal, a BCA graduate and aspiring full-stack developer focused on building useful, responsive and scalable web applications.</p>
              <div className="about-copy__columns">
                <p>I enjoy turning ideas into complete digital products — from frontend interfaces and user experiences to backend APIs, databases and authentication.</p>
                <p>I&apos;m currently focused on strengthening my MERN stack development skills and building real-world projects.</p>
              </div>
              <div className="contact-actions"><ResumeButton available={resumeAvailable} solid /><a className="portfolio-link" href={GITHUB_URL} {...ext}>GITHUB <ArrowUpRight /></a></div>
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
          <Project number="01" title="BUS BOOKING SYSTEM" category="FULL-STACK WEB APPLICATION" description="A MERN-based bus ticket booking platform designed for customers, operators and administrators. Includes route and schedule search, seat selection, temporary seat locking, booking management, online payment flow and e-ticket generation." technologies={["React", "Node.js", "Express.js", "MongoDB", "Mongoose"]} liveUrl="https://smartbusbooking-1.onrender.com/" repoUrl="https://github.com/prashantdahal01/smartbusbooking" image={busImage} alt="Abstract map, bus and seat layout artwork representing a bus booking platform" />
          <Project number="02" title="PERSONAL PORTFOLIO" category="WEB DEVELOPMENT" description="A modern personal portfolio designed to showcase my development work, technical skills and projects through an interactive user experience." technologies={["React", "JavaScript", "CSS", "Vite"]} image={portfolioImage} alt="Abstract browser and typographic artwork representing a creative developer portfolio" reverse />
        </section>

        <section className="section journey-section">
          <div className="section-index"><span>04</span><span>EDUCATION & GROWTH</span></div>
          <h2 data-reveal>MY <em>JOURNEY</em><span className="accent-dot">.</span></h2>
          <div className="timeline" data-reveal>
            {[["BCA", "Bachelor of Computer Applications", "Completed"], ["FULL-STACK DEVELOPMENT", "Learning and building with the MERN stack", "In progress"], ["PROJECT DEVELOPMENT", "Building real-world web applications", "Ongoing"]].map(([title, text, status], index) => (
              <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p><small>{status}</small></article>
            ))}
          </div>
        </section>

        <section id="skills" className="section capabilities-section">
          <div className="section-index"><span>05</span><span>CAPABILITIES</span></div>
          <h2 data-reveal>WHAT I <em>DO</em><span className="accent-dot">.</span></h2>
          <div className="capability-list" data-reveal>
            {capabilities.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p><ArrowUpRight aria-hidden="true" /></article>)}
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="section-index"><span>06</span><span>GET IN TOUCH</span></div>
          <div className="contact-heading" data-reveal>
            <h2>LET&apos;S BUILD<br /><em>SOMETHING</em><span className="accent-dot">.</span></h2>
            <p>Have an idea, project, internship opportunity or collaboration in mind? I&apos;d love to hear from you.</p>
          </div>
          <div className="contact-grid" data-reveal>
            <div className="contact-details">
              <div><span>EMAIL</span><a href="mailto:prashantdahal27@gmail.com">prashantdahal27@gmail.com <ArrowUpRight /></a></div>
              <div><span>LOCATION</span><p>Nepal</p></div>
              <div className="contact-actions">
                <a className="portfolio-link portfolio-link--solid" href="mailto:prashantdahal27@gmail.com">EMAIL ME <ArrowUpRight /></a>
                <a className="portfolio-link" href={GITHUB_URL} {...ext}>GITHUB <ArrowUpRight /></a>
                <a className="portfolio-link" href={LINKEDIN_URL} {...ext}>LINKEDIN <ArrowUpRight /></a>
                <ResumeButton available={resumeAvailable} />
              </div>
            </div>
            <form onSubmit={sendMessage}>
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

type ProjectProps = { number: string; title: string; category: string; description: string; technologies: string[]; image: string; alt: string; reverse?: boolean; liveUrl?: string; repoUrl?: string };

function Project({ number, title, category, description, technologies, image, alt, reverse, liveUrl, repoUrl }: ProjectProps) {
  return (
    <article className={`project ${reverse ? "project--reverse" : ""}`} data-reveal data-cursor="view">
      <div className="project__image"><img src={image} alt={alt} loading="lazy" width={1600} height={1104} /></div>
      <div className="project__content">
        <div className="project__meta"><span>PROJECT / {number}</span><span>{category}</span></div>
        <h3>{title}</h3><p>{description}</p>
        <ul aria-label="Technologies used">{technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
        <div className="project__actions">{liveUrl ? <a className="portfolio-link portfolio-link--solid" href={liveUrl} {...ext}>VIEW PROJECT <ArrowUpRight /></a> : <span className="portfolio-link portfolio-link--disabled" aria-disabled="true">VIEW PROJECT</span>}{repoUrl ? <a className="portfolio-link" href={repoUrl} {...ext}>GITHUB <ArrowUpRight /></a> : <span className="portfolio-link portfolio-link--disabled" aria-disabled="true">GITHUB</span>}{!liveUrl && !repoUrl && <small className="project__soon">Live demo &amp; repo coming soon</small>}</div>
      </div>
    </article>
  );
}