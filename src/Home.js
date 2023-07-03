import { useState, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import _ from 'lodash';

import { ContactContext } from "./context/contactContext";
import {
  AddContact,
  ViewCountact,
  Contacts,
  EditContact,
  Navbar,
} from "./components";

import {
  getAllContacts,
  getAllGroups,
  createContact,
  deleteContact,
} from "./services/contactService";

import {
  CurrentLine,
  Foreground,
  Purple,
  Yellow,
  Comment,
} from "./helpers/colors";
import { contactSchema } from "./validations/contactValidation";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [contact, setContact] = useState({});
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: contactsData } = await getAllContacts();
        const { data: groupsData } = await getAllGroups();

        setContacts(contactsData);
        setFilteredContacts(contactsData);
        setGroups(groupsData);

        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };

    fetchData();

  }, []);

  const createContactForm = async (event) => {
    event.preventDefault();
    try {
      setLoading((pervLoading) => !pervLoading);

      await contactSchema.validate(contact, { abortEarly: false });

      const { status, data } = await createContact(contact);

      if (status === 201) {
        const allContacts = [...contacts, data];
        setContacts(allContacts);
        setFilteredContacts(allContacts);
        setContact({});
        setErrors({});
        setLoading((pervLoading) => !pervLoading);
        navigate("/contacts");
      } else {
      }
    } catch (err) {
      console.log(err.message);
      setErrors(err.inner);
      setLoading((pervLoading) => !pervLoading);
    }
  };

  const onContactChange = (event) => {
    setContact({
      ...contact,
      [event.target.name]: event.target.value,
    });
  };

  const confirmDelete = (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            dir="rtl"
            style={{
              backgroundColor: CurrentLine,
              border: `1px solid ${Purple}`,
              borderRadius: "1em",
            }}
            className="p-4"
          >
            <h1 style={{ color: Yellow }}>پاک کردن مخاطب</h1>
            <p style={{ color: Foreground }}>
              مطمئنی که میخوای مخاطب {contactFullname} رو پاک کنی ؟
            </p>
            <button
              onClick={() => {
                removeContact(contactId);
                onClose();
              }}
              className="btn mx-2"
              style={{ backgroundColor: Purple }}
            >
              مطمئن هستم
            </button>
            <button
              onClick={onClose}
              className="btn"
              style={{ backgroundColor: Comment }}
            >
              انصراف
            </button>
          </div>
        );
      },
    });
  };

  const removeContact = async (contactId) => {
    /*
     * NOTE
     * 1- forceRender -> setForceRender
     * 2- Server Request
     * 3- Delete Local State
     * 4- Delete State Before Server Request
     */

    // Contacts Copy
    const allContacts = [...contacts];
    try {
      const updatedContact = contacts.filter((c) => c.id !== contactId);
      setContacts(updatedContact);
      setFilteredContacts(updatedContact);

      // Sending delete request to server
      const { status } = await deleteContact(contactId);

      if (status !== 200) {
        setContacts(allContacts);
        setFilteredContacts(allContacts);
      }
    } catch (err) {
      console.log(err.message);

      setContacts(allContacts);
      setFilteredContacts(allContacts);
    }
  };

  // let filterTimeOut;

  const contactSearch = _.debounce(query => {
    console.log(query);
    // clearTimeout(filterTimeOut);
    if (!query) return setFilteredContacts([...contacts]);
    // filterTimeOut = setTimeout(() => {
    setFilteredContacts(contacts.filter((contact) => {
      return contact.fullname
        .toLowerCase()
        .includes(query.toLowerCase());
    }));
    // }, 1000)
  }, 1000);

  return (
    <ContactContext.Provider
      value={{
        loading,
        setLoading,
        contact,
        setContacts,
        contacts,
        setFilteredContacts,
        filteredContacts,
        errors,
        groups,
        onContactChange,
        deleteContact: confirmDelete,
        createContact: createContactForm,
        contactSearch,
      }}
    >
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/contacts" />} />
          <Route
            path="/contacts"
            element={
              <Contacts />
            }
          />
          <Route
            path="/contacts/add"
            element={<AddContact />}
          />
          <Route path="/contacts/:contactId" element={<ViewCountact />} />
          <Route path="/contacts/edit/:contactId" element={<EditContact />} />
        </Routes>
      </div>
    </ContactContext.Provider>
  );
};

export default App;
