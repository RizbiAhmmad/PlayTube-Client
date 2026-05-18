"use client";

import { motion } from "framer-motion";
import { Cookie, Info, Settings, MousePointer2 } from "lucide-react";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-primary/5">
        <div className="container relative z-10 mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wide uppercase mb-6">
              <Cookie className="size-4" />
              Legal Center
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Cookie Policy
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              This policy explains how PlayTube uses cookies and similar
              technologies to recognize you when you visit our website.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-slate dark:prose-invert max-w-none"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                  <Info className="size-6" />
                </div>
                <h2 className="text-2xl font-bold m-0">What are Cookies?</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Cookies are small data files that are placed on your computer or
                mobile device when you visit a website. Cookies are widely used
                by website owners in order to make their websites work, or to
                work more efficiently, as well as to provide reporting
                information.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-slate dark:prose-invert max-w-none"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                  <Settings className="size-6" />
                </div>
                <h2 className="text-2xl font-bold m-0">How We Use Cookies</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies for several reasons. Some cookies are required
                for technical reasons in order for our Website to operate, and
                we refer to these as &quot;essential&quot; or &quot;strictly
                necessary&quot; cookies.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  <strong>Authentication:</strong> To identify you when you sign
                  in.
                </li>
                <li>
                  <strong>Personalization:</strong> To remember your preferences
                  and settings.
                </li>
                <li>
                  <strong>Security:</strong> To enable security features and
                  detect malicious activity.
                </li>
                <li>
                  <strong>Analytics:</strong> To help us understand how people
                  use our service.
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-slate dark:prose-invert max-w-none"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                  <MousePointer2 className="size-6" />
                </div>
                <h2 className="text-2xl font-bold m-0">Your Choices</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                You have the right to decide whether to accept or reject
                cookies. You can set or amend your web browser controls to
                accept or refuse cookies. If you choose to reject cookies, you
                may still use our website though your access to some
                functionality and areas of our website may be restricted.
              </p>
            </motion.div>

            <div className="pt-10 border-t">
              <p className="text-sm text-muted-foreground">
                Last updated: May 02, 2026. For more information, please contact
                us at cookies@playtube.com.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CookiePolicy;
