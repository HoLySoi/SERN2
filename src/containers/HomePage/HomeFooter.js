import React, { Component } from "react";
import { connect } from "react-redux";

class HomeFooter extends Component {
  render() {
    return (
      <div className="home-footer">
        <p>
          &copy; 2022 Đồ án tốt nghiệp
          <a rel="noreferrer" target="_blank" href="https://www.facebook.com/ho.toan.7922hvt">
            &#8594; Click here &#8592;
          </a>
        </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
// export default connect(mapStateToProps)(HomeFooter);
