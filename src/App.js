import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import uuid from 'uuid/v4'
const optimizely = require("@optimizely/optimizely-sdk");

class App extends Component {
  state = {
    vartype: 'Loading....'
  }
  async componentDidMount() {
    const rp = require("request-promise");
    const DATAFILE_URL =
      "https://cdn.optimizely.com/datafiles/FjHvWertYc7d8CZ4Z4q5Uz.json";
    const datafile = await rp({ uri: DATAFILE_URL, json: true });
    console.log("Datafile:", datafile);
    var optimizelyClient = optimizely.createInstance({
      datafile
    });
    console.log(optimizelyClient)
    let userId = uuid()
    let variation = optimizelyClient.activate("cat_above_title", userId);
    console.log(`User ${userId} is in variation: ${variation}`);
    if (variation === "above_title_original") {
      // Execute code for "control" variation
      console.log('original')
      this.setState({vartype:'Category shows below product line'})
    } else if (variation === "above_title_variation") {
      // Execute code for "treatment" variation
      console.log('variation')
      this.setState({vartype:'Category shows above product line'})
    } else {
      // Execute code for users who don't qualify for the experiment
    }
    
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          This is the: {this.state.vartype} variation. Refresh the page to get a new A/B test result.
        </header>
      </div>
    );
  }
}

export default App;
