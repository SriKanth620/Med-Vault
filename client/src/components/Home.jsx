import React, { Component } from 'react'
import {Link} from "react-router-dom"

export default class Home extends Component {
  render() {
    return (
      <div>
        {/* home page bro */}
        
       <Link to="/doctor">Doctor</Link> <br />
       <Link to="/patient">Patient</Link>
       <h1>home page content goes here</h1>
        </div>
    )
  }
}
