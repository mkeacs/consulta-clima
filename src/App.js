import { useState } from "react";


function App() {

  const [cidade, setCidade] = useState("");
  const [weatherForecast, setWeatherForecast] = useState(null)

  const handleChange = (event) => {
    setCidade(event.target.value)

  };

  const search = () => {
    fetch(`http://api.weatherapi.com/v1/current.json?key=9f71e38c4f9f4295a3a144652233004&q=${cidade}&lang=pt`)

    .then((response) => {
      if(response.status === 200){
        return response.json()
      }

    })
    .then((data) => {
      setWeatherForecast(data)
    });
    
  };


  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <a className="navbar-brand text-white" href="#top">
        Previsão do Tempo
      </a>
      </nav>

      <main className="container bg-light">
        <div className="jumbotron">
          <h1>Verifique o clima da sua cidade
          </h1>
          <p className="lead">Digite o nome da sua cidade abaixo
          </p>

        </div>
        <div className="row mb-4">
          <div className="col-md-6">
            <input
            onChange={handleChange} 
            className="form-control" 
            value={cidade}/>
          </div>
        </div>

        <button onClick={search} className="btn btn-primary btn-lg">
          Pesquisar
        </button>

        {weatherForecast ? (
            <div>
              <div className="mt-4 d-flex align-items-center">
                <div>
                  <img src={weatherForecast.current.condition.icon}/>
                </div>
                <div>
                  <h3 className="lead">Ultima atualização: {weatherForecast.current.last_updated}</h3>
                  <h3> Hoje o dia está: {weatherForecast.current.condition.text}</h3>
                  <p>
                    Temperatura: {weatherForecast.current.temp_c}°c
                  </p>
                </div>
              </div>
            </div>
          ) : null}


      </main>
    </div>
  );
}

export default App;
