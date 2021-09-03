import React, {useState} from 'react';
/* eslint-disable */
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {Button} from '@components';
import ActivityTab from './ActivityTab';
import TimelineTab from './TimelineTab';
import SettingsTab from './SettingsTab';

export const GetCurrentUser = () => {
    const C = JSON.parse(localStorage.getItem('user'));
    return C;
};

const Profile = () => {
    const [activeTab, setActiveTab] = useState('ACTIVITY');
    const [t] = useTranslation();

    const toggle = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    return (
        <>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>{t('header.user.profile')}</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item">
                                    <Link to="/">{t('header.label.home')}</Link>
                                </li>
                                <li className="breadcrumb-item active">
                                    {t('views.user.profile')}
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="card card-primary card-outline">
                                <div className="card-body box-profile">
                                    <div className="text-center">
                                        <img
                                            className="profile-user-img img-fluid img-circle"
                                            src="/img/default-profile.png"
                                            alt="User profile"
                                        />
                                    </div>
                                    <h3 className="profile-username text-center">
                                        {GetCurrentUser().email}
                                    </h3>
                                    <p className="text-muted text-center">
                                        {GetCurrentUser().userId}
                                    </p>
                                </div>
                                {/* /.card-body */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Profile;
