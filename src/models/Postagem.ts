import Categoria from "./Categoria";
import User from "./User";

interface Postagem {

    id: number;
    anonimo: boolean;
    texto: string;
    data?: string|null;
    titulo: string;
    categoria?: Categoria|null;
    usuario?: User|null;

}

export default Postagem;

