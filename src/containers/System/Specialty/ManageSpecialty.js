import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManageSpecialty.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils } from "../../../utils";
import { createNewSpecialty } from "../../../services/userService";
import { toast } from "react-toastify";
import {
  getAllSpecialty,
  deleteSpecialty,
  editSpecialty,
} from "../../../services/userService";
const mdParser = new MarkdownIt();

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      arrSpecialty: [],
      isEditSpecialty: false,
    };
  }

  async componentDidMount() {
    await this.getAllSpecialtyFromReact();
  }

  getAllSpecialtyFromReact = async () => {
    let response = await getAllSpecialty();
    if (response && response.errCode === 0) {
      this.setState({
        arrSpecialty: response.data,
      });
    }
  };

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

  handleSaveNewSpecialty = async () => {
    let res = await createNewSpecialty(this.state);
    if (res && res.errCode === 0) {
      toast.success("Add new specialty succeeds!");
      await this.getAllSpecialtyFromReact();
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
  handleDeleteSpecialty = async (specialty) => {
    try {
      let res = await deleteSpecialty(specialty.id);
      if (res && res.errCode === 0) {
        toast.success("Delete specialty succeeds!");
        await this.getAllSpecialtyFromReact();
      } else {
        toast.error("Something wrongs....");
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleEditSpecialty = (specialty) => {
    this.setState({
      isEditSpecialty: true,
      id: specialty.id,
      name: specialty.name,
      image: specialty.image,
      descriptionHTML: specialty.descriptionHTML,
      descriptionMarkdown: specialty.descriptionMarkdown,
    });
  };

  doEditSpecialty = async () => {
    try {
      let res = await editSpecialty(this.state);

      if (res && res.errCode === 0) {
        toast.success("Edit specialty succeeds!");
        await this.getAllSpecialtyFromReact();
        this.setState({
          name: "",
          imageBase64: "",
          descriptionHTML: "",
          descriptionMarkdown: "",
          isEditSpecialty: false,
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
    let arrSpecialty = this.state.arrSpecialty;
    return (
      <>
        <div className="manage-specialty-container">
          <div className="ms-title title">
            {" "}
            <FormattedMessage id="specialty.manage-specialty" />
          </div>
          <div className="add-new-specialty row">
            <div className="col-6 form-group">
              <label>
                {" "}
                <FormattedMessage id="specialty.specialty-name" />
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
                <FormattedMessage id="specialty.image" />
              </label>
              <input
                className="form-control-file"
                type="file"
                onChange={(event) => this.handleOnchangeImage(event)}
              />
            </div>
            <div className="col-12">
              <MdEditor
                style={{ height: "300px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleEditorChange}
                value={this.state.descriptionMarkdown}
              />
            </div>
            <div className="col-12">
              <button
                className={
                  this.state.isEditSpecialty === false
                    ? "btn-save-specialty  btn-primary"
                    : "btn-edit-specialty btn-warning"
                }
                onClick={
                  this.state.isEditSpecialty === false
                    ? () => this.handleSaveNewSpecialty()
                    : () => this.doEditSpecialty()
                }
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <div className="ms-title title mt-3">
          {" "}
          <FormattedMessage id="specialty.list-specialty" />
        </div>
        <div className="users-table mt-3 mx-5 mb-5">
          <table id="customers">
            <tbody>
              <tr>
                <th>
                  {" "}
                  <FormattedMessage id="specialty.number" />
                </th>
                <th>
                  {" "}
                  <FormattedMessage id="specialty.specialty-name" />
                </th>
                <th>
                  {" "}
                  <FormattedMessage id="specialty.action" />
                </th>
              </tr>

              {arrSpecialty &&
                arrSpecialty.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      {/* <td>{item.lastName}</td>
                      <td>{item.address}</td> */}
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => this.handleEditSpecialty(item)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => this.handleDeleteSpecialty(item)}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
