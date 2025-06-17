import React from "react";
import { NavLink } from "react-router-dom";

const Link = () => {
  return (
    <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
      {/* Dashboard */}
      <NavLink
        to="/adminDashboard"
        style={({ isActive }) => ({
          textDecoration: "none",
          color: isActive ? "yellow" : "#555",
          fontWeight: isActive ? "bold" : "normal",
          fontSize: isActive ? "1.2rem" : "1rem",
          padding: "0.5rem 1rem",
          borderRadius: "5px",
          backgroundColor: isActive ? "#333" : "transparent",
        })}
      >
        Dashboard
      </NavLink>

      {/* Add Admin */}
      <NavLink
        to="/adminDashboard/CreateAdmin"
        style={({ isActive }) => ({
          textDecoration: "none",
          color: isActive ? "yellow" : "#555",
          fontWeight: isActive ? "bold" : "normal",
          fontSize: isActive ? "1.2rem" : "1rem",
          padding: "0.5rem 1rem",
          borderRadius: "5px",
          backgroundColor: isActive ? "#333" : "transparent",
        })}
      >
        Add Admin
      </NavLink>
     
      {/* Create Product */}
      <NavLink
        to="/adminDashboard/createProduct"
        style={({ isActive }) => ({
          textDecoration: "none",
          color: isActive ? "yellow" : "#555",
          fontWeight: isActive ? "bold" : "normal",
          fontSize: isActive ? "1.2rem" : "1rem",
          padding: "0.5rem 1rem",
          borderRadius: "5px",
          backgroundColor: isActive ? "#333" : "transparent",
        })}
      >
        Create Product
      </NavLink>
      {/* Get Product */}
      <NavLink
        to="/adminDashboard/getProduct"
        style={({ isActive }) => ({
          textDecoration: "none",
          color: isActive ? "yellow" : "#555",
          fontWeight: isActive ? "bold" : "normal",
          fontSize: isActive ? "1.2rem" : "1rem",
          padding: "0.5rem 1rem",
          borderRadius: "5px",
          backgroundColor: isActive ? "#333" : "transparent",
        })}
      >
        Get Product
      </NavLink>
       {/* Login Admin */}
      <NavLink
        to="/Login"
        style={({ isActive }) => ({
          textDecoration: "none",
          color: isActive ? "yellow" : "#555",
          fontWeight: isActive ? "bold" : "normal",
          fontSize: isActive ? "1.2rem" : "1rem",
          padding: "0.5rem 1rem",
          borderRadius: "5px",
          backgroundColor: isActive ? "#333" : "transparent",
        })}
      >
        login
      </NavLink>
    </div>
  );
};

export default Link;
