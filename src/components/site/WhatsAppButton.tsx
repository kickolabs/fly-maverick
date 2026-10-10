import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { destinations } from "@/data/destinations";

const topics = [
  "International flight tickets",
  "Holiday packages",
  "Travel itineraries",
  "Hotel reservations",
  "Business travel",
  "Tourist / business visa application assistance",
];

export function buildWhatsAppMessage(topic: string, destination: string) {
  const dest = destination ? ` for ${destination}` : "";
  return `Hello Fly Maverick, I'd like to enquire about ${topic.toLowerCase()}${dest}.`;
}

export function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState(topics[0]);
  const [dest, setDest] = useState("");
  const number = site.whatsappNumber;
  const href = number ? `https://wa.me/${number}?text=${encodeURIComponent(buildWhatsAppMessage(topic, dest))}` : "";

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 md:bottom-8 md:right-8">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            className="w-[min(20rem,calc(100vw-2.5rem))] rounded-lg border border-border bg-card p-5 shadow-elegant"
          >
            <p className="font-display text-base font-semibold">Chat with Fly Maverick</p>
            <p className="mt-1 text-xs text-muted-foreground">Choose a topic and we'll prefill your message.</p>
            <label className="mt-4 block text-xs font-medium" htmlFor="wa-topic">Topic</label>
            <select id="wa-topic" className="field-input mt-1 bg-card" value={topic} onChange={(e) => setTopic(e.target.value)}>
              {topics.map((t) => <option key={t}>{t}</option>)}
            </select>
            <label className="mt-3 block text-xs font-medium" htmlFor="wa-dest">Destination (optional)</label>
            <select id="wa-dest" className="field-input mt-1 bg-card" value={dest} onChange={(e) => setDest(e.target.value)}>
              <option value="">Not decided yet</option>
              {destinations.map((d) => <option key={d.slug}>{d.name}</option>)}
            </select>
            {number ? (
              <Button asChild className="mt-4 w-full">
                <a href={href} target="_blank" rel="noreferrer">Open WhatsApp</a>
              </Button>
            ) : (
              <>
                <p className="mt-4 rounded-md bg-gold-soft p-3 text-xs text-muted-foreground">
                  Our WhatsApp line will be available soon. Meanwhile, send us a quick enquiry.
                </p>
                <Button asChild className="mt-3 w-full" onClick={() => setOpen(false)}>
                  <Link to="/contact">Send an enquiry</Link>
                </Button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close WhatsApp chat" : "Chat on WhatsApp"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-elegant transition-transform hover:scale-105"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}
