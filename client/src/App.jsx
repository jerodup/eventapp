import './App.css'

function App() {

  return (
    <div className="">
      <h1>Hola Mundo!</h1>
      <button onClick={ async () => {
        const response = await fetch('http://localhost:4000/users');
        const data = await response.json();
        console.log(data);
      }
        
      } >Obtener datos</button>
    </div>
    
  )
}

export default App
