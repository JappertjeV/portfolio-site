import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import { getTranslations } from "next-intl/server";
import { Calendar, Clock, Tag, ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.flatMap((slug) =>
    ["en", "nl"].map((locale) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `https://jasperveldhuizen.nl/blog/${slug}`,
      languages: {
        en: `https://jasperveldhuizen.nl/blog/${slug}`,
        nl: `https://jasperveldhuizen.nl/nl/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
      locale: locale === "nl" ? "nl_NL" : "en_US",
    },
  };
}

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale === "nl" ? "nl-NL" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug);
  const t = await getTranslations({ locale, namespace: "blog" });

  if (!post) notFound();

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-200 text-sm mb-10 transition-colors"
        >
          <ArrowLeft size={15} />
          {t("back")}
        </Link>

        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-50 leading-tight mb-4">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-zinc-500 text-sm mb-5">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {formatDate(post.date, locale)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {post.readingTime} {t("min_read")}
            </span>
          </div>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium"
                >
                  <Tag size={10} />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <hr className="border-zinc-800 mb-10" />

        {post.content && (
          <article
            className="prose"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        )}

        <hr className="border-zinc-800 mt-12 mb-8" />

        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-200 text-sm transition-colors"
        >
          <ArrowLeft size={15} />
          {t("back")}
        </Link>
      </div>
    </div>
  );
}
