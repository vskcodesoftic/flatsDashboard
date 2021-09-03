import React from 'react';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import CategoryDataTable from './CategoryDataTable';

const CategoryPage = () => {
    const [t] = useTranslation();
    return (
        <>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>{t('header.category.title')}</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item">
                                    <Link to="/">{t('header.label.home')}</Link>
                                </li>
                                <li className="breadcrumb-item active">
                                    {t('views.category.link')}
                                </li>
                            </ol>
                        </div>
                    </div>
                    <div>
                        <CategoryDataTable />
                    </div>
                </div>
            </section>
        </>
    );
};

export default CategoryPage;
