import { Link } from "react-router-dom";

import { Spinner } from "..";
import { Comment, Green, Purple } from "../../helpers/colors";
import { Form, formik, Field, ErrorMessage } from "formik";
import { contactSchema } from "../../validations/contactValidation";
import { useContext } from "react";
import { ContactContext } from "../../context/contactContext";
import { values } from "lodash";


const AddContact = () => {

    const { loading, contact, groups, onContactChange, createContact,
        //  errors 
    } = useContext(ContactContext);
    // console.log(errors);



    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <section className="p-3">
                        <img
                            src={require("../../assets/img/man-taking-note.png")}
                            height="400px"
                            style={{
                                position: "absolute",
                                zIndex: "-1",
                                top: "130px",
                                left: "100px",
                                opacity: "50%",
                            }}
                        />
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <p
                                        className="h4 fw-bold text-center"
                                        style={{ color: Green }}
                                    >
                                        ساخت مخاطب جدید
                                    </p>
                                </div>
                            </div>
                            <hr style={{ backgroundColor: Green }} />
                            <div className="row mt-5">
                                <div className="col-md-4">

                                    {/* {errors?.map((error, index) => (
                                        <p key={index} className="text-danger">
                                            {error.message}
                                        </p>
                                    ))} */}
                                    <formik initialValues={{
                                        fullname: '',
                                        photo: '',
                                        mobile: '',
                                        email: '',
                                        job: '',
                                        group: '',
                                    }}
                                        validationSchema={contactSchema}
                                        onSubmit={values => {
                                            createContact(values)
                                        }}>

                                        <Form>
                                            <div className="mb-2">
                                                <Field
                                                    name="fullname"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="نام و نام خانوادگی"
                                                // required={true}
                                                />
                                                <ErrorMessage name="fullname"></ErrorMessage>
                                            </div>
                                            <div className="mb-2">
                                                <Field name="photo"
                                                    type="text"
                                                    {...formik.getFieldProps('photo')}
                                                    className="form-control"
                                                    // required={true}
                                                    placeholder="آدرس تصویر"
                                                />
                                                <ErrorMessage name="photo"></ErrorMessage>

                                            </div>
                                            <div className="mb-2">
                                                <input
                                                    id="mobile"
                                                    type="number"
                                                    {...formik.getFieldProps('mobile')}
                                                    className="form-control"
                                                    // required={true}
                                                    placeholder="شماره موبایل"
                                                />
                                                {formik.touched.mobile && formik.errors.mobile ? (<div className="text-danger">{formik.errors.mobile}</div>) : null}

                                            </div>
                                            <div className="mb-2">
                                                <input
                                                    id="email"
                                                    type="email"
                                                    {...formik.getFieldProps('email')}
                                                    className="form-control"
                                                    // required={true}
                                                    placeholder="آدرس ایمیل"
                                                />
                                                {formik.touched.email && formik.errors.email ? (<div className="text-danger">{formik.errors.email}</div>) : null}

                                            </div>
                                            <div className="mb-2">
                                                <input
                                                    id="job"
                                                    type="text"
                                                    {...formik.getFieldProps('job')}

                                                    className="form-control"
                                                    // required={true}
                                                    placeholder="شغل"
                                                />
                                                {formik.touched.job && formik.errors.job ? (<div className="text-danger">{formik.errors.job}</div>) : null}

                                            </div>
                                            <div className="mb-2">
                                                <select
                                                    id="group"
                                                    {...formik.getFieldProps('group')}

                                                    // required={true}
                                                    className="form-control"
                                                >
                                                    <option value="">انتخاب گروه</option>
                                                    {groups.length > 0 &&
                                                        groups.map((group) => (
                                                            <option key={group.id} value={group.id}>
                                                                {group.name}
                                                            </option>
                                                        ))}
                                                </select>
                                                {formik.touched.group && formik.errors.group ? (<div className="text-danger">{formik.errors.group}</div>) : null}

                                            </div>
                                            <div className="mx-2">
                                                <input
                                                    type="submit"
                                                    className="btn"
                                                    style={{ backgroundColor: Purple }}
                                                    value="ساخت مخاطب"
                                                />
                                                <Link
                                                    to={"/contacts"}
                                                    className="btn mx-2"
                                                    style={{ backgroundColor: Comment }}
                                                >
                                                    انصراف
                                                </Link>
                                            </div>
                                        </Form>

                                    </formik>

                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )
            }
        </>
    );
};

export default AddContact;
