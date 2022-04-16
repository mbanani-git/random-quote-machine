import React, { useState } from "react";
import { quotes } from "./data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";

const quoteLeft = <FontAwesomeIcon icon={faQuoteLeft} />;
const quoteRight = <FontAwesomeIcon icon={faQuoteRight} />;
const l = quotes.length;

class RandomQuote extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let r = this.props.random;
    const rColor = { color: "#" + this.props.randomColor };
    return (
      <React.Fragment>
        {quotes.map((item) => {
          const { id, quote, author } = item;
          if (id === r) {
            return (
              <div key={id}>
                <h4 style={rColor} id="text" quote={this.props.quote}>
                  <i>{quoteLeft} </i>
                  {quote}
                  <i> {quoteRight} </i>
                </h4>
                <p className="text-end" id="author">
                  - {author}
                </p>
              </div>
            );
          }
        })}
      </React.Fragment>
    );
  }
}

export class RandomQuoteMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      random: 1,
      randomColor: "b0adc0",
    };

    this.changeQuote = this.changeQuote.bind(this);
  }
  changeQuote() {
    this.setState({
      random: Math.floor(Math.random() * l),
      randomColor: (0x1000000 + Math.random() * 0xffffff)
        .toString(16)
        .substr(1, 6),
    });
  }

  render() {
    //console.log("2: ", this.state.random);
    const rColor = { color: "#" + this.state.randomColor };
    const rBackgroundColor = { backgroundColor: "#" + this.state.randomColor };
    const tweetContent =
      "https://twitter.com/intent/tweet?text=" +
      quotes[this.state.random].quote +
      " -" +
      quotes[this.state.random].author;
    const facebookContent =
      "https://www.facebook.com/sharer/sharer.php?text=" +
      quotes[this.state.random].quote +
      " -" +
      quotes[this.state.random].author;
    return (
      <div
        style={rBackgroundColor}
        className="container mw-100 d-flex justify-content-center flex-column "
      >
        <div
          id="quote-box"
          className="row d-flex flex-row box d-flex justify-content-center align-self-center"
        >
          <div className="row">
            <RandomQuote
              random={this.state.random}
              randomColor={this.state.randomColor}
            />
          </div>
          <div className="row">
            <div className="col-6">
              <a id="facebook-quote" href={facebookContent} target="_target">
                <i style={rColor} className="bi bi-facebook fa-2x mx-1"></i>
              </a>
              <a id="tweet-quote" href={tweetContent} target="_target">
                <i style={rColor} className="bi bi-twitter fa-2x mx-1"></i>
              </a>
            </div>
            <div className="col-6 justify-content-end d-flex">
              <button
                id="new-quote"
                style={rBackgroundColor}
                className="btn btn-primary rounded-pill "
                onClick={this.changeQuote}
              >
                New quote
              </button>
            </div>
          </div>
        </div>
        <div className="row signature text-center my-2 text-light">
          <p>By mbanani @mbdev</p>
          <p>Made with ReactJs and Bootstrap.</p>
        </div>
      </div>
    );
  }
}
