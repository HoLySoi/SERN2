import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import { KeyCodeUtils, LanguageUtils } from "../../utils";

import userIcon from "../../../src/assets/images/user.svg";
import passIcon from "../../../src/assets/images/pass.svg";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLoginApi } from "../../services/userService";
import adminService from "../../services/adminService";
import userService from "../../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.btnLogin = React.createRef();
  }

  initialState = {
    username: "",
    password: "",
    loginError: "",
    isShowPassword: false,
    errMessage: "",
  };

  state = {
    ...this.initialState,
  };

  refresh = () => {
    this.setState({
      ...this.initialState,
    });
  };

  onUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  };

  onPasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  // redirectToSystemPage = () => {
  //   const { navigate } = this.props;
  //   const redirectPath = "/system/user-manage";
  //   navigate(`${redirectPath}`);
  // };

  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });

    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
        console.log("login successed");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message,
          });
        }
      }
    }

    // const { username, password } = this.state;

    // const { adminLoginSuccess, adminLoginFail } = this.props;
    // let loginBody = {
    //   username: "admin",
    //   password: "123456",
    // };
    // //sucess
    // let adminInfo = {
    //   tlid: "0",
    //   tlfullname: "Administrator",
    //   custype: "A",
    //   accessToken: "eyJhbGciOiJIU",
    // };

    // adminLoginSuccess(adminInfo);
    // this.refresh();
    // this.redirectToSystemPage();
    // try {
    //   adminService.login(loginBody);
    // } catch (e) {
    //   console.log("error login : ", e);
    // }
  };

  // handlerKeyDown = (event) => {
  //   const keyCode = event.which || event.keyCode;
  //   if (keyCode === KeyCodeUtils.ENTER) {
  //     event.preventDefault();
  //     if (!this.btnLogin.current || this.btnLogin.current.disabled) return;
  //     this.btnLogin.current.click();
  //   }
  // };

  // componentDidMount() {
  //   document.addEventListener("keydown", this.handlerKeyDown);
  // }

  // componentWillUnmount() {
  //   document.removeEventListener("keydown", this.handlerKeyDown);
  //   // fix Warning: Can't perform a React state update on an unmounted component
  //   this.setState = (state, callback) => {
  //     return;
  //   };
  // }

  render() {
    const { username, password, loginError } = this.state;
    const { lang } = this.props;

    return (
      <div className="login-wrapper">
        <div className="login-container">
          <div className="form_login">
            {/* Login text */}
            <h2 className="title">
              <FormattedMessage id="login.login" />
            </h2>
            {/* User */}
            <div className="form-group icon-true">
              <img className="icon" src={userIcon} alt="this" />
              <input
                placeholder={LanguageUtils.getMessageByKey(
                  "login.username",
                  lang
                )}
                id="username"
                name="username"
                type="text"
                className="form-control"
                value={username}
                onChange={this.onUsernameChange}
              />
            </div>
            {/* Pass */}
            <div id="phone-input-container" className="form-group icon-true">
              <img className="icon" src={passIcon} alt="this" />
              <input
                placeholder={LanguageUtils.getMessageByKey(
                  "login.password",
                  lang
                )}
                id="password"
                name="password"
                type={this.state.isShowPassword ? "text" : "password"}
                className="form-control"
                value={password}
                onChange={this.onPasswordChange}
              />
              <span
                onClick={() => {
                  this.handleShowHidePassword();
                }}
              >
                <i
                  class={
                    this.state.isShowPassword
                      ? "far fa-eye"
                      : "far fa-eye-slash"
                  }
                ></i>
              </span>
            </div>

            {loginError !== "" && (
              <div className="login-error">
                <span className="login-error-message">{loginError}</span>
              </div>
            )}
            {/* Button login */}
            <div className="form-group login">
              <input
                ref={this.btnLogin}
                id="btnLogin"
                type="submit"
                className="btn"
                value={LanguageUtils.getMessageByKey("login.login", lang)}
                onClick={this.handleLogin}
              />
            </div>

            {/* <div className="col-12" style={{ color: "red" }}>
              {this.state.errMessage}
            </div> */}

            <div className="col-12">
              <span className="forgot-password">Quên mật khẩu</span>
            </div>
            <div className="col-12 text-canter mt-3">
              <span className="forgot-password">Hoặc đăng nhập bằng:</span>
            </div>
            <div className="col-12 social-login">
              <i className="fab fa-google-plus-g google"></i>
              <i className="fab fa-facebook-f facebook"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginSuccess: (userInfor) =>
      dispatch(actions.userLoginSuccess(userInfor)),
    // userLoginFail: () => dispatch(actions.userLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
