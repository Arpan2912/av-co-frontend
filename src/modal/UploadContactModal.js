import React, { Component } from 'react';
import { Modal, ModalBody, ModalHeader, Button } from "reactstrap";
import Dropzone from 'react-dropzone';
import ContactService from '../services/ContactService';
let file = null;

class UploadContactModal extends Component {

    state = {
        file: null,
        errorMessage: ''
    }

    componentDidMount(){
        console.log("opening modal")
    }
    uploadFile = () => {
        if(!this.state.file) {
            this.setState({ errorMessage: 'Please select file' })
            return;
        }
        ContactService.uploadExcel(this.state.file)
            .then(data => {
                this.props.toggle(true);
                console.log("data", data);
            })
            .catch(e => {
                console.error("e", e);
            })
    }

    onDropFile = (acceptedFiles) => {
        file = acceptedFiles[0];
        this.setState({ file: file });
    }

    render() {
        return (
            // <div>
                <Modal isOpen={this.props.show} toggle={() => null} >
                    <ModalHeader>
                        <div>
                            <span>Upload Excel</span>
                            <span style={{ right: '10px', position: 'absolute' }} onClick={this.props.closeModal}>X</span>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <Dropzone onDrop={acceptedFiles => this.onDropFile(acceptedFiles)}>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()} style={{ height: '300px', border: '1px solid black', marginBottom: '20px' }}>
                                        <input {...getInputProps()} />
                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                        {this.state.file && <div>{this.state.file.name}</div>}
                        {this.state.errorMessage && !this.state.file && <div className="error">* {this.state.errorMessage}</div>}
                        <div style={{ textAlign: 'right' }}>
                            <Button style={{ width: '100%', backgroundColor: '#ab3b60' }} onClick={this.uploadFile.bind(this)}>Upload </Button>
                        </div>
                    </ModalBody>
                </Modal>
            // </div>
        );
    }
}

export default UploadContactModal;

// export default ImportAttendeeModal;