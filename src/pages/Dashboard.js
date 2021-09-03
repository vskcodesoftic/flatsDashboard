/* eslint-disable */
import React from 'react';
import SmallBox from '../components/small-box/SmallBox';
import GetProductsCount from '@app/pages/Products/GetProductsCount';
import GetFeauturedProductsCount from '@app/pages/Products/GetFeauturedProductsCount';
import GetPaymentsCount from '@app/pages/Payments/GetPaymentsCount';

import { GetCitiesCount  , GetServiceProviderCount, GetServicesCount, GetStatesCount } from  './CountValues';

const Dashboard = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-3 col-6">
                    <SmallBox
                        count={<GetStatesCount />}
                        title="No of States"
                        type="info"
                        icon="ion-android-people"
                        navigateTo="/states"
                    />
                </div>
                <div className="col-lg-3 col-6">
                    <SmallBox
                        count={<GetCitiesCount />}
                        title="No of Cities"
                        type="success"
                        navigateTo="/cities"
                    />
                </div>
                <div className="col-lg-3 col-6">
                    <SmallBox
                        count={<GetServicesCount />}
                        title="No of services"
                        icon="ion-bag"
                        type="warning"
                        navigateTo="/services"
                    />
                </div>
                <div className="col-lg-3 col-6">
                    <SmallBox
                        count={<GetServiceProviderCount />}
                        title="No. of Service Providers"
                        type="danger"
                        icon="ion-cash"
                        navigateTo="/serviceProviders"
                    />
                </div>
            </div>
            <div className="row">
                <div>
                    <center>
                        <h1>Janpad :) </h1>
                    </center>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
