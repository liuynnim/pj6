import React, { useState, useEffect } from "react";
import { 
  Card,
  CardContent,
  CardHeader,
  Grid,
  ImageList,
  ImageListItem,
  Typography,
  CardMedia, 
  Button,
  Paper,
  List,
  ListItem, 
} from "@mui/material";
import { useParams, Link, Outlet } from "react-router-dom";

import axios from "axios";

function UserPhotos({currentUser}) {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/photos/${userId}`,{ withCredentials: true });
        setPhotos(response.data);
      } catch (error) {
        console.log('Error fetching photos:', error);
      }
    };
    fetchPhotos();
  }, [userId]);

  const convertDateTimetoString = (date_time) => {
    const date = new Date(date_time);
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const seconds = ("0" + date.getSeconds()).slice(-2);
    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
  };
  
  return (
    <>
      <ImageList cols={1} style={{ width: "100%", height: "100%" }}>
        {photos?.map((item, index) => (
          <ImageListItem key={item._id}>
            <Card style={{ border: "1px solid black" }}>
              <CardHeader title={"Time: " + convertDateTimetoString(item.date_time)} />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item sm={6}>
                    <CardMedia
                      component="img"
                      image={`http://localhost:8080/images/${item.file_name}`}
                      alt={item.file_name}
                    />
                  </Grid>
                  <Grid item sm={6}>
                    <Paper style={{ padding: "16px", marginTop: "16px", maxHeight: "200px", overflowY: "auto" }}>
                      <Typography variant="h6">Comments</Typography>
                      <List>
                        {item.comments.map(comment => (
                          <ListItem key={comment._id}>
                            <Typography>
                              <strong>{comment.user.first_name} {comment.user.last_name}:</strong> {comment.comment}
                            </Typography>
                          </ListItem>
                        ))}
                      </List>
                    </Paper>
                    <Outlet />
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ marginTop: "16px" }}
                      component={Link}
                      to = {`/photos/${userId}/commentsOfPhoto/${item._id}`}
                    >
                      New Comment
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
}

export default UserPhotos;