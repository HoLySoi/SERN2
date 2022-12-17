import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="user-redux-container">
        <div className="title">
          <FormattedMessage id="manage-user.add" />
        </div>
        <div className="user-redux-body">
          <div className="container ">
            <div className="row">
              <form>
                <div className="row mb-4">
                  <div className="col">
                    <div className="form-outline">
                      <label className="form-label" for="form6Example1">
                        <FormattedMessage id="manage-user.email" />
                      </label>
                      <input
                        type="text"
                        id="form6Example1"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-outline">
                      <label className="form-label" for="form6Example2">
                        <FormattedMessage id="manage-user.password" />
                      </label>
                      <input
                        type="password"
                        id="form6Example2"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col">
                    <div className="form-outline">
                      <label className="form-label" for="form6Example1">
                        <FormattedMessage id="manage-user.first-name" />
                      </label>
                      <input
                        type="text"
                        id="form6Example1"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-outline">
                      <label className="form-label" for="form6Example2">
                        <FormattedMessage id="manage-user.last-name" />
                      </label>
                      <input
                        type="text"
                        id="form6Example2"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label" for="form6Example3">
                    <FormattedMessage id="manage-user.phone-number" />
                  </label>
                  <input
                    type="text"
                    id="form6Example3"
                    className="form-control"
                  />
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label" for="form6Example4">
                    <FormattedMessage id="manage-user.address" />
                  </label>
                  <input
                    type="text"
                    id="form6Example4"
                    className="form-control"
                  />
                </div>
                <div className="col-4 mb-4">
                  <label className="form-label" for="form6Example4">
                    <FormattedMessage id="manage-user.gender" />
                  </label>
                  <select className="form-control">
                    <option selected>Choose...</option>
                    <option>...</option>
                  </select>
                </div>
                <div className="col-4 mb-4">
                  <label className="form-label" for="form6Example4">
                    <FormattedMessage id="manage-user.position" />
                  </label>
                  <select className="form-control">
                    <option selected>Choose...</option>
                    <option>...</option>
                  </select>
                </div>
                <div className="col-4 mb-4">
                  <label className="form-label" for="form6Example4">
                    <FormattedMessage id="manage-user.role" />
                  </label>
                  <select className="form-control">
                    <option selected>Choose...</option>
                    <option>...</option>
                  </select>
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label" for="form6Example4">
                    <FormattedMessage id="manage-user.image" />
                  </label>
                  <input
                    type="text"
                    id="form6Example4"
                    className="form-control"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block mb-4"
                >
                  <FormattedMessage id="manage-user.save" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
