import React, { ChangeEvent, useEffect, useState } from "react";
import "./CadastroPostagemModal.css";
import Categoria from "../../../models/Categoria";
import Postagem from "../../../models/Postagem";
import FormControl from '@material-ui/core/FormControl';


import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  InputLabel,
  MenuItem,

  FormHelperText,
} from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import { busca, buscaId, post, put } from "../../../services/Service";
import { useSelector } from "react-redux";
import { UserState } from "../../../store/tokens/userReducer";
import { toast } from "react-toastify";
import { Box, Checkbox, FormControlLabel, Switch } from "@mui/material";

function CadastroPostagem() {
  let navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const token = useSelector<UserState, UserState["tokens"]>(
    (state) => state.tokens
  );

  const userId = useSelector<UserState, UserState["id"]>((state) => state.id);

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

  /* armazernar um categoria especifico*/
  const [categoria, setCategoria] = useState<Categoria>({
    id: 0,
    nome: "",
    descricao: "",
  });

  /*efetuar o cadastro das postagens*/
  const [postagem, setPostagem] = useState<Postagem>({
    id: 0,
    anonimo: false,
    texto: "",
    data: "",
    titulo: "",
    categoria: null,
    usuario: {
      id: parseInt(userId),
      nome: "",
      data_nascimento: "",
      cpf: "",
      email: "",
      foto: "",
      cnpj: "",
      senha: "",
      tipo: "",
    },
  });

  useEffect(() => {
    setPostagem({
      ...postagem,
      categoria: categoria,
    });
  }, [categoria]);

  useEffect(() => {
    getCategorias();
    if (id !== undefined) {
      findByIdPostagem(id);
    }
  }, [id]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPostagem({ ...postagem, [event.target.name]: event.target.checked });
  };

  async function getCategorias() {
    await busca("/categorias", setCategorias, {
      headers: {
        Authorization: token,
      },
    });
  }

  async function findByIdPostagem(id: string) {
    await buscaId(`postagens/${id}`, setPostagem, {
      headers: {
        Authorization: token,
      },
    });
  }

  function updatedPostagem(e: ChangeEvent<HTMLInputElement>) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
      categoria: categoria,
    });
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(postagem);

    // Se o ID for diferente de indefinido tente Atualizar
    if (id !== undefined) {
      // TRY: Tenta executar a atualização
      try {
        await put(`/postagens`, postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });
        toast.success("Postagem atualizada com sucesso!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          theme: "dark",
          progress: undefined,
        });

        // CATCH: Caso tenha algum erro, pegue esse erro e mande uma msg para o usuário
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

      // Se o ID for indefinido, tente Cadastrar
    } else {
      // TRY: Tenta executar o cadastro
      try {
        await post(`/postagens`, postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });
        toast.success("Postagem cadastrada com sucesso!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          theme: "dark",
          progress: undefined,
        });

        // CATCH: Caso tenha algum erro, pegue esse erro e mande uma msg para o usuário
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
        //alert("Erro, por favor verifique a quantidade minima de caracteres");
      }
    }

    back();
  }

  function back() {
    navigate("/usuario/postagens");
  }

  return (
    <Container maxWidth="sm">
      <form onSubmit={onSubmit}>
        <Typography
          variant="h4"
          color="textSecondary"
          align="center"
          className="topo"
        >
          Faça o seu relato!
        </Typography>
        <TextField
          value={postagem.titulo}
          onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)}
          id="titulo"
          label="Titulo"
          variant="outlined"
          name="titulo"
          margin="normal"
          fullWidth
        />
        <TextField
          value={postagem.texto}
          multiline
          onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)}
          id="texto"
          label="Texto"
          name="texto"
          variant="outlined"
          margin="normal"
          fullWidth
        />

        <FormControl>
          <InputLabel id="demo-simple-select-helper-label">
            Categoria{" "}
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            onChange={(e) =>
              buscaId(`/categorias/${e.target.value}`, setCategoria, {
                headers: {
                  Authorization: token,
                },
              })
            }
          >
            {categorias.map((categoria) => (
              <MenuItem value={categoria.id}>{categoria.nome}</MenuItem>
            ))}
          </Select>
          <FormHelperText className="cadastro-postagem">
            Escolha uma categoria para a postagem
          </FormHelperText>

        </FormControl>
        <Box className="checkbox-container-modal-cadastro-postagem">

        <FormControlLabel className="checkbox-anonimo-modal"
          control={<Checkbox checked={postagem.anonimo} onChange={handleChange} name="anonimo" id="anonimo" />}
          label="Anônimo"
        />
        </Box>

        <Button
          className="botaomodal"
          type="submit"
          variant="contained"
          color="primary"
        >
          Finalizar
        </Button>
      </form>
    </Container>
  );
}
export default CadastroPostagem;
