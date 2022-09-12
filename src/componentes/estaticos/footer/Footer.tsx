import { Grid, Typography } from '@material-ui/core'
import { Box } from '@mui/material'
import FacebookIcon from '@material-ui/icons/Facebook'
import GitHubIcon from '@mui/icons-material/GitHub'
import './Footer.css'

function Footer() {
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid alignItems="center" item xs={12}>
          <Box className="containerFooter1">
            <Box
              paddingTop={1}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                variant="h5"
                align="center"
                gutterBottom
                style={{ color: 'white' }}
                className="typographyFooter"
              >
                Conheça nossas Redes Sociais{' '}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center">
              <a href=" " target="_blank">
                <GitHubIcon style={{ fontSize: 40, color: 'white' }} />
              </a>

              <a href=" " target="_blank">
                <FacebookIcon style={{ fontSize: 40, color: 'white' }} />
              </a>
            </Box>
          </Box>
          <Box className="containerFooter2">
            <Box paddingTop={1}>
              <Typography
                variant="subtitle2"
                align="center"
                gutterBottom
                className="typographyFooter2"
              >
                © 2023 Copyright
              </Typography>
            </Box>
            <Box>
              <a target="_blank" href="https://brasil.generation.org">
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  align="center"
                  className="typographyFooter2"
                >
                  brasil.generation.org
                </Typography>
              </a>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default Footer
