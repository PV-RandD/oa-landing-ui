"use client";
import { useEffect, useRef, useState } from "react";
import { navigation, partnerUrl } from "@/lib/content";
import { AssetMedia } from "./asset-media";

export function Header() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const element = header.current!;
    const sections = [
      ...document.querySelectorAll<HTMLElement>("main > section[id]"),
    ];
    let frame = 0;
    function update() {
      frame = 0;
      const line = element.getBoundingClientRect().bottom + 48;
      let next = "";
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= line) next = section.id;
      });
      setCurrent(next);
      setScrolled(window.scrollY > 60);
    }
    function scroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    function resize() {
      document.documentElement.style.setProperty(
        "--anchor-offset",
        `${element.getBoundingClientRect().bottom + 24}px`,
      );
      update();
    }
    function click(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (!element.contains(target)) setOpen(false);
      const link = target.closest<HTMLAnchorElement>('a[href^="#"]');
      if (
        !link ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const destination = document.getElementById(link.hash.slice(1));
      if (destination) {
        destination.tabIndex = -1;
        destination.focus({ preventScroll: true });
        setOpen(false);
      }
    }
    const desktop = matchMedia("(min-width: 1051px)");
    const closeDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    document.addEventListener("click", click);
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", resize);
    desktop.addEventListener("change", closeDesktop);
    resize();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      document.removeEventListener("click", click);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", resize);
      desktop.removeEventListener("change", closeDesktop);
      document.documentElement.style.removeProperty("--anchor-offset");
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);
  const links = navigation.map((item) => (
    <a
      key={item.id}
      href={`#${item.id}`}
      aria-current={current === item.id ? "location" : undefined}
    >
      {item.label}
    </a>
  ));
  return (
    <header
      ref={header}
      className={`site-header${scrolled ? " is-scrolled" : ""}`}
      id="header"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <a href="#home" className="brand" aria-label="OpenAssets home">
        <AssetMedia
          src="/assets/oa-logo.png"
          width={1921}
          height={305}
          alt="OpenAssets"
        />
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links}
      </nav>
      <a className="header-cta" href={partnerUrl}>
        Talk to our team <span aria-hidden="true">↗</span>
      </a>
      <button
        ref={toggle}
        type="button"
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
      </button>
      <nav
        className="mobile-menu"
        id="mobile-menu"
        aria-label="Mobile navigation"
        hidden={!open}
      >
        {links}
        <a href={partnerUrl}>
          Talk to our team <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}
