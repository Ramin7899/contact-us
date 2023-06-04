import SearchContact from "../contact/SearchContact";
import { useContext } from "react";

import { Purple, Background } from '../../helpers/colors.js'
import { useLocation } from "react-router-dom"


const Navbar = () => {
    const location = useLocation();
    return (
        <nav style={{ backgroundColor: Background }} className="navbar navbar-dark navbar-xpand-sm shadow-lg">
            <div className="container">
                <div className="row w-100">
                    <div className="col">
                        <div className="navbar-brand">
                            <span>
                                <i className="fas fa-id-badge" style={{ color: Purple }}></i>
                                {" "}
                                وب اپلیکیشن مدیریت {" "}
                                <span style={{ color: Purple }}>مخاطبین</span>
                            </span>
                        </div>
                    </div>
                    {
                        location.pathname == '/contacts' ? (
                            <div className="col">
                                <SearchContact />
                            </div>
                        ) :
                            null
                    }

                </div>
            </div>
        </nav>
    )
}

export default Navbar