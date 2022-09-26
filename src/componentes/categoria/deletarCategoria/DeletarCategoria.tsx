import React, { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";
import { Box } from "@mui/material";
import "./DeletarCategoria.css";
import { useNavigate, useParams } from "react-router-dom";
import { buscaId, deleteId } from "../../../services/Service";
import Categoria from "../../../models/Categoria";
import { useSelector } from "react-redux";
import { UserState } from "../../../store/tokens/userReducer";
import { toast } from "react-toastify";

interface DeletarCategoriaProps {
  id: number;
}

function DeletarCategoria({id}:DeletarCategoriaProps) {
  let navigate = useNavigate();
  const token = useSelector<UserState, UserState["tokens"]>(
    (state) => state.tokens
  );
  const [categoria, setCategoria] = useState<Categoria>();

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
      findById(id.toString());
    }
  }, [id]);

  async function findById(id: string) {
    buscaId(`/categorias/${id}`, setCategoria, {
      headers: {
        Authorization: token,
      },
    });
  }

  async function sim() {
    try {
      await deleteId(`/categorias/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      navigate("/home");

      toast.success("Categoria deletada com sucesso!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        theme: "dark",
        progress: undefined,

      });

    } catch (error) {
      toast.error("Erro ao deletar!", {
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

  function nao() {
    navigate("/home");
  }

  return (
    <>
      <Box m={2}>
        <Card variant="outlined" className="bgListaP">
          <CardContent>
            <Box justifyContent="center" >
              <Typography
                color="textSecondary"
                gutterBottom
                className="fonteTitulo"
              >
                Deseja deletar a categoria:
              </Typography>
              <Typography color="textSecondary" className="fontenome">
                {categoria?.nome}
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
             <Box className="botoes" display="flex" justifyContent="start" ml={1.0} mb={2}>
              <Box mx={2}>
                <Button
                  onClick={sim}
                  variant="contained"
                  className="bgCadastroP"
                  size="large"
                  color="primary"
                >
                  Sim
                </Button>
              </Box>
               <Box mx={2}>
                <Button
                  onClick={nao}
                  variant="contained"
                  size="large"
                  color="secondary"
                  className="fonteCadastroP bgListaPB2"
                >
                  Não
                </Button>
              </Box> 
            </Box> 
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
export default DeletarCategoria;
