import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { ROUTES } from './config/routes';

import Login from './components/auth/Login';

import EmployeeForm from './components/employee/Create';
import EmployeeList from './components/employee/List';
import EmployeeDetail from './components/employee/Detail';
import { EmployeeProvider } from './context/EmployeeContext'; // Import EmployeeProvider

import './App.css'


function App() {
  return (
    <>
      <div>

        <BrowserRouter>

          <Routes>

              <Route
                path={ROUTES.HOME}
                element={
                  <EmployeeProvider>
                    <EmployeeList />
                  </EmployeeProvider>
                }
              />

              <Route path="/employees/create" element={<EmployeeForm />} />             

              {/* Wrap the Employee routes with EmployeeProvider */}
              <Route 
                path={ROUTES.EMPLOYEE_LIST} 
                element={
                  <EmployeeProvider>
                    <EmployeeList />
                  </EmployeeProvider>
                } 
              />

              <Route 
                path={ROUTES.EMPLOYEE_DETAIL(':id')}
                element={
                  <EmployeeProvider>
                    <EmployeeDetail />
                  </EmployeeProvider>
                } 
              />
              

          </Routes>

        </BrowserRouter>

      </div>
    </>
  )
}

export default App