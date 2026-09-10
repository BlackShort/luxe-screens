"use client";

import { Suspense } from "react";

import { Footer } from "@/components/site/footer/footer";
import { Header } from "@/components/site/header/header";
import { HeroSection } from "@/components/site/sections/hero-section";
import { Presence } from "@/components/site/sections/presence-section";
import { Occasions } from "@/components/site/sections/occasions-section";
import { Services } from "@/components/site/sections/services-section";
import { FAQs } from "@/components/site/sections/faq-section";
import { Contact } from "@/components/site/sections/contact-section";
import { Gallery } from "@/components/site/sections/gallery-section";

import { AuthModalHost } from "@/components/auth/auth-modal-host";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col">
      <Header variant={"sticky"} />

      <section className="flex-1">
        <HeroSection />
        <Presence />
        <Occasions />
        <Services />
        <Gallery />
        <FAQs />
        <Contact />
      </section>

      <Footer />

      <Suspense fallback={null}>
        <AuthModalHost />
      </Suspense>
    </main>
  );
}