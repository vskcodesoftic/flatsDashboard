/* eslint-disable */
import {Formik, Field, Form} from 'formik';
import {useForm} from 'react-hook-form';
import React, {useState, useRef, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {toast} from 'react-toastify';
import axios from 'axios';
import Input from '@app/../node_modules/reactstrap/es/Input';

const AddCategoryPage = (props) => {
    const {register, handleSubmit} = useForm();
    const [cat, setcat] = useState([]);
    const [sub, setsub] = useState([]);
    const [ImageValue, setImageValue] = useState('');
    const [t] = useTranslation();
    const fileInput = React.createRef();
    const [data, setData] = useState([]);
    let cid = '60dd83de9222441f460bb915';

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        // We're using axios instead of Fetch
        axios
            // The API we're requesting data from
            .get(`http://localhost:8001/api/admin/category/getCategory`)
            // Once we get a response, we'll map the API endpoints to our props
            .then((res) => {
                setData(res.data);
                toast.success(`Category uploaded  sucessfully !`);
            })
            .catch((error) => {
                console.log('Error');
                toast.error(`something went wrong`);
            });

        data.categories.forEach(function (data, index, array) {
            console.log(data.subcategory, data.category, index);
            setsub(data.subcategory);
            setcat(data.category);
        });
    };

    const onSubmit = (data) => {
        // still to resolve promise

        // console.log(
        //     'onSubmitFn:',
        //     data,
        //     '  imageFile: ',
        //     fileInput.current.files[0].name
        // );
        const fd = new FormData();
        for (var key in data) {
            fd.append(key, data[key]); // formdata doesn't take objects
        }

        // fd.append(
        //     'image',
        //     fileInput.current.files[0],
        //     fileInput.current.files[0].name
        // );

        axios
            .post('http://localhost:8001/api/admin/category/addCategory', data)
            .then((res) => {
                console.log(res.data);

                toast.success(`Category uploaded  sucessfully !`);
            })
            .catch((error) => {
                console.log('Error');
                toast.error(`something went wrong`);
            });
    };

    return (
        <>
            <section className="content-header">
                <div className="container-fluid">
                    <div>
                        <div className="login-box">
                            <div className="card card-outline card-primary">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="Field-group mb-3">
                                            <input
                                                {...register('category', {
                                                    required: true
                                                })}
                                                className="form-control"
                                                placeholder="Category"
                                            />
                                        </div>
                                        <div className="Field-group mb-3">
                                            <input
                                                {...register('subcategory[]', {
                                                    required: true
                                                })}
                                                className="form-control"
                                                placeholder="subcategory"
                                            />
                                        </div>
                                        <div className="Field-group mb-3">
                                            <select
                                                className="form-control"
                                                {...register('isFeatured', {
                                                    required: true
                                                })}
                                            >
                                                <option>{cat}</option>
                                            </select>
                                        </div>

                                        <div className="Field-group mb-3">
                                            <select
                                                className="form-control"
                                                {...register('isFeatured', {
                                                    required: true
                                                })}
                                            >
                                                {sub.map((d, i) => {
                                                    <option key={i}>
                                                        {' '}
                                                        {d}
                                                    </option>;
                                                })}

                                                <option value="true">
                                                    yes
                                                </option>
                                                <option value="false">
                                                    False
                                                </option>
                                            </select>
                                        </div>

                                        <div className="row">
                                            <div className="col-12">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary btn-block"
                                                >
                                                    {t('category.addCategory')}
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

export default AddCategoryPage;
