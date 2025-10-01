"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ShieldCheck, WifiOff, RefreshCw, Smartphone } from "lucide-react";

const offlineFAQs = [
  {
    value: "resilience",
    question: "How does FarmLink keep working when the network drops?",
    answer:
      "Every mobile and tablet session runs on a synced SQLite cache. Work continues offline and merges safely once a connection is restored.",
  },
  {
    value: "sync",
    question: "What data is prioritized for sync?",
    answer:
      "Priority queues ensure farmer identity, deliveries, and payouts sync first, followed by media attachments and background checklists.",
  },
  {
    value: "security",
    question: "Is offline data encrypted?",
    answer:
      "Yes. Device vaults are encrypted and enforce biometric unlock with remote wipe controls from the cooperative console.",
  },
];

export function OfflineSection() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      >
        <Card className="h-full border border-primary/15 bg-gradient-to-br from-accent/15 via-white to-primary/10 shadow-xl">
          <CardHeader className="space-y-4">
            <CardTitle className="text-3xl font-semibold text-balance">
              Built to thrive where connectivity is unpredictable.
            </CardTitle>
            <p className="max-w-xl text-sm text-muted-foreground">
              From hilltop cherry stations to remote training visits, FarmLink keeps teams productive. Service workers cache mission-critical routes and background syncs keep ops aligned.
            </p>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-4 text-sm sm:grid-cols-2">
              <li className="flex items-start gap-3 rounded-2xl bg-white/85 p-4 shadow-sm shadow-accent/10">
                <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <WifiOff className="h-4 w-4" />
                </span>
                <span>
                  Offline-first flows for intake, payouts, and inspections with conflict resolution baked in.
                </span>
              </li>
              <li className="flex items-start gap-3 rounded-2xl bg-white/85 p-4 shadow-sm shadow-primary/10">
                <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <RefreshCw className="h-4 w-4" />
                </span>
                <span>
                  Background sync scheduler prioritizes cherry deliveries and balances before attachments.
                </span>
              </li>
              <li className="flex items-start gap-3 rounded-2xl bg-white/85 p-4 shadow-sm shadow-primary/10">
                <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Smartphone className="h-4 w-4" />
                </span>
                <span>
                  Mobile apps bundle their own service worker so modules like payouts and mapping load instantly.
                </span>
              </li>
              <li className="flex items-start gap-3 rounded-2xl bg-white/85 p-4 shadow-sm shadow-accent/10">
                <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <ShieldCheck className="h-4 w-4" />
                </span>
                <span>
                  Device policies enforce biometric unlock, remote wipe, and audit trails when data comes back online.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        className="flex flex-col gap-6"
      >
        <Card className="border border-primary/15 bg-white/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Offline playbook</CardTitle>
            <p className="text-sm text-muted-foreground">
              Strategies perfected with co-ops operating across Uganda, Rwanda, and Ethiopia.
            </p>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {offlineFAQs.map((item) => (
                <AccordionItem key={item.value} value={item.value}>
                  <AccordionTrigger className="text-left text-sm font-medium">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
