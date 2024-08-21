import React, { createContext, useState, useEffect } from 'react';
import { fetchEmployees } from '../api/employeeApi';

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    useEffect(() => {
        const getEmployees = async () => {
            const employeeData = await fetchEmployees();
            setEmployees(employeeData);
        };
        getEmployees();
    }, []);

    return (
        <EmployeeContext.Provider value={{ employees, selectedEmployee, setSelectedEmployee }}>
            {children}
        </EmployeeContext.Provider>
    );
};