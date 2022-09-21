import "./CadastroCategoria.css";
import { useNavigate, useParams } from "react-router-dom";
import { buscaId, post, put } from "../../../services/Service";
import categoria from "../../../models/Categoria";
import { ChangeEvent, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Container, Typography, TextField, Button, Grid, } from "@material-ui/core";
import { useSelector } from "react-redux";
import { UserState } from "../../../store/tokens/userReducer";
import { toast } from "react-toastify";

function CadastroCategoria() {
  let navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const token = useSelector<UserState, UserState["tokens"]>(
    (state) => state.tokens
  );
  const [categoria, setCategoria] = useState<categoria>({
    id: 0,
    nome: "",
    descricao: "",
  });

  useEffect(() => {
    if (token == "") {
      toast.info("Você precisa estar logado!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        theme: "dark",
        progress: undefined,
      });
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      findById(id);
    }
  }, [id]);

  async function findById(id: string) {
    buscaId(`/categorias/${id}`, setCategoria, {
      headers: {
        Authorization: token,
      },
    });
  }

  function updatedCategoria(e: ChangeEvent<HTMLInputElement>) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value,
      postagens: null
    });
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();


    if (id !== undefined) {
      try {
        await put(`/categorias`, categoria, setCategoria, {
          headers: {
            Authorization: token,
          },
        });
        toast.success("Categoria atualizada com sucesso!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          theme: "dark",
          progress: undefined,
        });

        back();
      } catch (error) {

        console.log(`Error: ${error}`);
        toast.error("Por favor verifique a quantidade mínima de caracteres.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          theme: "dark",
          progress: undefined,
        });
      }
    } else {
      try {
        await post(`/categorias`, categoria, setCategoria, {
          headers: {
            Authorization: token,
          },
        });
        toast.success("Categoria cadastrada com sucesso!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          theme: "dark",
          progress: undefined,
        });

        back();
      } catch (error) {
        console.log(`Error: ${error}`);
        toast.error("Por favor verifique a quantidade mínima de caracteres.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          theme: "dark",
          progress: undefined,
        });
      }
    }
  }

  function back() {
    navigate("/categorias");
  }

  return (
    <Box className="backgroundcategoria" justifyContent="center" alignItems="center">
      <div className="divform">
        <Grid container direction="row" justifyContent="center" alignItems="center" className="backgroundform">
          <Grid alignItems="center" item sm={6} >
            <Box className="form">
              <form onSubmit={onSubmit}>
                <Typography
                  className="titulocategoria"
                  variant="h3"
                  color="textSecondary"
                  component="h1"
                  align="center"
                >
                  Cadastro de Categorias
                </Typography>
                <div className="textfield1">
                  <TextField
                    value={categoria.nome}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updatedCategoria(e)}
                    id="nome"
                    variant="outlined"
                    placeholder="Nome - no minimo 3 caracteres"
                    name="nome"
                    margin="normal"
                    className="nome"
                    fullWidth
                  /></div>

                <div className="textfield2">
                  <TextField
                    value={categoria.descricao}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updatedCategoria(e)}
                    id="descricao"
                    multiline
                    variant="outlined"
                    placeholder="Descrição - no minimo 3 caracteres"
                    name="descricao"
                    margin="normal"
                    className="descricao"
                    fullWidth

                  />


                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="btn"
                  >
                    Finalizar
                  </Button>
                </div>
              </form>
            </Box>
          </Grid>
          <Grid alignItems="center" item className="imagem" sm={6} ></Grid>
        </Grid>
      </div>
    </Box>

  );
}

export default CadastroCategoria;

//./categoria/cadastroCategoria/CadastroCategoria
