import React, { useContext } from 'react';
import { EmployeeContext } from '../../context/EmployeeContext';
import { Link } from 'react-router-dom';

import { ROUTES } from '../../config/routes';

import '../../assets/main.css';

const EmployeeList = () => {
    const { employees, setSelectedEmployee } = useContext(EmployeeContext);

    console.log("Employees:", employees);

    return (
        <div>
            <h2>Employee List</h2>
            <Link
                to={ROUTES.EMPLOYEE_CREATE}>Create Employee</Link>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(row => (
                    <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.first_name}</td>
                        <td>{row.last_name}</td>
                        <td>{row.email}</td>
                        <td>{row.gender}</td>
                        <td>
                            <Link
                                to={ROUTES.EMPLOYEE_DETAIL(row.id)}
                                onClick={() => setSelectedEmployee(row)}>View</Link>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <ul>
                {employees.map(employee => (
                    <li key={employee.id} onClick={() => setSelectedEmployee(employee)}>
                        {employee.first_name} {employee.last_name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeList;