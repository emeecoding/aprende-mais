import { useEffect, useRef, useState } from "react";
import {
  GraduationCap,
  BookOpen,
  ClipboardCheck,
  Gamepad2,
  ChevronDown,
  Calculator,
  BookText,
  UserRound,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

import DropdownItem from "./DropdownItem";

const linkBase =
  "relative py-2 font-medium transition-colors duration-200 after:absolute after:-bottom-0.5 after:left-1/2 after:h-0.5 after:-translate-x-1/2 after:rounded-full after:bg-primary after:transition-all after:duration-300";

function navClass(active) {
  return `${linkBase} ${
    active
      ? "text-primary after:w-full"
      : "text-navy after:w-0 hover:text-primary hover:after:w-full"
  }`;
}

const navLinkClass = ({ isActive }) => navClass(isActive);
const contentPaths = ["/disciplinas", "/exercicios", "/quizzes"];

export default function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const menuRef = useRef(null);

  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileContentOpen, setMobileContentOpen] = useState(false);
  const [avatar, setAvatar] = useState({ id: null, url: "" });

  const userId = user?.id;
  const contentActive = contentPaths.some((path) => pathname.startsWith(path));
  const photo =
    user?.user_metadata?.avatar_url || (avatar.id === userId ? avatar.url : "");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!userId) return;

    let active = true;
    supabase
      .from("profiles")
      .select("avatar_url")
      .eq("id", userId)
      .maybeSingle()
      .then(({ data }) => {
        if (active) setAvatar({ id: userId, url: data?.avatar_url ?? "" });
      });

    return () => {
      active = false;
    };
  }, [userId]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setMobileOpen(false);
        setMobileContentOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Fecha o painel depois de qualquer navegação, inclusive voltar/avançar.
  useEffect(() => {
    setMobileOpen(false);
    setMobileContentOpen(false);
  }, [pathname]);

  async function handleLogout() {
    setMenuOpen(false);
    setMobileOpen(false);
    await supabase.auth.signOut();
    navigate("/");
  }

  const mainLinks = (
    <>
      <li>
        <NavLink to="/" end className={navLinkClass}>
          Início
        </NavLink>
      </li>
      <li>
        <NavLink to="/sobre" className={navLinkClass}>
          Sobre
        </NavLink>
      </li>
      <li className="group relative">
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={mobileOpen ? mobileContentOpen : undefined}
          onClick={() => {
            if (mobileOpen) setMobileContentOpen((open) => !open);
          }}
          className={`${navClass(contentActive)} flex w-full cursor-pointer items-center gap-1 group-hover:text-primary group-hover:after:w-full group-focus-within:text-primary group-focus-within:after:w-full`}
        >
          Conteúdos
          <ChevronDown
            size={18}
            className={`text-primary transition-transform duration-200 ${
              mobileContentOpen ? "rotate-180" : "group-hover:rotate-180"
            }`}
          />
        </button>

        {/* Desktop: abre no hover/foco. Celular: abre ao tocar em Conteúdos. */}
        <div
          className={`${
            mobileOpen
              ? mobileContentOpen
                ? "block"
                : "hidden"
              : "invisible absolute left-0 top-full z-50 pt-6 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
          } ${mobileOpen ? "static mt-2 w-full" : ""}`}
        >
          <ul className="w-full rounded-lg border border-gray-200 bg-white py-2 shadow-lg sm:w-[350px]">
            <DropdownItem
              icon={BookOpen}
              title="Disciplinas"
              description="Matemática e Língua Portuguesa"
              href="/disciplinas"
              submenu={[
                {
                  title: "Matemática",
                  href: "/disciplinas/matematica",
                  icon: Calculator,
                },
                {
                  title: "Português",
                  href: "/disciplinas/portugues",
                  icon: BookText,
                },
              ]}
            />
            <DropdownItem
              icon={ClipboardCheck}
              title="Exercícios"
              description="Pratique o que aprendeu"
              href="/exercicios"
            />
            <DropdownItem
              icon={Gamepad2}
              title="Quizzes"
              description="Teste seus conhecimentos"
              href="/quizzes"
            />
          </ul>
        </div>
      </li>
      <li>
        <NavLink to="/contato" className={navLinkClass}>
          Contato
        </NavLink>
      </li>
    </>
  );

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:h-[70px] lg:px-10 xl:px-14">
        <Link
          to="/"
          className="group flex shrink-0 items-center gap-2"
          onClick={() => setMobileOpen(false)}
        >
          <GraduationCap
            size={34}
            strokeWidth={2}
            className="text-primary transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 sm:h-10 sm:w-10"
          />
          <span className="text-xl font-bold text-navy sm:text-2xl">
            Aprende<span className="text-primary">+</span>
          </span>
        </Link>

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">{mainLinks}</ul>
        </nav>

        <div
          id="actions"
          className="hidden items-center gap-4 xl:gap-6 lg:flex"
        >
          {user ? (
            <div ref={menuRef} className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                aria-label="Abrir menu do perfil"
                className="group relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
              >
                <span
                  aria-hidden="true"
                  className={`absolute -inset-1 rounded-full bg-primary/30 blur-md transition-opacity duration-300 group-hover:opacity-100 ${menuOpen ? "opacity-100" : "opacity-0"}`}
                />
                <span
                  aria-hidden="true"
                  className={`absolute inset-0 rounded-full bg-gradient-to-tr from-primary via-primary-dark to-primary/30 shadow-md shadow-primary/30 group-hover:animate-[spin_3s_linear_infinite] ${menuOpen ? "animate-[spin_3s_linear_infinite]" : ""}`}
                />
                <span className="relative flex h-[42px] w-[42px] items-center justify-center overflow-hidden rounded-full border-2 border-white bg-primary/10 transition-transform duration-300 group-hover:scale-105">
                  {photo ? (
                    <img
                      src={photo}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <UserRound size={22} className="text-primary" />
                  )}
                </span>
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500"
                />
              </button>

              {menuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full z-50 mt-4 w-64 rounded-lg border border-gray-200 bg-white py-2 shadow-lg"
                >
                  <div className="border-b border-gray-100 px-4 pb-3 pt-1">
                    <p className="truncate font-medium text-navy">
                      {user.user_metadata?.name ?? "Minha conta"}
                    </p>
                  </div>
                  <Link
                    to="/perfil"
                    role="menuitem"
                    onClick={() => setMenuOpen(false)}
                    className="flex w-full items-center gap-3 px-4 py-3 font-medium text-navy transition-colors hover:bg-gray-50 hover:text-primary"
                  >
                    <UserRound size={18} className="text-primary" /> Meu perfil
                  </Link>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left font-medium text-navy transition-colors hover:bg-gray-50 hover:text-primary"
                  >
                    <LogOut size={18} className="text-primary" /> Sair
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `group flex items-center gap-2 font-medium transition-colors ${isActive ? "text-primary" : "text-navy hover:text-primary"}`
              }
            >
              <UserRound
                size={21}
                className="text-primary transition-transform duration-200 group-hover:scale-110"
              />
              <span>Entrar</span>
            </NavLink>
          )}

          <NavLink
            to="/area-do-aluno"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-full px-4 py-3 font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 xl:px-6 ${isActive ? "bg-primary-dark ring-4 ring-primary/25" : "bg-primary hover:bg-primary-dark"}`
            }
          >
            <GraduationCap size={20} />
            <span>Área do aluno</span>
          </NavLink>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          {user ? (
            <div ref={menuRef} className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                aria-label="Abrir menu do perfil"
                className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-primary/30 bg-primary/10"
              >
                {photo ? (
                  <img
                    src={photo}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserRound size={21} className="text-primary" />
                )}
              </button>
              {menuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full z-[60] mt-3 w-60 rounded-lg border border-gray-200 bg-white py-2 shadow-lg"
                >
                  <div className="border-b border-gray-100 px-4 pb-3 pt-1">
                    <p className="truncate font-medium text-navy">
                      {user.user_metadata?.name ?? "Minha conta"}
                    </p>
                  </div>
                  <Link
                    to="/perfil"
                    role="menuitem"
                    onClick={() => setMenuOpen(false)}
                    className="flex w-full items-center gap-3 px-4 py-3 font-medium text-navy hover:bg-gray-50 hover:text-primary"
                  >
                    <UserRound size={18} className="text-primary" /> Meu perfil
                  </Link>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left font-medium text-navy hover:bg-gray-50 hover:text-primary"
                  >
                    <LogOut size={18} className="text-primary" /> Sair
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink
              to="/login"
              aria-label="Entrar"
              className="flex h-10 w-10 items-center justify-center rounded-full text-primary hover:bg-primary/10"
            >
              <UserRound size={22} />
            </NavLink>
          )}
          <button
            type="button"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-navy hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
          >
            {mobileOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-gray-100 bg-white px-5 pb-6 pt-3 shadow-lg lg:hidden"
        >
          <nav aria-label="Navegação principal para celular">
            <ul className="flex flex-col gap-1">
              <li>
                <NavLink
                  to="/"
                  end
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-lg px-4 py-3 font-semibold transition-colors ${isActive ? "bg-primary/10 text-primary" : "text-navy hover:bg-gray-50"}`
                  }
                >
                  Início
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/sobre"
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-lg px-4 py-3 font-semibold transition-colors ${isActive ? "bg-primary/10 text-primary" : "text-navy hover:bg-gray-50"}`
                  }
                >
                  Sobre
                </NavLink>
              </li>
              <li>
                <button
                  type="button"
                  aria-expanded={mobileContentOpen}
                  aria-controls="mobile-content-links"
                  onClick={() => setMobileContentOpen((open) => !open)}
                  className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-left font-semibold transition-colors ${contentActive ? "bg-primary/10 text-primary" : "text-navy hover:bg-gray-50"}`}
                >
                  <span>Conteúdos</span>
                  <ChevronDown
                    size={18}
                    className={`text-primary transition-transform ${mobileContentOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {mobileContentOpen && (
                  <ul
                    id="mobile-content-links"
                    className="ml-4 mt-1 space-y-1 border-l-2 border-primary/20 pl-3"
                  >
                    <li>
                      <NavLink
                        to="/disciplinas"
                        onClick={() => setMobileOpen(false)}
                        className={({ isActive }) =>
                          `block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${isActive || pathname.startsWith("/disciplinas/") ? "bg-primary/10 text-primary" : "text-navy hover:bg-gray-50"}`
                        }
                      >
                        Disciplinas
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/exercicios"
                        onClick={() => setMobileOpen(false)}
                        className={({ isActive }) =>
                          `block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${isActive ? "bg-primary/10 text-primary" : "text-navy hover:bg-gray-50"}`
                        }
                      >
                        Exercícios
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/quizzes"
                        onClick={() => setMobileOpen(false)}
                        className={({ isActive }) =>
                          `block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${isActive ? "bg-primary/10 text-primary" : "text-navy hover:bg-gray-50"}`
                        }
                      >
                        Quizzes
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <NavLink
                  to="/contato"
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-lg px-4 py-3 font-semibold transition-colors ${isActive ? "bg-primary/10 text-primary" : "text-navy hover:bg-gray-50"}`
                  }
                >
                  Contato
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="mt-4 border-t border-gray-100 pt-4">
            {user ? (
              <p className="mb-3 truncate text-sm font-medium text-navy">
                Olá, {user.user_metadata?.name ?? "estudante"}
              </p>
            ) : (
              <NavLink
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="mb-3 flex items-center gap-2 py-2 font-medium text-navy hover:text-primary"
              >
                <UserRound size={19} className="text-primary" /> Entrar
              </NavLink>
            )}
            {user && (
              <Link
                to="/perfil"
                onClick={() => setMobileOpen(false)}
                className="mb-3 flex items-center gap-2 py-2 font-medium text-navy hover:text-primary"
              >
                <UserRound size={19} className="text-primary" /> Meu perfil
              </Link>
            )}
            <NavLink
              to="/area-do-aluno"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 font-medium text-white ${isActive ? "bg-primary-dark" : "bg-primary hover:bg-primary-dark"}`
              }
            >
              <GraduationCap size={20} /> Área do aluno
            </NavLink>
            {user && (
              <button
                type="button"
                onClick={handleLogout}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 font-medium text-navy hover:bg-gray-50 hover:text-primary"
              >
                <LogOut size={18} className="text-primary" /> Sair
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
