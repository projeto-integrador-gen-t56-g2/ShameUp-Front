import React from "react";
import { Typography, Grid } from "@material-ui/core";
import "./Sobrenos.css";

function Sobrenos() {
  return (
    <>
      <Typography
        variant="h3"
        gutterBottom
        color="textPrimary"
        component="h3"
        align="center"
        className="titulo"
      >
        Sobre nós
      </Typography>
      <Grid className="container" alignItems="center">
        <Grid item xs={6} className="texto">
          <Typography
            variant="h6"
            gutterBottom
            color="textPrimary"
            component="h6"
            align="left"
          >
            Mussum Ipsum, cacilds vidis litro abertis. Suco de cevadiss, é um
            leite divinis, qui tem lupuliz, matis, aguis e fermentis.Admodum
            accumsan disputationi eu sit. Vide electram sadipscing et
            per.Detraxit consequat et quo num tendi nada.Viva Forevis aptent
            taciti sociosqu ad litora torquent. Diuretics paradis num copo é
            motivis de denguis.Mais vale um bebadis conhecidiss, que um
            alcoolatra anonimis.Quem num gosta di mim que vai caçá sua
            turmis!Atirei o pau no gatis, per gatis num morreus.
          </Typography>
        </Grid>
        <Grid item xs={6} className="gridimagem">
          <img
            className="br-50 wh-300 p-30"
            src="https://media.discordapp.net/attachments/988429116711772190/1014536579433369630/SHAME_up.png"
            alt="Logo do Projeto Integrador Shame Up"
            width="500%"
            height="100%"
          />
        </Grid>
      </Grid>
    </>
  );
}

export default Sobrenos;
