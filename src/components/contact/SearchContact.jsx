import { Purple } from '../../helpers/colors.js';
import { ContactContext } from "../../context/contactContext";
import { useContext } from 'react';

const SearchContact = ({ query, search }) => {

    const { contactQuery, contactSearch } = useContext(ContactContext);


    return (
        <div className="input-group mx-2 w-75" dir="ltr">
            <span className="input-group-text" id="basic-addon1" style={{ backgroundColor: Purple }}>
                <i className="fas fa-search"></i>
            </span>
            <input value={contactQuery.text} onChange={contactSearch} aria-describedby="basic-addon1" aria-label="Search" placeholder="جستجو مخاطب" type="text" dir="rtl" className="form-control" />
        </div>
    )
}
export default SearchContact