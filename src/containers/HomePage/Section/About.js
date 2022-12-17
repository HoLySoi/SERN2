import React, { Component } from "react";
import { connect } from "react-redux";
import "./About.scss";

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about-header">Huong dan su dung Phan mem</div>
        <div className="section-about-content">
          <div className="content-left">
            <div>
              <iframe
                className="video"
                width="1280"
                height="720"
                src="https://www.youtube.com/embed/dQGCTyqv9_k"
                title="nhạc jazz buổi sáng mùa đông ngọt ngào ❄️ nhạc jazz và đàn piano bossa nova cho tâm trạng vui vẻ"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className="content-right">
            <p>
              Welcome to Rainy Day Coffee channel! Listen on Store:
              lnk.to/pQgY3sSw Treat yourself to a cozy relaxing pianio jazz
              playlist with Rainy Day Coffee. Whether you're enjoying a hot cup
              of coffee or taking a break from work, these songs will bring you
              the perfect mix of chill tunes and catchy beats. Join us in
              listening to sweet Jazz to make your day better! I hope my music
              will help you relax and be inspired. Images, wallpapers, videos:
              Shutterstock, istockphoto, ...
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
