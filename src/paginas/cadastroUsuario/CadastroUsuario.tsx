import React, { useState, useEffect, ChangeEvent, SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import User from "../../models/User";
import { cadastroUsuario } from "../../services/Service";
import { Grid, Box, Typography, Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { Link } from "react-router-dom";
import "./CadastroUsuario.css";
import { toast } from "react-toastify";
import { makeStyles } from "@material-ui/styles";


function CadastroUsuario() {
  let navigate = useNavigate();
  const [confirmarSenha, setConfirmarSenha] = useState<String>("");
  const [user, setUser] = useState<User>({
    id: 0,
    nome: "",
    data_nascimento: "",
    cpf: "",
    email: "",
    foto: "",
    cnpj: "",
    senha: "",
    tipo: "",
  });

  const [userResult, setUserResult] = useState<User>({
    id: 0,
    nome: "",
    data_nascimento: "",
    cpf: "",
    email: "",
    foto: "",
    cnpj: "",
    senha: "",
    tipo: "",
  });

  useEffect(() => {
    if (userResult.id != 0) {
      navigate("/login");
    }
  }, [userResult]);

  function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value);
  }

  function updatedModel(e: ChangeEvent<HTMLInputElement>) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
      tipo: category
    });
  }
  async function cadastrar(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(user)

    // Estrutura Condicional que verifica se as senhas batem e se a Senha tem mais de 8 caracteres
    if (confirmarSenha === user.senha && user.senha.length >= 8) {
      //Tenta executar o cadastro
      try {
        await cadastroUsuario(`/usuarios/cadastrar`, user, setUserResult);
        toast.success("Usuário cadastrado com sucesso!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          theme: "dark",
          progress: undefined,
        });

        //Se houver erro, pegue o Erro e retorna uma msg
      } catch (error) {
        console.log(`Error: ${error}`);

        //Pode modificar a msg de acordo com o erro
        toast.info("Usuário já existente!", {
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
      toast.info("Insira no mínimo 8 caracteres no campo senha!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        theme: "dark",
        progress: undefined,
      });
      // Mensagem que indica a quantidade minima de caracteres

      setUser({ ...user, senha: "" }); // Reinicia o campo de Senha
      setConfirmarSenha(""); // Reinicia o campo de Confirmar Senha
    }
  }
  var category1 = '';
  const [dataNascimento, setDataNascimento] = useState("");

  const [category, setCategory] = useState('fisica');
  if (category == 'fisica') {
    
    category1 = 'esconder'
  } else {
    category1 = 'mostrar'
  }

  const useStyles = makeStyles({
    field: {
      marginTop: 20,
      marginBottom: 20,
      display: 'block'
    }
  })

  const tipos = useStyles()

  function getDate(e: ChangeEvent<HTMLInputElement>) {
    setDataNascimento(e.target.value);
  }

  user.data_nascimento = dataNascimento + " 00:00:00";

  return (
    <Box className="container-cad-usuario" display="flex" justifyContent="center" alignItems="center" >
      <Box className="cad-usuario" display="flex" flexDirection="row-reverse" justifyContent="space-evenly" >

        {/* <Box className="form" display="flex" flexDirection="column"  > */}
        <Box className="form-cad-usuario-logo"></Box>
        <Box className="form-cad-usuario">
        
          <Box className="formulario-cad-usuario" display="flex" flexDirection="column" >
            
         
            <form onSubmit={cadastrar} noValidate autoComplete="off" className="form-cadastro-usuario">
              
              <FormControl className={tipos.field}>

                <RadioGroup className="btn-radial" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <FormControlLabel value="fisica" control={<Radio />} label="PF" />
                  <FormControlLabel value="juridica" control={<Radio />} label="PJ" />
                </RadioGroup>
              </FormControl>

              <TextField
                value={user.nome}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                id="nome"
                placeholder="Nome"
                variant="outlined"
                name="nome"
                className="margin-textfield-cad typography-cad-user"
              />
              <TextField
                value={dataNascimento}
                onChange={(e: ChangeEvent<HTMLInputElement>) => getDate(e)}
                id="dataNascimento"
                placeholder="Digite sua Data de nascimento"
                variant="outlined"
                name="dataNascimento"
                className="margin-textfield-cad typography-cad-user"
                type="date"
                InputLabelProps={{ shrink: true }}
                required
              />

              <TextField
                value={user.foto}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                id="foto"
                placeholder="Url da Foto"
                variant="outlined"
                name="foto"
                className="margin-textfield-cad typography-cad-user"
              />

              <div className={category}>
                <TextField
                  value={user.cpf}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                  id="cpf"
                  placeholder="CPF"
                  variant="outlined"
                  name="cpf"
                  className="margin-textfield-cad typography-cad-user"
                />
              </div>
              <div className={category1}>
                <TextField
                  value={user.cnpj}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                  id="cnpj"
                  placeholder="CNPJ"
                  variant="outlined"
                  name="cnpj"
                  className="margin-textfield-cad typography-cad-user"
                />
              </div>
              <TextField
                value={user.email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                id="email"
                placeholder="E-mail"
                variant="outlined"
                name="email"
                className="margin-textfield-cad typography-cad-user"
              />
              <TextField
                value={user.senha}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                id="senha"
                placeholder="Senha"
                variant="outlined"
                name="senha"
                className="margin-textfield-cad typography-cad-user"
                type="password"

              />
              <TextField
                value={confirmarSenha}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  confirmarSenhaHandle(e)
                }
                id="confirmarSenha"
                placeholder="Confirmar Senha"
                variant="outlined"
                name="confirmarSenha"
                className="margin-textfield-cad typography-cad-user"
                type="password"
              />
              <Box className="btns" >
                <Box className="btn01">
                  <Link to="/login" className="text-decorator-none">
                    <Button
                      variant="contained"

                      className="btnCancelar"
                    >
                      Cancelar
                    </Button>
                  </Link>
                </Box>
                <Box>
                  <Button className='btn02' type="submit">
                    Cadastrar
                  </Button>
                </Box>
              </Box>
            </form>
          </Box>
        </Box>
        <Box className="img-cad-user">
        </Box>
      </Box>
    </Box>

  );
}

export default CadastroUsuario;

