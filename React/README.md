# react_dj_employee_registration_system
 
``` 
npm create vite react_dj_employee_registration_system
```

```
Select a framework: » React
√ Select a variant: » JavaScript

Scaffolding project in C:\Users\windows_rig3\Documents\GitHub\react_dj_employee_registration_system...

Done. Now run:

cd react_dj_employee_registration_system
npm install
npm run dev
```

```
npm install dotenv
```

```
npm install react-router-dom
```

2. **Folder Setup**

Folder Setup

```
project_name -> src -> config
```

```
project_name -> src -> api
```

```
project_name -> src -> context
```

```
project_name -> src -> components
```

```
project_name -> src -> components -> auth
```

```
project_name -> src -> components -> employee
```

File Setup

```
project_name -> src -> config -> routes.js
```

```
project_name -> src -> api -> employeeApi.js
```

```
project_name -> src -> context -> EmployeeContext.jsx
```

```
project_name -> src -> components -> auth -> Login.jsx
```

```
project_name -> src -> components -> employee -> List.jsx
```

```
project_name -> src -> components -> employee -> Detail.jsx
```

3. open `src\api\employeeApi.js`

```
export const fetchEmployees = async () => {
    try {
        const response = await fetch('http://192.168.1.122:8000/api/employees/');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("There was an error fetching the employees!", error);
        return [];
    }
};
```

4. open `src\context\EmployeeContext.jsx`

```
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
```

5. open `src\components\auth\Login.jsx`

```
import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('admin@gmail.com');
    const [password, setPassword] = useState('admin');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const validate = () => {
        const errors = {};
        if (!email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid';
        }

        if (!password) {
            errors.password = 'Password is required';
        } else if (password.length < 2) {
            errors.password = 'Password must be at least 6 characters';
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            setErrors({});
            setLoading(true);
            setMessage('');
            
            try {
                const response = await fetch('http://192.168.1.122:8000/api_v2/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();
                setLoading(false);

                if (response.ok) {
                    setMessage(`Login successful! Token: ${data}`);
                    setMessage(`Login successful! Token: ${data || 'N/A'}`);
                    console.log('Logged in:', data);

                    // Example: Logging token or other response data
                    console.log('Token:', data);
                } else {
                    setMessage('Login failed. Please try again.');
                    setErrors(data.errors || {});
                }
                
            } catch (error) {
                setLoading(false);
                setMessage('Login failed. Please try again.');
                console.error('Error:', error);
            }
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div className="container mt-5">

            <h2>Login</h2>

            <form onSubmit={handleSubmit} noValidate>

                <div className="mb-3">

                    <label htmlFor="email" className="form-label">Email</label>

                    <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}

                </div>

                <div className="mb-3">

                    <label htmlFor="password" className="form-label">Password</label>

                    <input
                        type="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}

                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>

                    {loading ? 'Logging in...' : 'Login'}

                </button>
                
                {message && <div className={`mt-3 ${message.includes('successful') ? 'text-success' : 'text-danger'}`}>

                    {message}
                    
                </div>}

            </form>
        </div>
    );
};

export default Login;
```

6. open `src\components\employee\List.jsx`

```
import React, { useContext } from 'react';
import { EmployeeContext } from '../../context/EmployeeContext';
import { Link } from 'react-router-dom';

import '../../assets/main.css';

const EmployeeList = () => {
    const { employees, setSelectedEmployee } = useContext(EmployeeContext);

    console.log("Employees:", employees);

    return (
        <div>
            <h2>Employee List</h2>
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
                                to={`/employees/${row.id}`}
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
```

7. open `src\components\employee\Detail.jsx`

```
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
```