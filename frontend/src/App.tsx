import { useState, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Users } from "./components/Users";
import { IUsers } from './interfaces/IUser';
import AddUserForm from './components/AddUserForm';
import EditUserForm from './components/EditUserForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert, Spinner } from 'react-bootstrap';

export const App = () => {
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

  const [users, setUsers] = useState<IUsers["users"]>([]);
  const { loading, error, data } = useQuery(GET_USERS);
  useEffect(() => {
    if (loading === false && data) {
      setUsers(data.getUsers);
    }
  }, [loading, data, users])

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
    <Router>
      <div className='container'>
        <h2><b>Manage users</b></h2>

        <Routes>
          <Route
            path='/'
            element={<Users users={users} />}
          />
        </Routes>
        <Routes>
          <Route path='edituser/:id' element={<EditUserForm />} />
        </Routes>
        <Routes>
          <Route path='adduser' element={<AddUserForm />} />
        </Routes>
      </div>
    </Router>
  )
}
export default App;