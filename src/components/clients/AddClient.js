import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

class AddClient extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: ''
  };

  onSubmit = e => {
    e.preventDefault();

    const newClient = this.state;

    const { firestore, history } = this.props;

    if (newClient.balance === '') {
      newClient.balance = 0;
    }

    firestore.add({ collection: 'clients' }, newClient)
      .then(() => history.push("/"));
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { disableBalanceOnAdd } = this.props.settings;

    const { firstName, lastName, email, phone, balance } = this.state;

    return (
      <div>
        <div className="row">
          <div className="col-md-5">
            <Link to="/" className="btn btn-link">
              <i className="fa fa-arrow-circle-left"></i>{' '}
              Volver
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-header">Agregar Cliente</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="firstName">Primer nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  id="firstName"
                  minLength="2"
                  required
                  onChange={this.onChange}
                  value={firstName}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Apellido</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  id="lastName"
                  minLength="2"
                  required
                  onChange={this.onChange}
                  value={lastName}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  onChange={this.onChange}
                  value={email}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Numero de telefono</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  id="phone"
                  onChange={this.onChange}
                  value={phone}
                  minLength="10"
                  required
                  onChange={this.onChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="balance">Balance</label>
                <input
                  type="text"
                  className="form-control"
                  name="balance"
                  id="balance"
                  onChange={this.onChange}
                  value={balance}
                  onChange={this.onChange}
                  disabled={disableBalanceOnAdd}
                />
              </div>

              <input type="submit" value="Agregar" className="btn btn-primary btn-block" />
            </form>
          </div>
        </div>
      </div>
    )
  }
}

AddClient.propTypes = {
  firestore: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(),
  connect((state, props) => ({
    settings: state.settings
  }))
)(AddClient);