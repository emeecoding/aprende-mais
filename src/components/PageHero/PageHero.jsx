import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function PageHero({
  icon: Icon,
  title,
  description,
  backTo,
  backLabel = "Voltar",
}) {
  return (
    <section className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        {backTo && (
          <Link
            to={backTo}
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary-dark"
          >
            <ArrowLeft size={16} />
            {backLabel}
          </Link>
        )}

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Icon size={32} />
          </span>

          <div>
            <h1 className="text-4xl font-bold text-navy">{title}</h1>
            <p className="mt-2 max-w-2xl text-lg text-gray-500">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
