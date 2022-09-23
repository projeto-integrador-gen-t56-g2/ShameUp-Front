import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography
} from '@material-ui/core'
import { Box, Grid, TextField } from '@mui/material'
import './ListaCategoria.css'
import { busca } from '../../../services/Service'
import Categoria from '../../../models/Categoria'
import { useSelector } from 'react-redux'
import { UserState } from '../../../store/tokens/userReducer'
import { toast } from 'react-toastify'
import ModalCategoria from '../modalCategoria/ModalCategoria'

function ListaCategoria() {
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const token = useSelector<UserState, UserState['tokens']>(
    state => state.tokens
  )
  let navigate = useNavigate()

  useEffect(() => {
    if (token === '') {
      toast.info('Você precisa estar logado!', {
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
  }, [token])

  async function getCategorias() {
    await busca('/categorias', setCategorias, {
      headers: {
        Authorization: token
      }
    })
  }

  useEffect(() => {
    getCategorias()
  }, [categorias.length])

  return (
    <>
      <Box className="backgroundlista">
        <Box className="caixaTitleEBtn">
          <div className="divBtCategoria">
          <Box>
            <h1 className="titleCategorias">Categorias</h1>
          </Box>
          <Box mx={2} className="cursor">
            <Link to="/formularioCategoria" className="text-decorator">
              <Button className="btnNovaCategoria">Nova Categoria</Button>
            </Link>
          </Box>
          </div>
        </Box>
        <Box justifyContent="center" alignItems="center">
          {categorias.map(categoria => (
            <Box m={2} key={categoria.id}>
              <Card variant="outlined" className="boxlista">
                <CardContent>
                  <Typography className="txtNome">{categoria.nome}</Typography>
                  <Typography className="txtDescricao">
                    {categoria.descricao}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Box display="flex" justifyContent="center" mb={1.5}>
                    <div className="botaobackground">
                      <Box className="botao">
                        <Link
                          to={`/formularioCategoria/${categoria.id}`}
                          className="text-decorator-none"
                        >
                          <Box mx={1}>
                            <Button
                              variant="contained"
                              className="btAtualizar"
                              size="small"
                              color="primary"
                            >
                              atualizar
                            </Button>
                          </Box>
                        </Link>
                        <Box marginRight={1}>
                          <ModalCategoria id={categoria.id} />
                        </Box>
                      </Box>
                    </div>
                  </Box>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  )
}
export default ListaCategoria
