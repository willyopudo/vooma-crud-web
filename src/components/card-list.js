import React, { Component } from "react";
import CardDataService from "../services/card-service";
import { Link } from "react-router-dom";

export default class CardsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveCards = this.retrieveCards.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCard = this.setActiveCard.bind(this);
    this.removeAllCards = this.removeAllCards.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      cards: [],
      currentCard: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveCards();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveCards() {
    CardDataService.getAll()
      .then(response => {
        this.setState({
          cards: response.data.content
        });
        console.log(response.data.content);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveCards();
    this.setState({
      currentCard: null,
      currentIndex: -1
    });
  }

  setActiveCard(card, index) {
    this.setState({
      currentCard: card,
      currentIndex: index
    });
  }

  removeAllCards() {
    CardDataService.deleteAll()
      .then(response => {
        console.log(response.data.content);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    CardDataService.findByAlias(this.state.searchTitle)
      .then(response => {
        this.setState({
          cards: response.data.content
        });
        console.log(response.data.content);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, cards, currentCard, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Cards List</h4>

          <ul className="list-group">
            {cards &&
              cards.map((card, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveCard(card, index)}
                  key={index}
                >
                  { card.cardAlias}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllCards}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentCard ? (
            <div>
              <h4>Card</h4>
              <div>
                <label>
                  <strong>Card Alias:</strong>
                </label>{" "}
                {currentCard.cardAlias}
              </div>
              <div>
                <label>
                  <strong>Card Type:</strong>
                </label>{" "}
                { currentCard.cardType === 0 ? "Physical" : "Virtual"}
              </div>
              <div>
                <label>
                  <strong>Account Id:</strong>
                </label>{" "}
                {currentCard.accountId}
              </div>
              {/* <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentCard.published ? "Published" : "Pending"}
              </div> */}

              <Link
                to={"/cards/" + currentCard.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on an Card...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}