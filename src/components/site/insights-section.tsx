"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart4, PieChart, LineChart } from "lucide-react";

const insights = [
  {
    title: "Cooperative cockpit",
    description:
      "Spot bottlenecks with live dashboards showing cherry trends, outlier farmers, and stock variances before they become issues.",
    icon: <BarChart4 className="h-5 w-5" />,
    delta: "+18%",
    deltaLabel: "Faster payouts",
  },
  {
    title: "Payment confidence",
    description:
      "See every farmer balance in real time, compare against contracts, and release payouts with full audit trails for donors.",
    icon: <PieChart className="h-5 w-5" />,
    delta: "-42%",
    deltaLabel: "Accounting time",
  },
  {
    title: "Sustainability intelligence",
    description:
      "Automatically aggregate checklist scores, remediation tasks, and certification readiness by station or grower cluster.",
    icon: <LineChart className="h-5 w-5" />,
    delta: "+26%",
    deltaLabel: "Audit pass rate",
  },
];

export function InsightsSection() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {insights.map((insight, index) => (
        <motion.div
          key={insight.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
        >
          <Card className="h-full border border-primary/15 bg-white/90 shadow-sm shadow-primary/10">
            <CardHeader className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-primary">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {insight.icon}
                </span>
                <CardTitle className="text-xl font-semibold tracking-tight text-foreground">
                  {insight.title}
                </CardTitle>
              </div>
              <Badge className="w-fit rounded-full bg-accent/15 text-accent-foreground">
                {insight.delta} {insight.deltaLabel}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {insight.description}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
