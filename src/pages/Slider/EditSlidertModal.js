/* eslint-disable */
import React, {useState, useRef, useEffect} from 'react';
import {Formik, Field, Form} from 'formik';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {toast} from 'react-toastify';
import axios from 'axios';

const EditSlidertModal = (props) => {
    const {userId, title, description, image} = props;
    const {register, handleSubmit} = useForm();
    const [ImageValue, setImageValue] = useState('');
    const [t] = useTranslation();
    const fileInput = React.createRef();
    const [Data, setData] = useState([]);
    console.log(title);

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
            .patch(`http://localhost:8001/api/admin/baneer/b/${userId}`, fd)
            .then((res) => {
                console.log(res.data);
                toast.success(`Slider updated sucessfully !`);
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
                            {/* { Object.keys(Data).map((item, i) => (
                                <div key={i} className="report">
                                    <p>{item}</p>
                                    {Data[item].map((media,ind) =>
                                        <div key={ind}><p>{media.title}</p></div>
                                    )}
                                </div>
                        ))} */}

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <p>
                                    {userId}
                                    {title}
                                </p>
                                <div className="input-group mb-3">
                                    <input
                                        {...register('title', {
                                            required: true
                                        })}
                                        className="form-control"
                                        placeholder={title}
                                    />
                                </div>
                                <div className="Field-group mb-3">
                                    <input
                                        {...register('description', {
                                            required: true
                                        })}
                                        className="form-control"
                                        placeholder={description}
                                    />
                                </div>
                                <div className="Field-group mb-3">
                                    <input
                                        required
                                        multiple
                                        ref={fileInput}
                                        type="file"
                                        className="form-control"
                                        placeholder={description}
                                    />
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-block"
                                        >
                                            {t('slider.addImage')}
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

export default EditSlidertModal;
