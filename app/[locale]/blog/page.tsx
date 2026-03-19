import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { getAllPosts } from "@/lib/blog";
import { getTranslations } from "next-intl/server";
import { Calendar, Clock, Tag, ArrowRight, PenLine } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return { title: t("title"), description: t("description") };
}

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale === "nl" ? "nl-NL" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const posts = getAllPosts();

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <PenLine size={22} className="text-zinc-400" />
            <h1 className="text-3xl md:text-4xl font-bold text-zinc-50">{t("title")}</h1>
          </div>
          <p className="text-zinc-400">{t("description")}</p>
          {locale === "nl" && (
            <p className="mt-2 text-zinc-600 text-sm italic">{t("note")}</p>
          )}
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-zinc-800 rounded-xl">
            <PenLine size={40} className="mx-auto mb-4 text-zinc-700" />
            <p className="text-zinc-400 font-medium mb-2">{t("empty_title")}</p>
            <p className="text-zinc-600 text-sm">{t("empty_desc")}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block p-6 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-indigo-500/50 transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h2 className="font-semibold text-zinc-100 text-lg mb-2 group-hover:text-indigo-300 transition-colors leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-zinc-500 text-sm leading-relaxed mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-800 border border-zinc-700/50 text-zinc-400 text-xs"
                          >
                            <Tag size={9} />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center gap-4 text-zinc-600 text-xs">
                      <span className="flex items-center gap-1">
                        <Calendar size={11} />
                        {formatDate(post.date, locale)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {post.readingTime} {t("min_read")}
                      </span>
                    </div>
                  </div>
                  <ArrowRight
                    size={18}
                    className="flex-shrink-0 text-zinc-700 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all mt-1"
                  />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
