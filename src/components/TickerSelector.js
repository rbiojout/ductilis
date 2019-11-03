import React, { Component } from 'react';
import PropTypes from "prop-types";

import { FormGroup } from 'reactstrap';
import {Typeahead, Menu, MenuItem} from 'react-bootstrap-typeahead';

class TickerSelector extends Component {
    render() {
      const { selectedTicker, onChange, options } = this.props
      
      var selected = options.find(function(element) {
        return element['symbol'] === selectedTicker;
      });
      console.log("props TickerSelector", this.props)
      return (
        <FormGroup>
          <Typeahead
            labelKey="symbol"
            multiple={false}
            options={options}
            filterBy={['symbol','company']}
            renderMenu={(results, menuProps) => (
              <Menu {...menuProps}>
                {results.map((result, index) => (
                  <MenuItem key={index} option={result} position={index}>
                    {result.symbol}-{result.company}
                  </MenuItem>
                ))}
              </Menu>
            )}
            placeholder="Choose a ticker..."
            onChange={selectedItems => onChange(selectedItems[0])} 
            selected = {(selectedTicker)?[selectedTicker]:[]}
          />
        </FormGroup>
        
      )
    }
  }


TickerSelector.propTypes = {
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};

export default TickerSelector;