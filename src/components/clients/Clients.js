import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import Spinner from '../layout/Spinner';

class Clients extends Component {

  state = {
    totalOwed: null
  };

  static getDerivedStateFromProps(props, state) {
    const { clients } = props;

    if (clients) {
      const total = clients.reduce((total, client) => {
        return total + parseFloat(client.balance.toString());
      }, 0);

      return { totalOwed: total };
    }

    return null;
  }

  render() {
    const { clients } = this.props;
    const { totalOwed } = this.state

    if (clients) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <h2>
                {' '}<div className="fa fa-users"></div> Clientes{' '}
              </h2>
            </div>
            <div className="col-md-6">
              <h5 className="text-right text-secondary">
                Balance Total{' '}
                <span className="text-primary">
                  ${parseFloat(totalOwed).toFixed(2)}
                </span>
              </h5>
            </div>
          </div>

          <table className="table table-stripe">
            <thead className="thead-inverse">
              <tr>
                <th>Nombre</th>
                <th className="d-none d-sm-block">Email</th>
                <th>Balance</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.id}>
                  <td>{client.firstName} {client.lastName}</td>
                  <td className="d-none d-sm-block">{client.email}</td>
                  <td>${parseFloat(client.balance).toFixed(2)}</td>
                  <td>
                    <Link to={`/client/${client.id}`} className="btn btn-secondary">
                      <i className="fa fa-arrow-circle-right"></i>{' '}
                      <span className="d-none d-sm-block">Detalles</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

Clients.propTypes = {
  firestore: PropTypes.object.isRequired,
  clients: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: 'clients' }]),
  connect((state, props) => ({
    clients: state.firestore.ordered.clients
  }))
)(Clients);