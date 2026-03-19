import { getTranslations } from "next-intl/server";
import { FadeIn } from "./FadeIn";
import { GraduationCap, Briefcase, MapPin, Zap } from "lucide-react";

export async function About() {
  const t = await getTranslations("about");

  const highlights = [
    { icon: GraduationCap, title: t("h1_title"), description: t("h1_desc") },
    { icon: Briefcase, title: t("h2_title"), description: t("h2_desc") },
    { icon: Zap, title: t("h3_title"), description: t("h3_desc") },
    { icon: MapPin, title: t("h4_title"), description: t("h4_desc") },
  ];

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-indigo-400 text-sm font-mono font-medium">{t("label")}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-50">{t("title")}</h2>
          </div>
          <div className="w-12 h-px bg-indigo-500 mb-12" />
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Text */}
          <FadeIn delay={0.1}>
            <div className="space-y-4 text-zinc-400 text-lg leading-relaxed">
              <p>
                {t.rich("p1", {
                  b: (chunks) => (
                    <span className="text-zinc-200 font-medium">{chunks}</span>
                  ),
                  em: (chunks) => (
                    <em className="text-indigo-400 not-italic font-medium">{chunks}</em>
                  ),
                })}
              </p>
              <p>{t("p2")}</p>
              <p>{t("p3")}</p>
              <p>{t("p4")}</p>
            </div>
          </FadeIn>

          {/* Highlights grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, i) => (
              <FadeIn key={item.title} delay={0.15 + i * 0.08}>
                <div className="group p-5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-indigo-500/40 hover:bg-zinc-900/80 transition-all duration-300">
                  <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-3 group-hover:bg-indigo-500/20 transition-colors">
                    <item.icon size={18} className="text-indigo-400" />
                  </div>
                  <h3 className="font-semibold text-zinc-200 mb-1 text-sm">{item.title}</h3>
                  <p className="text-zinc-500 text-xs leading-relaxed">{item.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
