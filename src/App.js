import { db } from "./firebaseConnection";
import {
  doc,
  setDoc,
  collection,
  addDoc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { useState } from "react";
import "./app.css";

function App() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");

  const [posts, setPosts] = useState([]);

  async function handleAdd() {
    // await setDoc(doc(db, "posts", "12345"), {
    //   titulo: titulo,
    //   autor: autor,
    // })
    //   .then(() => {
    //     console.log("Dados cadastrados com sucesso!");
    //   })
    //   .catch((error) => {
    //     console.log("Erro ao cadastrar os dados: ", error);
    //   });

    await addDoc(collection(db, "posts"), {
      titulo: titulo,
      autor: autor,
    })
      .then(() => {
        console.log("Dados cadastrados com sucesso!");
        setAutor("");
        setTitulo("");
      })
      .catch((error) => {
        console.log("Erro ao cadastrar os dados: ", error);
      });
  }

  async function buscarPost() {
    // const postRef = doc(db, "posts", "12345");

    // await getDoc(postRef)
    //   .then((snapshot) => {
    //     setAutor(snapshot.data().autor);
    //     setTitulo(snapshot.data().titulo);
    //   })
    //   .catch((error) => {
    //     console.log("Erro ao buscar o documento: ", error);
    //   });

    const postRef = collection(db, "posts");

    await getDocs(postRef)
      .then((snapshot) => {
        let lista = [];
        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
          });
        });

        setPosts(lista);
      })
      .catch((error) => {
        console.log("Erro ao buscar os documentos: ", error);
      });
  }

  return (
    <div className="App">
      <h1> React JS + Firebase :) </h1>

      <div className="container">
        <label>Título:</label>
        <textarea
          type="text"
          placeholder="Digite o título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        ></textarea>

        <label>Autor:</label>
        <textarea
          type="text"
          placeholder="Digite o autor"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
        ></textarea>

        <button onClick={handleAdd}>Cadastrar</button>
        <button onClick={buscarPost}>Buscar post</button>

        <ul>
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <span>Título: {post.titulo}</span> <br />
                <span>Autor: {post.autor}</span> <br /> <br />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
