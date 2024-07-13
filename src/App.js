import './App.css';
import {useEffect, useState} from "react";

function App() {
  const [name, setName] = useState('');
  const [datetime, setDatetime] = useState('');
  const [description, setDescription] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then(setTransactions);
  }, []);

  async function getTransactions() {
    const url = process.env.REACT_APP_API_URL+'/transactions';
    const response = await fetch(url);
    return await response.json();
  }

  function addNewTransaction(e) {
    e.preventDefault();
    const url = process.env.REACT_APP_API_URL+'/transaction';
    const price = name.split(' ')[0];
    fetch(url, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        price,
        name:name.substring(price.length+1),
        description,
        datetime,
      })
    }).then(response => {
      response.json().then(json => {
        setName('');
        setDatetime('');
        setDescription('');
        setTransactions([...transactions, json]);
        //console.log('result', json);
      });
    });
  }

  // TODO: IMPLEMENT A FUNCTION TO HANDLE DELETION OF TRANSACTION
  async function deleteTransaction(id){
    const url = '${process.env.REACT_APP_API_URL}/transaction/${id}';
    await fetch(url, {
      method: 'DELETE',
      headers: {'Content-Type':'application/json'}
    });
    setTransactions(transactions.filter(transaction => transaction._id !== id));
  }

  // TODO IMPLEMENT A FUNCTION TO HANDLE EDITING A TRANSACTION

  // BALANCE FORMATTING LOGIC
  let balance = 0;
  for (const transaction of transactions) {
    balance = balance + transaction.price;
  }

  balance = balance.toFixed(2);
  const fraction = balance.split('.')[1];
  balance = balance.split('.')[0];

  return (
    // TODO: IMPLEMENT SEPARATE INPUT FIELD FOR PRICE
    // TODO: IMPLEMENT TOGGLE FOR INCOME/EXPENSE
    <main>
      <h1>£{balance}<span>{fraction}</span></h1>
      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input type="text"
                 value={name}
                 onChange={e => setName(e.target.value)}
                 placeholder={'+20 item sold'}/>
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
      {transactions.length > 0 && transactions.map(transaction => {
        // DATETIME FORMATTING LOGIC
        const dateObject = new Date(transaction.datetime);
        const formattedDateTime = dateObject.toLocaleString('en-GB', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        });
        return (
          <div className="transaction-container" key={transaction._id}>
            <div className="transaction">
              <div className="left">
                <div className="name">{transaction.name}</div>
                <div className="description">{transaction.description}</div>
              </div>
              <div className="middle">
                <div className={"price " + (transaction.price < 0 ? "red" : "green")}>
                  {transaction.price}
                </div>
                <div className="datetime">{formattedDateTime}</div>
              </div>
            </div>
            <button className="delete" onClick={() => deleteTransaction(transaction._id)}>Delete</button>
          </div>
        )
      })}
    </div>
    </main>
  );
}

export default App;
