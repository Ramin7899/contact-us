import { Purple } from '../../helpers/colors.js';

const SearchContact = () => {
    return (
        <div className="input-group mx-2 w-75" dir="ltr">
            <span className="input-group-text" id="basic-addon1" style={{ backgroundColor: Purple }}>
                <i className="fas fa-search"></i>
            </span>
            <input aria-describedby="basic-addon1" aria-label="Search" placeholder="جستجو مخاطب" type="text" dir="rtl" className="form-control" />
        </div>
    )
}
export default SearchContact