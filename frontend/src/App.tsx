import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('loading...');

  useEffect(() => {
    console.log(process.env.REACT_APP_API_URL)
    fetch(`${process.env.REACT_APP_API_URL}/ping`)
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => {
        console.error(err);
        setMessage('error');
      });
  }, []);

  return (
    <div>
      <h1>API Response:</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
