/* eslint-disable */
import React, {useState} from 'react';

import {useForm} from 'react-hook-form';

import axios from 'axios';

import {toast} from 'react-toastify';
import Alert from '@material-ui/lab/Alert';

import './style.css';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const PushNotification = () => {
    // for error handling
    const [iserror, setIserror] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    const api = axios.create({
        baseURL: `https://badilnyint.com`
    });

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();
    const onSubmit = async (data) => {
        await sleep(20);
        api.post('/api/trade/firebase/notification', data)
            .then((res) => {
                console.log(res.data);
                toast.success(`notification response sent sucessfully !`);
                setIserror(false);
                setErrorMessages([]);
            })
            .catch((error) => {
                console.log('Error');
                toast.error(`something went wrong`);
                setIserror(true);
                setErrorMessages([`Update failed! Server error${error}`]);
            });
    };

    return (
        <div>
            <div>
                {iserror && (
                    <Alert severity="error">
                        {errorMessages.map((msg, i) => {
                            return <div key={i}>{msg}</div>;
                        })}
                    </Alert>
                )}
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Push Notification</h1>
                <label htmlFor="Message">message</label>
                <input {...register('msgToUser')} placeholder="YOUR MESSAGE" />

                <div style={{color: 'red'}}>
                    {Object.keys(errors).length > 0 &&
                        'There are errors, check your console.'}
                </div>
                <input type="submit" />
            </form>
        </div>
    );
};

export default PushNotification;
