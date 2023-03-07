
import { useState } from 'react'
import { Dna } from 'react-loader-spinner';
import './App.css'

const API_KEY = "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";
const systemMessage = {
  "role": "system", "content": "Explique moi comme si j'étais un adulte"
}

function App() {
  const [error, setError] = useState('');
  const [response, setResponse] = useState('')
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (msg) => {
    const newMessage = {
      content: `Ma console m'affiche l'erreur ${error}`,
      role: "user"
    };
    setIsTyping(true);
    await envoyerAChatGpt(newMessage);
  };

  async function envoyerAChatGpt(message) {

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,
        message
      ]
    }

    await fetch("https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(apiRequestBody)
      }).then((data) => {
        return data.json();
      }).then((data) => {
        console.log(data);
        setResponse(data.choices[0].message.content);
        setIsTyping(false);
      }).catch((err) => {
        setError(err)
        setIsTyping(false);
      })
  }

  const handleWriteError = (e) => {
    setError(e.target.value)
  }

  return (
    <div className="App">
      <div className='form'>
        <h3>Error GPT</h3>
        <p>Vous rencontrez un problème sur votre projet ? quel est l'erreur ? (ex: "undefined", "Bearer"..etc)</p>
        <form className='form'>
          <label for="error">Quelle erreur rencontrez vous ?</label>
          <input type="text" onChange={(e) => { handleWriteError(e) }} />
          <span onClick={() => { handleSend() }}>Chercher</span>
        </form>
        {isTyping ?
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}><Dna
            visible={true}
            height="20"
            width="20"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />&nbsp;Chargement&nbsp; <Dna
              visible={true}
              height="20"
              width="20"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            /></div> : response ? <p>{response}</p> : error ? <p>{error}</p> : null}
      </div>
    </div>
  )
}

export default App