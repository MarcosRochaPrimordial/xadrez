import React, { Component, useState } from "react";
import { Modal, Button } from 'react-bootstrap';

interface IProps {
    show: boolean;
    setShow: Function;
}

export default class Message extends Component<any, IProps> {
    show: boolean;
    setShow: Function;

    handleClose = () => this.setShow(false);

    constructor(props: IProps) {
        super(props);
        [this.show, this.setShow] = useState(false);
    }

    render() {
        return (
            <Modal show={this.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}