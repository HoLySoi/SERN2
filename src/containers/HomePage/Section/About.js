import React, { Component } from "react";
import { connect } from "react-redux";
import "./About.scss";
import { FormattedMessage } from "react-intl";

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-container">
          {" "}
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="homepage.instruct" />
            </span>
          </div>
          <div className="section-about-body">
            <div className="content-left">
              <div>
                <iframe
                  className="video"
                  width="1280"
                  height="720"
                  src="https://www.youtube.com/embed/kMIOZS03774"
                  title="HƯỚNG DẪN TỰ LẤY MẪU XÉT NGHIỆM COVID-19 TẠI NHÀ| Kênh thông tin Bộ Y tế"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            <div className="content-right">
              <p>
                Các đóng góp chính của ĐATN là: (i) cung cấp thông tin cho bệnh
                nhân về các cơ sở y tế, chuyên khoa, bác sĩ, các bài viết về
                chăm sóc sức khỏe, (ii) giúp bệnh nhân có thể dễ dàng đặt lịch
                khám bệnh với bác sĩ mong muốn, (iii) giúp các bác sĩ quản lý
                thông tin của bản thân, quản lý bệnh nhân khám bệnh một cách đơn
                giản, (iv) bác sĩ, bệnh nhân có thể sử dụng một trong hai ngôn
                ngữ Tiếng Anh, Tiếng Việt để sử dụng hệ thống.
              </p>
              <p></p>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
// export default connect(mapStateToProps)(About);
