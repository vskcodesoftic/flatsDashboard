/* eslint-disable */

import React from 'react';
import {useTranslation} from 'react-i18next';
import {toast} from 'react-toastify';

const ChangePassword = () => {
    const [t] = useTranslation();
    let emailInput = null;
    let oldpasswordInput = null;
    let newpasswordInput = null;

    const setEmailInputRef = (element) => {
        emailInput = element;
    };

    const requestNewPassword = (event) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', emailInput);
        formData.append('oldpassword', this.state.description);
        formData.append('oldpassword', this.state.title);

        // still to resolve promise
        axios
            .post('https://badilnyint.com/api/admin/adds/addImages', formData)
            .then((res) => {
                console.log(res.data);
                toast.success(`image uploaded  sucessfully !`);
            })
            .catch((error) => {
                console.log('Error');
                toast.error(`something went wrong`);
            });
    };

    return (
        <>
            <section className="content-header">
                <div className="container-fluid">
                    <div>
                        <div className="login-box">
                            <div className="card card-outline card-primary">
                                <div className="card-body">
                                    <p className="login-box-msg">
                                        {t('recover.forgotYourPassword')}
                                    </p>
                                    <form onSubmit={requestNewPassword}>
                                        <div className="input-group mb-3">
                                            <input
                                                ref={setEmailInputRef}
                                                type="email"
                                                className="form-control"
                                                placeholder="Email"
                                            />
                                            <div className="input-group-append">
                                                <div className="input-group-text">
                                                    <span className="fas fa-envelope" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="input-group mb-3">
                                            <input
                                                ref={setEmailInputRef}
                                                type="email"
                                                className="form-control"
                                                placeholder="Old Password"
                                            />
                                            <div className="input-group-append">
                                                <div className="input-group-text">
                                                    <span className="fas fa-lock" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="input-group mb-3">
                                            <input
                                                ref={setEmailInputRef}
                                                type="email"
                                                className="form-control"
                                                placeholder="New Password"
                                            />
                                            <div className="input-group-append">
                                                <div className="input-group-text">
                                                    <span className="fas fa-lock" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-12">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary btn-block"
                                                >
                                                    {t(
                                                        'recover.requestNewPassword'
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ChangePassword;
