/* eslint-disable */
import React, {useEffect, useState} from 'react';
import axios from 'axios';

export const GetStatesCount = () => {
    const api = axios.create({
        baseURL: `https://flatsapi.herokuapp.com/`
    });

    const [data, setData] = useState([]); // table data
    // for error handling
    const [iserror, setIserror] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    useEffect(() => {
        api.get('api/admin/getStatesCount')
            .then((res) => {
                setData(res.data.states);
                setIserror(false);
                setErrorMessages([]);
            })
            .catch((error) => {
                console.log('Error');
                setIserror(true);
                setErrorMessages([` Server error`]);
            });
    }, []);
    return <>{iserror ? errorMessages : data}</>;
};

export const GetCitiesCount = () => {
    const api = axios.create({
        baseURL: `https://flatsapi.herokuapp.com/`
    });

    const [data, setData] = useState([]); // table data
    // for error handling
    const [iserror, setIserror] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    useEffect(() => {
        api.get('api/admin/getCitiesCount')
            .then((res) => {
                setData(res.data.cities);
                setIserror(false);
                setErrorMessages([]);
            })
            .catch((error) => {
                console.log('Error');
                setIserror(true);
                setErrorMessages([` Server error`]);
            });
    }, []);
    return <>{iserror ? errorMessages : data}</>;
};

export const GetServicesCount = () => {
    const api = axios.create({
        baseURL: `https://flatsapi.herokuapp.com/`
    });

    const [data, setData] = useState([]); // table data
    // for error handling
    const [iserror, setIserror] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    useEffect(() => {
        api.get('api/admin/getServicesCount')
            .then((res) => {
                setData(res.data.services);
                setIserror(false);
                setErrorMessages([]);
            })
            .catch((error) => {
                console.log('Error');
                setIserror(true);
                setErrorMessages([` Server error`]);
            });
    }, []);
    return <>{iserror ? errorMessages : data}</>;
};

export const GetServiceProviderCount = () => {
    const api = axios.create({
        baseURL: `https://flatsapi.herokuapp.com/`
    });

    const [data, setData] = useState([]); // table data
    // for error handling
    const [iserror, setIserror] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    useEffect(() => {
        api.get('api/admin/getServiceProvidersCount')
            .then((res) => {
                setData(res.data.serviceProviders);
                setIserror(false);
                setErrorMessages([]);
            })
            .catch((error) => {
                console.log('Error');
                setIserror(true);
                setErrorMessages([` Server error`]);
            });
    }, []);
    return <>{iserror ? errorMessages : data}</>;
};
