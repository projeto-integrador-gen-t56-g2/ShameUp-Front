
import React, { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserState } from "../../../store/tokens/userReducer";
import { toast } from "react-toastify";
import { Box, Grid } from '@mui/material';
import ListarPostagemUsuario from '../../../componentes/postagens/listarPostagemUsuario/ListarPostagemUsuario';
import './PostagensUsuario.css'


function PostagensUsuario() {

  let navigate = useNavigate();

  const token = useSelector<UserState, UserState["tokens"]>(
    (state) => state.tokens
  );



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

  return (
    <Box p={3} className="background-postagens-usuario">
      <ListarPostagemUsuario />
    </Box>
  )
}

export default PostagensUsuario