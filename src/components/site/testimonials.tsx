"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Grace Nanyonga",
    role: "Finance Manager, Bukonzo Joint Co-op",
    quote:
      "Before FarmLink we reconciled payouts in spreadsheets for days. Now payouts match deliveries instantly and farmers trust our numbers.",
  },
  {
    name: "Samuel Tadesse",
    role: "Field Lead, Sidama Union",
    quote:
      "We capture geo boundaries and household data offline, sync later, and HQ still sees what happened. It keeps our agronomy program accountable.",
  },
];

export function Testimonials() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={testimonial.name}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, delay: index * 0.12, ease: "easeOut" }}
        >
          <Card className="h-full border border-primary/10 bg-white/90 shadow-sm shadow-primary/10">
            <CardContent className="flex h-full flex-col gap-6 p-6">
              <p className="text-base leading-relaxed text-muted-foreground">
                “{testimonial.quote}”
              </p>
              <div className="flex items-center gap-3">
                <Avatar className="bg-accent/20 text-accent-foreground">
                  <AvatarFallback>
                    {testimonial.name
                      .split(" ")
                      .map((chunk) => chunk[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium text-foreground">{testimonial.name}</p>
                  <p className="text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
