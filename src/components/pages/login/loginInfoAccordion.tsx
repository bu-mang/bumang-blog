// components/login-info-accordion.tsx
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function LoginInfoAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="perks">
        <AccordionTrigger>
          🧩 What are the perks of logging in?
        </AccordionTrigger>
        <AccordionContent>
          <ul className="mb-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>View BUMANG’s private artworks and writings</li>
            <li>Try writing your own posts on the blog</li>
            <li>Leave comments</li>
          </ul>
          <div className="rounded-md bg-gray-5 px-5 py-2 text-muted-foreground">
            Your posts are invisible to non-logged-in users and auto-delete
            after 24 hours.
            <br />
            Just a fun way to explore the editor and maybe raise BUMANG’s AWS
            bill 🫠
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="signup">
        <AccordionTrigger>📬 Want to sign up?</AccordionTrigger>
        <AccordionContent>
          <p className="text-sm text-muted-foreground">
            Just tell BUMANG your desired username and password directly.
            <br />
            Don’t use your usual credentials — make a new one. It’s better for
            both of us!
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
