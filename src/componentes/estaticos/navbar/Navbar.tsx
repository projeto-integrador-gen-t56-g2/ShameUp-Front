import React from 'react'
import './Navbar.css'

import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'
import { Link, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import useLocalStorage from 'react-use-localstorage'

function Navbar() {
  const [token, setToken] = useLocalStorage('token')
  let navigate = useNavigate()

  function goLogout() {
    setToken('')
    alert('Usuário deslogado')
    navigate('/login')
  }

  return (
    <>
      <AppBar position="static" className="appBar">
        <Toolbar variant="dense" className="content">
          <Box className="cursor">
            <Typography variant="h5" color="inherit" className="logo">
              ShameUp
            </Typography>
          </Box>

          <div className="options">
            <Box display="flex" justifyContent="end">
              <Box mx={2} className="cursor">
                <Link to="/home" className="text-decorator">
                  <Typography
                    variant="h6"
                    color="inherit"
                    className="typographyNav"
                  >
                    Home
                  </Typography>
                </Link>
              </Box>

              <Box mx={2} className="cursor">
                <Link to="/sobre" className="text-decorator">
                  <Typography
                    variant="h6"
                    color="inherit"
                    className="typographyNav"
                  >
                    Sobre
                  </Typography>
                </Link>
              </Box>

              <Box mx={2} className="cursor">
                <Link to="/formularioCategoria" className="text-decorator">
                  <Typography
                    variant="h6"
                    color="inherit"
                    className="typographyNav"
                  >
                    Cadastrar Tema
                  </Typography>
                </Link>
              </Box>

              <Box mx={2} className="cursor">
                <Link to="/categorias" className="text-decorator">
                  <Typography
                    variant="h6"
                    color="inherit"
                    className="typographyNav"
                  >
                    Temas
                  </Typography>
                </Link>
              </Box>

              <Box mx={2} className="cursor">
                <Link to="/cadastrousuario" className="text-decorator">
                  <Typography
                    variant="h6"
                    color="inherit"
                    className="typographyNav"
                  >
                    Cadastro
                  </Typography>
                </Link>
              </Box>

              <Box mx={2} className="cursor" onClick={goLogout}>
                <Link to="/login" className="text-decorator">
                  <Typography
                    variant="h6"
                    color="inherit"
                    className="typographyNav"
                  >
                    logout
                  </Typography>
                </Link>
              </Box>
            </Box>
          </div>
          <div className="icon-menu">
            <IconButton
              className="cursor"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar
