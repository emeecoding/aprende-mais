import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function DropdownItem({
  icon: Icon,
  title,
  description,
  to,
  href,
  submenu = [],
}) {
  // 💡 Se o Header passou 'to', usa ele. Se passou 'href', usa o 'href'. Se nenhum, vai para a raiz.
  const destination = to || href || "/";

  return (
    <li className="group/disc relative">
      <Link
        to={destination}
        className="group/item flex items-center gap-3 px-4 py-5 hover:bg-gray-100"
      >
        <Icon className="shrink-0" size={32} color="#7C3AED" />

        <div className="flex flex-1 flex-col">
          <span className="font-medium group-hover/item:text-[#7C3AED]">
            {title}
          </span>
          <span className="text-sm text-gray-500">{description}</span>
        </div>

        <ChevronRight className="shrink-0" size={18} color="#7C3AED" />
      </Link>

      {/* Submenu lateral (só aparece se o item tiver submenu) */}
      {submenu.length > 0 && (
        <div className="invisible absolute left-full top-0 z-50 pl-2 opacity-0 transition-all duration-200 group-hover/disc:visible group-hover/disc:opacity-100">
          <ul className="w-[220px] rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
            {submenu.map((item) => {
              // 💡 Faz a mesma checagem inteligente para os itens do submenu
              const subDestination = item.to || item.href || "/";

              return (
                <li key={item.title}>
                  <Link
                    to={subDestination}
                    className="block px-4 py-2 font-medium hover:bg-gray-100 hover:text-[#7C3AED]"
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </li>
  );
}
