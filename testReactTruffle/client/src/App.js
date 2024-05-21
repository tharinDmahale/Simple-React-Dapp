import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
//import truffleContract from "truffle-contract";

import "./App.css";

class App extends Component {

  state = { storageValue: "", web3: null, accounts: null, contract: null, newValue: "" };

  componentDidMount = async () => {

    try {

      // Binding for scope
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });

    } catch (error) {

      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );

      console.error(error);
    }
  };

  handleChange(event) {

    // Set the state newValue with input
    this.setState({ newValue: event.target.value });
  }

  async handleSubmit(event) {

    event.preventDefault();

    // Initialize account and contract variables from state
    const { accounts, contract } = this.state;

    // Calling set method from the smart contract
    await contract.methods.set(this.state.newValue).send({ from: accounts[0] });

    // Calling get method from the smart contract and storing it in a variable
    const response = await contract.methods.get().call();

    // Log variable
    console.log(response);

    // Set the state storageValue with the variable
    this.setState({ storageValue: response });
  }

  render() {

    if (!this.state.web3) {

      return <div>Loading Web3, accounts, and contract...</div>;
    }
    
    return (
      <div className="App">
        <h1>Welcome to this dapp!</h1>
        <div>Tharin likes { this.state.storageValue }</div>
        <form onSubmit={ this.handleSubmit }>
          <input type="text" value={ this.state.newValue } onChange={ this.handleChange.bind(this) }/>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

export default App;
