"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CurrencyToggle from "./CurrencyToggle";

const NAV = [
  { href: "/",       label: "ទំព័រដើម" },
  { href: "/#games", label: "ហ្គេម" },
  { href: "/order",  label: "តាមដានការបញ្ជាទិញ" },
  { href: "/#faq",   label: "FAQ" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b-2 border-pink-200 bg-white/90 backdrop-blur-xl shadow-lg shadow-pink-200/40"
          : "border-b-2 border-transparent bg-white/70 backdrop-blur-md"
      }`}
    >
      {/* Pink top hairline */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent opacity-80" />

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <img
            src="https://i.ibb.co/ycPxxz8h/IMG-20260515-100429.png"
            alt="Logo"
            className="h-11 w-11 rounded-2xl object-cover shadow-lg shadow-pink-300/50 transition-all duration-300 group-hover:scale-110"
          />
          <div className="flex flex-col leading-none">
            <span className="font-display text-xl font-extrabold tracking-tight text-pink-800">
              JASMIN<span className="text-pink-500">TOPUP</span>
            </span>
            <span className="text-[9px] text-pink-400 tracking-widest font-bold uppercase">
              Instant · Secure · 24/7
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border-2 border-pink-200 bg-pink-50/80 px-2 py-1.5 backdrop-blur-md">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href.replace(/#.*/, ""));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-1.5 text-sm font-bold rounded-full transition-all duration-300 ${
                  active ? "text-white" : "text-pink-700 hover:text-pink-500"
                }`}
              >
                {active && (
                  <span
                    className="absolute inset-0 rounded-full -z-0 shadow-md shadow-pink-300/50"
                    style={{ background: "linear-gradient(135deg,#E91E8C,#FF6EB4)" }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">

          {/* Currency toggle — desktop only (full size) */}
          <CurrencyToggle className="hidden md:inline-flex" />

          {/* Track order — tablet+ */}
          <Link
            href="/order"
            className="hidden sm:inline-flex items-center gap-2 rounded-full border-2 border-pink-300 bg-white px-4 py-2 text-sm font-bold text-pink-600 transition-all hover:border-pink-500 hover:bg-pink-50 hover:shadow-md hover:shadow-pink-200/60"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
            </svg>
            តាមដានការបញ្ជាទិញ
          </Link>

          {/* ── Mobile: CurrencyToggle pill + burger ── */}
          <div className="md:hidden flex items-center gap-2">

            {/* Currency pill — sits right next to the burger */}
            <CurrencyToggle />

            {/* Burger button */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border-2 border-pink-200 bg-white text-pink-600 transition-colors hover:border-pink-400 hover:bg-pink-50"
              aria-label="Toggle menu"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
                {mobileOpen ? (
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav drawer */}
      <div
        className={`md:hidden overflow-hidden border-t-2 border-pink-200 bg-white/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 ease-out ${
          mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col p-4 gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-bold text-pink-700 hover:bg-pink-50 hover:text-pink-500 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}