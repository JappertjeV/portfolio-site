import { getTranslations } from "next-intl/server";
import { FadeIn } from "./FadeIn";
import { Mail, Linkedin, Github, ArrowRight } from "lucide-react";

export async function Contact() {
  const t = await getTranslations("contact");

  return (
    <section id="contact" className="py-24 px-6 bg-zinc-900/30">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-indigo-400 text-sm font-mono font-medium">{t("label")}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-50">{t("title")}</h2>
          </div>
          <div className="w-12 h-px bg-indigo-500 mb-12" />
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <FadeIn delay={0.1}>
            <h3 className="text-2xl font-semibold text-zinc-100 mb-4">{t("heading")}</h3>
            <p className="text-zinc-400 leading-relaxed mb-6">{t("p1")}</p>
            <p className="text-zinc-400 leading-relaxed">{t("p2")}</p>
          </FadeIn>

          {/* Right — contact options */}
          <div className="flex flex-col gap-4">
            <FadeIn delay={0.15}>
              <a
                href="mailto:jasperveldhuizen@icloud.com"
                className="group flex items-center justify-between p-5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-indigo-500/50 hover:bg-zinc-900/80 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                    <Mail size={20} className="text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-zinc-200 font-medium text-sm">{t("email")}</p>
                    <p className="text-zinc-500 text-xs mt-0.5">jasperveldhuizen@icloud.com</p>
                  </div>
                </div>
                <ArrowRight size={16} className="text-zinc-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
              </a>
            </FadeIn>

            <FadeIn delay={0.2}>
              <a
                href="https://www.linkedin.com/in/jasper-veldhuizen-bb10a3278/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-blue-500/50 hover:bg-zinc-900/80 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                    <Linkedin size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-zinc-200 font-medium text-sm">{t("linkedin")}</p>
                    <p className="text-zinc-500 text-xs mt-0.5">linkedin.com/in/jasper-veldhuizen</p>
                  </div>
                </div>
                <ArrowRight size={16} className="text-zinc-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
              </a>
            </FadeIn>

            <FadeIn delay={0.25}>
              <a
                href="https://github.com/JappertjeV"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-500/50 hover:bg-zinc-900/80 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-zinc-700/40 flex items-center justify-center group-hover:bg-zinc-700/60 transition-colors">
                    <Github size={20} className="text-zinc-300" />
                  </div>
                  <div>
                    <p className="text-zinc-200 font-medium text-sm">{t("github")}</p>
                    <p className="text-zinc-500 text-xs mt-0.5">github.com/JappertjeV</p>
                  </div>
                </div>
                <ArrowRight size={16} className="text-zinc-600 group-hover:text-zinc-300 group-hover:translate-x-1 transition-all" />
              </a>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
