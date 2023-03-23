import SearchContact from "../contact/SearchContact"

import { Purple, Background } from '../../helpers/colors.js'


const Navbar = () => {
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
                    <div className="col">
                        <SearchContact />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar