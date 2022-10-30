import React from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";

const TopBar = (props) => {
  const dynamicLink = (route, linkText) => {
    return (
      <div className="toplistitem">
        <NavLink to="/addblog" activeClassName="nav-link-active">
          Add Blog
        </NavLink>
      </div>
    );
  };

  const handleSignOut = () => {
    axios
      .post("http://127.0.0.1:5000/login", {
        email: "Duke@gmail.com",
        password: "Bad",
      })
      .then((response) => {
        if (response.data.successful == true) {
          // props.history.push("/");
          props.handleLogout();
        }
        return response.data;
      })
      .catch((error) => {
        console.log("Error signing out", error);
      });
  };
  return (
    <div className="nav-wrapper">
      <div className="topleft">
        <NavLink exact to="/" activeClassName="nav-link-active">
          TCR
        </NavLink>
      </div>

      <div className="topcenter">
        <div className="toplistitem">
          <NavLink to="/" activeClassName="nav-link-active">
            Home
          </NavLink>
        </div>
        <div className="toplistitem">
          <NavLink to="/contact">Contact</NavLink>
        </div>

        <div className="toplistitem">
          <NavLink to="/aboutme" activeClassName="nav-link-active">
            About
          </NavLink>
        </div>

        {props.loggedInStatus === "LOGGED_IN"
          ? dynamicLink("/addblog", "Blog")
          : null}
      </div>
      <NavLink to="/auth" activeClassName="nav-link-active">
        <div className="topright">
          {props.loggedInStatus === "LOGGED_IN" ? (
            <button onClick={handleSignOut} className="topright">
              Sign out
            </button>
          ) : (
            <Link to="/auth" className="link">
              Sign In
            </Link>
          )}
        </div>
      </NavLink>
    </div>
  );
};

export default TopBar;
