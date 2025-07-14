import { Logo } from "./logo";

export const LandingFooter = () => {
  return (
    <footer className="w-full bg-background dark:bg-[#1f1f1f] backdrop-blur border-t border-border/60 py-4 mt-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-y-4 px-6">
        <div className="flex items-center gap-x-2 mb-2 md:mb-0">
          <Logo />
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground text-sm justify-center">
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
          <a
            href="https://github.com/ctrlcat0x/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition"
            tabIndex={0}
            aria-label="Maker"
          >
            Made by: ctrlcat0x
          </a>
        </div>
        <div className="text-xs text-muted-foreground text-center md:text-right">
          © {new Date().getFullYear()} Nook. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
