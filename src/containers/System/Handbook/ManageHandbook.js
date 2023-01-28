import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManageHandbook.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils } from "../../../utils";
import { createNewHandbook } from "../../../services/userService";
import { toast } from "react-toastify";
import {
  getAllHandbook,
  getAllDetailHandbookById,
  deleteHandbook,
  editHandbook,
} from "../../../services/userService";
const mdParser = new MarkdownIt();

class ManageHandbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      arrHandbook: [],
      isEditHandbook: false,
    };
  }

  async componentDidMount() {
    await this.getAllHandbookFromReact();
  }

  getAllHandbookFromReact = async () => {
    let response = await getAllHandbook();
    if (response && response.errCode === 0) {
      this.setState({
        arrHandbook: response.data,
      });
    }
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {}

  handleOnChangeInput = (event, id) => {
    let stateCopy = { ...this.State };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };

  handleOnchangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imageBase64: base64,
      });
    }
  };

  handleSaveNewHandbook = async () => {
    let res = await createNewHandbook(this.state);
    if (res && res.errCode === 0) {
      toast.success("Add new handbook succeeds!");
      await this.getAllHandbookFromReact();
      this.setState({
        name: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
      });
    } else {
      toast.error("Something wrongs....");
    }
  };

  handleDeleteHandbook = async (handbook) => {
    try {
      let res = await deleteHandbook(handbook.id);
      if (res && res.errCode === 0) {
        toast.success("Delete handbook succeeds!");
        await this.getAllHandbookFromReact();
      } else {
        toast.error("Something wrongs....");
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleEditHandbook = (handbook) => {
    console.log("check edit handbook", handbook);
    this.setState({
      isEditHandbook: true,
      id: handbook.id,
      name: handbook.name,
      image: handbook.image,
      descriptionHTML: handbook.descriptionHTML,
      descriptionMarkdown: handbook.descriptionMarkdown,
    });
  };

  doEditHandbook = async () => {
    console.log("check state doEditHandbook", this.state);
    try {
      let res = await editHandbook(this.state);

      if (res && res.errCode === 0) {
        toast.success("Edit handbook succeeds!");
        await this.getAllHandbookFromReact();
        this.setState({
          name: "",
          imageBase64: "",
          descriptionHTML: "",
          descriptionMarkdown: "",
          isEditHandbook: false,
        });
      } else {
        toast.error("Something wrongs....");
      }
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    // let { allDays, allAvailableTime } = this.state;
    // let { language } = this.props;

    let arrHandbook = this.state.arrHandbook;

    return (
      <>
        <div className="manage-handbook-container">
          <div className="ms-title title">
            {" "}
            <FormattedMessage id="handbook.manage-handbook" />
          </div>
          <div className="add-new-handbook row">
            <div className="col-6 form-group">
              <label>
                {" "}
                <FormattedMessage id="handbook.handbook-name" />
              </label>
              <input
                className="form-control"
                type="text"
                value={this.state.name}
                onChange={(event) => this.handleOnChangeInput(event, "name")}
              />
            </div>
            <div className="col-6 form-group">
              <label>
                {" "}
                <FormattedMessage id="handbook.image" />
              </label>
              <input
                className="form-control-file"
                type="file"
                onChange={(event) => this.handleOnchangeImage(event)}
              />
            </div>
            <div className="col-12">
              <MdEditor
                style={{ height: "450px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleEditorChange}
                value={this.state.descriptionMarkdown}
              />
            </div>

            <div className="col-12">
              <button
                className={
                  this.state.isEditHandbook === false
                    ? "btn-save-handbook btn-primary"
                    : "btn-edit-handbook  btn-warning"
                }
                onClick={
                  this.state.isEditHandbook === false
                    ? () => this.handleSaveNewHandbook()
                    : () => this.doEditHandbook()
                }
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <div className="ms-title title mt-3">
          {" "}
          <FormattedMessage id="handbook.list-handbook" />
        </div>
        <div className="users-table mt-3 mx-5 mb-5">
          <table id="customers">
            <tbody>
              <tr>
                <th>
                  {" "}
                  <FormattedMessage id="handbook.number" />
                </th>
                <th>
                  {" "}
                  <FormattedMessage id="handbook.handbook-name" />
                </th>
                <th>
                  {" "}
                  <FormattedMessage id="handbook.action" />
                </th>
              </tr>

              {arrHandbook &&
                arrHandbook.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      {/* <td>{item.lastName}</td>
                      <td>{item.address}</td> */}
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => this.handleEditHandbook(item)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => this.handleDeleteHandbook(item)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageHandbook);
