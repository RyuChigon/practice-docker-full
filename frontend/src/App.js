import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [lists, setLists] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    axios.get('/api/values')
      .then(res => {
        setLists(res.data);
      })
  }, [])

  const submitHandler = e => {
    e.preventDefault();
    axios.post('/api/value', {
      value: value
    }).then(res => {
      if (res.data.success) {
        setLists([...lists, res.data]);
        setValue('');
      }
      else {
        alert('Failed to insert data');
      }
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          {lists && lists.map((list, idx) => {
            return <li key={idx}>{list.value}</li>
          })}
          <form className="example" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="입력"
              onChange={e => setValue(e.target.value)}
            />
            <button type="submit">확인</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
