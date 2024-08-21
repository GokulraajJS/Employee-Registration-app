import React, { useState } from 'react';

import { ROUTES } from '../../config/routes';

import { Link } from 'react-router-dom';

import { createEmployee } from '../../api/employeeApi';

const EmployeeForm = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        department: '',
        position: '',
        gender: '',
        hire_date: '',
        phone: ''
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');
    const [phoneCount, setPhoneCount] = useState(0);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Phone number validation and live count update
        if (name === "phone") {
            if (value.length <= 10) {
                setFormData({ ...formData, [name]: value });
                setPhoneCount(value.length);
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await fetch('http://192.168.1.122:8000/api/employees/', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(formData),
    //         });

    //         if (response.ok) {
    //             setSuccess('Employee created successfully!');
    //             setFormData({ 
    //                 first_name: '', 
    //                 last_name: '', 
    //                 email: '', 
    //                 password: '', 
    //                 department: '', 
    //                 position: '',
    //                 gender: '',
    //                 hire_date: '',
    //                 phone: ''
    //             });
    //             setErrors({});
    //             setPhoneCount(0);
    //         } else {
    //             const errorData = await response.json();
    //             setErrors(errorData);
    //         }
    //     } catch (error) {
    //         console.error("Error creating employee:", error);
    //         setErrors({ general: 'An error occurred. Please try again.' });
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await createEmployee(formData); // Use the API function

        if (result.success) {
            setSuccess('Employee created successfully!');
            setFormData({ 
                first_name: '', 
                last_name: '', 
                email: '', 
                password: '', 
                department: '', 
                position: '',
                gender: '',
                hire_date: '',
                phone: ''
            });
            setErrors({});
            setPhoneCount(0);
        } else {
            setErrors(result.errors);
        }
    };

    return (
        <div>
            <h2>Create Employee</h2>
            <Link
                to={ROUTES.EMPLOYEE_LIST}>Back to Employee List</Link>
            {errors.general && <p style={{ color: 'red' }}>{errors.general}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                {/* First Name */}
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* Last Name */}
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* Email */}
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <p style={{ color: 'red' }}>{errors.email[0]}</p>}
                </div>
                {/* Password */}
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {errors.password && <p style={{ color: 'red' }}>{errors.password[0]}</p>}
                </div>
                {/* Department */}
                <div>
                    <label>Department:</label>
                    <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        maxLength={10} 
                        required
                    />
                    {errors.department && <p style={{ color: 'red' }}>{errors.department[0]}</p>}
                </div>
                {/* Position */}
                <div>
                    <label>Position:</label>
                    <input
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                    />
                </div>
                {/* Gender */}
                <div>
                    <label>Gender:</label>
                    <div>
                        <input
                            type="radio"
                            id="Male"
                            name="gender"
                            value="M"
                            checked={formData.gender === 'M'}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="Male">Male</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="female"
                            name="gender"
                            value="F"
                            checked={formData.gender === 'F'}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="female">Female</label>
                    </div>
                    {errors.gender && <p style={{ color: 'red' }}>{errors.gender[0]}</p>}
                </div>
                {/* Hire Date */}
                <div>
                    <label>Hire Date:</label>
                    <input
                        type="date"
                        name="hire_date"
                        value={formData.hire_date}
                        onChange={handleChange}
                        required
                    />
                    {errors.hire_date && <p style={{ color: 'red' }}>{errors.hire_date[0]}</p>}
                </div>
                {/* Phone */}
                <div>
                    <label>Phone:</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        pattern="\d{10}"
                        required
                    />
                    <small>{phoneCount}/10 digits</small>
                    {errors.phone && <p style={{ color: 'red' }}>{errors.phone[0]}</p>}
                </div>
                {/* Submit Button */}
                <button type="submit">Create Employee</button>
            </form>
        </div>
    );
};

export default EmployeeForm;
