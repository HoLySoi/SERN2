import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllCodeService } from "../../../services/userService";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableManageUser from "./TableManageUser";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgURL: "",
      isOpen: false,

      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",

      action: "",
      userEditId: "",
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
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
      });
    }

    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRoles = this.props.roleRedux;

      this.setState({
        roleArr: arrRoles,
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPositions = this.props.positionRedux;
      this.setState({
        positionArr: arrPositions,
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
      });
    }
    if (prevProps.listUsers !== this.props.listUsers) {
      let arrPositions = this.props.positionRedux;
      let arrRoles = this.props.roleRedux;
      let arrGenders = this.props.genderRedux;

      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phonenumber: "",
        address: "",
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
        avatar: "",
        action: CRUD_ACTIONS.CREATE,
        previewImgURL: "",
      });
    }
  }

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        avatar: base64,
      });
    }
  };

  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;

    this.setState({
      isOpen: true,
    });
  };

  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;

    let { action } = this.state;
    if (action === CRUD_ACTIONS.CREATE) {
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phonenumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }

    if (action === CRUD_ACTIONS.EDIT) {
      this.props.editAUserRedux({
        id: this.state.userEditId,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phonenumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "address",
      "phonenumber",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("This input is required: " + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };

  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleEditUserFromParent = (user) => {
    let imageBase64 = "";
    if (user.image) {
      imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }
    this.setState({
      email: user.email,
      password: "hardcode",
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      phonenumber: user.phonenumber,
      gender: user.gender,
      role: user.roleId,
      position: user.positionId,
      avatar: "",
      previewImgURL: imageBase64,
      action: CRUD_ACTIONS.EDIT,
      userEditId: user.id,
    });
  };

  render() {
    let genders = this.state.genderArr;
    let positions = this.state.positionArr;
    let roles = this.state.roleArr;
    let language = this.props.language;
    let isGetGenders = this.props.isGetGenders;

    let {
      email,
      password,
      firstName,
      lastName,
      address,
      phonenumber,
      gender,
      role,
      position,
      avatar,
    } = this.state;

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
                        value={email}
                        onChange={(event) => {
                          this.onChangeInput(event, "email");
                        }}
                        disabled={
                          this.state.action === CRUD_ACTIONS.EDIT ? true : false
                        }
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
                        value={password}
                        onChange={(event) => {
                          this.onChangeInput(event, "password");
                        }}
                        disabled={
                          this.state.action === CRUD_ACTIONS.EDIT ? true : false
                        }
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
                        value={firstName}
                        onChange={(event) => {
                          this.onChangeInput(event, "firstName");
                        }}
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
                        value={lastName}
                        onChange={(event) => {
                          this.onChangeInput(event, "lastName");
                        }}
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
                    value={phonenumber}
                    onChange={(event) => {
                      this.onChangeInput(event, "phonenumber");
                    }}
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
                    value={address}
                    onChange={(event) => {
                      this.onChangeInput(event, "address");
                    }}
                  />
                </div>
                <div className="col-12 d-inline-flex">
                  <div className="col-3 mb-4">
                    <label className="form-label" for="form6Example4">
                      <FormattedMessage id="manage-user.gender" />
                    </label>
                    <select
                      className="form-control"
                      onChange={(event) => {
                        this.onChangeInput(event, "gender");
                      }}
                      value={gender}
                    >
                      {genders &&
                        genders.length > 0 &&
                        genders.map((item, index) => {
                          return (
                            <option key={index} value={item.keyMap}>
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
                    <select
                      className="form-control"
                      onChange={(event) => {
                        this.onChangeInput(event, "position");
                      }}
                      value={position}
                    >
                      {positions &&
                        positions.length > 0 &&
                        positions.map((item, index) => {
                          return (
                            <option key={index} value={item.keyMap}>
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
                    <select
                      className="form-control"
                      onChange={(event) => {
                        this.onChangeInput(event, "role");
                      }}
                      value={role}
                    >
                      {roles &&
                        roles.length > 0 &&
                        roles.map((item, index) => {
                          return (
                            <option key={index} value={item.keyMap}>
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
                  type="button"
                  // className="btn-saveUser btn btn-primary btn-block my-6"
                  className={
                    this.state.action === CRUD_ACTIONS.EDIT
                      ? "btn btn-warning btn-saveUser btn-block my-6"
                      : "btn btn-primary btn-saveUser btn-block my-6"
                  }
                  onClick={() => this.handleSaveUser()}
                >
                  {this.state.action === CRUD_ACTIONS.EDIT ? (
                    <FormattedMessage id="manage-user.edit" />
                  ) : (
                    <FormattedMessage id="manage-user.save" />
                  )}
                </button>
              </form>
            </div>

            <div className="mt-4">
              <TableManageUser
                handleEditUserFromParentKey={this.handleEditUserFromParent}
                action={this.state.action}
              />
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
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    editAUserRedux: (data) => dispatch(actions.editAUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
