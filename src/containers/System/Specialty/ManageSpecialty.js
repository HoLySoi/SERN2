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
  getAllDetailSpecialtyById,
  deleteSpecialty,
} from "../../../services/userService";
const mdParser = new MarkdownIt();

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      arrSpecialty: [],
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
      console.log("check res: ", res);
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
  render() {
    // let { allDays, allAvailableTime } = this.state;
    // let { language } = this.props;
    console.log("check state", this.state);
    let arrSpecialty = this.state.arrSpecialty;
    return (
      <>
        {" "}
        <div className="manage-specialty-container">
          <div className="ms-title">Quản lý chuyên khoa</div>
          <div className="add-new-specialty row">
            <div className="col-6 form-group">
              <label> Tên chuyên khoa </label>
              <input
                className="form-control"
                type="text"
                value={this.state.name}
                onChange={(event) => this.handleOnChangeInput(event, "name")}
              />
            </div>
            <div className="col-6 form-group">
              <label> Ảnh chuyên khoa </label>
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
                className="btn-save-specialty"
                onClick={() => this.handleSaveNewSpecialty()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <div className="ms-title mt-3">Danh sách Chuyên khoa</div>
        <div className="users-table mt-3 mx-5 mb-5">
          <table id="customers">
            <tbody>
              <tr>
                <th>STT</th>
                <th>Tên Chuyen khoa</th>
                <th>Actions</th>
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
                          // onClick={() => this.handleEditUser(item)}
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
