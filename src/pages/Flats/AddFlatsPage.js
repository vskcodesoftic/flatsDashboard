/* eslint-disable */
import {Formik, Field, Form} from 'formik';
import {useForm, useFieldArray, Controller, useWatch} from 'react-hook-form';
import React, {useState, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {toast} from 'react-toastify';
import axios from 'axios';
import Loader from 'react-js-loader';
import {Redirect} from 'react-router-dom';

export const GetCurrentUser = () => {
    const C = JSON.parse(localStorage.getItem('user'));
    return C;
};

const AddFlatsPage = (props) => {
    const {register, control, handleSubmit, reset, watch} = useForm({
        defaultValues: {
            test: [{firstName: 'Bill', lastName: 'Luo'}]
        }
    });
    const {fields, append, remove} = useFieldArray({
        control,
        name: 'test'
    });

    const [ImageValue, setImageValue] = useState('');
    const [t] = useTranslation();
    const fileInput = React.createRef();

    const [Spinner, setSpinner] = useState(false);

    const [redirect, setredirect] = useState(false);

    // watch to enable re-render when ticket number is changed
    const watchNumberOfTickets = watch('numberOfTickets');

    // return array of ticket indexes for rendering dynamic forms in the template
    function ticketNumbers() {
        return [...Array(parseInt(watchNumberOfTickets || 0)).keys()];
    }

    const onSubmit = (data) => {
        // still to resolve promise
        console.log('data =>', data);
        setSpinner(true);

        axios
            .post('https://flatsapi.herokuapp.com/api/admin/addFlat', data)
            .then((res) => {
                console.log(res.data);
                toast.success(`Flat Added sucessfully !`);
                setSpinner(false);
                setredirect(true);
            })
            .catch((error) => {
                console.log('Error', error);
                toast.error(`something went wrong`);
            });
    };
    if (redirect) {
        return <Redirect to="/flats" />;
    }

    return (
        <>
            <section className="content-header">
                <div className="container-fluid">
                    <div>
                        <div className="">
                            <div className="card card-outline card-warning">
                                <div className="card-body">
                                    <form
                                        onSubmit={handleSubmit(onSubmit)}
                                        onReset={reset}
                                    >
                                        <div className="input-group mb-3">
                                            <input
                                                {...register('title', {
                                                    required: true
                                                })}
                                                className="form-control"
                                                placeholder="name of residence"
                                            />
                                        </div>
                                        <div className="Field-group mb-3">
                                            <input
                                                {...register('ownerName', {
                                                    required: true
                                                })}
                                                className="form-control"
                                                placeholder="ownerName"
                                            />
                                        </div>
                                        <div className="Field-group mb-3">
                                            <input
                                                {...register('flatno', {
                                                    required: true
                                                })}
                                                className="form-control"
                                                placeholder="flatno"
                                            />
                                        </div>
                                        <div className="Field-group mb-3">
                                            <input
                                                {...register('ownerEmail', {
                                                    required: true
                                                })}
                                                className="form-control"
                                                placeholder="ownerEmail"
                                            />
                                        </div>
                                        <div className="Field-group mb-3">
                                            <input
                                                {...register(
                                                    'ownerContactNumber',
                                                    {
                                                        required: true
                                                    }
                                                )}
                                                className="form-control"
                                                placeholder="owner Contact Number"
                                            />
                                        </div>

                                        <div className="Field-group mb-3">
                                            <input
                                                {...register(
                                                    'NumberOfFamilyMembers',
                                                    {
                                                        required: true
                                                    }
                                                )}
                                                className="form-control"
                                                placeholder=" Number of family members"
                                            />
                                        </div>
                                        <div className="Field-group mb-3">
                                            <input
                                                {...register('BlockNumber', {
                                                    required: true
                                                })}
                                                className="form-control"
                                                placeholder="BlockNumber"
                                            />
                                        </div>
                                        {/* <div className="Field-group mb-3">
                                            <input
                                                {...register('famliyMembersList', {
                                                    required: true
                                                })}
                                                className="form-control"
                                                placeholder="famliy Members List"
                                            />
                                        </div> */}
                                        <div className="Field-group mb-3">
                                            <input
                                                {...register(
                                                    'ownerOccupation',
                                                    {
                                                        required: true
                                                    }
                                                )}
                                                className="form-control"
                                                placeholder="owner occupation"
                                            />
                                        </div>
                                        {/* <div className="card-body border-bottom">
                                            <div className="Field-group mb-3">
                                                    <label>Number of Family members</label>
                                                    <select {...register('numberOfTickets',{ required: true })} className={`form-control `}>
                                                        {['',1,2,3,4,5,6,7,8,9,10].map(i => 
                                                            <option key={i} value={i}>{i}</option>
                                                        )}
                                                    </select>
                                                
                                            </div>
                                        </div> */}
                                        {/* {ticketNumbers().map(i => (
                                        <div key={i} className="Field-group mb-3">
                                            <div className="list-group-item">
                                                <div className="form-row">
                                                    <div className="">
                                                      <p>Name of family member </p>
                                                        <input  
                                                      className="form-control"
                                                        {...register(`famliyMembersList[${i}]`,{ required : true })} 
                                                          type="text" />

                                                      
                                                
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    ))} */}
                                        <p>Family members details </p>

                                        {fields.map((item, index) => {
                                            return (
                                                <div
                                                    className="Field-group mb-3"
                                                    key={item.id}
                                                >
                                                    <input
                                                        {...register(
                                                            `famliyMembersList.${index}.name`
                                                        )}
                                                        placeholder="name"
                                                        className="form-control m-2"
                                                    />

                                                    <Controller
                                                        render={({field}) => (
                                                            <input
                                                                {...field}
                                                                placeholder="email"
                                                                className="form-control m-2"
                                                            />
                                                        )}
                                                        name={`famliyMembersList.${index}.email`}
                                                        control={control}
                                                    />
                                                    <Controller
                                                        render={({field}) => (
                                                            <input
                                                                {...field}
                                                                placeholder="contact number"
                                                                className="form-control m-2"
                                                            />
                                                        )}
                                                        name={`famliyMembersList.${index}.contactNumber`}
                                                        control={control}
                                                    />
                                                    <Controller
                                                        render={({field}) => (
                                                            <input
                                                                {...field}
                                                                placeholder="Profession"
                                                                className="form-control m-2"
                                                            />
                                                        )}
                                                        name={`famliyMembersList.${index}.proffesion`}
                                                        control={control}
                                                    />
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger "
                                                        onClick={() =>
                                                            remove(index)
                                                        }
                                                    >
                                                        Delete
                                                    </button>

                                                    <button
                                                        className="btn btn-success px-3 m-2 "
                                                        type="button"
                                                        onClick={() => {
                                                            append({
                                                                name: '',
                                                                email: ' ',
                                                                contactNumber:
                                                                    ' ',
                                                                profession: ' '
                                                            });
                                                        }}
                                                    >
                                                        Add
                                                    </button>
                                                </div>
                                            );
                                        })}

                                        <div className="row">
                                            <div className="col-12">
                                                <button
                                                    type="submit"
                                                    className="btn btn-warning btn-block"
                                                >
                                                    Add Flat
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                    {Spinner ? (
                                        <Loader
                                            type="spinner-circle"
                                            className="mt-5"
                                            bgColor={'#000000'}
                                            title={'...loading'}
                                            size={50}
                                        />
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AddFlatsPage;
