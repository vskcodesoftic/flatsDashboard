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

const ServiceProviderPage = (props) => {
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
    const [servicesData, setservicesData] = useState([])
    let stateId;
    useEffect(() => {
        axios
            .get('https://beingfame.com/api/admin/states')
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

        axios.get(`https://beingfame.com/api/admin/cities`).then((res) => {
            console.log('cities list', res.data.cities);
            setCitiesList(res.data.cities);
        });
    }, []);

   
   useEffect(() => {
      axios.get(`https://beingfame.com/api/admin/services`)
      .then(res => {
          console.log(res.data.services)
          setservicesData(res.data.services)
      })
      .catch(err => {
          console.error(err); 
      })
   }, [])    

    useEffect(() => {
        axios
            .get(`https://beingfame.com/api/admin/state/${ValueForCity}/cities`)
            .then((res) => {
                console.log('cities list', res.data.cities);
                setCitiesList(res.data.cities);
            });
    }, [ValueForCity]);

    const onSubmit = (data) => {
        // still to resolve promise

        console.log(
            'onSubmitFn:',
            data,
            '  imageFile: ',
            fileInput.current.files[0].name
        );
        const fd = new FormData();
        for (var key in data) {
            fd.append(key, data[key]); // formdata doesn't take objects
        }

        fd.append(
            'image',
            fileInput.current.files[0],
            fileInput.current.files[0].name
        );

        axios
            .post('https://beingfame.com/api/admin/service/addServiceProvider', fd)
            .then((res) => {
                console.log(res.data);
                toast.success(`service provider uploaded  sucessfully !`);
            })
            .catch((error) => {
                console.log('Error',error);
                toast.error(`something went wrong`);
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
                                    <div className="input-group mb-3">
                                            <input
                                                {...register('name', {
                                                    required: true
                                                })}
                                                className="form-control"
                                                placeholder="name"
                                            />
                                    </div>
                                    <div className="input-group mb-3">
                                            <input
                                                {...register('profession', {
                                                    required: true
                                                })}
                                                className="form-control"
                                                placeholder="profession"
                                            />
                                    </div>
                                    <div className="input-group mb-3">
                                            <input
                                                {...register('gmailId', {
                                                    required: true
                                                })}
                                                className="form-control"
                                                placeholder="gmailId"
                                            />
                                    </div>
                                    <div className="input-group mb-3">
                                            <input
                                                {...register('instagramId', {
                                                    required: true
                                                })}
                                                className="form-control"
                                                placeholder="instagramId"
                                            />
                                    </div>
                                    <div className="input-group mb-3">
                                            <input
                                                {...register('facebookId', {
                                                    required: true
                                                })}
                                                className="form-control"
                                                placeholder="facebookID"
                                            />
                                    </div>
                                    <div className="input-group mb-3">
                                            <input
                                                {...register('address', {
                                                    required: true
                                                })}
                                                className="form-control"
                                                placeholder="Address"
                                            />
                                    </div>
                                    <div className="input-group mb-3">
                                            <input
                                                {...register('pincode', {
                                                    required: true
                                                })}
                                                className="form-control"
                                                placeholder="profession"
                                            />
                                    </div>
                                    <div className="input-group mb-3">
                                            <input
                                                {...register('contactNumber', {
                                                    required: true
                                                })}
                                                className="form-control"
                                                placeholder="ContactNumber"
                                            />
                                    </div>
                                    <div className="input-group mb-3">
                                            <input
                                                {...register('whatsAppNumber', {
                                                    required: true
                                                })}
                                                className="form-control"
                                                placeholder="Whats App number"
                                            />
                                    </div>
                                    
                                    <div className="Field-group mb-3">
                                            <input
                                                required
                                                multiple
                                                ref={fileInput}
                                                type="file"
                                                className="form-control"
                                                placeholder="Please choose Image"
                                            />
                                        </div>
                                        <div className="Field-group mb-3">
                                            <select
                                                className="form-control"
                                                {...register('state')}
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
                                                {...register('city', {
                                                    required: true
                                                })}
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
  
                                        <div className="Field-group mb-3">
                                            <select
                                                className="form-control"
                                                {...register('serviceId', {
                                                    required: true
                                                })}
                                                className="form-control"
                                                onChange={(e) => {
                                                    e.target.value;
                                                    //   dropHandler(e)
                                                    //{FilterDataCopy()}
                                                }}
                                            >
                                                {Object.values(servicesData).map(
                                                    (cm) => {
                                                        return (
                                                            <option
                                                                key={cm._id}
                                                                value={cm._id}
                                                            >
                                                                {cm.serviceLabel}
                                                            </option>
                                                        );
                                                    }
                                                )}
                                            </select>
                                        </div>


                                       
                                        <div className="row">
                                            <div className="col-12">
                                                <button
                                                    type="submit"
                                                    className="btn btn-warning btn-block"
                                                >
                                                    Add Service Provider
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

export default ServiceProviderPage;
