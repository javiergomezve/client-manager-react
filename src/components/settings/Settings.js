import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { setAllowRegistration, setDisableBalanceOnAdd, setDisableBalanceOnEdit } from "../../actions/settingsAction";

class Settings extends Component {

  allowRegistrationChange = () => {
    const { setAllowRegistration } = this.props;
    setAllowRegistration();
  };

  disableBalanceOnAddChange = () => {
    const { setDisableBalanceOnAdd } = this.props;
    setDisableBalanceOnAdd();
  };

  disableBalanceOnEditChange = () => {
    const { setDisableBalanceOnEdit } = this.props;
    setDisableBalanceOnEdit();
  };

  render() {
    const {
      disableBalanceOnAdd,
      disableBalanceOnEdit,
      allowRegistration
    } = this.props.settings;

    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fa fa-arrow-circle-left"></i>{' '}
              Volver al escritorio
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-header">Editar configuración</div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label>Permitir registro{' '}
                  <input type="checkbox"
                    name="allowRegistration"
                    checked={!!allowRegistration}
                    onChange={this.allowRegistrationChange}
                  />
                </label>
              </div>

              <div className="form-group">
                <label>Deshabilitar edición de balance en nuevo{' '}
                  <input type="checkbox"
                    name="disableBalanceOnAdd"
                    checked={!!disableBalanceOnAdd}
                    onChange={this.disableBalanceOnAddChange}
                  />
                </label>
              </div>

              <div className="form-group">
                <label>Deshabilitar edición de balance en edición{' '}
                  <input type="checkbox"
                    name="disableBalanceOnEdit"
                    checked={!!disableBalanceOnEdit}
                    onChange={this.disableBalanceOnEditChange}
                  />
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  setDisableBalanceOnAdd: PropTypes.func.isRequired,
  setDisableBalanceOnEdit: PropTypes.func.isRequired,
  setAllowRegistration: PropTypes.func.isRequired,
};

export default connect((state, props) => ({
  auth: state.firebase.auth,
  settings: state.settings
}), {
    setAllowRegistration, setDisableBalanceOnAdd, setDisableBalanceOnEdit
  })(Settings);