"use client";

import { motion, type Variants } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import type { ReactNode } from "react";

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.33, 1, 0.68, 1] as const,
    },
  },
};

export type SectionHeaderAlignment = "left" | "center" | "right";

interface SectionHeaderProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: SectionHeaderAlignment;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  const alignment =
    align === "center"
      ? "items-center text-center"
      : align === "right"
        ? "items-end text-right"
        : "items-start text-left";

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      variants={containerVariants}
      className={`flex flex-col gap-4 ${alignment} ${className ?? ""}`}
    >
      {eyebrow ? (
        <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary">
          {eyebrow}
        </Badge>
      ) : null}
      <div className="space-y-4">
        <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="max-w-2xl text-base text-muted-foreground sm:text-lg text-balance">
            {description}
          </p>
        ) : null}
      </div>
    </motion.div>
  );
}
