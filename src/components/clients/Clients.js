import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Clients extends Component {
  render() {
    const clients = [{
      id: 123,
      firstName: 'Alexander',
      lastName: 'Melean',
      email: 'alexandermeleandev@gmail.com',
      phone: '123-456-6789',
      balance: '30'
    }];

    if (clients) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <h2>
                {' '}<div className="fa fa-users"></div> Clientes{' '}
              </h2>
            </div>
            <div className="col-md-6" />
          </div>

          <table className="table table-stripe">
            <thead className="thead-inverse">
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Saldo</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.id}>
                  <td>{client.firstName} {client.lastName}</td>
                  <td>{client.email}</td>
                  <td>${parseFloat(client.balance).toFixed(2)}</td>
                  <td>
                    <Link to={`/client/${client.id}`} className="btn btn-secondary">
                      <i className="fa fa-arrow-circle-right"></i>
                      Detalles
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <h1>Cargando...</h1>;
    }
  }
}

export default Clients;