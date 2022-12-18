import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllCodeService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = { genderArr: [] };
  }

  async componentDidMount() {
    this.props.getGenderStart();

    // try {
    //   let res = await getAllCodeService("gender");
    //   if (res && res.errCode === 0) {
    //     this.setState({
    //       genderArr: res.data,
    //     });
    //   }
    //   // console.log(res);
    // } catch (error) {
    //   console.log(error);
    // }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      this.setState({
        genderArr: this.props.genderRedux,
      });
    }
  }

  render() {
    let genders = this.state.genderArr;
    let language = this.props.language;
    return (
      <div className="user-redux-container">
        <div className="title">
          <FormattedMessage id="manage-user.add" />
        </div>
        <div className="user-redux-body">
          <div className="container ">
            <div className="">
              <form>
                <div className="row mt-4 mb-4">
                  <div className="form-group col-md-6">
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
                <div className="col-12 d-inline-flex">
                  {" "}
                  <div className="col-3 mb-4">
                    <label className="form-label" for="form6Example4">
                      <FormattedMessage id="manage-user.gender" />
                    </label>
                    <select className="form-control">
                      {genders &&
                        genders.length > 0 &&
                        genders.map((item, index) => {
                          return (
                            <option key={index}>
                              {language === LANGUAGES.VI
                                ? item.valueVi
                                : item.valueEn}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="col-3 mb-4">
                    <label className="form-label" for="form6Example4">
                      <FormattedMessage id="manage-user.position" />
                    </label>
                    <select className="form-control">
                      <option selected>Choose...</option>
                      <option>...</option>
                    </select>
                  </div>
                  <div className="col-3 mb-4">
                    <label className="form-label" for="form6Example4">
                      <FormattedMessage id="manage-user.role" />
                    </label>
                    <select className="form-control">
                      <option selected>Choose...</option>
                      <option>...</option>
                    </select>
                  </div>
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
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
