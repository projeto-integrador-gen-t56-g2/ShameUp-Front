import React, { ChangeEvent, useEffect, useState } from 'react'
import './CadastroPostagem.css'
import Categoria from '../../../models/Categoria'
import Postagem from '../../../models/Postagem'

import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText
} from '@material-ui/core'
import { useNavigate, useParams } from 'react-router-dom'
import useLocalStorage from 'react-use-localstorage'
import { busca, buscaId, post, put } from '../../../services/Service'

function CadastroPostagem() {
  let navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [categorias, setCategorias] = useState<Categoria[]>([])

  const [token, setToken] = useLocalStorage('token')

  useEffect(() => {
    if (token == '') {
      alert('Você precisa estar logado')
      navigate('/login')
    }
  }, [token])

  /* armazernar um categoria especifico*/
  const [categoria, setCategoria] = useState<Categoria>({
    id: 0,
    nome: '',
    descricao: ''
  })

  /*efetuar o cadastro das postagens*/
  const [postagem, setPostagem] = useState<Postagem>({
    id: 0,
    anonimo: true,
    texto: '',
    data: '',
    titulo: '',
    categoria: null,
    usuario: {
      id: 1,
      nome: '',
      data_nascimento: '',
      cpf: '',
      email: '',
      foto: '',
      cnpj: '',
      senha: '',
      tipo: ''
    }
  })

  useEffect(() => {
    setPostagem({
      ...postagem,
      categoria: categoria
    })
  }, [categoria])

  useEffect(() => {
    getCategorias()
    if (id !== undefined) {
      findByIdPostagem(id)
    }
  }, [id])

  async function getCategorias() {
    await busca('/categorias', setCategorias, {
      headers: {
        Authorization: token
      }
    })
  }

  async function findByIdPostagem(id: string) {
    await buscaId(`postagens/${id}`, setPostagem, {
      headers: {
        Authorization: token
      }
    })
  }

  function updatedPostagem(e: ChangeEvent<HTMLInputElement>) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
      categoria: categoria
    })
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log(postagem)

    // Se o ID for diferente de indefinido tente Atualizar
    if (id !== undefined) {
      // TRY: Tenta executar a atualização
      try {
        await put(`/postagens`, postagem, setPostagem, {
          headers: {
            Authorization: token
          }
        })
        alert('Postagem atualizada com sucesso')

        // CATCH: Caso tenha algum erro, pegue esse erro e mande uma msg para o usuário
      } catch (error) {
        console.log(`Error: ${error}`)
        alert('Erro, por favor verifique a quantidade minima de caracteres')
      }

      // Se o ID for indefinido, tente Cadastrar
    } else {
      // TRY: Tenta executar o cadastro
      try {
        await post(`/postagens`, postagem, setPostagem, {
          headers: {
            Authorization: token
          }
        })
        alert('Postagem cadastrada com sucesso')

        // CATCH: Caso tenha algum erro, pegue esse erro e mande uma msg para o usuário
      } catch (error) {
        console.log(`Error: ${error}`)
        alert('Erro, por favor verifique a quantidade minima de caracteres')
      }
    }

    back()
  }

  function back() {
    navigate('/postagens')
  }

  return (
    <Container maxWidth="sm" className="topo">
      <form onSubmit={onSubmit}>
        <Typography
          variant="h3"
          color="textSecondary"
          component="h1"
          align="center"
        >
          Formulário de cadastro postagem
        </Typography>
        <TextField
          value={postagem.titulo}
          onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)}
          id="titulo"
          label="titulo"
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
          label="texto"
          name="texto"
          variant="outlined"
          margin="normal"
          fullWidth
        />

        <FormControl>
          <InputLabel id="demo-simple-select-helper-label">
            Categoria{' '}
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            onChange={e =>
              buscaId(`/categorias/${e.target.value}`, setCategoria, {
                headers: {
                  Authorization: token
                }
              })
            }
          >
            {categorias.map(categoria => (
              <MenuItem value={categoria.id}>{categoria.descricao}</MenuItem>
            ))}
          </Select>
          <FormHelperText>Escolha uma Categoria para a postagem</FormHelperText>
          <Button type="submit" variant="contained" color="primary">
            Finalizar
          </Button>
        </FormControl>
      </form>
    </Container>
  )
}
export default CadastroPostagem
