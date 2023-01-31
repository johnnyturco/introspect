import React, { useContext, useState } from 'react';
import { UserProvider } from './context/UserProvider';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login'
import Timeline from './pages/Timeline'
import NavBar from './components/NavBar'
import './App.css';

function App() {
  return (
    <UserProvider>
      <NavBar />
      <Switch>
        <Route path="/timeline">
          <Timeline />
        </Route>
        <Route exact path="/">
          <Login />
        </Route>
      </Switch>
    </UserProvider>
  );
}

export default App;
