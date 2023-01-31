import React, { useContext, useState } from 'react';
import { UserProvider } from './context/UserProvider';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login'
import NewPost from './pages/NewPost'
import Timeline from './pages/Timeline'
import Tags from './pages/Tags'
import SignUp from './pages/SignUp'
import NavBar from './components/NavBar'
import './App.css';

function App() {
  return (
    <UserProvider>
      <NavBar />
      <Switch>
        <Route path="/new">
          <NewPost />
        </Route>
        <Route path="/timeline">
          <Timeline />
        </Route>
        <Route path="/tags">
          <Tags />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        {/* <Route path="/trends">
          <Trends />
        </Route> */}
        <Route exact path="/">
          <Login />
        </Route>
      </Switch>
    </UserProvider>
  );
}

export default App;
