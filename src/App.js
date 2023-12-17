import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import React, {Component, useState, useEffect , useMemo} from "react";
import { useTable } from "react-table";
import "./Table.css";

import AccountsList from "./components/account-list";
import CardsList from "./components/card-list";
import AddAccount from "./components/add-account";
import Account from "./components/account";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Vooma CRUD App
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/"} className="nav-link">
                Accounts
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add-account"} className="nav-link">
                Add Account
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/cards"} className="nav-link">
                Cards
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<AccountsList/>} />
            <Route path="/cards" element={<CardsList/>} />
            <Route path="/add-account" element={<AddAccount/>} />
            <Route path="/accounts/:id" element={<Account/>} />
          </Routes>
        </div>
      </div>
    );
  }
}


export default App;
