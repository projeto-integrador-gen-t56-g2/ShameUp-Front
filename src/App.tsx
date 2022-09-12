import React from "react";
import "./App.css";
import Navbar from "./componentes/estaticos/navbar/Navbar";
import Home from "./paginas/home/Home";
import Login from "./paginas/login/Login";
import Sobrenos from "./paginas/sobrenos/Sobrenos";
import Footer from "./componentes/estaticos/footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CadastroUsuario from "./paginas/cadastroUsuario/CadastroUsuario";
import ListaCategoria from "./componentes/Categoria/listaCategoria/ListaCategoria";
import CadastroCategoria from "./componentes/Categoria/cadastroCategoria/CadastroCategoria";
import DeletarCategoria from "./componentes/Categoria/deletarCategoria/DeletarCategoria";

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ minHeight: "100vh" }}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/categorias" element={<ListaCategoria />} />
          <Route path="/" element={<Login />} />
          <Route path="/cadastrousuario" element={<CadastroUsuario />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sobre" element={<Sobrenos />} />
          <Route path="/formularioCategoria" element={<CadastroCategoria />} />
          <Route path="/deletarCategoria/:id" element={<DeletarCategoria />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
