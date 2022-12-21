import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
const mdParser = new MarkdownIt();

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      selectedDoctor: "",
      description: "",
    };
  }

  componentDidMount() {
    this.props.fetchUserRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // if (prevProps.listUsers !== this.props.listUsers) {
    //   this.setState({
    //     usersRedux: this.props.listUsers,
    //   });
    // }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  handleSaveContentMarkdown = () => {
    console.log("check state", this.state);
  };
  handleChange = (selectedDoctor) => {
    this.setState({ selectedDoctor }, () =>
      console.log(`Option selected:`, this.state.selectedDoctor)
    );
  };
  handleOnChangeDesc = (event) => {
    this.setState({
      description: event.target.value,
    });
  };
  render() {
    let arrUsers = this.state.usersRedux;

    console.log("danh sach nguoi dung", arrUsers);
    return (
      <div className="manage-doctor-container m-3">
        <div className="manage-doctor-title title text-center my-4">
          Them thong tin bac si
        </div>
        <div className="more-infor d-flex">
          <div className="content-left form-group w-25 mr-3">
            <label>Chon bac si:</label>
            <Select
              value={this.state.selectedDoctor}
              onChange={this.handleChange}
              options={options}
              //   className="form-control"
            />
          </div>
          <div className="content-right form-group w-75">
            <label>Thong tin gioi thieu:</label>
            <textarea
              className="form-control "
              rows="5"
              onChange={(event) => this.handleOnChangeDesc(event)}
              value={this.state.description}
            >
              asfdfasdsadf
            </textarea>
          </div>
        </div>
        <div className="manage-doctor-editor"> </div>

        <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={this.handleEditorChange}
        />
        <button
          className="save-content-doctor btn btn-primary m-3 w-25"
          onClick={() => this.handleSaveContentMarkdown()}
        >
          Save
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
