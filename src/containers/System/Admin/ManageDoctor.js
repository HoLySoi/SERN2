import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { LANGUAGES, CRUD_ACTIONS } from "../../../utils";
import { getDetailInforDoctor } from "../../../services/userService";

const mdParser = new MarkdownIt();

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //save to Markdown table
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
      listDoctor: [],
      hasOldData: false,

      //save to doctor_infor table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      selectedPrice: "",
      selectedPayment: "",
      selectProvince: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.getAllRequiredDoctorInfor();
  }

  buildDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi =
          type === "USERS"
            ? `${item.lastName} ${item.firstName}`
            : item.valueVi;
        let labelEn =
          type === "USERS"
            ? `${item.firstName} ${item.lastName}`
            : item.valueEn;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctor: dataSelect,
      });
    }

    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctors,
        "USERS"
      );
      this.setState({
        listDoctor: dataSelect,
      });
    }

    if (
      prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor
    ) {
      let { resPayment, resPrice, resProvince } =
        this.props.allRequiredDoctorInfor;
      let dataSelectPrice = this.buildDataInputSelect(resPrice);
      let dataSelectPayment = this.buildDataInputSelect(resPayment);
      let dataSelectProvince = this.buildDataInputSelect(resProvince);
      console.log(
        "hoi dan it: data new: ",
        dataSelectPrice,
        dataSelectPayment,
        dataSelectProvince
      );
      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  handleSaveContentMarkdown = () => {
    let { hasOldData } = this.state;
    this.props.saveDetailDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
    });
  };

  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption });
    let res = await getDetailInforDoctor(selectedOption.value);

    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown;
      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
      });
    }
  };

  handleOnChangeDesc = (event) => {
    this.setState({
      description: event.target.value,
    });
  };
  render() {
    let { hasOldData } = this.state;

    return (
      <div className="manage-doctor-container m-3">
        <div className="manage-doctor-title title text-center my-4">
          <FormattedMessage id="admin.manage-doctor.title" />
        </div>
        <div className="more-infor d-flex">
          <div className="content-left form-group w-25 mr-3">
            <label>
              <FormattedMessage id="admin.manage-doctor.select-doctor" />
            </label>
            <Select
              value={this.state.selectedOption}
              onChange={this.handleChangeSelect}
              options={this.state.listDoctor}
              placeholder={"Chọn bác sĩ"}
            />
          </div>
          <div className="content-right form-group w-75">
            <label>
              <FormattedMessage id="admin.manage-doctor.intro" />
            </label>
            <textarea
              className="form-control "
              rows="5"
              onChange={(event) => this.handleOnChangeDesc(event)}
              value={this.state.description}
            ></textarea>
          </div>
        </div>

        <div className="more-infor-extra row">
          <div className="col-4 form-group">
            <label>Chọn giá</label>
            <Select
              //value={this.state.selectOption}
              //onChange={this.handleChangeSelect}
              options={this.state.listPrice}
              placeholder={"Chọn giá"}
            />
          </div>

          <div className="col-4 form-group">
            <label>Chọn phương thức thanh toán</label>
            <Select
              //value={this.state.selectOption}
              //onChange={this.handleChangeSelect}
              options={this.state.listPayment}
              placeholder={"Chọn phương thức thanh toán"}
            />
          </div>

          <div className="col-4 form-group">
            <label>Chọn tỉnh thành</label>
            <Select
              //value={this.state.selectOption}
              //onChange={this.handleChangeSelect}
              options={this.state.listProvince}
              placeholder={"Chọn tỉnh thành"}
            />
          </div>
          <div className="col-4 form-group">
            <label>Tên phòng khám</label>
            <input className="form-control" />
          </div>
          <div className="col-4 form-group">
            <label>Địa chỉ phòng khám</label>
            <input className="form-control" />
          </div>
          <div className="col-4 form-group">
            <label>Note</label>
            <input className="form-control" />
          </div>
        </div>

        <div className="manage-doctor-editor"> </div>

        <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={this.handleEditorChange}
          value={this.state.contentMarkdown}
        />
        <button
          onClick={() => this.handleSaveContentMarkdown()}
          className={
            hasOldData === true
              ? "save-content-doctor btn btn-warning m-3 w-25"
              : "create-content-doctor btn btn-primary m-3 w-25"
          }
        >
          {hasOldData === true ? (
            <span>
              <FormattedMessage id="admin.manage-doctor.save" />
            </span>
          ) : (
            <span>
              <FormattedMessage id="admin.manage-doctor.add" />
            </span>
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
