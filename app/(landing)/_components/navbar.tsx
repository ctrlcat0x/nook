"use client";

import Link from "next/link";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { SignInButton, useUser } from "@clerk/nextjs";

export const LandingNavbar = () => {
  const { user } = useUser();
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-background/60 dark:bg-[#1f1f1f] backdrop-blur border-b border-border/60">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-x-6">
          <Logo />
        </div>
        <div className="hidden md:flex items-center gap-x-6 text-muted-foreground font-medium text-sm">
          <Link
            href="#features"
            className="hover:text-foreground transition"
            tabIndex={0}
            aria-label="Features"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="hover:text-foreground transition"
            tabIndex={0}
            aria-label="Pricing"
          >
            Pricing
          </Link>
          <a
            href="https://github.com/ctrlcat0x/nook"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition"
            tabIndex={0}
            aria-label="GitHub"
          >
            GitHub
          </a>
        </div>
        <div className="flex items-center gap-x-2">
          {!user ? (
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm" asChild>
                <span tabIndex={0} aria-label="Log in">
                  Log in
                </span>
              </Button>
            </SignInButton>
          ) : (
            <Button size="sm" asChild>
              <Link href="/documents" tabIndex={0} aria-label="Go to Nook">
                Go to Nook
              </Link>
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};
