import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

/**
 * Define TopBar, a React component of Project 4.
 */

function TopBar ({user, onLogin}) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8080/admin/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (response.ok) {
        onLogin(null);
        navigate('/admin/login'); 
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('An error occurred during logout:', error);
    }
  };

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Typography variant="h5" color="inherit">
          PHOTOSHARING
        </Typography>
        {!user && (
          <Button color="inherit" component={Link} to="/admin/login">
            Login
          </Button>
        )}
        {user && (
          <Typography variant="h5" color="inherit" style={{marginLeft: 50}}>
            Hi! {user.first_name}
          </Typography>
        )}
        {user && (
            <Button variant="contained" onClick={handleLogout} >Logout</Button>
        )}
        {user && (
          <Button variant="contained"  color="inherit" component={Link} to={`/photos/${user.userId}/new`}>
            Add Photo
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
