import React from 'react';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import DataTable from './DataTabel';

const Services = () => {
    const [t] = useTranslation();
    return (
        <>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Service Providers</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item">
                                    <Link to="/">{t('header.label.home')}</Link>
                                </li>
                                <li className="breadcrumb-item active">
                                    all ServiceProviders
                                </li>
                            </ol>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3 m-4">
                            <Link to="/AddService">
                                <button
                                    type="submit"
                                    className="btn btn-warning btn-block"
                                >
                                    Add ServiceProvider
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <DataTable />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Services;
