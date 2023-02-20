import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import { getAllSpecialty } from "../../../services/userService";
import { withRouter } from "react-router";
import ShowMore from "../../../components/ShowMore/ShowMore";
import { Spinner } from "reactstrap";

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: null,
      showMoreSpecialty: false,
      specialties: null,
    };
  }

  async componentDidMount() {
    try {
      let res = await getAllSpecialty();
      if (res && res.errCode === 0) {
        this.setState({
          dataSpecialty: res.data ? res.data : [],
        });
      }
    } catch (error) {
      this.setState({
        dataSpecialty: [],
      });
      console.log(error);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
    //   this.setState({
    //     arrDoctors: this.props.topDoctorsRedux,
    //   });
    // }
  }
  handleViewDetailSpecialty = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${item.id}`);
    }
  };

  handleShowMoreSpecialty = async () => {
    try {
      this.setState({
        showMoreSpecialty: true,
      });
      let res = await getAllSpecialty(10, 0, "");
      if (res && res.errCode === 0) {
        this.setState({
          showMoreSpecialty: true,
          specialties: res.data ? res.data : [],
        });
      }
    } catch (error) {
      console.log(error)
      this.setState({
        specialties: []
      })
    }
  };

  handleCloseShowMore = () => {
    this.setState({
      showMoreSpecialty: false,
      specialties: null,
    });
  };

  handleFilterSearch = async (value) => {
    try {
      this.setState({
        showMoreSpecialty: true,
        specialties: null
      });
      let res = await getAllSpecialty(10, 0, value);
      if (res && res.errCode === 0) {
        this.setState({
          specialties: res.data ? res.data : [],
        });
      }
    } catch (error) {
      console.log(error)
      this.setState({
        specialties: []
      })
    }
  };

  render() {
    let { dataSpecialty } = this.state;
    let { language } = this.props;
    return (
      <div className="section-share section-specialty">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="homepage.specialty-poplular" />
            </span>
            <button
              className="btn-section"
              onClick={this.handleShowMoreSpecialty}
            >
              <FormattedMessage id="homepage.more-infor" />
            </button>
            {this.state.showMoreSpecialty && (
              <ShowMore
                title={<FormattedMessage id="show-more.specialty" />}
                onClose={this.handleCloseShowMore}
                data={this.state.specialties}
                type="specialty"
                language={language}
                onClick={this.handleViewDetailSpecialty}
                onSubmit={this.handleFilterSearch}
              />
            )}
          </div>
          <div className="section-body">
            {!dataSpecialty && <Spinner />}
            <Slider {...this.props.settings}>
              {dataSpecialty &&
                dataSpecialty.length > 0 &&
                dataSpecialty.map((item, index) => {
                  return (
                    <div
                      className="section-customize specialty-child"
                      key={index}
                      onClick={() => this.handleViewDetailSpecialty(item)}
                    >
                      <div
                        className="bg-image section-specialty "
                        style={{ backgroundImage: `url(${item.image})` }}
                      ></div>
                      <div>{item.name}</div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Specialty)
);
// export default connect(mapStateToProps)(Specialty);
