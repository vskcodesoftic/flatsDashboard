import React from 'react';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import DataTable from './DataTabel';

const FlatsPage = () => {
    const [t] = useTranslation();
    return (
        <>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Flats</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item">
                                    <Link to="/">{t('header.label.home')}</Link>
                                </li>
                                <li className="breadcrumb-item active">
                                    all Flats
                                </li>
                            </ol>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3 m-4">
                            <Link to="/AddFlat">
                                <button
                                    type="submit"
                                    className="btn btn-warning btn-block"
                                >
                                    Add Flat
                                </button>
                            </Link>
                        </div>
                        {/* <div className="col-3 m-4">
                            <Link to="/AddFlatMembers">
                                <button
                                    type="submit"
                                    className="btn btn-warning btn-block"
                                >
                                    Add Flat Members
                                </button>
                            </Link>
                        </div> */}
                    </div>
                    <div>
                        <DataTable />
                    </div>
                </div>
            </section>
        </>
    );
};

export default FlatsPage;
