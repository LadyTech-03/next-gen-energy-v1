import Link from "next/link";
import { Building2, Globe, Mail, MessagesSquare, Phone, Rss, Users } from "lucide-react";
import Image from "next/image";

const quickLinks = [
  { label: "About", href: "/#about" },
  { label: "Themes", href: "/#themes" },
  { label: "Sponsors", href: "/#sponsors" },
  { label: "Updates", href: "/updates" },
  { label: "FAQ", href: "/#faq" },
];

const socialLinks = [
  {
    label: "Website",
    href: "https://www.knust.edu.gh",
    icon: Globe,
  },
  {
    label: "Community",
    href: "https://www.facebook.com/knust.gh",
    icon: Users,
  },
  {
    label: "Announcements",
    href: "/updates",
    icon: Rss,
  },
  {
    label: "Contact",
    href: "mailto:mjbedzra@knust.edu.gh",
    icon: MessagesSquare,
  },
];

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-12 lg:py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div className="space-y-4 lg:col-span-2">
            <Image
              src="/images/logo_white.png"
              alt="NextGen Energy Innovators Challenge Logo"
              width={120}
              height={120}
              className=""
            />

            <p className="max-w-xl text-sm leading-relaxed text-white/80">
              Department of Petroleum Engineering, College of Engineering, KNUST.
            </p>

            <div className="space-y-3 text-sm">
              {/* <p className="flex items-center gap-2 text-white/85">
                <Building2 className="size-4" aria-hidden="true" />
                University-Industry Innovation Program
              </p> */}
              <a
                href="mailto:mjbedzra@knust.edu.gh"
                className="focus-visible:ring-accent flex items-center gap-2 rounded-md text-white/85 transition-colors hover:text-white focus-visible:ring-2 focus-visible:outline-none"
                aria-label="Send email to challenge organizers"
              >
                <Mail className="size-4" aria-hidden="true" />
                mjbedzra@knust.edu.gh
              </a>
              <a
                href="tel:+233595782508"
                className="focus-visible:ring-accent flex items-center gap-2 rounded-md text-white/85 transition-colors hover:text-white focus-visible:ring-2 focus-visible:outline-none"
                aria-label="Call challenge contact number"
              >
                <Phone className="size-4" aria-hidden="true" />
                +233 59 578 2508
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide uppercase text-white/90">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="focus-visible:ring-accent inline-flex rounded-md text-sm text-white/80 transition-colors hover:text-white focus-visible:ring-2 focus-visible:outline-none"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide uppercase text-white/90">Connect</h3>
            <div className="mt-4 flex items-center gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                const isInternal = social.href.startsWith("/");

                if (isInternal) {
                  return (
                    <Link
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="focus-visible:ring-accent inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/20 bg-white/5 text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:outline-none"
                    >
                      <Icon className="size-4" aria-hidden="true" />
                    </Link>
                  );
                }

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="focus-visible:ring-accent inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/20 bg-white/5 text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:outline-none"
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-5">
          <p className="text-xs text-white/70">
            Copyright {currentYear} NextGen Energy Innovators Challenge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
