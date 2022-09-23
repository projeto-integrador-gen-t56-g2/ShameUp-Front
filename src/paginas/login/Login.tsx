import React, { useState, useEffect, ChangeEvent } from "react";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { Box, Checkbox, Fab, FormControlLabel, IconButton, InputAdornment} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/Service";
import UserLogin from "../../models/UserLogin";
import "./Login.css";
import { useDispatch } from "react-redux";
import { addId, addToken } from "../../store/tokens/actions";
import { toast } from "react-toastify";
import { ClassNames } from "@emotion/react";
import { AccountCircle, Lock } from "@mui/icons-material";


function Login() {
  let history = useNavigate();
  const dispatch = useDispatch();
  const [token, setToken] = useState("");

  const [userLogin, setUserLogin] = useState<UserLogin>({
    id: 0,
    nome: "",
    data_nascimento: "",
    cpf: "",
    email: "",
    foto: "",
    cnpj: "",
    senha: "",
    tipo: "",
    token: "",
  });

  const [respUserLogin, setRespUserLogin] = useState<UserLogin>({
    id: 0,
    nome: "",
    data_nascimento: "",
    cpf: "",
    email: "",
    foto: "",
    cnpj: "",
    senha: "",
    tipo: "",
    token: "",
  });

  function updatedModel(e: ChangeEvent<HTMLInputElement>) {
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    if (token != "") {
      dispatch(addToken(token));
      history("/home");
    }
  }, [token]);

  useEffect(() => {
    if (respUserLogin.token !== "") {


      // Guarda as informações dentro do Redux (Store)
      dispatch(addToken(respUserLogin.token))
      dispatch(addId(respUserLogin.id.toString()))    // Faz uma conversão de Number para String
      history('/home')
    }
  }, [respUserLogin.token])

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await login(`/usuarios/logar`, userLogin, setRespUserLogin);

      toast.success("Usuário logado com sucesso!", {
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
      toast.error(
        "Dados inconsistentes! Insira as informações de login corretamente.",
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          theme: "dark",
          progress: undefined,
        }
      );
      //alert("Dados do usuário inconsistentes. Erro ao logar!");
    }
  }


  return (
    <Grid container direction="row" justifyContent="center" alignItems="center" className="background">
      <Grid alignItems="center" sm={6} >
        <Box paddingX={20} className="container">
        <Box marginTop={2} className="logologin">
            </Box>
          <form onSubmit={onSubmit} >
            
            <Typography variant="subtitle1" gutterBottom align="center" className="subtitulo">
                Aqui é o seu local de fala
              </Typography>
            <TextField
              value={userLogin.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
              id="email"
              placeholder="E-mail"
              name="email"
              variant="outlined"
              margin="normal"
              className="email"
              fullWidth
              inputProps={{ style: { fontFamily: 'Poppins', color: 'white', fontSize: '14px'}}}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              value={userLogin.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
              id="senha"
              placeholder="Senha"
              name="senha"
              variant="outlined"
              margin="normal"
              type="password"
              className="senha"
              fullWidth
              inputProps={{ style: { fontFamily: 'Poppins', color: 'white', fontSize: '14px' }}}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
             
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" className="lembrar" />}
              className="lembrar" label="Continuar conectado"
            />
            <Box marginTop={2} textAlign="center">
              <Button type="submit" variant="contained" className="btnEntrar"> Entrar</Button>
            </Box>


            <Box marginTop={5} textAlign="center">
              <Typography variant="subtitle1" gutterBottom align="center" className="textos1">
                Não tem uma conta?
              </Typography>
            </Box>
            <Link to="/cadastrousuario" className="cadastrese">
              <Typography
                variant="subtitle1"
                gutterBottom
                align="center"
                className="textos"
              >
                Cadastre-se
              </Typography>
            </Link>
          </form>
        </Box>

      </Grid>

    </Grid>
  );
}

export default Login;
