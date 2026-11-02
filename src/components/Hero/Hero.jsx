import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Clock, GraduationCap } from "lucide-react";
import estudante from "../../assets/estudante.png";

export default function Hero() {
  return (
    <section className="relative flex items-center overflow-hidden bg-gradient-to-br from-white via-white to-primary/10 lg:min-h-[calc(100vh-70px)]">
      {/* Bolas de luz decorativas ao fundo */}
      <div
        aria-hidden="true"
        className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-primary/15 blur-3xl"
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 lg:grid-cols-2 lg:py-20">
        {/* Texto */}
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <GraduationCap size={16} />
            Plataforma de estudos
          </span>

          <h1 className="mt-6  text-4xl font-bold leading-tight text-[#0D0B3E] md:text-[56px]">
            O Aprende+ impulsiona resultados!
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-xl leading-relaxed text-[#0D0B3E] lg:mx-0">
            Aprenda por meio de exercícios, quizzes e conteúdos de Matemática e
            Língua Portuguesa, no seu ritmo e com correção na hora.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              to="/disciplinas"
              className="inline-flex h-14 items-center gap-2 rounded-xl bg-primary px-8 text-base font-medium text-white shadow-lg shadow-primary/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
            >
              Começar a estudar
              <ArrowRight size={20} />
            </Link>

            <Link
              to="/exercicios"
              className="inline-flex h-14 items-center rounded-xl border border-gray-200 bg-white px-8 text-base font-medium text-[#0D0B3E] transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15"
            >
              Fazer um exercício
            </Link>
          </div>
        </div>

        {/* Imagem com formato de polígono */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          {/* Polígono de fundo (camada clara + camada principal) */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 top-10 bg-primary/20 [clip-path:polygon(8%_6%,100%_0%,92%_94%,0%_100%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-6 bottom-4 top-6 bg-gradient-to-br from-primary to-primary-dark [clip-path:polygon(15%_0%,100%_10%,90%_100%,0%_85%)]"
          />

          <img
            src={estudante}
            alt="Estudante sorrindo com mochila e fones de ouvido"
            className="relative z-10 mx-auto h-auto w-full max-w-sm object-contain drop-shadow-2xl lg:max-w-md"
          />

          {/* Cartões flutuantes */}
          <div className="absolute left-0 top-12 z-20 hidden items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl shadow-primary/10 sm:flex">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-green-600">
              <CheckCircle2 size={22} />
            </span>
            <div>
              <p className="text-sm font-semibold text-[#0D0B3E]">
                Correção imediata
              </p>
              <p className="text-xs text-gray-500">Com explicação</p>
            </div>
          </div>

          <div className="absolute bottom-10 right-0 z-20 hidden items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl shadow-primary/10 sm:flex">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Clock size={22} />
            </span>
            <div>
              <p className="text-sm font-semibold text-[#0D0B3E]">
                Quizzes cronometrados
              </p>
              <p className="text-xs text-gray-500">Treine com o relógio</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
