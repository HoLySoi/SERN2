import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfor.scss";

import { getDetailInforDoctor } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";

class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfor: false,
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    // if (prevProps.allDoctors !== this.props.allDoctors) {
    //     let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
    //     this.setState({
    //         listDoctor: dataSelect,
    //     });
    // }
    // if (prevProps.language !== this.props.language) {
    //     let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
    //     this.setState({
    //         listDoctor: dataSelect,
    //     });
    // }
  }

  showHideDetailInfor = (status) => {
    this.setState({
      isShowDetailInfor: status,
    });
  };
  render() {
    // let { language } = this.props;
    let { isShowDetailInfor } = this.state;
    return (
      <React.Fragment>
        <div className="doctor-extra-infor-container">
          <div className="content-up">
            <div className="text-address">ĐỊA CHỈ PHÒNG KHÁM</div>
            <div className="name-clinic"> Phòng khám chuyên khoa Da Liễu</div>
            <div className="detail-address">
              207 Phố Huế - Hai Bà Trưng - Hà Nội
            </div>
          </div>

          <div className="content-down">
            {isShowDetailInfor === false && (
              <div className="short-infor">
                GIA KHAM: 250.000d.
                <span onClick={() => this.showHideDetailInfor(true)}>
                  Xem chi tiet
                </span>
              </div>
            )}

            {isShowDetailInfor === true && (
              <>
                <div className="title-price">GÍA KHÁM</div>
                <div className="detail-infor">
                  <div className="price">
                    <span className="left">Giá khám</span>
                    <span className="right">250.000đ</span>
                  </div>

                  <div className="note">
                    Được ưu tiên khám trước khi đặt qua Bookingcare.com
                  </div>
                </div>
                <div className="payment">
                  Người bệnh có thể thanh toán chi phí bằng hình thức tiền mặt
                  hoặc chuyển khoản
                </div>

                <div className="hide-price">
                  <span onClick={() => this.showHideDetailInfor(false)}>
                    Ẩn bảng giá
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
