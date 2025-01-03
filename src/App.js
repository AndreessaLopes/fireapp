import { db, auth } from "./firebaseConnection";
import {
  doc,
  setDoc,
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import "./app.css";

import { createUserWithEmailAndPassword } from "firebase/auth";

function App() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");

  const [posts, setPosts] = useState([]);
  const [idPost, setIdPost] = useState("");

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    async function loadPosts() {
      const unsub = onSnapshot(collection(db, "posts"), (snapshot) => {
        let listaPost = [];
        snapshot.forEach((doc) => {
          listaPost.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
          });
        });

        setPosts(listaPost);
      });
    }
    loadPosts();
  }, []);

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

  async function editarPost() {
    const docRef = doc(db, "posts", idPost);
    await updateDoc(docRef, {
      titulo: titulo,
      autor: autor,
    })
      .then(() => {
        console.log("Documento atualizado com sucesso!");
        setAutor("");
        setTitulo("");
        setIdPost("");
      })
      .catch((error) => {
        console.log("Erro ao atualizar o documento: ", error);
      });
  }

  async function excluirPost(id) {
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef).then(() => {
      alert("Documento excluído com sucesso!");
    });
  }

  async function novoUsuario() {
    await createUserWithEmailAndPassword(auth, email, senha)
      .then(() => {
        alert("Usuário cadastrado com sucesso!");
        setEmail("");
        setSenha("");
      })
      .catch((error) => {
        if (error.code === "auth/weak-password") {
          alert("Senha muito fraca!");
        } else if (error.code === "auth/email-already-in-use") {
          alert("Email já cadastrado!");
        } else {
          alert("Erro ao cadastrar usuário: ", error);
        }
      });
  }

  return (
    <div className="App">
      <h1> React JS + Firebase :) </h1>
      <div className="container">
        <h2>Usuários</h2>
        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu email"
        />
        <br />
        <label>Senha</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Digite sua senha"
        />
        <br />

        <button onClick={novoUsuario}>Cadastrar</button>
      </div>
      <br /> <br />
      <hr />
      <div className="container">
        <h2>POSTS</h2>
        <label>ID do post:</label>
        <input
          placeholder="Digite o ID do post"
          value={idPost}
          onChange={(e) => setIdPost(e.target.value)}
        />
        <br />
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
        <br />
        <button onClick={editarPost}>Atualizar post</button>

        <ul>
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <strong>ID: {post.id}</strong> <br />
                <span>Título: {post.titulo}</span> <br />
                <span>Autor: {post.autor}</span> <br />
                <button onClick={() => excluirPost()}>
                  Excluir
                </button> <br /> <br />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
