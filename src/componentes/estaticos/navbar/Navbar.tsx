import React from 'react'
import './Navbar.css'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'
import { Link, useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { useDispatch, useSelector } from 'react-redux'
import { UserState } from '../../../store/tokens/userReducer'
import { addToken } from '../../../store/tokens/actions'
import { toast } from 'react-toastify'
import ModalPostagem from '../../postagens/modalPostagem/ModalPostagem'

function Navbar() {
  const token = useSelector<UserState, UserState['tokens']>(
    state => state.tokens
  )
  let navigate = useNavigate()
  const dispatch = useDispatch()

  function goLogout() {
    dispatch(addToken(''))
    toast.info('Usuário deslogado.', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      theme: 'dark',
      progress: undefined
    })
    navigate('/login')
  }

  var navBarComponent
  if (token !== '') {
    navBarComponent = (
      <AppBar position="static" className="appBar">
        <Toolbar variant="dense" className="content">
          <Box className="cursor">
            <Link to="/home" className="text-decorator">
              <Typography className="modo peso" variant="h5" color="inherit">
                ShameUp
              </Typography>
            </Link>
          </Box>

          <div className="options">
            <Box display="flex" justifyContent="end">
              <Box mx={2} className="cursor">
                <Link to="/home" className="text-decorator">
                  <Typography className="modo" variant="h6" color="inherit">
                    Home
                  </Typography>
                </Link>
              </Box>

              <Box mx={2} className="cursor">
                <Link to="/sobre" className="text-decorator">
                  <Typography className="modo" variant="h6" color="inherit">
                    Sobre
                  </Typography>
                </Link>
              </Box>

              <Box display="flex">
                <ModalPostagem />
              </Box>

              <Box mx={2} className="cursor">
                <Link to="/categorias" className="text-decorator">
                  <Typography className="modo" variant="h6" color="inherit">
                    Categorias
                  </Typography>
                </Link>
              </Box>

              <Box mx={2} className="cursor" onClick={goLogout}>
                <Link to="/login" className="text-decorator">
                  <Typography className="modo" variant="h6" color="inherit">
                    Logout
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
    )
  }

  return <>{navBarComponent}</>
}

export default Navbar
