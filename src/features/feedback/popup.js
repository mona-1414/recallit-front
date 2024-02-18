import React, { Component } from "react";
import { recordFeedback } from "../../apis/product";
import "./styles.css";

export default class PopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: "",
      name: "",
      email: "",
      comment: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      [event.target.email]: event.target.value,
      [event.target.comment]: event.target.value,
      [event.target.rating]: event.target.rating
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (
      typeof this.state.rating !== "undefined" &&
      typeof this.state.name !== "undefined" &&
      typeof this.state.email !== "undefined" &&
      typeof this.state.comment !== "undefined"
    ) {
       recordFeedback({
         rating: this.state.rating,
         name: this.state.name,
         email: this.state.email,
         comment: this.state.comment,
       });
      this.setState({
        [event.target.rating]: undefined,
        [event.target.name]: undefined,
        [event.target.email]: undefined,
        [event.target.comment]: undefined,
      });
      this.props.setDisplayForm(false);

      this.props.setDisplayThanks(true);
      this.props.setDisplayProductsResult(false);
      this.props.setDisplayListOfProducts(false);

      setTimeout(() => {
        this.props.setDisplayThanks(false);
        this.props.setDisplayProductsResult(true);
      }, 3000);
    }
  };
  
  componentWillUnmount() {
    clearTimeout();
  }


  render() {
    const { name, email, comment } = this.state;
    return (
      <div className="feedbackForm">
        <form name="feedbackForm" onSubmit={this.handleSubmit} method="POST">
          <ul className="feedback-form">
            <li>
              <label>
                Do you have any feedback for us?
                <span className="required">*</span>
              </label>
            </li>
            <li>
              <div className="rate">
                <input
                  type="radio"
                  id="star5"
                  name="rating"
                  value="5"
                  onChange={this.handleChange}
                />
                <label for="star5" title="text">
                  5 stars
                </label>
                <input
                  type="radio"
                  id="star4"
                  name="rating"
                  value="4"
                  onChange={this.handleChange}
                />
                <label for="star4" title="text">
                  4 stars
                </label>
                <input
                  type="radio"
                  id="star3"
                  name="rating"
                  value="3"
                  onChange={this.handleChange}
                />
                <label for="star3" title="text">
                  3 stars
                </label>
                <input
                  type="radio"
                  id="star2"
                  name="rating"
                  value="2"
                  onChange={this.handleChange}
                />
                <label for="star2" title="text">
                  2 stars
                </label>
                <input
                  type="radio"
                  id="star1"
                  name="rating"
                  value="1"
                  onChange={this.handleChange}
                />
                <label for="star1" title="text">
                  1 star
                </label>
              </div>
            </li>
            <br />
            <br />
            <li>
              <label>
                Name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={name}
                className="field-divided"
                placeholder="Your Name"
                onChange={this.handleChange}
                required
              />{" "}
            </li>
            <li>
              <label>
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={email}
                className="field-long"
                placeholder="Your Email"
                onChange={this.handleChange}
                required
              />
            </li>
            <li>
              <label>
                Your Message <span className="required">*</span>
              </label>
              <textarea
                name="comment"
                id="field5"
                value={comment}
                className="field-long field-textarea"
                onChange={this.handleChange}
                required
              ></textarea>
            </li>
            <li>
              <input type="submit" value="Submit" />
            </li>
          </ul>
        </form>
      </div>
    );
  }
}
