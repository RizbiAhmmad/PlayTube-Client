"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock, Eye, FileText } from "lucide-react";

const PrivacyPolicy = () => {
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
              <ShieldCheck className="size-4" />
              Legal Center
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              Your privacy is important to us. This policy explains how we
              collect, use, and protect your personal information when you use
              PlayTube.
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
                  <Lock className="size-6" />
                </div>
                <h2 className="text-2xl font-bold m-0">
                  Information We Collect
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                We collect information you provide directly to us, such as when
                you create an account, subscribe to a plan, or contact our
                support team. This may include your name, email address, payment
                information, and any other details you choose to provide.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Account credentials (username, email, password)</li>
                <li>Profile information (avatar, display name)</li>
                <li>Billing details and transaction history</li>
                <li>Communication preferences and support interactions</li>
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
                  <Eye className="size-6" />
                </div>
                <h2 className="text-2xl font-bold m-0">How We Use Your Data</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                We use the information we collect to provide, maintain, and
                improve our services, including personalized content
                recommendations and secure payment processing.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>To provide and maintain our Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To provide customer care and support</li>
                <li>
                  To provide analysis or valuable information so that we can
                  improve the Service
                </li>
                <li>To monitor the usage of the Service</li>
                <li>To detect, prevent and address technical issues</li>
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
                  <FileText className="size-6" />
                </div>
                <h2 className="text-2xl font-bold m-0">Data Protection</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                We implement a variety of security measures to maintain the
                safety of your personal information. Your personal information
                is contained behind secured networks and is only accessible by a
                limited number of persons who have special access rights to such
                systems.
              </p>
            </motion.div>

            <div className="pt-10 border-t">
              <p className="text-sm text-muted-foreground">
                Last updated: May 02, 2026. If you have any questions about this
                Privacy Policy, please contact us at privacy@playtube.com.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
