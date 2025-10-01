"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare } from "lucide-react";
import { useBookDemoDialog } from "./book-demo-dialog-provider";

export function CTA() {
  const { openDialog } = useBookDemoDialog();

  return (
    <motion.section
      id="cta"
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
      className="relative overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/20 via-white to-primary/20 p-10 shadow-2xl shadow-accent/20"
    >
      <div className="absolute -left-20 -top-32 h-64 w-64 rounded-full bg-accent/40 blur-3xl" />
      <div className="absolute -right-10 bottom-0 h-48 w-48 rounded-full bg-primary/30 blur-3xl" />
      <div className="relative flex flex-col gap-6 text-center">
        <span className="mx-auto inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.3em] text-accent">
          <MessageSquare className="h-4 w-4 text-primary" />
          Let us build your coffee operating system
        </span>
        <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Ready to run an accountable, compliant, and profitable cooperative?
        </h2>
        <p className="mx-auto max-w-3xl text-pretty text-base text-muted-foreground">
          Share your growth goals and we will configure FarmLink for your workflows. Migrations, training, and change management included.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            className="rounded-full bg-accent px-8 text-accent-foreground hover:bg-accent/90"
            type="button"
            onClick={openDialog}
          >
            Book a demo
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full border-primary/40 text-primary hover:bg-primary/10"
            asChild
          >
            <Link href="#features">See product overview</Link>
          </Button>
        </div>
        <p className="text-center text-xs text-muted-foreground" aria-live="polite">
          We respect your inbox. FarmLink will only use your details to coordinate the demo and onboarding.
        </p>
      </div>
    </motion.section>
  );
}
