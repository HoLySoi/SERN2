import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions";
import { withRouter } from "react-router";
import SearchAll from "../../components/SearchAll/SearchAll";
import ShowMore from "../../components/ShowMore/ShowMore";
import { getAllClinic, getAllHandbook, getAllSpecialty, getTopDoctorHomeService } from "../../services/userService";

class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false,
      data: null,
      type: "",
      title: ""
    };
  }
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push("/home");
    }
  };

  handleCloseShowMore = () => {
    this.setState({
      showMore: false,
      type: "",
    });
  };

  showMore = async (e) => {
    this.setState({
      showMore: true,
      type: e,
      data: null,
      title: <FormattedMessage id={`show-more.${e}`} />
    })
    try {
      switch (e) {
        case "doctor":
          this.setState({
            data: (await getTopDoctorHomeService()).data,
            onClick: (item) => this.props.history.push(`/detail-doctor/${item.id}`),

          })
          break;
        case "specialty":
          this.setState({
            data: (await getAllSpecialty()).data,
            onClick: (item) => this.props.history.push(`/detail-specialty/${item.id}`),

          })
          break;
        case "clinic":
          this.setState({
            data: (await getAllClinic()).data,
            onClick: (item) => this.props.history.push(`/detail-clinic/${item.id}`),

          })
          break;
        case "handbook":
          this.setState({
            data: (await getAllHandbook()).data,
            onClick: (item) => this.props.history.push(`/detail-handbook/${item.id}`),

          })
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    let language = this.props.language;
    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-container">
            <div className="left-content">
              <div
                className="header-logo"
                onClick={() => this.returnToHome()}
              ></div>
            </div>
            <div className="center-content">
              <a href="#specialty" className="child-content" onClick={() => this.showMore("specialty")}>
                <b>
                  <FormattedMessage id="homeheader.speciality" />
                </b>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.searchdoctor" />
                </div>
              </a>
              <a href="#clinic" className="child-content" onClick={() => this.showMore("clinic")}>
                <b>
                  <FormattedMessage id="homeheader.health-facility" />
                </b>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.select-room" />
                </div>
              </a>
              <a href="#doctor" className="child-content" onClick={() => this.showMore("doctor")}>
                <b>
                  <FormattedMessage id="homeheader.doctor" />
                </b>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.select-doctor" />
                </div>
              </a>
              <a href="#handbook" className="child-content" onClick={() => this.showMore("handbook")}>
                <b>
                  <FormattedMessage id="homeheader.fee" />
                </b>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.check-health" />
                </div>
              </a>
            </div>
            {this.state.showMore && (
              <ShowMore
                title={this.state.title}
                onClose={this.handleCloseShowMore}
                data={this.state.data}
                type={this.state.type}
                language={this.props.language}
                onClick={this.state.onClick}
              // onSubmit={this.handleFilterSearch}
              />
            )}
            <div className="right-content">
              <div className="support">
                <i className="fas fa-question-circle"></i>
                <FormattedMessage id="homeheader.support" />
              </div>
              <div
                className={
                  language === LANGUAGES.VI
                    ? "language-vi active"
                    : "language-vi"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                  VN
                </span>
              </div>
              <div
                className={
                  language === LANGUAGES.EN
                    ? "language-en active"
                    : "language-en"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                  EN
                </span>
              </div>
            </div>
          </div>
        </div>
        {this.props.isShowBanner === true && (
          <div className="home-header-banner">
            <div className="content-up">
              <div className="title1">
                <FormattedMessage id="banner.title1" />
              </div>
              <div className="title2">
                <FormattedMessage id="banner.title2" />
              </div>
              <SearchAll history={this.props.history} language={language} />
            </div>
            {/* <div className="content-down">
              <div className="options">
                <div className="option-child">
                  <div className="icon-child">
                    <i className="far fa-hospital"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child1" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="far fa-hospital"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child2" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="far fa-hospital"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child3" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="far fa-hospital"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child4" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="far fa-hospital"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child5" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="far fa-hospital"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child6" />
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
// export default connect(mapStateToProps)(HomeHeader);
