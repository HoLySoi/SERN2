import React, { Component } from "react";
import { connect } from "react-redux";
import "./MedicalFacility.scss";
import { FormattedMessage } from "react-intl";

import Slider from "react-slick";

class MedicalFacility extends Component {
  render() {
    return (
      <div className="section-share section-medical-facility">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Co so y te noi bat</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customize">
                <div className="bg-image section-medical-facility"></div>
                <div>He thong y te thu cuc</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-medical-facility"></div>
                <div>He thong y te thu cuc</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-medical-facility"></div>
                <div>He thong y te thu cuc</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-medical-facility"></div>
                <div>He thong y te thu cuc</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-medical-facility"></div>
                <div>He thong y te thu cuc</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-medical-facility"></div>
                <div>He thong y te thu cuc</div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
// export default connect(mapStateToProps)(MedicalFacility);
