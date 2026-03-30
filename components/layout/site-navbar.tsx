"use client";

import Image from "next/image";
import Link from "next/link";
import { type MouseEvent, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { trackEvent } from '@/lib/analytics'

import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type SectionNavItem = {
  kind: "section";
  sectionId: "about" | "themes" | "sponsors" | "requirements" | "faq";
  label: string;
};

type RouteNavItem = {
  kind: "route";
  href: "/timeline" | "/updates";
  label: string;
};

type NavItem = SectionNavItem | RouteNavItem;

const navItems: NavItem[] = [
  { kind: "section", sectionId: "about", label: "About" },
  { kind: "section", sectionId: "themes", label: "Themes" },
  { kind: "route", href: "/timeline", label: "Timeline" },
  { kind: "section", sectionId: "sponsors", label: "Sponsors" },
  { kind: "route", href: "/updates", label: "Updates" },
  { kind: "section", sectionId: "faq", label: "FAQ" },
];

const SECTION_OFFSET = 88;

function scrollToSection(sectionId: string) {
  const target = document.getElementById(sectionId);

  if (!target) {
    return;
  }

  const top = target.getBoundingClientRect().top + window.scrollY - SECTION_OFFSET;

  window.scrollTo({
    top,
    behavior: "smooth",
  });

  window.history.replaceState(null, "", `#${sectionId}`);
}

export function SiteNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const homePage = pathname === '/'
  const [activeSection, setActiveSection] = useState("about");
  const [open, setOpen] = useState(false);

  const sectionIds = useMemo(
    () =>
      navItems
        .filter((item): item is SectionNavItem => item.kind === "section")
        .map((item) => item.sectionId),
    [],
  );

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const observedElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (observedElements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const currentEntry = visibleEntries.at(0);

        if (currentEntry) {
          setActiveSection(currentEntry.target.id);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0.2, 0.4, 0.6, 0.8],
      },
    );

    observedElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [pathname, sectionIds]);

  const navigateToSection = (sectionId: string) => {
    if (pathname === "/") {
      setActiveSection(sectionId);
      scrollToSection(sectionId);
      setOpen(false);
      return;
    }

    setOpen(false);
    router.push(`/#${sectionId}`);
  };

  const handleSectionClick = (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault();
    navigateToSection(sectionId);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-none transition-all duration-300",
        (isScrolled || !homePage) &&
          "bg-primary supports-backdrop-filter:bg-primary-900/65 shadow-sm supports-backdrop-filter:backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
        <Link
          href={pathname === "/" ? "#hero" : "/#hero"}
          className="font-heading text-sm font-semibold tracking-wide text-white"
          onClick={(event) => {
            trackEvent('navbar_logo_click', { button: 'logo' })
            handleSectionClick(event, "hero")
          }}
          aria-label="Go to homepage hero section"
        >
          <Image
            src="/images/logo_white.png"
            alt="Challenge logo"
            width={100}
            height={100}
            className="mr-2 inline w-fit h-auto"
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => {
            if (item.kind === "route") {
              const isActiveRoute = pathname.startsWith(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => {setOpen(false); trackEvent('navbar_route_click', { route: item.label })}}
                  className={cn(
                    "focus-visible:ring-accent-yellow rounded-md px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:text-white focus-visible:ring-2 focus-visible:outline-none",
                    isActiveRoute && "bg-white/10 text-white",
                  )}
                  aria-current={isActiveRoute ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            }

            const isActive = pathname === "/" && activeSection === item.sectionId;
            const href = pathname === "/" ? `#${item.sectionId}` : `/#${item.sectionId}`;

            return (
              <Link
                key={item.sectionId}
                href={href}
                onClick={(event) => { trackEvent('navbar_route_click', { section: item.sectionId }); handleSectionClick(event, item.sectionId); }}
                className={cn(
                  "focus-visible:ring-accent-yellow rounded-md px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:text-white focus-visible:ring-2 focus-visible:outline-none",
                  isActive && "bg-white/10 text-white",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link
            href={`https://docs.google.com/forms/d/e/1FAIpQLSdzmBDWMpf5ViwiYkFtvLGO6mut8OcfWpFB00pWewz0RhLXgA/viewform?usp=header`}
            target="_blank"
            className="bg-accent-yellow hover:bg-accent-yellow/90 focus-visible:ring-accent-yellow inline-flex h-9 items-center rounded-md px-4 text-sm font-semibold text-neutral-900 transition-colors focus-visible:ring-2 focus-visible:outline-none"
            aria-label="Register now"
            onClick={()=> {
              trackEvent('navbar_register_click', { button: 'Register' });
            }}
          >
            Register Now
          </Link>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <button
                type="button"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "text-white hover:bg-white/10 hover:text-white md:hidden",
                )}
                aria-label="Open navigation menu"
              />
            }
          >
            <Menu className="size-5" aria-hidden="true" />
          </SheetTrigger>
          <SheetContent side="right" className="bg-primary-900 w-[85vw] max-w-sm text-white">
            <SheetHeader>
              <SheetTitle className="text-white">Menu</SheetTitle>
              <SheetDescription className="text-white/70">
              </SheetDescription>
            </SheetHeader>

            <nav className="mt-2 flex flex-col gap-2 px-4 pb-6" aria-label="Mobile navigation">
              {navItems.map((item) => {
                if (item.kind === "route") {
                  const isActiveRoute = pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => {setOpen(false); trackEvent('sheet_route_click', { route: item.label });
}}
                      className={cn(
                        "focus-visible:ring-accent-yellow rounded-md px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:outline-none",
                        isActiveRoute && "bg-white/10 text-white",
                      )}
                      aria-current={isActiveRoute ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  );
                }

                const isActive = pathname === "/" && activeSection === item.sectionId;
                const href = pathname === "/" ? `#${item.sectionId}` : `/#${item.sectionId}`;

                return (
                  <Link
                    key={item.sectionId}
                    href={href}
                    onClick={(event) => {handleSectionClick(event, item.sectionId); trackEvent('sheet_route_click', {route: item.label})}}
                    className={cn(
                      "focus-visible:ring-accent-yellow rounded-md px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:outline-none",
                      isActive && "bg-white/10 text-white",
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <Link
                href={pathname === "/" ? "#register" : "/#register"}
                onClick={(event) => {handleSectionClick(event, "register"); trackEvent('sheet_register_click', {button: 'Register'})}}
                className="bg-accent-yellow hover:bg-accent-yellow/90 focus-visible:ring-accent-yellow mt-2 inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-semibold text-neutral-900 transition-colors focus-visible:ring-2 focus-visible:outline-none"
                aria-label="Register now"
              >
                Register Now
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}




