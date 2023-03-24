import React from "react";
import { CurrentLine, Cyan, Orange, Pink, Purple, Red } from '../../helpers/colors'
import Contact from "./Contact";
import NotFoumd from '../../assets/gif/no-found.gif'
import Spinner from "../spinner/spinner";


const Contacts = ({ contacts, loading }) => {
    return (
        <React.Fragment>
            <section className="container">
                <div className="grid">
                    <div className="row">
                        <div className="col">
                            <p className="h3">
                                <button style={{ backgroundColor: Pink }} className="btn mx-2">
                                    ساخت مخاطب جدید
                                    <i className="fa fa-plus-circle mx-2"></i>

                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {
                loading ? <Spinner /> : (
                    <section className="container">
                        <div className="row">
                            {
                                contacts.lenght > 0 ? contacts.map(c => (
                                    <Contact key={c.id} contact={c} />
                                ))
                                    :
                                    (
                                        <div className="text-center py-5" style={{ backgroundColor: CurrentLine }}>
                                            <p className="h3" style={{ color: Orange }}>
                                                مخاطب یافت نشد ...
                                            </p>
                                            <img className="w-25" src={NotFoumd} alt="" />
                                        </div>
                                    )
                            }
                        </div>
                    </section>
                )
            }


        </React.Fragment>
    )
}
export default Contacts