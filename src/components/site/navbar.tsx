"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "#features", label: "Solutions" },
  { href: "#workflows", label: "Workflows" },
  { href: "#offline", label: "Offline" },
  { href: "#insights", label: "Insights" },
  { href: "#cta", label: "Pricing" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-4 z-50 flex w-full justify-center">
      <div className="mx-4 flex w-full max-w-6xl items-center justify-between rounded-full border border-primary/15 bg-[radial-gradient(circle_at_top,_rgba(17,130,198,0.28),_rgba(129,183,87,0.28))] px-4 py-2 shadow-lg shadow-primary/10 backdrop-blur-xl">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 transition hover:bg-primary/10 hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button className="rounded-full bg-accent px-5 text-accent-foreground hover:bg-accent/90" asChild>
            <Link href="#cta">Book a demo</Link>
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-40 overflow-hidden rounded-3xl border border-primary/15 bg-white/95 p-6 shadow-xl shadow-primary/20 backdrop-blur-xl md:hidden"
          >
            <div className="mb-6 flex items-center justify-between">
              <Logo withWordmark={false} className="bg-white/90 px-2" />
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => setOpen(false)}
                aria-label="Close navigation"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex flex-col gap-3 text-base font-medium text-muted-foreground">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl px-4 py-3 transition hover:bg-primary/10 hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <Button className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <Link href="#cta" onClick={() => setOpen(false)}>
                  Book a demo
                </Link>
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}



