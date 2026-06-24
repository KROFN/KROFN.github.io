interface SiteNavProps {
  active: "gateway" | "creative" | "work" | "unknown";
}

const links = [
  { href: "/creative", label: "Creative", key: "creative" },
  { href: "/work", label: "Work", key: "work" },
] as const;

export default function SiteNav({ active }: SiteNavProps) {
  return (
    <header className={`site-nav site-nav-${active}`}>
      <a className="site-nav-logo" href="/" data-cursor-hover>
        KROFN
      </a>
      <nav className="site-nav-links" aria-label="Main navigation">
        {links.map((link) => (
          <a
            key={link.key}
            href={link.href}
            className={active === link.key ? "is-active" : ""}
            data-cursor-hover
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
