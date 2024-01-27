import React, { Component } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import RegisterHospital from './RegisterHospital'
import RegisterDoctor from './RegisterDoctor'
import RegisterPatient from './RegisterPatient'

export default class Home extends Component {
  render() {
    return (
      <div>
        {/* home page bro */}
       <Link to="/admin">Admin</Link> <br />
       <Link to="/doctor">Doctor</Link> <br />
       <Link to="/patient">Patient</Link>
       <h1>home page content goes here</h1>
       
        </div>
    )
  }
}
