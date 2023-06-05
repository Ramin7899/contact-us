import { createContext } from "react";

export const ContactContext = createContext({
    loading: false,
    setLoading: () => { },
    contact: {},
    setContacts: () => { },
    contacts: [],
    setFilteredContacts: () => { },
    filteredContacts: [],
    contactQuery: {},
    groups: [],
    onContactChange: () => { },
    deleteContact: () => { },
    createContact: () => { },
    contactSearch: () => { },
});
