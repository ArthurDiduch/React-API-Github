import React, { useEffect, useState } from "react";
import api from "./services/api";
import './App.css';

export default function App() {
  const [user, setUser] = useState();
  const [userSearch, setUserSearch] = useState();

  const onClick = () => {
    api
      .get("/users/"+userSearch)
      .then((response) => {
        console.log(response.data)
        setUser(response.data)
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
    }

    const onChangeUser = (e) => {
      setUserSearch(e.target.value);
    }

  return (
    <div className="App">

<header className="App-header">
      
        <input type="text" onChange={onChangeUser} name={userSearch} value={userSearch} />
        <button type="button" onClick={onClick}>Clique aqui</button>
        
        <img id="avatar" src={user?.avatar_url} />
        <p>Usuario: {user?.login}</p>
        <p>Biografia: {user?.bio}</p>
        <p>Seguindo: {user?.following}</p>
        <p>Seguidores: {user?.followers}</p>
        <p>repositorio: {user?.public_repos}</p>
</header>
    </div>
  );
}
