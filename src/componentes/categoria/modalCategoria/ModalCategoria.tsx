import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@mui/material/Modal";
import { Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import "./ModalCategoria.css";
import { Box } from "@mui/material";
import DeletarCategoria from "../deletarCategoria/DeletarCategoria";

interface DeletarCategoriaProps {
  id: number;
}

function getModalStyle(){
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: "#ebeaea",
      border: "2px solid #000",
      boxShadow: theme.shadows[20],
      padding: theme.spacing(0.5, 0.5, 0.5),
    },
  })
);

function ModalCategoria({id}:DeletarCategoriaProps) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    
  };


  
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Box display="flex" justifyContent="flex-end" className="cursor">
        <CloseIcon onClick={handleClose} />
      </Box>
      
      <DeletarCategoria id={id} />

    </div>
  );

  return (
    <div>
        <Button variant="contained" size="small" color="secondary" className="btDeletar" onClick={handleOpen}>
           deletar
         </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className="classe"
      >
        {body}
      </Modal>
    </div>
  );
}
export default ModalCategoria;
