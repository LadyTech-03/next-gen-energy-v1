import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { getChallengeUpdateBySlug, getChallengeUpdates } from "@/data/updates";

type UpdatePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function generateStaticParams() {
  return getChallengeUpdates(2026).map((update) => ({
    slug: update.slug,
  }));
}

export async function generateMetadata({ params }: UpdatePageProps): Promise<Metadata> {
  const { slug } = await params;
  const update = getChallengeUpdateBySlug(slug, 2026);

  if (!update) {
    return {
      title: "Update Not Found",
      description: "The requested update could not be found.",
    };
  }

  return {
    title: `${update.title} | Updates`,
    description: update.excerpt,
    openGraph: {
      title: update.title,
      description: update.excerpt,
      images: [update.image],
      type: "article",
    },
  };
}

export default async function UpdateDetailsPage({ params }: UpdatePageProps) {
  const { slug } = await params;
  const update = getChallengeUpdateBySlug(slug, 2026);

  if (!update) {
    notFound();
  }

  return (
    <main className="bg-background min-h-screen">
      <section className="border-border/60 border-b bg-white">
        <div className="mx-auto w-full max-w-5xl px-6 py-14 lg:py-18">
          <nav aria-label="Breadcrumb" className="text-muted-foreground mb-5 text-sm">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-foreground">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/updates" className="hover:text-foreground">
                  Updates
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground line-clamp-1">{update.title}</li>
            </ol>
          </nav>

          <p className="text-primary-700 text-xs font-medium tracking-wide uppercase">
            {formatDate(update.date)}
          </p>
          <h1 className="text-primary-900 mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {update.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-700">{update.excerpt}</p>
        </div>
      </section>

      <article className="mx-auto w-full max-w-5xl px-6 py-10 lg:py-14">
        <div className="border-border/70 relative mb-8 h-72 w-full overflow-hidden rounded-lg border sm:h-128">
          <Image
            src={update.image}
            alt={update.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
        </div>

        <div className="prose prose-slate max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{update.content}</ReactMarkdown>
        </div>
      </article>
    </main>
  );
}
