import React, { Component } from "react";
import { connect } from "react-redux";
import "./HandBook.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import { getAllHandbook } from "../../../services/userService";
import { withRouter } from "react-router";
import { Spinner } from "reactstrap";
import ShowMore from "../../../components/ShowMore/ShowMore";

class HandBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataHandbook: null,
      showMoreHandbook: false,
      handBooks: null,
    };
  }

  async componentDidMount() {
    try {
      let res = await getAllHandbook();
      if (res && res.errCode === 0) {
        this.setState({
          dataHandbook: res.data ? res.data : [],
        });
      }
    } catch (e) {
      console.log(e);
      this.setState({
        dataHandbook: [],
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
    //   this.setState({
    //     arrDoctors: this.props.topDoctorsRedux,
    //   });
    // }
  }

  handleViewDetailHandbook = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-handbook/${item.id}`);
    }
  };
  handleShowMoreHandbook = async () => {
    try {
      this.setState({
        showMoreHandbook: true,
      });
      let res = await getAllHandbook();
      if (res && res.errCode === 0) {
        this.setState({
          handBooks: res.data ? res.data : [],
        });
      }
      this.setState({
        handBooks: res.data ? res.data : [],
      });
    } catch (e) {
      console.log(e);
      this.setState({
        handBooks: [],
      });
    }
  };

  handleCloseShowMore = () => {
    this.setState({
      showMoreHandbook: false,
      handBooks: null,
    });
  };

  render() {
    let { dataHandbook } = this.state;
    const { language } = this.props;
    return (
      <div className="section-share section-handbook">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="homepage.handbook" />
            </span>
            <button
              className="btn-section"
              onClick={this.handleShowMoreHandbook}
            >
              <FormattedMessage id="homepage.more-infor" />
            </button>
            {this.state.showMoreHandbook && (
              <ShowMore
                title={<FormattedMessage id="show-more.handbook" />}
                onClose={this.handleCloseShowMore}
                data={this.state.handBooks}
                type="handbook"
                language={language}
                onClick={this.handleViewDetailHandbook}
              />
            )}
          </div>
          <div className="section-body">
            {!dataHandbook && <Spinner />}
            <Slider {...this.props.settings}>
              {dataHandbook &&
                dataHandbook.length > 0 &&
                dataHandbook.map((item, index) => {
                  return (
                    <div
                      className="section-customize handbook-child"
                      key={index}
                      onClick={() => this.handleViewDetailHandbook(item)}
                    >
                      <div
                        className="bg-image section-handbook "
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
  connect(mapStateToProps, mapDispatchToProps)(HandBook)
);
// export default connect(mapStateToProps)(Handbook);
