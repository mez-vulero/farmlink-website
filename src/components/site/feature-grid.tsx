"use client";

import { motion, type Variants, type Transition } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  UsersRound,
  FileStack,
  Wallet,
  ShieldCheck,
  MapPinned,
  Warehouse,
} from "lucide-react";
import type { ReactNode } from "react";

interface FeatureItem {
  title: string;
  description: string;
  icon: ReactNode;
  badge: string;
}

const features: FeatureItem[] = [
  {
    title: "360° farmer dossier",
    description:
      "Capture household details, supporting documents, certifications, and payment preferences in one synced profile.",
    icon: <UsersRound className="h-5 w-5" />,
    badge: "Identity",
  },
  {
    title: "Delivery desk autopilot",
    description:
      "Record cherry weights, prices, and quality grades. Totals, receipts, and payables update instantly—no spreadsheets needed.",
    icon: <Wallet className="h-5 w-5" />,
    badge: "Payments",
  },
  {
    title: "Field intelligence on maps",
    description:
      "Draw geofenced farm polygons on Google Maps, check acreage, and attach inspections or photos from the field.",
    icon: <MapPinned className="h-5 w-5" />,
    badge: "Mapping",
  },
  {
    title: "Checklist-driven compliance",
    description:
      "Guide sustainability officers through configurable audits for farmers, farms, or washing stations with offline scoring.",
    icon: <ShieldCheck className="h-5 w-5" />,
    badge: "Compliance",
  },
  {
    title: "Serialised inventory ledger",
    description:
      "Track bags and lots as they move from wet mill to warehouse, capturing processing stage, quality, and ownership.",
    icon: <Warehouse className="h-5 w-5" />,
    badge: "Inventory",
  },
  {
    title: "Secure document vault",
    description:
      "Store IDs, contracts, and payment proofs with granular roles so co-op leadership can collaborate confidently.",
    icon: <FileStack className="h-5 w-5" />,
    badge: "Records",
  },
];

const easeBezier: Transition["ease"] = [0.33, 1, 0.68, 1];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.08,
      duration: 0.6,
      ease: easeBezier,
    },
  }),
};

export function FeatureGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={cardVariants}
          custom={index}
        >
          <Card className="group h-full border border-primary/10 bg-white/90 shadow-sm shadow-primary/10">
            <CardHeader className="space-y-4">
              <Badge className="w-fit bg-accent/15 text-accent-foreground">
                {feature.badge}
              </Badge>
              <div className="flex items-center gap-2 text-primary">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {feature.icon}
                </span>
                <CardTitle className="text-xl font-semibold text-foreground">
                  {feature.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
