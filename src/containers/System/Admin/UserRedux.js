import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllCodeService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgURL: "",
      isOpen: false,
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();

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

    if (prevProps.positionRedux !== this.props.positionRedux) {
      this.setState({
        positionArr: this.props.positionRedux,
      });
    }

    if (prevProps.roleRedux !== this.props.roleRedux) {
      this.setState({
        roleArr: this.props.roleRedux,
      });
    }
  }

  handleOnChangeImage = (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
      });
    }
  };

  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;

    this.setState({
      isOpen: true,
    });
  };

  render() {
    let genders = this.state.genderArr;
    let positions = this.state.positionArr;
    let roles = this.state.roleArr;
    let language = this.props.language;
    let isGetGenders = this.props.isGetGenders;

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
                      {positions &&
                        positions.length > 0 &&
                        positions.map((item, index) => {
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
                      <FormattedMessage id="manage-user.role" />
                    </label>
                    <select className="form-control">
                      {roles &&
                        roles.length > 0 &&
                        roles.map((item, index) => {
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
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" for="form6Example4">
                    <FormattedMessage id="manage-user.image" />
                  </label>
                  <div className="preview-img-container">
                    <input
                      id="previewImg"
                      type="file"
                      hidden
                      onChange={(event) => this.handleOnChangeImage(event)}
                    ></input>
                    <label className="label-upload" htmlFor="previewImg">
                      Tải ảnh<i className="fas fa-upload"></i>
                    </label>
                    <div
                      className="preview-img"
                      style={{
                        backgroundImage: `url(${this.state.previewImgURL})`,
                      }}
                      onClick={() => this.openPreviewImage()}
                    ></div>
                  </div>
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
        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    positionRedux: state.admin.positions,
    roleRedux: state.admin.roles,
    isLoadingGender: state.admin.isLoadingGender,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
