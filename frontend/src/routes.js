import {BrowserRouter, Routes, Route } from "react-router-dom"
import Ranking from "./Pages/Ranking/Ranking";
import CadastroPage from "./Pages/Cadastro/CadastroPage";
import PlacarPage from "./Pages/Placar/PlacarPage";

export default function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CadastroPage />} />
                <Route path="/Ranking" element={<Ranking />} />
                <Route path="/PlacarPage" element={<PlacarPage />} />
            </Routes>
        </BrowserRouter>
    );
}