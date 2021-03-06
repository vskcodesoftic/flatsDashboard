import React, {useState, useEffect, forwardRef} from 'react';
/* eslint-disable */

import Grid from '@material-ui/core/Grid';

import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import {Button} from '@app/components/index';
import Modal from 'react-bootstrap/Modal';
import EditSlidertModal from './EditSlidertModal';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
        <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
        <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
        <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
        <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const api = axios.create({
    baseURL: `https://beingfame.com`
});

const SliderDataTable = () => {
    const [show, setShow] = useState(false);
    const [userID, setUserID] = useState('');
    const [title, setTitle] = useState('');
    //description //image
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    const handleClose = () => setShow(false);

    const handleClick = (event, rowData) => {
        event.preventDefault();
        console.log(rowData);
        console.log(rowData.id);
        setUserID(rowData.id);
        setTitle(rowData.title);
        setDescription(rowData.description);
        setImage(rowData.description);

        setShow(true);
    };

    const handleShow = (e) => {
        setShow(true);
    };
    let path;
    const [state, setState] = useState({
        pictures: []
    });

    const onDropHandler = (pictureFiles, pictureDataURLs) => {
        setState({
            pictures: pictureFiles
        });
        path = pictureDataURLs;
    };

    const columns = [
        {title: 'id', field: '_id', hidden: true},

        {title: 'title', field: 'title'},
        {title: 'Desc', field: 'description'},
        {
            title: 'image',
            field: 'image',
            render: (item) => (
                <>
                    <img
                        src={`https://beingfame.com/` + item.image}
                        alt=""
                        border="3"
                        height="100"
                        width="100"
                    />
                </>
            )
        }
    ];
    const [data, setData] = useState([]); // table data

    // for error handling
    const [iserror, setIserror] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    useEffect(() => {
        api.get('/api/admin/slider/getSliderImages')
            .then((res) => {
                setData(res.data.slider);
            })
            .catch((error) => {
                console.log('Error');
            });
    }, []);

    const handleRowUpdate = (newData, oldData, resolve) => {
        // validation
        const errorList = [];
        if (newData.title === undefined) {
            errorList.push('Please enter title');
        }
        if (newData.description === undefined) {
            errorList.push('Please enter desc');
        }
        if (newData.amount === undefined) {
            errorList.push('Please enter amount');
        }
        if (newData.type === undefined) {
            errorList.push('Please enter type');
        }
        if (newData.posts === undefined) {
            errorList.push('Please enter posts');
        }
        if (errorList.length < 1) {
            api.patch(`/api/admin/banner/u/${newData.id}`, newData)
                .then((res) => {
                    const dataUpdate = [...data];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;
                    setData([...dataUpdate]);
                    resolve();
                    setIserror(false);
                    setErrorMessages([]);
                })
                .catch((error) => {
                    console.log(error);
                    setErrorMessages([`Update failed! Server error${error}`]);
                    setIserror(true);
                    resolve();
                });
        } else {
            setErrorMessages(errorList);
            setIserror(true);
            resolve();
        }
    };

    const handleRowAdd = (newData, resolve) => {
        // validation
        const errorList = [];
        if (newData.title === undefined) {
            errorList.push('Please enter title');
        }
        if (newData.description === undefined) {
            errorList.push('Please enter desc');
        }

        if (errorList.length < 1) {
            // no error
            api.post('/api/admin/banner/addImages', newData)
                .then((res) => {
                    const dataToAdd = [...data];
                    dataToAdd.push(newData);
                    setData(dataToAdd);
                    resolve();
                    setErrorMessages([]);
                    setIserror(false);
                })
                .catch((error) => {
                    console.log(error);
                    setErrorMessages(['Cannot add data. Server error!']);
                    setIserror(true);
                    resolve();
                });
        } else {
            setErrorMessages(errorList);
            setIserror(true);
            resolve();
        }
    };

    const handleRowDelete = (oldData, resolve) => {
        api.delete(`/api/admin/slider/${oldData._id}`)
            .then((res) => {
                console.log(oldData.id);
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);
                resolve();
            })
            .catch((error) => {
                console.log(error);
                setErrorMessages(['Delete failed! Server error']);
                setIserror(true);
                resolve();
            });
    };

    return (
        <div className="App">
            <Grid container spacing={2}>
                <Grid item />
                <Grid item md={12}>
                    <div>
                        {iserror && (
                            <Alert severity="error">
                                {errorMessages.map((msg, i) => {
                                    return <div key={i}>{msg}</div>;
                                })}
                            </Alert>
                        )}
                    </div>
                </Grid>
                <Grid item />
            </Grid>
            <div className="row">
                <div className="col-lg-12  col-sm-12 col-md-6">
                    <MaterialTable
                        options={{
                            exportButton: true
                        }}
                        title="List of Slider images"
                        columns={columns}
                        data={data}
                        icons={tableIcons}
                        editable={{
                            onRowDelete: (oldData) =>
                                new Promise((resolve) => {
                                    handleRowDelete(oldData, resolve);
                                })
                        }}
                    />
                </div>
            </div>

            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Slider</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EditSlidertModal
                            userId={userID}
                            title={title}
                            description={description}
                            image={image}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        </div>
    );
};

export default SliderDataTable;
