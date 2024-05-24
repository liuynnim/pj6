import * as React from "react";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemText } from "@mui/material";
import "./styles.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';

/**
 * Define UserList, a React componment of CS142 project #5
 * Generate a list of items from users' names,
 * and link to user's detail when clicked
 */
function UserList() {
  const [users, setUsers] = useState([]);

  useEffect( () => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/users',{ withCredentials: true });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <List component="nav">
      {users.length > 0 ? 
      (
        users.map((user) => (
          <ListItem to={`/users/${user._id}`} component={Link} key={user._id} divider>
            <ListItemText primary={`${user.first_name} ${user.last_name}`} />
          </ListItem>
        ))
      ) : 
      (
        <ListItem>Loading...</ListItem>
      )}
    </List>
  );
};

export default UserList;