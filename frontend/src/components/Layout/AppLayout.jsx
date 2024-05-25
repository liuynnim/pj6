import React, { useState } from "react";
import { Grid, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TopBar from "../TopBar";
import UserDetail from "../UserDetail";
import UserList from "../UserList";
import UserPhotos from "../UserPhotos";
import LoginRegister from "../Account/LoginRegister";
import AddComment from "../UserPhotos/AddComment";
import AddPhoto from "../UserPhotos/AddPhoto";

function AppLayout() {
    const [user, setUser] = useState(null);

    return(
        <>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TopBar user={user} onLogin={setUser}/>
            </Grid>
            <div className="main-topbar-buffer" />
            {user && (<Grid item sm={3}>
              <Paper className="main-grid-item">
                <UserList />
              </Paper>
            </Grid>)}
            {user && (
            <Grid item sm={9}>
              <Paper className="main-grid-item">
                <Routes>
                  <Route
                      path="/users/:userId"
                      element = {<UserDetail />}
                  />
                  <Route
                      path="/photos/:userId"
                      element = {<UserPhotos/>}
                  />
                  <Route
                      path="/photos/:userId/commentsOfPhoto/:photoId"
                      element = {<AddComment />}
                  />
                  <Route
                      path="/photos/:userId/new"
                      element = {<AddPhoto />}
                  />
                </Routes>
              </Paper>
            </Grid>)}
            {!user && (
            <Grid item xs={12}>
              <Paper className="main-grid-item">
                <Routes>
                  <Route path="/admin/login" element={<LoginRegister onLogin={setUser} />} />
                </Routes>
              </Paper>
            </Grid>)}
          </Grid>
        </div>
        </>
    )
}

export default AppLayout;
