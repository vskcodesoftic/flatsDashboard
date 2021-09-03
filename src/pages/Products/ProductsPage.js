import React from 'react';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import ProductsDataTable from '@app/pages/Products/ProductsDataTable';

const ProductsPage = () => {
    const [t] = useTranslation();
    return (
        <>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>{t('header.products.title')}</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item">
                                    <Link to="/">{t('header.label.home')}</Link>
                                </li>
                                <li className="breadcrumb-item active">
                                    {t('views.products.link')}
                                </li>
                            </ol>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3 m-4">
                            <Link to="/AddProductPage">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block"
                                >
                                    {t('product.addProduct')}
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <ProductsDataTable />
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProductsPage;
