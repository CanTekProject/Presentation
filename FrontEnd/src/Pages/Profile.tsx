import React, { useState } from "react";
import styled from "styled-components";

const HeaderH1 = styled.div`
  padding: 35px;
  text-align: center;
  font-size: 50px;
  color: white;
`;

const FormInput = styled.input`
  color: black;
`;

const Container = styled.div`
  min-height: calc(80vh - 140px);
  padding-left: 15vw;
  padding-right: 15vw;
  padding-top: 70px;
  padding-bottom: 70px;
  margin-bottom: 20px;
`;

const FormContainer = styled.div`
  background-color: purple;
  border-radius: 0.5em;
  padding: 0.5em;
`;

const Label = styled.label`
  color: white;
  margin: 0.5em;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1em;
  align-items: center;
  padding: 10px 20px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const TextArea = styled.textarea`
  margin-bottom: 0.5em;
`;

const SavedDataContainer = styled.div`
  background-color: purple;
  color: white;
`;

const Profile = () => {
  const initialData = {
    username: "User123",
    email: "email@email.com",
    passwrd: "********",
    about: "....",
  };

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialData);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Save the data to your preferred storage or API endpoint
    setIsEditing(false);
    console.log(formData);
  };

  return (
    <>
      <Container>
        <HeaderH1>Profile</HeaderH1>

        {isEditing ? (
          <FormContainer>
            <form>
              <div className="form-group">
                <Label htmlFor="username">Username</Label>
                <FormInput
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  className="form-control"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <Label htmlFor="email">Email:</Label>
                <FormInput
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Username@gmail.com"
                  className="form-control"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <Label htmlFor="passwrd">Password</Label>
                <FormInput
                  type="password"
                  name="passwrd"
                  id="passwrd"
                  placeholder="Password"
                  className="form-control"
                  value={formData.passwrd}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <Label htmlFor="about">About Me</Label>
                <TextArea
                  name="about"
                  id="about"
                  cols={20}
                  rows={5}
                  placeholder="Tell us about yourself"
                  className="form-control"
                  value={formData.about}
                  onChange={handleInputChange}
                ></TextArea>
              </div>

              <ButtonGroup>
                <button
                  type="button"
                  className="btn1"
                  onClick={handleSaveClick}
                >
                  Save Changes
                </button>
              </ButtonGroup>
            </form>
          </FormContainer>
        ) : (
          <SavedDataContainer>
            <h2>User Information</h2>
            <p>Username: </p>
            <p style={{ color: "black" }}>{formData.username}</p>
            <p>Email: </p>
            <p style={{ color: "black" }}>{formData.email}</p>
            <p>Password: </p>
            <p style={{ color: "black" }}>{formData.passwrd}</p>
            <p>About Me: </p>
            <p style={{ color: "black" }}>{formData.about}</p>
            <div className="edit-button-container">
              <button className="edit-button" onClick={handleEditClick}>
                Edit
              </button>
            </div>
          </SavedDataContainer>
        )}
      </Container>
    </>
  );
};

export default Profile;
