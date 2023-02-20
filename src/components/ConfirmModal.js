import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Modal } from 'reactstrap';

import './ConfirmModal.scss';
import * as actions from "../store/actions";
import { KeyCodeUtils } from "../utils";

class ConfirmModal extends Component {

    constructor(props) {
        super(props);
        this.acceptBtnRef = React.createRef();
    }

    initialState = {
    };

    state = {
        ...this.initialState
    };

    componentDidMount() {
        document.addEventListener('keydown', this.handlerKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handlerKeyDown);
    }

    handlerKeyDown = (event) => {
        const keyCode = event.which || event.keyCode;
        if (keyCode === KeyCodeUtils.ENTER) {
            if (!this.acceptBtnRef.current || this.acceptBtnRef.current.disabled) return;
            this.acceptBtnRef.current.click();
        }
    }

    onAcceptBtnClick = () => {
        this.props?.onConfirm && this.props.onConfirm();
    }

    onClose = () => {
        this.props?.onClose && this.props.onClose();
    }

    render() {
        const { contentOfConfirmModal, isOpen, children, isButtonDisable } = this.props;
        return (
            <Modal isOpen={isOpen} className='confirm-modal' centered={true}>
                <div className="modal-header">
                    <div className="modal-title">
                        <FormattedMessage id={"common.confirm"} />
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-close" onClick={this.onClose}>
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>

                <div className="modal-body">
                    <div className="confirm-modal-content">
                        <div className="row">
                            <div className="col-12">
                                {children ? children : <FormattedMessage id={contentOfConfirmModal.messageId ? contentOfConfirmModal.messageId : "common.confirm-this-task"} />}
                            </div>

                            <hr />

                            <div className="col-12">
                                <div className="btn-container text-right">
                                    <button className="btn btn-warning" onClick={this.onClose} >
                                        <FormattedMessage id="common.close" />
                                    </button>
                                    <button ref={this.acceptBtnRef} className="btn btn-danger" onClick={this.onAcceptBtnClick} disabled={isButtonDisable}>
                                        <FormattedMessage id={"common.accept"} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal >
        );
    }

}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
        contentOfConfirmModal: state.app.contentOfConfirmModal
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setContentOfConfirmModal: (contentOfConfirmModal) => dispatch(actions.setContentOfConfirmModal(contentOfConfirmModal))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmModal);
