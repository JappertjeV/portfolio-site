import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "./FadeIn";
import { ArrowRight, Github } from "lucide-react";

export async function Projects() {
  const t = await getTranslations("projects");

  return (
    <section id="projects" className="py-24 px-6 bg-zinc-900/30">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-indigo-400 text-sm font-mono font-medium">{t("label")}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-50">{t("title")}</h2>
          </div>
          <div className="w-12 h-px bg-indigo-500 mb-4" />
          <p className="text-zinc-400 mb-12 max-w-xl">
            {t.rich("description", {
              link: (chunks) => (
                <Link
                  href="/projects"
                  className="text-indigo-400 hover:text-indigo-300 underline underline-offset-4"
                >
                  {chunks}
                </Link>
              ),
            })}
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-indigo-500/50 transition-all duration-200"
          >
            <Github
              size={20}
              className="text-zinc-400 group-hover:text-indigo-400 transition-colors"
            />
            <span className="text-zinc-300 font-medium group-hover:text-zinc-100 transition-colors">
              {t("cta")}
            </span>
            <ArrowRight
              size={16}
              className="text-zinc-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all ml-auto"
            />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
