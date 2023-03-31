import { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import axios from "axios";

import {
  AddContact,
  Contact,
  Contacts,
  EditContact,
  Navbar,
} from "./components";


const App = () => {
  const [loading, setLoading] = useState(false);
  const [getContacts, setContacts] = useState([]);
  const [getGroups, setGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: contactsData } = await axios.get(
          "http://localhost:9000/contacts"
        );
        const { data: groupsData } = await axios.get(
          "http://localhost:9000/groups"
        );
        setContacts(contactsData);
        setGroups(groupsData);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log("get group is :" + getGroups);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/contacts" />} />
        <Route path="/contacts" element={<Contacts contacts={getContacts} loading={loading} />} />
        <Route path="/contacts/add" element={<AddContact />} />
        <Route path="/contacts/:contactId" element={<Contact />} />
        <Route path="/contacts/edit/:contactId" element={<EditContact />} />
      </Routes>
    </div>
  );
};

export default App;
