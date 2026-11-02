import { levelStyles } from "../../data/conteudos";

export default function LevelBadge({ level }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${levelStyles[level]}`}
    >
      {level}
    </span>
  );
}
