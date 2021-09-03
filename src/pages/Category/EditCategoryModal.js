/* eslint-disable */
import React, {useState, useRef, useEffect} from 'react';
import {Formik, Field, Form} from 'formik';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {toast} from 'react-toastify';
import axios from 'axios';

const EditCategoryModal = (props) => {
    const {categoryID} = props;
    const {register, handleSubmit} = useForm();
    const [ImageValue, setImageValue] = useState('');
    const [t] = useTranslation();
    const fileInput = React.createRef();
    const [Data, setData] = useState('');

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
            .patch(
                `http://localhost:8001/api/admin/category/addSubCategory/${categoryID}`,
                data
            )
            .then((res) => {
                console.log(res.data);
                toast.success(`Product updated sucessfully !`);
            })
            .catch((error) => {
                console.log('Error');
                toast.error(`something went wrong`);
            });
    };

    return (
        <div>
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
                                        {...register('subcategory', {
                                            required: true
                                        })}
                                        className="form-control"
                                        placeholder="subcategory"
                                    />
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-block"
                                        >
                                            {t('product.addProduct')}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditCategoryModal;
