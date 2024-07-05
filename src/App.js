import './App.css';
import {useState} from "react";

function App() {
  const [name, setName] = useState('');
  const [datetime, setDatetime] = useState('');
  const [description, setDescription] = useState('');
  function addNewTransaction(e) {
    e.preventDefault();
    const url = process.env.REACT_APP_API_URL+'/transaction';
    fetch(url, {
      method: 'POST',
      headers: {'Content-type':'application/json'},
      body: JSON.stringify({name, description, datetime})
    }).then(response => {
      response.json().then(() => {
        
      });
    });
  }
  return (
    <main>
      <h1>£400<span>.00</span></h1>
      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input type="text"
                 value={name}
                 onChange={e => setName(e.target.value)}
                 placeholder={'+20 new dildo'}/>
          <input type="datetime-local"
                 value={datetime}
                 onChange={e => setDatetime(e.target.value)}/>
        </div>
        <div className="description">
          <input type="text"
                 value={description}
                 onChange={e => setDescription(e.target.value)}
                 placeholder={'description'}/>
        </div>
        <button type="submit">Add new transaction</button>
      </form>
      <div className="transactions">
        <div className="transaction">
          <div className="left">
            <div className="name">New Dildo</div>
            <div className="description">Can't go wrong with a new dildo</div>
          </div>
            <div className="right">
              <div className="price red">-£20</div>
              <div className="datetime">2023-12-18 15:45</div>
            </div>
        </div>
        <div className="transaction">
          <div className="left">
            <div className="name">Feet pics</div>
            <div className="description">Crusty ahh feet be selling</div>
          </div>
            <div className="right">
              <div className="price green">£150</div>
              <div className="datetime">2023-12-18 15:45</div>
            </div>
        </div>
        <div className="transaction">
          <div className="left">
            <div className="name">Penis enlargement surgery</div>
            <div className="description">Can't go wrong with a new dildo</div>
          </div>
            <div className="right">
              <div className="price red">-£1350</div>
              <div className="datetime">2023-12-18 15:45</div>
            </div>
        </div>
      </div>
    </main>
  );
}

export default App;
