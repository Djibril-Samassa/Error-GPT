
import { useState } from 'react'
import { Dna } from 'react-loader-spinner';
import './App.css'

const API_KEY = "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";
const systemMessage = {
  "role": "system", "content": "Explique moi comme si j'étais un développeur débutant"
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
    await processMessageToChatGPT(newMessage);
  };

  async function processMessageToChatGPT(chatMessages) {

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,
        chatMessages
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
      });
  }

  const handleWriteError = (e) => {
    setError(e.target.value)
  }

  return (
    <div className="App">
      <div className='form'>
        <h3>Error GPT</h3>
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
            /></div> : response ? <p>{response}</p> : null}
      </div>
    </div>
  )
}

export default App