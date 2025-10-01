import Link from "next/link";
import { Logo } from "./logo";
import { Separator } from "@/components/ui/separator";

const footerLinks = [
  {
    title: "Platform",
    items: [
      { label: "Product", href: "#features" },
      { label: "Roadmap", href: "#insights" },
      { label: "Security", href: "#offline" },
    ],
  },
  {
    title: "Teams",
    items: [
      { label: "Field ops", href: "#workflows" },
      { label: "Finance", href: "#workflows" },
      { label: "Sustainability", href: "#workflows" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 rounded-3xl border border-primary/10 bg-white/90 p-10 shadow-lg shadow-primary/10 backdrop-blur">
      <div className="flex flex-col gap-10 md:flex-row md:justify-between">
        <div className="max-w-sm space-y-4">
          <Logo />
          <p className="text-sm text-muted-foreground">
            FarmLink keeps coffee cooperatives connected to their farmers with transparent data, automation, and offline-ready tools.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {footerLinks.map((column) => (
            <div key={column.title} className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary/80">
                {column.title}
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {column.items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="transition hover:text-primary">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <Separator className="my-6 bg-primary/10" />
      <div className="flex flex-col gap-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} FarmLink Cooperative OS. All rights reserved.</span>
        <div className="flex items-center gap-4">
          <Link href="#" className="transition hover:text-primary">
            Privacy
          </Link>
          <Link href="#" className="transition hover:text-primary">
            Terms
          </Link>
          <Link href="mailto:support@farmlink.app" className="transition hover:text-primary">
            Support
          </Link>
        </div>
      </div>
    </footer>
  );
}
