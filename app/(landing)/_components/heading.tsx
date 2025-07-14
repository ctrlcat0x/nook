"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useUser, SignUpButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { HelpCircle } from "lucide-react";

export const LandingHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-headline",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
      gsap.fromTo(
        ".hero-subheadline",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.3, ease: "power3.out" }
      );
      gsap.fromTo(
        ".hero-ctas",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.6, ease: "power3.out" }
      );
      gsap.fromTo(
        ".hero-image",
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.7, delay: 0.9, ease: "power3.out" }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);
  return (
    <section
      ref={heroRef}
      className="w-full flex flex-col items-center justify-center text-center py-24 px-4 dark:bg-[#1f1f1f]"
    >
      <h1 className="hero-headline text-4xl sm:text-6xl font-extrabold tracking-tight pb-6 bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
        Your cozy corner for big ideas.
      </h1>
      <h2 className="hero-subheadline text-lg sm:text-2xl font-medium text-muted-foreground mb-8 max-w-2xl mx-auto">
        Nook is your personal space on the web. Capture, organize, and share
        your thoughts effortlessly.
      </h2>
      <div className="hero-ctas flex flex-col sm:flex-row gap-4 justify-center mb-12">
        {!user ? (
          <SignUpButton mode="modal">
            <Button size="lg" asChild>
              <span tabIndex={0} aria-label="Get Started Free">
                Get Started Free
              </span>
            </Button>
          </SignUpButton>
        ) : (
          <Button size="lg" onClick={() => router.push("/documents")}>
            Go to Nook
          </Button>
        )}
        <Button size="lg" variant="secondary" asChild>
          <Link href="#features" tabIndex={0} aria-label="Learn More">
            Learn More
          </Link>
        </Button>
      </div>
      <div className="flex justify-center">
        <Image
          src="/doc2-light.png"
          alt="Nook product screenshot"
          width={400}
          height={300}
          className="hero-image w-full max-w-md"
          priority
        />
      </div>
    </section>
  );
};

import { FileText, Star, Users, Lock } from "lucide-react";

