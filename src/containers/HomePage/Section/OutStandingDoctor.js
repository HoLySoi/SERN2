import React, { Component } from "react";
import { connect } from "react-redux";
import "./OutStandingDoctor.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { withRouter } from "react-router";
import ShowMore from "../../../components/ShowMore/ShowMore";
import { getTopDoctorHomeService } from "../../../services/userService";
import { Spinner } from "reactstrap";

class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: null,
      showMoreDoctors: false,
      doctors: null,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
    if (
      (prevState.showMoreDoctors !== this.state.showMoreDoctors ||
        this.props.showMoreDoctors) &&
      prevProps.doctors !== this.props.topDoctors
    ) {
      this.setState({
        doctors: this.props.topDoctors,
      });
    }
  }

  componentDidMount() {
    this.props.loadTopDoctors();
  }

  handleViewDetailDoctor = (doctor) => {
    if (this.props.history) {
      this.props.history.push(`/detail-doctor/${doctor.id}`);
    }
  };

  handleShowMoreDoctor = async () => {
    try {
      this.setState({
        showMoreDoctors: true,
      });
      let res = await getTopDoctorHomeService(10, 0, "");
      if (res && res.errCode === 0) {
        this.setState({
          doctors: res.data ? res.data : [],
        });
      }
      this.setState({
        doctors: res.data ? res.data : [],
      });
    } catch (e) {
      console.log(e);
      this.setState({
        doctors: []
      })
    }
  };

  handleCloseShowMore = () => {
    this.setState({
      showMoreDoctors: false,
      doctors: null,
    });
  };

  handleFilterSearch = async (value) => {
    try {
      this.setState({
        doctors: null,
      });
      let res = await getTopDoctorHomeService(10, 0, value);
      if (res && res.errCode === 0) {
        this.setState({
          doctors: res.data ? res.data : [],
        });
      }
    } catch (e) {
      console.log(e);
      this.setState({
        doctors: []
      })
    }
  };

  render() {
    let arrDoctors = this.state.arrDoctors;
    let { language } = this.props;
    return (
      <div className="section-share section-outstanding-doctor">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="homepage.outstanding-doctor" />
            </span>
            <button className="btn-section" onClick={this.handleShowMoreDoctor}>
              <FormattedMessage id="homepage.more-infor" />
            </button>
            {this.state.showMoreDoctors && (
              <ShowMore
                title={<FormattedMessage id="show-more.doctor" />}
                onClose={this.handleCloseShowMore}
                data={this.state.doctors}
                subTitle={
                  <FormattedMessage id="show-more.outstanding-doctor" />
                }
                type="doctor"
                language={language}
                onClick={this.handleViewDetailDoctor}
                onSubmit={this.handleFilterSearch}
              />
            )}
          </div>
          <div className="section-body">
            {!arrDoctors && <Spinner />}
            <Slider {...this.props.settings}>
              {arrDoctors &&
                arrDoctors.length > 0 &&
                arrDoctors.map((item, index) => {
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  let nameVi = `${item.positionData.valueVi} ${item.lastName} ${item.firstName} `;
                  let nameEn = `${item.positionData.valueEn} ${item.firstName} ${item.lastName} `;
                  return (
                    <div
                      className="section-customize"
                      key={index}
                      onClick={() => this.handleViewDetailDoctor(item)}
                    >
                      <div className="customize-border">
                        <div className="outer-bg">
                          <div
                            className="bg-image section-outstanding-doctor"
                            style={{ backgroundImage: `url(${imageBase64})` }}
                          ></div>
                          <div className="position text-center">
                            <div>
                              {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div>Co xuong khop</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
    topDoctorsRedux: state.admin.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
    loadDoctors: (limit, offset, filter) =>
      dispatch(actions.fetchTopDoctor(limit, offset, filter)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor)
);
// export default connect(mapStateToProps)(MedicalFacility);
