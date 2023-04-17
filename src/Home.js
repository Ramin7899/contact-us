import { useState, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import {
  AddContact,
  Contact,
  Contacts,
  EditContact,
  Navbar,
  ViewCountact,
} from "./components";

import { getAllContacts, getAllGroups, createContact, deleteContact } from './services/contactService'
import { confirmAlert } from 'react-confirm-alert'; // Import

const App = () => {
  const [forceRender, setForceRender] = useState(false);
  const [loading, setLoading] = useState(false);
  const [getContacts, setContacts] = useState([]);
  const [getGroups, setGroups] = useState([]);
  const [getContact, setContact] = useState({
    fullname: "",
    photo: "",
    mobile: "",
    email: "",
    job: "",
    group: "",
  });

  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: contactsData } = await getAllContacts()
        const { data: groupsData } = await getAllGroups()
        setContacts(contactsData);
        setGroups(groupsData);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: contactsData } = await getAllContacts()
        setContacts(contactsData);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchData();
  }, [forceRender])

  const createContactForm = async (event) => {
    event.preventDefault();
    try {
      const { status } = await createContact(getContact);

      console.log(getContact);
      console.log(status);
      if (status === 201) {
        setContact({});
        setForceRender(!forceRender);
        navigate("/contacts");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const setContactInfo = (event) => {
    console.log(getContact);
    setContact({
      ...getContact,
      [event.target.name]: event.target.value,
    });
  };

  const deleteContact = async (contactId) => {
    try {
      setLoading(true)
      const response = await deleteContact(contactId)

      if (response) {
        const { data: contactsData } = await getAllContacts()
        setContact(contactsData)
        setLoading(false)
      }

    } catch (err) {
      console.log(err.message);
      setLoading(false)
    }
  }

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/contacts" />} />
        <Route path="/contacts" element={<Contacts contacts={getContacts} loading={loading} />} />
        <Route
          path="/contacts/add"
          element={
            <AddContact
              loading={loading}
              setContactInfo={setContactInfo}
              contact={getContact}
              groups={getGroups}
              createContactForm={createContactForm}
            />
          }
        />
        <Route path="/contacts/:contactId" element={<ViewCountact />} />
        <Route path="/contacts/edit/:contactId" element={<EditContact forceRender={forceRender} setForceRender={setForceRender} />} />
      </Routes>
    </div>
  );
};

export default App;