export const LandingFeatures = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!featuresRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".feature-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    }, featuresRef);
    return () => ctx.revert();
  }, []);
  return (
    <section
      id="features"
      ref={featuresRef}
      className="w-full py-24 bg-background/80 dark:bg-[#1f1f1f]"
    >
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="feature-card flex flex-col items-center text-center p-6 bg-muted/60 rounded-xl shadow-sm border border-muted">
            <FileText
              className="h-10 w-10 text-primary mb-4"
              aria-hidden="true"
            />
            <h3 className="text-lg font-semibold mb-2">Effortless Notes</h3>
            <p className="text-muted-foreground text-sm">
              Quickly capture ideas, plans, and inspiration in a beautiful,
              distraction-free editor.
            </p>
          </div>
          <div className="feature-card flex flex-col items-center text-center p-6 bg-muted/60 rounded-xl shadow-sm border border-muted">
            <Star
              className="h-10 w-10 text-yellow-400 mb-4"
              aria-hidden="true"
            />
            <h3 className="text-lg font-semibold mb-2">
              Favorites & Organization
            </h3>
            <p className="text-muted-foreground text-sm">
              Star important notes and organize everything with intuitive
              navigation and search.
            </p>
          </div>
          <div className="feature-card flex flex-col items-center text-center p-6 bg-muted/60 rounded-xl shadow-sm border border-muted">
            <Users className="h-10 w-10 text-sky-500 mb-4" aria-hidden="true" />
            <h3 className="text-lg font-semibold mb-2">Share & Collaborate</h3>
            <p className="text-muted-foreground text-sm">
              Share notes publicly or privately, and collaborate with others in
              real time.
            </p>
          </div>
          <div className="feature-card flex flex-col items-center text-center p-6 bg-muted/60 rounded-xl shadow-sm border border-muted">
            <Lock className="h-10 w-10 text-rose-500 mb-4" aria-hidden="true" />
            <h3 className="text-lg font-semibold mb-2">Private & Secure</h3>
            <p className="text-muted-foreground text-sm">
              Your notes are private by default and protected with secure
              authentication.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
// Testimonials Section
export const LandingTestimonials = () => {
  const testimonialsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!testimonialsRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonial-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    }, testimonialsRef);
    return () => ctx.revert();
  }, []);
  return (
    <section
      ref={testimonialsRef}
      className="w-full py-24 bg-background/80 dark:bg-[#1f1f1f]"
    >
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          What people are saying
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="testimonial-card flex flex-col items-center text-center p-8 bg-muted/60 rounded-xl shadow-sm border border-muted">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="User avatar"
              className="w-16 h-16 rounded-full mb-4 border-2 border-primary"
            />
            <p className="text-base text-muted-foreground mb-4">
              “Nook has completely changed the way I organize my thoughts. The
              interface is beautiful and so easy to use!”
            </p>
            <span className="font-semibold">Alex Johnson</span>
            <span className="text-xs text-muted-foreground">
              Product Designer
            </span>
          </div>
          <div className="testimonial-card flex flex-col items-center text-center p-8 bg-muted/60 rounded-xl shadow-sm border border-muted">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="User avatar"
              className="w-16 h-16 rounded-full mb-4 border-2 border-primary"
            />
            <p className="text-base text-muted-foreground mb-4">
              “I love how simple and fast it is to capture ideas. Nook is my
              daily go-to for notes and planning.”
            </p>
            <span className="font-semibold">Maria Lee</span>
            <span className="text-xs text-muted-foreground">
              Startup Founder
            </span>
          </div>
          <div className="testimonial-card flex flex-col items-center text-center p-8 bg-muted/60 rounded-xl shadow-sm border border-muted">
            <img
              src="https://randomuser.me/api/portraits/men/65.jpg"
              alt="User avatar"
              className="w-16 h-16 rounded-full mb-4 border-2 border-primary"
            />
            <p className="text-base text-muted-foreground mb-4">
              “The best note app I’ve used. Clean, secure, and the sharing
              features are fantastic.”
            </p>
            <span className="font-semibold">Samir Patel</span>
            <span className="text-xs text-muted-foreground">Engineer</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Pricing Section
export const LandingPricing = () => {
  const pricingRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!pricingRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pricing-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    }, pricingRef);
    return () => ctx.revert();
  }, []);
  return (
    <section
      ref={pricingRef}
      id="pricing"
      className="w-full py-24 bg-background dark:bg-[#1f1f1f]"
    >
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Pricing
        </h2>
        <div className="flex justify-center">
          <div className="pricing-card flex flex-col items-center text-center p-10 bg-muted/60 rounded-xl shadow-lg border border-muted max-w-md w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-12 w-12 text-green-500 mb-4"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <h3 className="text-2xl font-bold mb-2">100% Free & Open Source</h3>
            <p className="text-muted-foreground text-base mb-4">
              Nook is completely free to use. No subscriptions. No paywalls.
              Forever.
              <br />
              Built by the community, for the community.
            </p>
            <a
              href="https://github.com/ctrlcat0x/nook"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
              tabIndex={0}
              aria-label="View on GitHub"
            >
              <Button size="lg" variant="secondary">
                View on GitHub
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// FAQ Section
export const LandingFAQ = () => {
  const faqRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!faqRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    }, faqRef);
    return () => ctx.revert();
  }, []);
  // Simple accessible accordion
  const faqs = [
    {
      q: "Is Nook really free?",
      a: "Yes! The Free plan gives you unlimited notes and basic features. Upgrade for more power.",
    },
    {
      q: "How do I upgrade to Pro or Team?",
      a: "Just click the Start Pro or Contact Sales button in the pricing section. You can upgrade anytime.",
    },
    {
      q: "Can I use Nook on mobile?",
      a: "Absolutely! Nook is fully responsive and works great on any device.",
    },
    {
      q: "Is my data private and secure?",
      a: "Yes, your notes are private by default and protected with secure authentication.",
    },
    {
      q: "Can I collaborate with others?",
      a: "Yes, Pro and Team plans allow sharing and real-time collaboration.",
    },
  ];
  return (
    <section
      ref={faqRef}
      id="faq"
      className="w-full py-24 bg-background/80 dark:bg-[#1f1f1f]"
    >
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          FAQ
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <details
              key={faq.q}
              className="faq-item group rounded-xl border border-muted bg-muted/60 p-6 transition-all"
              open={i === 0}
            >
              <summary className="flex items-center gap-2 cursor-pointer text-lg font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50">
                <HelpCircle
                  className="h-5 w-5 text-primary"
                  aria-hidden="true"
                />
                {faq.q}
              </summary>
              <div className="mt-2 text-muted-foreground text-base pl-7">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
