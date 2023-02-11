import React, { Component } from "react";
import { connect } from "react-redux";
import "./About.scss";

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about-header">Hướng dẫn sử dụng phần mềm</div>
        <div className="section-about-content">
          <div className="content-left">
            <div>
              <iframe
                className="video"
                width="1280"
                height="720"
                src="https://www.youtube.com/embed/kMIOZS03774"
                title="HƯỚNG DẪN TỰ LẤY MẪU XÉT NGHIỆM COVID-19 TẠI NHÀ| Kênh thông tin Bộ Y tế"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
          </div>
          <div className="content-right">
            <p>
              BookingCare là nền tảng đặt lịch khám bệnh đầu tiên tại Việt Nam
              có định hướng kết nối bệnh nhân, bác sĩ, và cơ sở y tế; hỗ trợ đặt
              lịch khám miễn phí. ĐÚNG BỆNH NHÂN, ĐÚNG BÁC SĨ
            </p>
            <p>
              {" "}
              Đặt lịch khám với BookingCare qua: - Website:
              https://bookingcare.vn - Hotline hỗ trợ : 024-7301-2468
            </p>
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
