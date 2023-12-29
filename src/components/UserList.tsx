import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Modal, Button, Dropdown } from "react-bootstrap";
import { User } from "../types/types"; // Ensure this path is correct for your User type definition
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPowerOff } from "@fortawesome/free-solid-svg-icons";

// Specify your API endpoint
const API_BASE_URL = "http://127.0.0.1:8000/api/profiles/";

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPompistes, setTotalPompistes] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Fetch Users from the API on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}`);
        const usersData = response.data; // Assign the data to a variable
        setUsers(usersData); 
        setUsers(response.data); 
        setTotalUsers(usersData.length);
        const pompistesCount = usersData.filter((user: User)=> user.role === 'pompiste').length;
        setTotalPompistes(pompistesCount);// Assuming API returns an array of users
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const toggleActiveStatus = (user: User) => {
    console.log("User to toggle:", user); // Log to verify
    setSelectedUser(user); // Set the user you're about to toggle for confirmation
    setShowConfirmation(true); // Show the confirmation modal
  };

  const assignRole = async (user: User, newRole: string) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}${user.user}/assign_role/`,
        { role: newRole }
      );
      if (response.status === 200) {
        const updatedUser = response.data;
        setUsers(
          users.map((u) =>
            u.user === user.user ? { ...u, role: updatedUser.role } : u
          )
        );
        console.log(
          `Role updated to ${updatedUser.role} for user ${updatedUser.username}`
        );
      }
    } catch (error) {
      console.error("Error assigning role:", error);
    }
  };
  const handleAssignRole = async (user: User, newRole: string) => {
    await assignRole(user, newRole);
    // Optionally, you might want to handle any UI updates or confirmations here
  };
 const handleConfirmation = async () => {
  if (selectedUser && selectedUser.user) { // Ensure selectedUser and its id are defined
    console.log("Attempting to toggle:", `${API_BASE_URL}${selectedUser.user}/toggle/`); // Log the URL

    try {
      const response = await axios.patch(`${API_BASE_URL}${selectedUser.user}/toggle/`, {
        is_active: !selectedUser.is_active,
      });

      if (response.status === 200 || response.status === 204) {
        setUsers(users.map(user => 
          user.user === selectedUser.user 
            ? { ...user, is_active: response.data.is_active } 
            : user
        ));
      }
    } catch (error) {
      console.error("Error updating user active status:", error);
    }
  } else {
    console.error("No selected user or user ID is undefined");
  }
  setShowConfirmation(false);
};

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user}>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>{user.is_active ? "Active" : "Inactive"}</td>
              <td>
                <Button size="sm" onClick={() => toggleActiveStatus(user)}>
                  <FontAwesomeIcon icon={faPowerOff} /> Toggle Active
                </Button>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {user.role}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {/* Map through roles and create a dropdown item for each */}
                    {['admin', 'responsable', 'pompiste'].map((role) => (
                      <Dropdown.Item 
                        key={role} 
                        onClick={() => handleAssignRole(user, role)}
                      >
                        {role}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Confirmation Modal */}
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {`Are you sure you want to ${
            selectedUser?.is_active ? "deactivate" : "activate"
          } ${selectedUser?.username}?`}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmation(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmation}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UsersList;
