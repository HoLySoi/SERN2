import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./BookingModal.scss";
import { Modal } from "reactstrap";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   allDays: [],
      //   allAvailableTime: [],
    };
  }

  async componentDidMount() {
    // let { language } = this.props;
    // let allDays = this.getArrDays(language);
    // this.setState({
    //   allDays: allDays,
    // });
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    // if (this.props.language !== prevProps.language) {
    //   let allDays = this.getArrDays(this.props.language);
    //   this.setState({
    //     allDays: allDays,
    //   });
    // }
    // if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
    //   let allDays = this.getArrDays(this.props.language);
    //   let res = await getScheduleDoctorByDate(
    //     this.props.doctorIdFromParent,
    //     allDays[0].value
    //   );
    //   this.setState({
    //     allAvailableTime: res.data ? res.data : [],
    //   });
    // }
  }

  render() {
    // let { allDays, allAvailableTime } = this.state;
    let { isOpenModal, closeBookingClose, dataTime } = this.props;

    return (
      <Modal
        isOpen={isOpenModal}
        className={"booking-modal-container"}
        size="lg"
        centered
        // backdrop={true}
      >
        <div className="booking-modal-content">
          <div className="booking-modal-header">
            <span className="left">Thông tin khám bệnh</span>
            <span className="right" onClick={closeBookingClose}>
              <i className="fas fa-times"></i>
            </span>
          </div>
          <div className="booking-modal-body">
            <div className="doctor-infor"></div>
            <div className="price">Giá khám 500.000VNĐ</div>
            <div className="row">
              <div className="col-6 from-group">
                <label>Họ tên</label>
                <input className="form-control"></input>
              </div>
              <div className="col-6 from-group">
                <label>Số điện thoại</label>
                <input className="form-control"></input>
              </div>
              <div className="col-6 from-group">
                <label>Địa chỉ Email</label>
                <input className="form-control"></input>
              </div>
              <div className="col-6 from-group">
                <label>Địa chỉ liên hệ</label>
                <input className="form-control"></input>
              </div>
              <div className="col-12 from-group">
                <label>Lý do khám</label>
                <input className="form-control"></input>
              </div>
              <div className="col-6 from-group">
                <label>Đặt cho ai</label>
                <input className="form-control"></input>
              </div>{" "}
              <div className="col-6 from-group">
                <label>Giới tính</label>
                <input className="form-control"></input>
              </div>
            </div>
          </div>
          <div className="booking-modal-footer">
            <button className="btn-booking-confirm" onClick={closeBookingClose}>
              Xác nhận
            </button>
            <button className="btn-booking-cancel" onClick={closeBookingClose}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
