import React, { useState } from "react";
import { AppBar, Tab, Tabs, Typography, Grid } from "@material-ui/core";
import { Box } from "@mui/material";
import { TabContext, TabPanel } from "@material-ui/lab";
import ListarPostagem from "../listarPostagem/ListarPostagem";
import ListarPostagemUsuario from "../listarPostagemUsuario/ListarPostagemUsuario";
import "./TabPostagem.css";

function TabPostagem() {
  const [value, setValue] = useState("1");
  function handleChange(event: React.ChangeEvent<{}>, newValue: string) {
    setValue(newValue);
  }
  return (
    <>
      <TabContext value={value}>
        <AppBar position="static" className="bgtab">
          <Tabs centered indicatorColor="secondary" onChange={handleChange}>
            <Tab className="corletra" label="Todas as postagens" value="1" />
            <Tab className="corletra" label="Suas Postagens" value="2" />
          </Tabs>
        </AppBar>
        <TabPanel value="1" className="bgpainel">
          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            className="caixatabpostagem"
          >
            <ListarPostagem />
          </Box>
        </TabPanel>
        <TabPanel value="2" className="bgpainel">
          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            className="caixatabpostagem"
          >
            <ListarPostagemUsuario />
          </Box>
        </TabPanel>
      </TabContext>
    </>
  );
}
export default TabPostagem;
