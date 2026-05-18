"use client";

import { motion } from "framer-motion";
import { Gavel, Scale, FileCheck, AlertCircle } from "lucide-react";

const TermsOfService = () => {
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
              <Gavel className="size-4" />
              Legal Center
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Terms of Service
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              Please read these terms carefully before using PlayTube. By
              accessing or using our service, you agree to be bound by these
              terms.
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
                  <Scale className="size-6" />
                </div>
                <h2 className="text-2xl font-bold m-0">Acceptance of Terms</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using PlayTube, you accept and agree to be
                bound by the terms and provision of this agreement. In addition,
                when using PlayTube&apos;s particular services, you shall be
                subject to any posted guidelines or rules applicable to such
                services.
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
                  <FileCheck className="size-6" />
                </div>
                <h2 className="text-2xl font-bold m-0">User Account</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To access some features of the Service, you will have to create
                a PlayTube account. You are solely responsible for the activity
                that occurs on your account, and you must keep your account
                password secure.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  You must be at least 13 years of age to use this service.
                </li>
                <li>You must provide accurate and complete information.</li>
                <li>
                  You are responsible for maintaining the confidentiality of
                  your password.
                </li>
                <li>
                  You must notify us immediately of any breach of security or
                  unauthorized use of your account.
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
                  <AlertCircle className="size-6" />
                </div>
                <h2 className="text-2xl font-bold m-0">Content & Copyright</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                All content provided on PlayTube is for informational and
                entertainment purposes only. The owners of PlayTube make no
                representations as to the accuracy or completeness of any
                information on this site or found by following any link on this
                site.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Unauthorized use and/or duplication of this material without
                express and written permission from this site&apos;s author
                and/or owner is strictly prohibited.
              </p>
            </motion.div>

            <div className="pt-10 border-t">
              <p className="text-sm text-muted-foreground">
                Last updated: May 02, 2026. If you have any questions about
                these Terms, please contact us at support@playtube.com.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
