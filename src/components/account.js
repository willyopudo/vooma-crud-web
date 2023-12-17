import React, { Component } from "react";
import AccountDataService from "../services/account-service";
import { withRouter } from '../common/with-router';

class Account extends Component {
  constructor(props) {
    super(props);
    this.onChangeIban = this.onChangeIban.bind(this);
    this.onChangeBankCode = this.onChangeBankCode.bind(this);
    this.onChangeCustomerId = this.onChangeCustomerId.bind(this);
    this.getAccount = this.getAccount.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateAccount = this.updateAccount.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);

    this.state = {
      currentAccount: {
        id: null,
        iban: "",
        bankCode: "",
        customerId: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getAccount(this.props.router.params.id);
  }

  onChangeIban(e) {
    const iban = e.target.value;

    this.setState(function(prevState) {
      return {
        currentAccount: {
          ...prevState.currentAccount,
          iban: iban
        }
      };
    });
  }

  onChangeBankCode(e) {
    const banCode = e.target.value;
    
    this.setState(prevState => ({
      currentAccount: {
        ...prevState.currentAccount,
        banCode: banCode
      }
    }));
  }

  onChangeCustomerId(e) {
    const customerId = e.target.value;
    
    this.setState(prevState => ({
      currentAccount: {
        ...prevState.currentAccount,
        customerId: customerId
      }
    }));
  }

  getAccount(id) {
    AccountDataService.get(id)
      .then(response => {
        this.setState({
          currentAccount: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentAccount.id,
      iban: this.state.currentAccount.iban,
      banCode: this.state.currentAccount.bankCode,
      customerId: this.state.currentAccount.customerId
    };

    AccountDataService.update(this.state.currentAccount.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentAccount: {
            ...prevState.currentAccount,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateAccount() {
    AccountDataService.update(
      this.state.currentAccount.id,
      this.state.currentAccount
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Account was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteAccount() {    
    AccountDataService.delete(this.state.currentAccount.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/accounts');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentAccount } = this.state;

    return (
      <div>
        {currentAccount ? (
          <div className="edit-form">
            <h4>Account</h4>
            <form>
              <div className="form-group">
                <label htmlFor="iban">IBAN</label>
                <input
                  type="text"
                  className="form-control"
                  id="iban"
                  value={currentAccount.iban}
                  onChange={this.onChangeIban}
                />
              </div>
              <div className="form-group">
                <label htmlFor="bankCode">Bank Code</label>
                <input
                  type="text"
                  className="form-control"
                  id="bankCode"
                  value={currentAccount.bankCode}
                  onChange={this.onChangeBankCode}
                />
              </div>

              <div className="form-group">
                <label htmlFor="customerId">Customer Id</label>
                <input
                  type="text"
                  className="form-control"
                  id="customerId"
                  value={currentAccount.customerId}
                  onChange={this.onChangeCustomerId}
                />
              </div>

              
            </form>

           
            <button
            className="badge badge-primary mr-2"
            onClick={() => this.updatePublished(true)}
            >
            Publish
            </button>
            

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteAccount}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateAccount}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on an Account...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Account);