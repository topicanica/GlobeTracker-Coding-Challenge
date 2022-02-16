import React from "react";
import { Alert, Spinner, Table } from "react-bootstrap";
import { IUsers } from "../interfaces/IUser";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { PencilFill, PlusLg, Trash2Fill } from "react-bootstrap-icons";
import { gql, useMutation } from "@apollo/client";


export const Users: React.FunctionComponent<IUsers> = ({ users }) => {
    const DELETE_USER = gql`
        mutation deleteUser ($id: Int!){
                    deleteUser (id: $id) 
                }
  `;
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
    const [deleteUser, { loading, error }] = useMutation(DELETE_USER, {
        refetchQueries: [{ query: GET_USERS }],
        awaitRefetchQueries: true,
    });
    const presentDate = (userDate: Date) => {
        const date = new Date(userDate);
        return <td>{date.toLocaleDateString('en-GB')}</td>
    }
    if (loading) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>

        );
    }
    if (error) {
        <Alert variant="danger" dismissible>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>{error}</p>
        </Alert>
    }
    return (
        <div className="table-wrapper">
            <div className="table-title">
                <div className="row">
                    <div className="col-xs-5">
                        <h3>User Overview</h3>
                        <a href="/adduser" className="btn btn-primary" ><PlusLg></PlusLg><span>Add User</span></a>
                    </div>
                </div>
            </div>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone number</th>
                        <th>Email</th>
                        <th>User type</th>
                        <th>Date created</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>+298 {user.phoneNumber}</td>
                                <td>{user.email}</td>
                                <td>{user.userType}</td>
                                {presentDate(user.dateCreated)}
                                <td>
                                    <PencilFill style={{ cursor: 'pointer', float: "left", color: "grey" }} onClick={() => window.location.href = '/edituser/' + user.id} />
                                    <Trash2Fill style={{ cursor: 'pointer', float: "right", color: "grey" }} onClick={() => deleteUser({ variables: { id: Number(user.id) } })}></Trash2Fill>
                                </td>
                            </tr>
                        ))) : (
                        <Alert variant='danger'>No users to show</Alert>
                    )}
                </tbody>
            </Table>
        </div>
    );
}

export default Users;












