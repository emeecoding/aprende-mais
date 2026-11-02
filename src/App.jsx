import { HashRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Perfil from "./pages/Perfil";
import Disciplinas from "./pages/Disciplinas";
import Disciplina from "./pages/Disciplina";
import Exercicios from "./pages/Exercicios";
import Exercicio from "./pages/Exercicio";
import Quizzes from "./pages/Quizzes";
import Quiz from "./pages/Quiz";
import AreaDoAluno from "./pages/AreaDoAluno";
import Contato from "./pages/Contato";

export default function App() {
  return (
    <HashRouter>
      <Header />

      {/* pt-[70px]: espaço do header fixo (mesma altura dele), para ele não cobrir o topo das páginas */}
      <div className="pt-[70px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/disciplinas" element={<Disciplinas />} />
          <Route path="/disciplinas/:slug" element={<Disciplina />} />
          <Route path="/exercicios" element={<Exercicios />} />
          <Route path="/exercicios/:id" element={<Exercicio />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/quizzes/:id" element={<Quiz />} />
          <Route path="/area-do-aluno" element={<AreaDoAluno />} />
          <Route path="/contato" element={<Contato />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
