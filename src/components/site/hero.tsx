"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sparkles, ArrowRight } from "lucide-react";
import { useBookDemoDialog } from "./book-demo-dialog-provider";

const ParticleLogoCanvas = dynamic(() => import("./particle-logo-canvas"), { ssr: false });

const stats = [
  { label: "Farmer profiles", value: "12k+" },
  { label: "Daily deliveries", value: "48t" },
  { label: "Offline sync uptime", value: "99.8%" },
];

export function Hero() {
  const { openDialog } = useBookDemoDialog();

  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <ParticleLogoCanvas
          className="pointer-events-none absolute inset-0 h-full w-full opacity-80"
          logoHeight={480}
          maxDistance={260}
          brandColor="#81b757"
          idleColor="#1182c6"
          bgColor="#e4f2da"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(17,130,198,0.28),_transparent_62%)]"
        />
        <motion.div
          initial={{ opacity: 0, y: -48 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ duration: 1.3, ease: "easeOut" }}
          className="absolute left-1/2 top-[-180px] h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-accent/30 blur-3xl"
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.21, 1, 0.34, 1] }}
        className="mx-auto flex max-w-5xl flex-col items-center gap-10 px-6 pb-32 pt-28 text-center md:pt-32"
      >
        <Badge className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary">
          <Sparkles className="h-4 w-4 text-accent" />
          Built for coffee exporters ready to scale
        </Badge>
        <div className="space-y-6">
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Connect every cherry to the farmer who grew it.
          </h1>
          <p className="text-pretty text-base text-muted-foreground sm:text-lg">
            FarmLink is the digital operations platform that keeps farmer data, weigh-ins,
            payments, mapping, inventory, and compliance in perfect sync-online or offline.
          </p>
        </div>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Button
            size="lg"
            className="rounded-full bg-accent px-8 text-accent-foreground hover:bg-accent/90"
            type="button"
            onClick={openDialog}
          >
            <span className="inline-flex items-center gap-2">
              Book a live demo
              <ArrowRight className="h-4 w-4" />
            </span>
          </Button>
          <Button size="lg" variant="outline" className="rounded-full border-accent/40 text-accent hover:bg-accent/10" asChild>
            <Link href="#insights">See product overview</Link>
          </Button>
        </div>
        <div className="w-full max-w-3xl rounded-3xl border border-primary/15 bg-transparent p-6 shadow-xl shadow-primary/10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            className="grid gap-4 sm:grid-cols-3"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1 rounded-2xl bg-white/20 px-4 py-5 backdrop-blur"
              >
                <p className="text-3xl font-semibold text-primary sm:text-4xl">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
          <Separator className="my-6 bg-primary/15" />
          <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <Image
                  src="/offline_sync.png"
                  alt="Offline sync icon"
                  width={20}
                  height={20}
                  className="h-7 w-7"
                />
              </div>
              <span className="text-center">Offline-first architecture with sync-ready mobile apps</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
