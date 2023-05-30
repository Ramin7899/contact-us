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
import { Comment, CurrentLine, Foreground, Purple, Yellow } from "./helpers/colors";

const App = () => {
  const [forceRender, setForceRender] = useState(false);
  const [loading, setLoading] = useState(false);
  const [getContacts, setContacts] = useState([]);
  const [getFilteredContacts, setFilteredContacts] = useState([]);

  const [getGroups, setGroups] = useState([]);
  const [getContact, setContact] = useState({
    fullname: "",
    photo: "",
    mobile: "",
    email: "",
    job: "",
    group: "",
  });

  const [query, setQuery] = useState({ text: "" })

  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: contactsData } = await getAllContacts()
        const { data: groupsData } = await getAllGroups()
        setContacts(contactsData);
        setFilteredContacts(contactsData);
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
    setContact({
      ...getContact,
      [event.target.name]: event.target.value,
    });
  };

  const confirm = (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="p-4" dir="rtl" style={{ backgroundColor: CurrentLine, border: `1px solid ${Purple}`, borderRadius: '1em' }}>
            <h1 style={{ color: Yellow }}>
              پاک کردن مخاطب
            </h1>
            <p style={{ color: Foreground }}>
              مطمئن هستید که میخوایید مخاطب {contactFullname} را حذف کنید؟
            </p>
            <button style={{ backgroundColor: Purple }} className="btn mx-2" onClick={() => {
              removeContact(contactId);
              onClose();
            }}>
              حذف
            </button>
            <button onClick={onClose} className="btn" style={{ backgroundColor: Comment }}>
              انصراف
            </button>
          </div>
        )
      }
    })
  }

  const removeContact = async (contactId) => {
    try {
      setLoading(true)
      const response = await deleteContact(contactId)

      if (response) {
        const { data: contactsData } = await getAllContacts()
        setContact(contactsData)
        setLoading(false);
        setForceRender(!forceRender);
      }

    } catch (err) {
      console.log(err.message);
      setLoading(false)
    }
  }

  const contactSearch = (event) => {
    setQuery({ ...query, text: event.target.value });
    const allContacts = getContacts.filter((contact) => {
      (contact);
      return contact.fullname.toLowerCase().includes(event.target.value.toLowerCase());
    });

    setFilteredContacts(allContacts);
  };

  return (
    <div className="App">
      <Navbar query={query} search={contactSearch} />
      <Routes>
        <Route path="/" element={<Navigate to="/contacts" />} />
        <Route path="/contacts" element={<Contacts contacts={getFilteredContacts} loading={loading} confirmDelete={confirm} />} />
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
