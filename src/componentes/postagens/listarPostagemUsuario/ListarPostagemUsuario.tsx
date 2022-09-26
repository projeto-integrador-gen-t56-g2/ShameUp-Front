import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import Postagem from "../../../models/Postagem";
import { busca, post } from "../../../services/Service";
import {
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
    TextField,
} from "@material-ui/core";
import { Box } from "@mui/material";
import "./ListarPostagemUsuario.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserState } from "../../../store/tokens/userReducer";
import { toast } from "react-toastify";
import ComentarioPostagem from "../comentarioPostagem/ComentarioPostagem";
import { PostAddRounded } from "@mui/icons-material";
import ModalDeletarPostagem from "../modalDeletarPostagem/ModalDeletarPostagem";

function ListarPostagemUsuario() {
    const [posts, setPosts] = useState<Postagem[]>([]);
    let navigate = useNavigate();
    const token = useSelector<UserState, UserState["tokens"]>(
        (state) => state.tokens
    );

    const id = useSelector<UserState, UserState["id"]>((state) => state.id);

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

    async function getPost() {
        await busca("/postagens", setPosts, {
            headers: {
                Authorization: token,
            },
        });
    }

    useEffect(() => {
        getPost();
    }, [posts.length]);

    const [comments, setComments] = useState([
        "Sentimos muito pelo ocorrido, vamos tomar providências para que não ocorra novamente.",
    ]);

    const [newCommentText, setNewCommentText] = useState("");

    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault();
        setComments([...comments, newCommentText]);
        setNewCommentText("");
    }

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        setNewCommentText(event.target.value);
    }

    function getData(data: string) {
        let dataString = data.split("T")[0];
        let horaString = data.split("T")[1];
        horaString = horaString.split(".")[0];

        let dia = dataString.split("-")[2];
        let mes = dataString.split("-")[1];
        let ano = dataString.split("-")[0];

        let hora = horaString.split(":")[0];
        let minuto = horaString.split(":")[1];
        let segundo = horaString.split(":")[2];

        return `${dia}-${mes}-${ano} ${hora}:${minuto}:${segundo}`;
    }

    return (
        <>
            {posts.map((post) => (
                
                    (post.usuario.id.toString() === id) ? (
                        <Box m={2} key={post.id}>
                            <Card
                                variant="outlined"
                                className="bgListaPost fonteListaPe listaPost"
                            >
                                <CardContent className="card-postagem">
                                    {post.anonimo ? (
                                        <Box className="info-usuario-postagem">
                                            <img
                                                src="https://i.imgur.com/mULO3ga.jpg"
                                                alt="Imagem do usuário anônimo"
                                                className="img-usuario-postagem"
                                            />
                                            <Box className="info-postagem">
                                                <Typography className="nome-usuario-postagem">
                                                    Usuário Anônimo
                                                </Typography>
                                                <Typography className="data-postagem-listar">
                                                    {getData(post.data)}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    ) : (
                                        <Box className="info-usuario-postagem">
                                            {post.usuario?.foto ? (
                                                <img
                                                    src={post.usuario?.foto}
                                                    alt="Imagem do usuário"
                                                    className="img-usuario-postagem"
                                                />
                                            ) : (
                                                <img
                                                    src="https://i.imgur.com/mULO3ga.jpg"
                                                    alt="Imagem do usuário sem foto"
                                                    className="img-usuario-postagem"
                                                />
                                            )}
                                            <Box className="info-postagem">
                                                <Typography className="nome-usuario-postagem">
                                                    {post.usuario?.nome}
                                                </Typography>
                                                <Typography className="data-postagem-listar">
                                                    {getData(post.data)}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    )}
                                    <Typography
                                        variant="h6"
                                        component="h6"
                                        className="categoria-post"
                                    >
                                        Categoria: {post.categoria?.nome}
                                    </Typography>
                                    <Typography variant="h4" component="h1" className="titulo-post">
                                        {post.titulo}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        component="p"
                                        className="texto-postagem"
                                    >
                                        {post.texto}
                                    </Typography>
                                </CardContent>
                                <CardActions className="card-buttons">
                                    <Box display="flex" mb={1.5}>
                                        <Link
                                            to={`/formularioPostagem/${post.id}`}
                                            className="text-decorator-none"
                                        >
                                            <Box mx={1}>
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    color="primary"
                                                    className="marginLeftListaP fonteListaPe bgListaPB btnAtualizarPostagem"
                                                >
                                                    atualizar
                                                </Button>
                                            </Box>
                                        </Link>

                                        <Box marginRight={1}>
                                            <ModalDeletarPostagem idPostagem={post.id} />
                                        </Box>
                                    </Box>
                                </CardActions>
                                <span className="before"></span>

                                <form onSubmit={handleCreateNewComment} className="form-comentario">
                                    <strong className="feedback2">Deixe seu feedback</strong>

                                    <div className="feedback">
                                        <TextField
                                            className="textfield-feedback"
                                            placeholder="Deixe seu comentário"
                                            value={newCommentText}
                                            onChange={handleNewCommentChange}
                                            variant="outlined"
                                            fullWidth
                                            multiline
                                            required
                                        />
                                    </div>

                                    <footer className="buttonfeedback">
                                        <Button
                                            variant="contained"
                                            size="small"
                                            className="botao-submit-comentario"
                                            color="secondary"
                                            type="submit"
                                        >
                                            Publicar
                                        </Button>
                                    </footer>
                                </form>

                                <div className="cont">
                                    {comments.map((comment) => {
                                        return <ComentarioPostagem conteudo={comment} />;
                                    })}
                                </div>
                            </Card>
                        </Box>
                    ) : null
                
            ))}
        </>
    );
}

export default ListarPostagemUsuario;
