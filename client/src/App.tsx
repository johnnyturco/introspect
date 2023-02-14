import React from "react";
import { UserProvider } from "./context/UserProvider";
import { PostsProvider } from "./context/PostsProvider";
import { TagsProvider } from "./context/TagsProvider";
import { Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Timeline from "./pages/Timeline";
import Tags from "./pages/Tags";
import Trends from "./pages/Trends";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <UserProvider>
      <PostsProvider>
        <TagsProvider>
          <NavBar />
          <Switch>
            <ProtectedRoute path="/timeline">
              <Timeline />
            </ProtectedRoute>
            <ProtectedRoute path="/tags">
              <Tags />
            </ProtectedRoute>
            <ProtectedRoute path="/trends">
              <Trends />
            </ProtectedRoute>
            <ProtectedRoute path="/profile">
              <Profile />
            </ProtectedRoute>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route exact path="/">
              <Login />
            </Route>
          </Switch>
        </TagsProvider>
      </PostsProvider>
    </UserProvider>
  );
}

export default App;
