import React, { Component } from "react";
import { connect } from "react-redux";
// import "./DefaultClass.scss";
import moment from "moment";
import localization from "moment/locale/vi";
import { LANGUAGES } from "../../../utils";
import { getScheduleDoctorByDate } from "../../../services/userService";
import { FormattedMessage } from "react-intl";

class DefaultClass extends Component {
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
    // let { language } = this.props;

    return <div className="doctor-schedule-container"></div>;
  }
}
const mapStateToProps = (state) => {
  return {
    // language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
