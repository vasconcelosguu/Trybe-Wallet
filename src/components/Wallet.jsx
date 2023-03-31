import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Table from './Table';
import WalletForm from './WalletForm';

class Wallet extends Component {
  render() {
    return (
      <>
        <Header />
        <main>
          <Table />
          <WalletForm />
        </main>
      </>
    );
  }
}

export default connect()(Wallet);
