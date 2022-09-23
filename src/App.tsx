import React from "react";
import "./App.css";
import Navbar from "./componentes/estaticos/navbar/Navbar";
import Home from "./paginas/home/Home";
import Login from "./paginas/login/Login";
import Sobrenos from "./paginas/sobrenos/Sobrenos";
import Footer from "./componentes/estaticos/footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CadastroUsuario from "./paginas/cadastroUsuario/CadastroUsuario";
import ListaCategoria from "./componentes/categoria/listaCategoria/ListaCategoria";
import CadastroCategoria from "./componentes/categoria/cadastroCategoria/CadastroCategoria";
import DeletarCategoria from "./componentes/categoria/deletarCategoria/DeletarCategoria";
import CadastroPostagem from "./componentes/postagens/cadastroPostagem/CadastroPostagem";
import ListarPostagem from "./componentes/postagens/listarPostagem/ListarPostagem";
import DeletarPostagem from "./componentes/postagens/deletarPostagem/DeletarPostagem";
import { Provider } from "react-redux";
import store from "./store/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Postagens from "./paginas/postagem/postagens/Postagens";
import PostagensUsuario from "./paginas/postagem/postagensUsuario/PostagensUsuario";

function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <Router>
        <Navbar />

          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/categorias" element={<ListaCategoria />} />
            <Route path="/" element={<Login />} />
            <Route path="/cadastrousuario" element={<CadastroUsuario />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sobre" element={<Sobrenos />} />
            <Route path="/postagens" element={<Postagens />} />
            <Route path="/usuario/postagens" element={<PostagensUsuario />} />
            <Route path="/formularioPostagem" element={<CadastroPostagem />} />
            <Route
              path="/formularioPostagem/:id"
              element={<CadastroPostagem />}
            />
            <Route
              path="/formularioCategoria"
              element={<CadastroCategoria />}
            />
            <Route
              path="/formularioCategoria/:id"
              element={<CadastroCategoria />}
            />
          </Routes>

        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
