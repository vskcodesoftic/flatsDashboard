import React, {useEffect, useState} from '@app/pages/Users/react';
import axios from '@app/pages/Users/axios';
import {MDBDataTable} from '@app/pages/Users/mdbreact';

const EmployeeTable = () => {
    const [rows, setRows] = useState([]);
    const [columns] = useState([
        {
            label: 'Photo',
            field: 'photo',
            sort: 'disabled'
        },
        {
            label: 'Title',
            field: 'title',
            sort: 'asc'
        },
        {
            label: 'Description',
            field: 'description',
            sort: 'disabled'
        },
        {
            label: 'Category',
            field: 'category',
            sort: 'asc'
        },
        {
            label: 'Subcategory',
            field: 'subcategory',
            sort: 'asc'
        },
        {
            label: 'Quantity',
            field: 'quantity',
            sort: 'asc'
        },
        {
            label: 'Country',
            field: 'country',
            sort: 'asc'
        }
    ]);

    useEffect(() => {
        async function loadEmployees() {
            const employeeList = await axios.get(
                'https://tradeappapi.herokuapp.com/api/product/featuredproducts'
            );

            const employees = employeeList.data.products.map((employee) => {
                return {
                    name: `${employee.title}`,
                    description: `${employee.description}`,
                    category: `${employee.category}`,
                    subcategory: `${employee.subcategory}`,
                    country: `${employee.country}`,
                    dob: `${employee.quantity}`,
                    nickname: `${employee.nickname}`,
                    photo: (
                        <img
                            src={`https://tradeappapi.herokuapp.com/${employee.image}`}
                            alt=""
                        />
                    )
                };
            });

            setRows(employees);
        }

        loadEmployees();
    }, []);

    return (
        <MDBDataTable
            hover
            responsive
            small
            entriesOptions={[10, 25, 50, 100]}
            sorting="true"
            entries={10}
            pagesAmount={4}
            order={['name', 'asc']}
            data={{rows, columns}}
        />
    );
};

export default EmployeeTable;
