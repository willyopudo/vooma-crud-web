import React, { Component } from "react";
import AccountDataService from "../services/account-service";
import { Link } from "react-router-dom";

export default class AccountsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchIban = this.onChangeSearchIban.bind(this);
    this.retrieveAccounts = this.retrieveAccounts.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveAccount = this.setActiveAccount.bind(this);
    this.removeAllAccounts = this.removeAllAccounts.bind(this);
    this.searchIban = this.searchIban.bind(this);

    this.state = {
      accounts: [],
      currentAccount: null,
      currentIndex: -1,
      searchIban: ""
    };
  }

  componentDidMount() {
    this.retrieveAccounts();
  }

  onChangeSearchIban(e) {
    const searchIban = e.target.value;

    this.setState({
      searchIban: searchIban
    });
  }

  retrieveAccounts() {
    AccountDataService.getAll()
      .then(response => {
        this.setState({
          accounts: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveAccounts();
    this.setState({
      currentAccount: null,
      currentIndex: -1
    });
  }

  setActiveAccount(account, index) {
    this.setState({
      currentAccount: account,
      currentIndex: index
    });
  }

  removeAllAccounts() {
    AccountDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchIban() {
    AccountDataService.findByIban(this.state.searchIban)
      .then(response => {
        this.setState({
          accounts: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchIban, accounts, currentAccount, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Iban"
              value={searchIban}
              onChange={this.onChangeSearchIban}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchIban}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Accounts List</h4>

          <ul className="list-group">
            {accounts &&
              accounts.map((account, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveAccount(account, index)}
                  key={index}
                >
                  { account.iban}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllAccounts}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentAccount ? (
            <div>
              <h4>Account</h4>
              <div>
                <label>
                  <strong>IBAN:</strong>
                </label>{" "}
                {currentAccount.iban}
              </div>
              <div>
                <label>
                  <strong>Bank Code:</strong>
                </label>{" "}
                {currentAccount.bankCode}
              </div>
              <div>
                <label>
                  <strong>Customer Id:</strong>
                </label>{" "}
                {currentAccount.customerId}
              </div>
              {/* <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentAccount.published ? "Published" : "Pending"}
              </div> */}

              <Link
                to={"/accounts/" + currentAccount.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on an account...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}