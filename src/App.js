import React from "react"
import logo from './logo.svg';
// import './App.css';
import './main.scss'
import Header from "./components/Header/Header"
import TrelloBoard from './components/TrelloBoard/TrelloBoard';

function App() {

  const ref = React.useRef()
  console.log(ref)
  return (
    <div className="App">
      <Header />
      <TrelloBoard />
    </div>
  );
}

export default App;
