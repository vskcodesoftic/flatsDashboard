/* eslint-disable */
import React, {useState, useRef, useEffect} from 'react';

import {Formik, Field, Form} from 'formik';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {toast} from 'react-toastify';
import axios from 'axios';

export const GetCurrentUser = () => {
    const C = JSON.parse(localStorage.getItem('user'));
    return C;
};

const MakeItem = function (value) {
    return (
        <>
            <option key={value} value={value}>
                {value}
            </option>
        </>
    );
};

const AddServicePage = (props) => {
    const {register, handleSubmit} = useForm();
    const [ImageValue, setImageValue] = useState('');
    const [t] = useTranslation();
    const fileInput = React.createRef();
    let selectedValue;
    const [Category, setCategory] = useState('');
    const [
        selectedCategoryFromDropDown,
        setselectedCategoryFromDropDown
    ] = useState('');
    const [ValueForCity, setValueForCity] = useState('');
    const [citiesList, setCitiesList] = useState([]);
    let stateId;
    useEffect(() => {
        axios
            .get('http://localhost:9005/api/admin/states')
            .then((res) => {
                //console.log("cats",res.data.Categories[0])

                const cats = res.data.states;

                console.log(cats);

                const objectArray = Object.entries(cats);

                const intialCategory = objectArray[0];

                const intialValues = Object.values(intialCategory);
                console.log('hgg', intialValues);
                const intialDropdownValue = intialValues[1].title;
                stateId = intialValues[1]._id;
                console.log('intial selected values', intialDropdownValue);
                console.log('intial selected city', stateId);

                setCategory(res.data.states);

                setselectedCategoryFromDropDown(intialDropdownValue);
            })
            .catch((err) => {
                console.error(err);
            });

        axios.get(`http://localhost:9005/api/admin/cities`).then((res) => {
            console.log('cities list', res.data.cities);
            setCitiesList(res.data.cities);
        });
    }, []);

    useEffect(() => {
        axios
            .get(`http://localhost:9005/api/admin/state/${ValueForCity}/cities`)
            .then((res) => {
                console.log('cities list', res.data.cities);
                setCitiesList(res.data.cities);
            });
    }, [ValueForCity]);

    const onSubmit = (data) => {
        // still to resolve promise

        const fd = new FormData();
        for (var key in data) {
            fd.append(key, data[key]); // formdata doesn't take objects
        }

        axios
            .post('http://localhost:9005/api/admin/service/addService', data)
            .then((res) => {
                console.log(res.data);
                toast.success(`Service Added sucessfully !`);
            })
            .catch((error) => {
                console.log('Error', error);
                toast.error(`something went wrong ${error}`,);
            });
    };

    return (
        <>
            <section className="content-header">
                <div className="container-fluid">
                    <div>
                        <div className="login-box">
                            <div className="card card-outline card-warning">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="Field-group mb-3">
                                            <select
                                                className="form-control"
                                                {...register('stateId')}
                                                className="form-control"
                                                onChange={(e) => {
                                                    selectedValue =
                                                        e.target.value;
                                                    console.log(
                                                        'value',
                                                        selectedValue
                                                    );
                                                    setValueForCity(
                                                        selectedValue
                                                    );
                                                    //   dropHandler(e)
                                                    //{FilterDataCopy()}
                                                }}

                                                
                                            >
                                                {Object.values(Category).map(
                                                    (cm) => {
                                                        return (
                                                            <option
                                                                key={cm._id}
                                                                value={cm._id}
                                                            >
                                                                {cm.title}
                                                            </option>
                                                        );
                                                    }
                                                )}
                                            </select>
                                        </div>

                                        <div className="Field-group mb-3">
                                            <select
                                                className="form-control"
                                                {...register('cityId')}
                                                className="form-control"
                                                onChange={(e) => {
                                                    e.target.value;
                                                    //   dropHandler(e)
                                                    //{FilterDataCopy()}
                                                }}
                                            >
                                                {Object.values(citiesList).map(
                                                    (cm) => {
                                                        return (
                                                            <option
                                                                key={cm._id}
                                                                value={cm._id}
                                                            >
                                                                {cm.title}
                                                            </option>
                                                        );
                                                    }
                                                )}
                                            </select>
                                        </div>

                                        <div className="input-group mb-3">
                                            <input
                                                {...register('serviceLabel', {
                                                    required: true
                                                })}
                                                className="form-control"
                                                placeholder="title"
                                            />
                                        </div>
                                        <div className="Field-group mb-3">
                                            <input
                                                {...register('serviceValue', {
                                                    required: true
                                                })}
                                                className="form-control"
                                                placeholder="Service(withoutSpaces)"
                                            />
                                        </div>
                                        <div className="Field-group mb-3">
                                            <input
                                                {...register('options', {
                                                    required: true
                                                })}
                                                className="form-control"
                                                placeholder="services"
                                            />
                                        </div>

                                        <div className="row">
                                            <div className="col-12">
                                                <button
                                                    type="submit"
                                                    className="btn btn-warning btn-block"
                                                >
                                                    Add Service
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

export default AddServicePage;
