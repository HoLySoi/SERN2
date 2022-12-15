import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";

class HomeHeader extends Component {
  render() {
    return (
      <div className="home-header-container">
        <div className="home-header-container">
          <div className="left-content">
            <i className="fas fa-bars"></i>
            <div className="header-logo"></div>
          </div>
          <div className="center-content">
            <div className="child-content">
              <div>
                <b>Chuyeen khoa</b>
              </div>
              <div className="subs-title">Tim bac si theo chuyeen khoa</div>
            </div>
            <div className="child-content">
              <div>
                <b>Chuyeen khoa</b>
              </div>
              <div className="subs-title">Tim bac si theo chuyeen khoa</div>
            </div>
            <div className="child-content">
              <div>
                <b>Goi kham</b>
              </div>
              <div className="subs-title">Kham suc khoe tong quat</div>
            </div>
          </div>
          <div className="right-content">
            <div className="support">
              <i className="fas fa-question-circle"></i>Hoox tro
            </div>
            <div className="flag">Vn</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     processLogout: () => dispatch(actions.processLogout()),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
export default connect(mapStateToProps)(HomeHeader);
