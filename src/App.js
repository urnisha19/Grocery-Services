import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./Component/HomePage/Home";
import Login from "./Component/LoginPage/Login";
import NotMatch from "./Component/NotMatch/NotMatch";
import PrivateRoute from "./Component/PrivateRoute/PrivateRoute";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Orders from "./Component/OrdersPage/Orders";
import CheckOut from "./Component/CheckOutPage/CheckOut";
import Admin from "./Component/AdminPage/Admin";

export const UserContext = createContext();
const App = () => {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <PrivateRoute path="/checkout/product/:productId">
            <CheckOut />
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/ordersPage">
            <Orders />
          </PrivateRoute>
          <PrivateRoute path="/adminPage">
            <Admin />
          </PrivateRoute>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*">
            <NotMatch />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;