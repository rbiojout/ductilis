// cf https://alligator.io/react/react-autocomplete/
// look https://github.com/ericgio/react-bootstrap-typeahead

import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";
import {Typeahead} from 'react-bootstrap-typeahead';


class Autocomplete extends Component {
    static propTypes = {
      suggestions: PropTypes.instanceOf(Array)
    };
  
    static defaultProps = {
      suggestions: []
    };
  
    constructor(props) {
      super(props);
  
      this.state = {
        // The active selection's index
        activeSuggestion: 0,
        // The suggestions that match the user's input
        filteredSuggestions: [],
        // Whether or not the suggestion list is shown
        showSuggestions: false,
        // What the user has entered
        userInput: ""
      };
    }
  
    /*
    // Event fired when the input value is changed
    onChange = e => {
      const { suggestions } = this.props;
      const userInput = e.currentTarget.value;
  
      // Filter our suggestions that don't contain the user's input
      const filteredSuggestions = suggestions.filter(
        suggestion =>
          suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      );
  
      // Update the user input and filtered suggestions, reset the active
      // suggestion and make sure the suggestions are shown
      this.setState({
        activeSuggestion: 0,
        filteredSuggestions,
        showSuggestions: true,
        userInput: e.currentTarget.value
      });
    };
  
    // Event fired when the user clicks on a suggestion
    onClick = e => {
      // Update the user input and reset the rest of the state
      this.setState({
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: e.currentTarget.innerText
      });
    };
  
    // Event fired when the user presses a key down
    onKeyDown = e => {
      const { activeSuggestion, filteredSuggestions } = this.state;
  
      // User pressed the enter key, update the input and close the
      // suggestions
      if (e.keyCode === 13) {
        this.setState({
          activeSuggestion: 0,
          showSuggestions: false,
          userInput: filteredSuggestions[activeSuggestion]
        });
      }
      // User pressed the up arrow, decrement the index
      else if (e.keyCode === 38) {
        if (activeSuggestion === 0) {
          return;
        }
  
        this.setState({ activeSuggestion: activeSuggestion - 1 });
      }
      // User pressed the down arrow, increment the index
      else if (e.keyCode === 40) {
        if (activeSuggestion - 1 === filteredSuggestions.length) {
          return;
        }
  
        this.setState({ activeSuggestion: activeSuggestion + 1 });
      }
    };
  */
    render() {
    
  
      return (
        <Fragment>
          <h1>Choose</h1>
          <Typeahead
            labelKey="name"
            multiple={false}
            options={this.props.options}
            placeholder="Choose a state..."
          />
        </Fragment>
      );

    }
  }

export default Autocomplete;