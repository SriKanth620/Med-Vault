import React from "react";
import { Link } from "react-router-dom";

const navLinks = [
  { link: "/doctor", text: "Doctor" },
  { link: "/patient", text: "Patient" },
  { link: "/admin", text: "Admin" },
];

function NavBar(props) {
  return (
    <div>
      <nav>
        <Link to="/" className="logo">
          MedVault
        </Link>
        <ul className="nav-bar-list">
          {navLinks.map((item) => (
            <li key={item.link}>
              <Link to={`${item.link}`}>{`${item.text}`}</Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* <h6 className="account">
        Account : {props.account ? props.account : "Not connected"}
      </h6> */}
    </div>
  );
}

export default NavBar;
