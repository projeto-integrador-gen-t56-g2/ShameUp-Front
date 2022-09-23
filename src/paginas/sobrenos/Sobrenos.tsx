import React, { useEffect } from 'react'
import { Typography, Grid } from '@material-ui/core'
import './Sobrenos.css'
import { useSelector } from 'react-redux'
import { UserState } from '../../store/tokens/userReducer'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkendIn from '@mui/icons-material/LinkedIn'

function Sobrenos() {
  let navigate = useNavigate()
  const token = useSelector<UserState, UserState['tokens']>(
    state => state.tokens
  )

  useEffect(() => {
    if (token == '') {
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
  return (
    <>
      <Grid className="cordefundo">
        <Grid>
          <Typography
            variant="h3"
            color="textPrimary"
            component="h3"
            align="center"
            className="fontesobre"
          >
            Sobre nós
          </Typography>
        </Grid>
        <Grid className="containersobre" alignItems="center">
          <Grid item xs={6} className="textosobre">
            <Typography
              variant="h6"
              color="textPrimary"
              component="h6"
              align="left"
              className="alinhar"
            >
              Como Projeto Integrador da Generation Brasil, criamos uma Rede
              Social para os usuários compartilharem suas experiências
              relacionadas a injustiças, racismo e injurias durante
              atendimentos. Nosso objetivo é que as instituições tornem-se mais
              eficazes, transparentes e humanas. Também esperamos que essa
              plataforma seja uma ótima fonte para consultas comportamentais.
            </Typography>
          </Grid>
          <Grid item xs={6} className="gridimagem">
            <img
              className="br-50 wh-300 p-30"
              src="https://cdn.discordapp.com/attachments/1016308515167543417/1020017214809718877/2-removebg-preview.png"
              alt="Logo do Projeto Integrador Shame Up"
              width="500%"
              height="100%"
            />
          </Grid>
        </Grid>

        <Grid>
          <Grid className="titleIntegrantes">
            <h1>Integrantes</h1>
          </Grid>

          <Grid className="containerIntegrantes">
            <Grid spacing={1} className="containerIntegrantes1">
              <Grid xs={6} sm={3} className="gridIntegrantes">
                <img
                  src="https://cdn.discordapp.com/attachments/988429116711772190/1022566446322167938/cachedImage.jpg"
                  alt="Foto do André"
                  className="fotosIntegrantes"
                />
                <p className="nomeIntegrantes">André Parelho</p>
                <a
                  href="https://www.linkedin.com/in/andr%C3%A9-parelho-das-neves-3a3610137/"
                  target="_blank"
                >
                  <LinkendIn className="iconIntegrantes" />
                </a>
                <a href="https://github.com/andreparelho" target="_blank">
                  <GitHubIcon className="iconIntegrantes" />
                </a>
              </Grid>
              <Grid xs={6} sm={3} className="gridIntegrantes">
                <img
                  src="https://cdn.discordapp.com/attachments/988429116711772190/1022566446041145436/cachedImage.jpg"
                  alt="Foto do Igor"
                  className="fotosIntegrantes"
                />
                <p className="nomeIntegrantes">Igor Sato</p>
                <a
                  href="https://www.linkedin.com/in/igoryouiti/"
                  target="_blank"
                >
                  <LinkendIn className="iconIntegrantes" />
                </a>
                <a href="https://github.com/igoryouiti" target="_blank">
                  <GitHubIcon className="iconIntegrantes" />
                </a>
              </Grid>
              <Grid xs={6} sm={3} className="gridIntegrantes">
                <img
                  src="https://cdn.discordapp.com/attachments/988429116711772190/1022566447253307402/IMG_5485.jpg"
                  alt="Foto da Lívia"
                  className="fotosIntegrantes"
                />
                <p className="nomeIntegrantes">Lívia Ferreira</p>
                <a
                  href="https://www.linkedin.com/in/liviaflore/"
                  target="_blank"
                >
                  <LinkendIn className="iconIntegrantes" />
                </a>
                <a href="https://github.com/liviaflore" target="_blank">
                  <GitHubIcon className="iconIntegrantes" />
                </a>
              </Grid>
              <Grid xs={6} sm={3} className="gridIntegrantes">
                <img
                  src="https://cdn.discordapp.com/attachments/988429116711772190/1022566446477361152/IMG_5483.jpg"
                  alt="Foto do Lucas"
                  className="fotosIntegrantes"
                />
                <p className="nomeIntegrantes">Lucas Dantas</p>
                <a
                  href="https://www.linkedin.com/in/lucas-dantas-6837b9227/"
                  target="_blank"
                >
                  <LinkendIn className="iconIntegrantes" />
                </a>
                <a href="https://github.com/DantasZo" target="_blank">
                  <GitHubIcon className="iconIntegrantes" />
                </a>
              </Grid>
            </Grid>
            <Grid spacing={1} className="containerIntegrantes1">
              <Grid xs={6} sm={3} className="gridIntegrantes">
                <img
                  src="https://cdn.discordapp.com/attachments/988429116711772190/1022566528408883291/IMG_5486.jpg"
                  alt="Foto do Luiz"
                  className="fotosIntegrantes"
                />
                <p className="nomeIntegrantes"> Luiz Gabriel</p>
                <a
                  href="https://www.linkedin.com/in/luiz-gabriel-641a45230/"
                  target="_blank"
                >
                  <LinkendIn className="iconIntegrantes" />
                </a>
                <a href="https://github.com/luizbeep" target="_blank">
                  <GitHubIcon className="iconIntegrantes" />
                </a>
              </Grid>
              <Grid xs={6} sm={3} className="gridIntegrantes">
                <img
                  src="https://cdn.discordapp.com/attachments/988429116711772190/1022566527775539250/cachedImage.jpg"
                  alt=""
                  className="fotosIntegrantes"
                />
                <p className="nomeIntegrantes">Pedro Chaves</p>
                <a
                  href="https://www.linkedin.com/in/pedro-chaves-santos-curaça-de-araujo-31a61b217/"
                  target="_blank"
                >
                  <LinkendIn className="iconIntegrantes" />
                </a>
                <a href="https://github.com/PedroChaves22" target="_blank">
                  <GitHubIcon className="iconIntegrantes" />
                </a>
              </Grid>
              <Grid xs={6} sm={3} className="gridIntegrantes">
                <img
                  src="https://cdn.discordapp.com/attachments/988429116711772190/1022566527104454757/cachedImage.jpg"
                  alt=""
                  className="fotosIntegrantes"
                />
                <p className="nomeIntegrantes">Samy de Simone</p>
                <a
                  href="linkedin.com/in/samy-de-simoni-souza-39945623a/"
                  target="_blank"
                >
                  <LinkendIn className="iconIntegrantes" />
                </a>
                <a href="https://github.com/Samydesimoni" target="_blank">
                  <GitHubIcon className="iconIntegrantes" />
                </a>
              </Grid>
              <Grid xs={6} sm={3} className="gridIntegrantes">
                <img
                  src="https://cdn.discordapp.com/attachments/988429116711772190/1022566527695851581/IMG_5484.jpg"
                  alt=""
                  className="fotosIntegrantes"
                />
                <p className="nomeIntegrantes">Sthefany Lins</p>
                <a
                  href="https://www.linkedin.com/in/sthefanyalbuquerque/"
                  target="_blank"
                >
                  <LinkendIn className="iconIntegrantes" />
                </a>
                <a href="https://github.com/sthelins" target="_blank">
                  <GitHubIcon className="iconIntegrantes" />
                </a>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default Sobrenos
