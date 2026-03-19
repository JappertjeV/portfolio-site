import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowLeft } from "lucide-react";

export default async function NotFound() {
  const t = await getTranslations("not_found");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <p className="text-indigo-400 font-mono text-sm font-medium mb-4">{t("code")}</p>
      <h1 className="text-4xl font-bold text-zinc-50 mb-4">{t("title")}</h1>
      <p className="text-zinc-500 mb-8 max-w-sm">{t("description")}</p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 text-sm font-medium transition-colors"
      >
        <ArrowLeft size={15} />
        {t("back")}
      </Link>
    </div>
  );
}
