import { useState } from "react";
import { Mail, MessageSquare, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent!",
        description: "Our support team will get back to you within 24 hours.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  const faqs = [
    {
      q: "How does buying work on CampusKart?",
      a: "When you find an item you want, add it to your cart and checkout. This doesn't charge your card immediately. It notifies the seller, and you both arrange a safe meetup on campus to exchange the item and payment (cash/UPI)."
    },
    {
      q: "Is it free to sell items?",
      a: "Yes! Listing items on CampusKart is 100% free for students. We only charge a tiny platform fee to the buyer at checkout to keep the servers running."
    },
    {
      q: "How do I verify my student status?",
      a: "You must sign up using your university-issued .edu email address. This ensures our marketplace remains exclusive and safe for actual students."
    },
    {
      q: "What should I do if a seller doesn't show up?",
      a: "You can report the user through their profile page. Repeated no-shows result in account suspension to maintain platform quality."
    },
    {
      q: "Are prices negotiable?",
      a: "Yes, you can use the 'Chat' feature on the product page to discuss pricing with the seller before making a final decision."
    }
  ];

  return (
    <div className="bg-muted/10 min-h-screen py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">We're here to help</h1>
          <p className="text-xl text-muted-foreground">Have questions about an order, selling, or our platform? Get in touch with the student support team.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Contact Form */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-black/5 border border-border">
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Name</label>
                  <Input required placeholder="John Doe" className="h-12 rounded-xl bg-muted/30 border-transparent focus:border-primary focus:bg-white transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Student Email</label>
                  <Input required type="email" placeholder="john@university.edu" className="h-12 rounded-xl bg-muted/30 border-transparent focus:border-primary focus:bg-white transition-colors" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Input required placeholder="How can we help?" className="h-12 rounded-xl bg-muted/30 border-transparent focus:border-primary focus:bg-white transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea required placeholder="Describe your issue in detail..." className="min-h-[150px] rounded-xl bg-muted/30 border-transparent focus:border-primary focus:bg-white transition-colors resize-none" />
              </div>
              <Button type="submit" size="lg" className="w-full h-14 rounded-xl text-base shadow-lg shadow-primary/20" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
                {!isSubmitting && <Send className="w-4 h-4 ml-2" />}
              </Button>
            </form>
          </div>

          {/* Info & FAQ */}
          <div className="space-y-12">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 flex flex-col gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lg">Email Support</h3>
                <p className="text-muted-foreground text-sm">support@campuskart.edu</p>
              </div>
              <div className="p-6 rounded-2xl bg-secondary/5 border border-secondary/10 flex flex-col gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-secondary shadow-sm">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lg">HQ Office</h3>
                <p className="text-muted-foreground text-sm">Student Union Building, Room 204</p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-display font-bold mb-6">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full bg-white rounded-2xl border border-border px-6">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className={i === faqs.length - 1 ? "border-b-0" : ""}>
                    <AccordionTrigger className="text-left font-medium hover:text-primary transition-colors py-5">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-5 pr-6">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
