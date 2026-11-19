"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, SITE } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  useEffect(() => setOpen(false), [path]);
  const isActive = (href: string, kids?: { href: string }[]) =>
    href === path || (href !== "/" && href !== "#" && path.startsWith(href)) || !!kids?.some((k) => k.href === path);

  return (
    <>
            <header className="header">
        <div className="container">
          <Link href="/" className="logo" aria-label="Threads Physio home">
            <img src="/wp/2024/05/logo-web.png" alt="Threads Physio" />
          </Link>
          <ul className="nav">
            {NAV.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className={isActive(item.href, item.children) ? "active" : ""}>
                  {item.label} {item.children && <span className="caret">▼</span>}
                </Link>
                {item.children && (
                  <ul className="dropdown">
                    {item.children.map((c) => (
                      <li key={c.href}><Link href={c.href}>{c.label}</Link></li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div className="header-cta">
            <a href={`tel:${SITE.phoneRaw}`} className="btn phone-btn">📞 {SITE.headerPhone}</a>
            <button className="burger" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? "✕" : "☰"}</button>
          </div>
        </div>
        <nav className={`mobile-nav ${open ? "open" : ""}`}>
          {NAV.map((item) =>
            item.children ? (
              <details key={item.label}>
                <summary>{item.label} ▾</summary>
                {item.href !== "#" && <Link href={item.href}>All {item.label}</Link>}
                {item.children.map((c) => <Link key={c.href} href={c.href}>{c.label}</Link>)}
              </details>
            ) : (
              <Link key={item.label} href={item.href}>{item.label}</Link>
            )
          )}
          <a href={`tel:${SITE.phoneRaw}`} className="btn" style={{ marginTop: 20 }}>Call {SITE.phone}</a>
        </nav>
      </header>
    </>
  );
}
