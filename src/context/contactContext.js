import { createContext } from "react";

export const ContactContext = createContext({
    loading: false,
    setLoading: () => { },
    contact: {},
    setContacts: () => { },
    contacts: [],
    errors: [],
    setFilteredContacts: () => { },
    filteredContacts: [],
    groups: [],
    onContactChange: () => { },
    deleteContact: () => { },
    createContact: () => { },
    contactSearch: () => { },
});
