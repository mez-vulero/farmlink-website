"use client";

import { motion } from "framer-motion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ClipboardCheck,
  Coins,
  MapPinned,
  ScanBarcode,
  ArrowUpRight,
} from "lucide-react";

const phases = [
  {
    value: "deliveries",
    label: "Cherry receptions",
    icon: <ScanBarcode className="h-4 w-4" />,
    headline: "Arrival desk",
    bullets: [
      "Capture weights from Bluetooth scales or manual entry",
      "Grade cherry quality and attach moisture photos",
      "Generate receipts and queue payments automatically",
    ],
    cta: "See receptions",
  },
  {
    value: "payments",
    label: "Payments",
    icon: <Coins className="h-4 w-4" />,
    headline: "Finance workspace",
    bullets: [
      "Automate payouts with mobile money, cash, or bank transfers",
      "Track advances, deductions, and balances owed by farmer",
      "Export accounting-ready journals with one click",
    ],
    cta: "Review payouts",
  },
  {
    value: "field",
    label: "Field",
    icon: <MapPinned className="h-4 w-4" />,
    headline: "Extension toolkit",
    bullets: [
      "Map boundaries and calculate productive acreage",
      "Log farm visits, agronomy notes, and photo evidence",
      "Sync offline data once field teams regain coverage",
    ],
    cta: "Plan visits",
  },
  {
    value: "compliance",
    label: "Compliance",
    icon: <ClipboardCheck className="h-4 w-4" />,
    headline: "Sustainability audits",
    bullets: [
      "Run configurable checklists by program or certification",
      "Capture signatures, attachments, and remediation tasks",
      "Prove compliance with live dashboards and exports",
    ],
    cta: "Launch inspection",
  },
];

export function WorkflowTabs() {
  return (
    <Tabs defaultValue="deliveries" className="w-full">
      <TabsList className="flex h-auto w-full flex-wrap items-stretch justify-start gap-3 bg-transparent p-0">
        {phases.map((phase) => (
          <TabsTrigger
            key={phase.value}
            value={phase.value}
            className="group flex h-auto min-h-[3.25rem] items-center gap-2 rounded-2xl border border-transparent px-6 py-3 text-sm transition data-[state=active]:border-primary/40 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted group-data-[state=active]:bg-primary group-data-[state=active]:text-primary-foreground">
              {phase.icon}
            </span>
            {phase.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {phases.map((phase) => (
        <TabsContent key={phase.value} value={phase.value} className="mt-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Card className="border border-primary/15 bg-white/90 backdrop-blur">
              <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                  <Badge className="w-fit bg-accent/15 text-accent-foreground">
                    {phase.headline}
                  </Badge>
                  <CardTitle className="text-2xl font-semibold text-foreground">
                    How FarmLink powers your {phase.label.toLowerCase()} team
                  </CardTitle>
                </div>
                <Button className="rounded-full border-primary/30 text-primary hover:bg-primary/10" variant="outline">
                  {phase.cta}
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-4 text-sm sm:grid-cols-2">
                  {phase.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-3 rounded-2xl border border-dashed border-primary/20 bg-secondary/30 p-4"
                    >
                      <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                      <span className="text-muted-foreground">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      ))}
    </Tabs>
  );
}



