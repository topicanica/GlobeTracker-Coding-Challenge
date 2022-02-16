import React, { useState } from 'react';

import { availableRoles } from '../constants/roles';
import useUserForm from './CustomHook';
import { gql, useMutation } from '@apollo/client';
import { IUserForm } from '../interfaces/IUser';
import { useParams } from 'react-router-dom'
import { validate } from '../utils/validation';
import { Alert, Button, Col, Form, InputGroup, ListGroup, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


export const EditUserForm = () => {
    const GET_USERS = gql`
          query {
              getUsers {
                  id
                  firstName
                  lastName
                  email
                  phoneNumber
                  userType
                  dateCreated
              }
          }
  `;
    const UPDATE_USER = gql`
                mutation updateUser($id : Int!,$updateUserInput: UpdateUserInput!){
                    updateUser(id : $id,updateUserInput: $updateUserInput)
                    {
                        id
                        firstName
                        lastName
                        email
                        phoneNumber
                        userType
                        dateCreated
                    }
                }
            `;

    const { id } = useParams();
    let errors: IUserForm = {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        userType: "",
    };
    const navigate = useNavigate();
    const [UpdateUserForm] = useMutation(UPDATE_USER, {
        refetchQueries: [{ query: GET_USERS }],
        awaitRefetchQueries: true,
    });
    const [formerrors, setFormErrors] = useState<IUserForm>();
    const userCallback = (inputs: IUserForm) => {
        errors = validate(inputs, setFormErrors);
        setFormErrors(errors);
        if (!formerrors) {
            UpdateUserForm({
                variables: {
                    updateUserInput: {
                        firstName: inputs.firstName,
                        lastName: inputs.lastName,
                        email: inputs.email,
                        phoneNumber: inputs.phoneNumber,
                        userType: inputs.userType,
                    },
                    id: Number(id),
                }

            })
            navigate('/');
        }

    };
    const { inputs, handleInputChange, handleSubmit } = useUserForm(userCallback, {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        userType: availableRoles.at(0),
    });

    return (
        <Form onSubmit={handleSubmit}>
            <fieldset>
                <legend >User details</legend>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>First name *</Form.Label>
                        <Form.Control
                            id="firstName"
                            name="firstName"
                            type="text"
                            onChange={handleInputChange}
                            value={inputs.firstName}
                            placeholder="Placeholder" />
                        <br />
                        {formerrors?.firstName && (
                            <Alert variant='danger'>{formerrors.firstName}</Alert>
                        )}
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Last name *</Form.Label>
                        <Form.Control
                            id="lastName"
                            name="lastName"
                            onChange={handleInputChange}
                            value={inputs.lastName}
                            type="text"
                            placeholder="Placeholder" />
                        <br />
                        {formerrors?.lastName && (
                            <Alert variant='danger'>{formerrors.lastName}</Alert>
                        )}
                    </Form.Group>
                </Row>
            </fieldset>

            <Row className="mb-3">
                <Form.Group as={Col} >
                    <Form.Label>Phone number *</Form.Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">+298</InputGroup.Text>
                        <Form.Control
                            id="phoneNumber"
                            name="phoneNumber"
                            type="text"
                            onChange={handleInputChange}
                            value={inputs.phoneNumber}
                            placeholder="Placeholder" />
                    </InputGroup>
                    {formerrors?.phoneNumber && (
                        <Alert variant='danger'>{formerrors.phoneNumber}</Alert>
                    )}
                </Form.Group>
                <Form.Group as={Col} >
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        id="email"
                        name="email"
                        type="text"
                        onChange={handleInputChange}
                        value={inputs.email}
                        placeholder="Placeholder" />
                    <br />
                    {formerrors?.email && (
                        <Alert variant='danger'>{formerrors.email}</Alert>
                    )}
                </Form.Group>
            </Row>
            <fieldset>
                <legend >User type</legend>
                <Form.Group as={Col} >

                    <ListGroup >
                        {availableRoles.map((type, index) => (
                            <ListGroup.Item key={type}>
                                <Form.Check defaultChecked={index === 0}
                                    id="userType"
                                    label={type}
                                    name="userType"
                                    value={type}
                                    key={type}
                                    onChange={handleInputChange}
                                    type="radio"
                                />
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Form.Group>
            </fieldset>

            <Button variant="outline-primary" type="button" onClick={() => navigate('/')}>
                Cancel
            </Button>
            <Button variant="primary" type="submit">
                Save changes
            </Button>

        </Form>
    );
};
export default EditUserForm;