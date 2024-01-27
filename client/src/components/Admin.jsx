import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import RegisterHospital from './RegisterHospital'
import RegisterDoctor from './RegisterDoctor'
import RegisterPatient from './RegisterPatient'


function Admin() {
  return (
    <div>
        <h1>Welcome Back Admin</h1>
        <p>you the only way to register any entity</p>
       <Link to="/admin/regpatient">Register Patient</Link> <br />
       <Link to="/admin/regdoctor">Register Doctor</Link> <br />
       <Link to="/admin/reghospital">Register Hospital</Link>
       
        <br/>
        <Link to="/">Home</Link>
    </div>
  )
}

export default Admin