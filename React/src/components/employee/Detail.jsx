import React, { useContext } from 'react';
import { EmployeeContext } from '../../context/EmployeeContext';

const EmployeeDetails = () => {
    const { selectedEmployee } = useContext(EmployeeContext);

    if (!selectedEmployee) {
        return <p>Please select an employee to see the details.</p>;
    }

    return (
        <div>
            <h2>Employee Details</h2>
            <p>Name: {selectedEmployee.first_name} {selectedEmployee.last_name}</p>
            <p>Gender: {selectedEmployee.gender}</p>
            <p>Email: {selectedEmployee.email}</p>
            <p>Phone: {selectedEmployee.phone}</p>
            <p>Department: {selectedEmployee.department}</p>
            <p>Position: {selectedEmployee.position}</p>
            <p>Hire date: {selectedEmployee.hire_date}</p>
        </div>
    );
};

export default EmployeeDetails;
