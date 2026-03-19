import Link from "next/link";
import { FadeIn } from "./FadeIn";
import { ArrowRight, Github } from "lucide-react";

export function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-zinc-900/30">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-indigo-400 text-sm font-mono font-medium">02.</span>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-50">Projects</h2>
          </div>
          <div className="w-12 h-px bg-indigo-500 mb-4" />
          <p className="text-zinc-400 mb-12 max-w-xl">
            My public projects live on GitHub. Head over to the{" "}
            <Link href="/projects" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-4">
              projects page
            </Link>{" "}
            to see everything I&apos;ve been building.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-indigo-500/50 transition-all duration-200"
          >
            <Github size={20} className="text-zinc-400 group-hover:text-indigo-400 transition-colors" />
            <span className="text-zinc-300 font-medium group-hover:text-zinc-100 transition-colors">
              View all projects on GitHub
            </span>
            <ArrowRight size={16} className="text-zinc-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all ml-auto" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
