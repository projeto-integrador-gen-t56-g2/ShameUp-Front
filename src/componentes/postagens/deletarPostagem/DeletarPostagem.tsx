import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
} from "@material-ui/core";
import "./DeletarPostagem.css";
import { useNavigate, useParams } from "react-router-dom";
import Postagem from "../../../models/Postagem";
import { buscaId, deleteId } from "../../../services/Service";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { UserState } from "../../../store/tokens/userReducer";
import { toast } from "react-toastify";

interface DeletarPostagemProps {
  idPostagem: number;
}

function DeletarPostagem({ idPostagem }: DeletarPostagemProps) {
  let navigate = useNavigate();

  const token = useSelector<UserState, UserState["tokens"]>(
    (state) => state.tokens
  );
  const [post, setPosts] = useState<Postagem>();

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
    if (idPostagem !== undefined) {
      findById(idPostagem.toString());
    }
  }, [idPostagem]);

  async function findById(idPostagem: string) {
    buscaId(`/postagens/${idPostagem}`, setPosts, {
      headers: {
        Authorization: token,
      },
    });
  }

  function sim() {
    navigate("/usuario/postagens");
    deleteId(`/postagens/${idPostagem}`, {
      headers: {
        Authorization: token,
      },
    });
    toast.success("Postagem deletada com sucesso!", {
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

  function nao() {
    navigate("/home");
  }
  return (
    <>
      <Box m={2}>
        <Card variant="outlined">
          <CardContent>
            <Box justifyContent="center">
              <Typography color="textSecondary" gutterBottom>
                Deseja deletar a Postagem:
              </Typography>
              <Typography color="textSecondary">{post?.titulo}</Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="start" ml={1.0} mb={2}>
              <Box mx={2}>
                <Button
                  onClick={sim}
                  variant="contained"
                  className="marginLeft bgCadastroP bgListaPB2"
                  size="large"
                  color="primary"
                >
                  Sim
                </Button>
              </Box>
              <Box>
                <Button
                  onClick={nao}
                  variant="contained"
                  size="large"
                  color="secondary"
                  className="bgCadastroP bgListaPB2"
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
export default DeletarPostagem;
