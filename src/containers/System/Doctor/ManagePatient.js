import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManagePatient.scss";
import { FormattedMessage } from "react-intl";
import DatePicker from "../../../components/Input/DatePicker";
import {
  cancelPatientBookAppointment,
  getAllPatientForDoctor,
  postSendRemedy,
} from "../../../services/userService";
import moment from "moment";
import { LANGUAGES } from "../../../utils";
import RemedyModal from "./RemedyModal";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
import ConfirmModal from "../../../components/ConfirmModal";
import { Input } from "reactstrap";

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: [],
      isOpenRemedyModal: false,
      dataModal: {},
      isShowLoading: false,
      isOpenModalConfirm: false,
      cancelReason: "",
      isButtonDisable: false,
    };
  }

  async componentDidMount() {
    this.getDataPatient();
  }

  getDataPatient = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formatedDate = new Date(currentDate).getTime();
    let res = await getAllPatientForDoctor({
      doctorId: user.id,
      date: formatedDate,
    });
    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {}
  handleOnChangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        await this.getDataPatient();
      }
    );
  };

  handleBtnConfirm = (item) => {
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,
      patientName: item.patientData.firstName,
    };
    this.setState({
      isOpenRemedyModal: true,
      dataModal: data,
    });
  };

  handleBtnCancel = (item) => {
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,
      patientName: item.patientData.firstName,
    };
    this.setState({
      isOpenModalConfirm: true,
      dataModal: data,
    });
  };

  closeRemedyModal = () => {
    this.setState({
      isOpenRemedyModal: false,
      dataModal: {},
    });
  };

  sendRemedy = async (dataChild) => {
    let { dataModal } = this.state;
    this.setState({
      isShowLoading: true,
    });

    let res = await postSendRemedy({
      email: dataChild.email,
      imgBase64: dataChild.imgBase64,
      doctorId: dataModal.doctorId,
      patientId: dataModal.patientId,
      timeType: dataModal.timeType,
      language: this.props.language,
      patientName: dataModal.patientName,
    });
    if (res && res.errCode === 0) {
      this.setState({
        isShowLoading: false,
      });
      toast.success("Send Remedy succeeds:");
      this.closeRemedyModal();
      await this.getDataPatient();
    } else {
      this.setState({
        isShowLoading: false,
      });
      toast.error("something wrongs....");
      console.log("error send remedy: ", res);
    }
  };

  onClose = () => {
    this.setState({
      isOpenModalConfirm: false,
      cancelReason: "",
    });
  };

  onConfirm = async () => {
    const { email, doctorId, patientName, timeType } = this.state.dataModal;
    const { language } = this.props;
    const { currentDate } = this.state;
    const date =
      language === LANGUAGES.VI
        ? moment
            .unix(currentDate / 1000)
            .locale("vi")
            .format("dddd - DD/MM/YYYY")
        : moment
            .unix(currentDate / 1000)
            .locale("en")
            .format("ddd - MM/DD/YYYY");

    if (!this.state.cancelReason) {
      toast.error(<FormattedMessage id="manage-patient.empty-reason" />);
      return;
    }
    try {
      this.setState({
        isButtonDisable: true,
      });
      await cancelPatientBookAppointment({
        email,
        fullName: patientName,
        timeString: date,
        doctorName: this.props.user.firstName + " " + this.props.user.lastName,
        language,
        reason: this.state.cancelReason,
        doctorId,
        timeType,
        date: currentDate,
      });
      this.setState({
        isOpenModalConfirm: false,
        cancelReason: "",
      });
      toast.success(<FormattedMessage id={"common.success"} />);
    } catch (e) {
      toast.error(<FormattedMessage id="common.error" />);
    } finally {
      this.setState({
        isButtonDisable: false,
      });
    }
  };

  renderAction = (item, time) => {
    const { statusId } = item;
    if (statusId === "S3") {
      return <></>;
    }
    if (statusId === "S4") {
      return <></>;
    }
    return (
      <>
        <button
          className="mp-btn-confirm"
          onClick={() => this.handleBtnConfirm(item)}
        >
          <FormattedMessage id="manage-patient.confirm" />
        </button>
        <button
          className="mp-btn-cancel"
          onClick={() => this.handleBtnCancel({ ...item, time })}
        >
          <FormattedMessage id="manage-patient.cancel" />
        </button>
      </>
    );
  };

  render() {
    let {
      dataPatient,
      isOpenRemedyModal,
      dataModal,
      isOpenModalConfirm,
      isButtonDisable,
    } = this.state;
    let { language } = this.props;
    return (
      <>
        <LoadingOverlay
          active={this.state.isShowLoading}
          spinner
          text="Loading..."
        >
          <div className="manage-patient-container">
            <div className="manage-patient-title title text-center my-4">
              <FormattedMessage id="manage-patient.manage" />
            </div>
            <div className="manage-patient-body row">
              <div className="col-4 form-group">
                <label>
                  <FormattedMessage id="manage-patient.choose-date" />
                </label>
                <DatePicker
                  onChange={this.handleOnChangeDatePicker}
                  className="form-control"
                  value={this.state.currentDate}
                />
              </div>
              <div className="col-12 table-manage-patient ">
                <table id="customers" style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <th>
                        <FormattedMessage id="manage-patient.number" />
                      </th>
                      <th>
                        <FormattedMessage id="manage-patient.time" />
                      </th>
                      <th>
                        <FormattedMessage id="manage-patient.name" />
                      </th>
                      <th>
                        <FormattedMessage id="manage-patient.address" />
                      </th>
                      <th>
                        <FormattedMessage id="manage-patient.gender" />
                      </th>
                      <th>
                        <FormattedMessage id="manage-patient.phoneNumber" />
                      </th>
                      <th>
                        <FormattedMessage id="manage-patient.action" />
                      </th>
                    </tr>
                    {dataPatient && dataPatient.length > 0 ? (
                      dataPatient.map((item, index) => {
                        let time =
                          language === LANGUAGES.VI
                            ? item.timeTypeDataPatient.valueVi
                            : item.timeTypeDataPatient.valueEn;
                        let gender =
                          language === LANGUAGES.VI
                            ? item.patientData.genderData.valueVi
                            : item.patientData.genderData.valueEn;

                        return (
                          <tr
                            key={index}
                            style={{
                              background:
                                item.statusId === "S3"
                                  ? "green"
                                  : item.statusId === "S4"
                                  ? "gray"
                                  : "",
                            }}
                          >
                            <td>{index + 1}</td>
                            <td>{time}</td>
                            <td>{item.patientData.firstName}</td>
                            <td>{item.patientData.address}</td>
                            <td>{gender}</td>
                            <td>{item.patientData.phonenumber}</td>
                            <td>{this.renderAction(item, time)}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="6" style={{ textAlign: "center" }}>
                          <FormattedMessage id="manage-patient.no-data" />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <RemedyModal
            isOpenModal={isOpenRemedyModal}
            dataModal={dataModal}
            closeRemedyModal={this.closeRemedyModal}
            sendRemedy={this.sendRemedy}
          />

          <ConfirmModal
            isOpen={isOpenModalConfirm}
            onClose={this.onClose}
            onConfirm={this.onConfirm}
            isButtonDisable={isButtonDisable}
          >
            <FormattedMessage id={"common.reason"} />{" "}
            <i className="fa fa-asterisk" aria-hidden="true" color="red"></i>:
            <Input
              onChange={(e) => {
                this.setState({
                  cancelReason: e.target.value,
                });
              }}
            />
          </ConfirmModal>
        </LoadingOverlay>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
