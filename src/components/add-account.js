import React, { Component } from "react";
import AccountDataService from "../services/account-service";

export default class AddAccount extends Component {
  constructor(props) {
    super(props);
    this.onChangeIban = this.onChangeIban.bind(this);
    this.onChangebankCode = this.onChangebankCode.bind(this);
    this.onChangecustomerId = this.onChangecustomerId.bind(this);
    this.saveAccount = this.saveAccount.bind(this);
    this.newAccount = this.newAccount.bind(this);

    this.state = {
      id: null,
      iban: "",
      bankCode: "", 
      customerId: "",

      submitted: false
    };
  }

  onChangeIban(e) {
    this.setState({
      iban: e.target.value
    });
  }

  onChangebankCode(e) {
    this.setState({
      bankCode: e.target.value
    });
  }

  onChangecustomerId(e) {
    this.setState({
      customerId: e.target.value
    });
  }

  saveAccount() {
    var data = {
      iban: this.state.iban,
      bankCode: this.state.bankCode,
      customerId: this.state.customerId
    };

    AccountDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          iban: response.data.iban,
          bankCode: response.data.bankCode,
          customerId: response.data.customerId,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newAccount() {
    this.setState({
      id: null,
      iban: "",
      bankCode: "",
      customerId: "",
      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newAccount}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="iban">IBAN</label>
              <input
                type="text"
                className="form-control"
                id="iban"
                required
                value={this.state.iban}
                onChange={this.onChangeIban}
                name="iban"
              />
            </div>

            <div className="form-group">
              <label htmlFor="banCode">Bank Code</label>
              <input
                type="text"
                className="form-control"
                id="bankCode"
                required
                value={this.state.bankCode}
                onChange={this.onChangebankCode}
                name="bankCode"
              />
            </div>
            <div className="form-group">
              <label htmlFor="customerId">Customer ID</label>
              <input
                type="text"
                className="form-control"
                id="customerId"
                required
                value={this.state.customerId}
                onChange={this.onChangecustomerId}
                name="customerId"
              />
            </div>
            <div className="form-group m-2">
                <button onClick={this.saveAccount} className="btn btn-success">
                Submit
                </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}