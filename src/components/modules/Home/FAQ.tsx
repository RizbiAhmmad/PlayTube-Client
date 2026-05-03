import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is PlayTube?",
    answer: "PlayTube is a premium video streaming platform where you can watch movies, series, and documentaries in high definition.",
  },
  {
    question: "How much does a subscription cost?",
    answer: "We offer several plans starting from $9.99/month. Check our Pricing section for more details.",
  },
  {
    question: "Can I watch on multiple devices?",
    answer: "Yes, depending on your plan, you can stream on up to 4 devices simultaneously.",
  },
  {
    question: "Is there a free trial?",
    answer: "We occasionally offer 7-day free trials for new users. Sign up for our newsletter to stay updated on offers.",
  },
  {
    question: "Can I download content for offline viewing?",
    answer: "Yes, our mobile app supports offline downloads for most of our content library.",
  },
];

export default function FAQ() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">
            Everything you need to know about the platform and billing.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-lg font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
