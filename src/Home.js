import './assets/min_file/home.min.css';
import Navbar from './components/navbar/Navbar';
import './assets/min_file/main.min.css';
import Contacts from './components/contact/contacts';
import React, { useState } from 'react';

const App = () => {


  const [loading, setLoading] = useState(false);
  const [getContacts, setContacts] = useState([]);

  return (
    <div className="App">
      <Navbar />
      <Contacts contacts={getContacts} loading={loading} />
    </div>
  );
}
export default App;
