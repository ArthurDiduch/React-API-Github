import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import api from './service/api';

function App() {

  const [cep, setCEP] = useState('');
  const [endereco, setEndereco]= useState();

  const onClick = () => {
    if (cep.length==8){
      api
        .get("/ws/" + cep + '/json')
        .then((response) => {
          if (response.data.erro=='true'){
            alert('CEP inexistente');
          }else{
            setEndereco(response.data);
          }
        })
        .catch((err) => {
          alert("ops! ocorreu um erro" + err);
        });
    }
  }

  const onChangeCep = (e) => {
    setCEP(e.target.value);
  }
  const style = {
    backgroundColor: "#ff0000",
    fontSize: '2rem'
  }

  return (
    <div className="App">
      <header className="App-header">
        <input type="text" onChange={onChangeCep} name={cep} value={cep} maxLength="8" />
        <button type="button" onClick={onClick}>Clique aqui</button>

        <div>
          <p>Cidade: { endereco?.localidade }</p>
          <p>UF: { endereco?.uf }</p>
          <p>IBGE: { endereco?.ibge }</p>
          { endereco?.logradouro
            ? <p>Logradouro: { endereco?.logradouro }</p>
            : ''
          }
          { endereco?.bairro
            ? <p>Bairro: { endereco?.bairro }</p>
            : ''
          }
        </div>
      </header>

    </div>
  );
}

export default App;