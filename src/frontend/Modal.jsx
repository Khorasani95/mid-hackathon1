import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const SmallModal = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Open Modal
      </Button>

      <Modal show={show} onHide={handleClose} size="sm">
        <Modal.Header closeButton>
          <Modal.Title>Enter Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formInput1">
              <Form.Label>Input 1</Form.Label>
              <Form.Control type="text" size="sm" placeholder="Enter first value" />
            </Form.Group>

            <Form.Group controlId="formInput2" className="mt-2">
              <Form.Label>Input 2</Form.Label>
              <Form.Control type="text" size="sm" placeholder="Enter second value" />
            </Form.Group>

            <Form.Group controlId="formInput3" className="mt-2">
              <Form.Label>Input 3</Form.Label>
              <Form.Control type="text" size="sm" placeholder="Enter third value" />
            </Form.Group>

            <Form.Group controlId="formInput4" className="mt-2">
              <Form.Label>Input 4</Form.Label>
              <Form.Control type="text" size="sm" placeholder="Enter fourth value" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SmallModal;