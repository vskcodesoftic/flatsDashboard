/* eslint-disable */
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const GetProductsCount = () => {
    const api = axios.create({
        baseURL: `https://badilnyint.com`
    });

    const [data, setData] = useState([]); // table data
    // for error handling
    const [iserror, setIserror] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    useEffect(() => {
        api.get('/api/admin/getProductsCount')
            .then((res) => {
                setData(res.data.products);
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

export default GetProductsCount;
