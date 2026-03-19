import type { Metadata } from "next";
import { getGitHubRepos, getLanguageColor } from "@/lib/github";
import { getTranslations } from "next-intl/server";
import { Github, Star, GitFork, ExternalLink, Clock } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects_page" });
  return { title: t("title"), description: t("description") };
}

function timeAgo(dateStr: string, locale: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (locale === "nl") {
    if (days === 0) return "vandaag";
    if (days === 1) return "gisteren";
    if (days < 30) return `${days}d geleden`;
    if (days < 365) return `${Math.floor(days / 30)}mnd geleden`;
    return `${Math.floor(days / 365)}j geleden`;
  }
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects_page" });
  const repos = await getGitHubRepos();

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <Github size={22} className="text-zinc-400" />
            <h1 className="text-3xl md:text-4xl font-bold text-zinc-50">{t("title")}</h1>
          </div>
          <p className="text-zinc-400 max-w-xl">
            {t("description")}{" "}
            {repos.length > 0 && (
              <span className="text-zinc-500 text-sm">
                {repos.length} {t("repos")}
              </span>
            )}
          </p>
        </div>

        {repos.length === 0 ? (
          <div className="text-center py-24 text-zinc-500">
            <Github size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium mb-2">{t("empty_title")}</p>
            <p className="text-sm">{t("empty_desc")}</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {repos.map((repo) => (
              <div
                key={repo.id}
                className="group flex flex-col p-5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-2 gap-2">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-zinc-100 text-sm hover:text-indigo-400 transition-colors leading-snug"
                  >
                    {repo.name}
                  </a>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-500 hover:text-zinc-300 transition-colors"
                        aria-label={t("live")}
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-500 hover:text-zinc-300 transition-colors"
                      aria-label={t("source")}
                    >
                      <Github size={14} />
                    </a>
                  </div>
                </div>

                <p className="text-zinc-500 text-xs leading-relaxed flex-1 mb-4 line-clamp-2">
                  {repo.description ?? "No description."}
                </p>

                {repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {repo.topics.slice(0, 4).map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-4 text-zinc-500 text-xs mt-auto pt-3 border-t border-zinc-800">
                  {repo.language && (
                    <span className="flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: getLanguageColor(repo.language) }}
                      />
                      {repo.language}
                    </span>
                  )}
                  {repo.stargazers_count > 0 && (
                    <span className="flex items-center gap-1">
                      <Star size={11} />
                      {repo.stargazers_count}
                    </span>
                  )}
                  {repo.forks_count > 0 && (
                    <span className="flex items-center gap-1">
                      <GitFork size={11} />
                      {repo.forks_count}
                    </span>
                  )}
                  <span className="flex items-center gap-1 ml-auto">
                    <Clock size={11} />
                    {timeAgo(repo.updated_at, locale)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
