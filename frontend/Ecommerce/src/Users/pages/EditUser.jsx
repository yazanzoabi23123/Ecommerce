import React from 'react'
import useUsers from '../../Users/hooks/useUsers';
import useForm from '../../Users/hooks/useForm';
import { Container } from '@mui/material';
import UserForm from '../../Users/components/UserForm';
import initialSignupForm from '../../Users/helpers/initialForms/initialSignupForm';
import signupSchema from '../../Users/models/signupSchema';
import { useUser } from '../../Users/providers/UserProvider';
import ROUTES from '../../routes/routesModel';
import { Navigate, useNavigate } from 'react-router';

export default function EditUser() {
    const { handleEditUser } = useUsers();

  const { value, ...rest } = useForm(
    initialSignupForm,
    signupSchema,
    handleEditUser
  );

  return (
    <Container
    sx={{
      paddingTop: 8,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <UserForm
      onSubmit={rest.onSubmit}
      onReset={rest.handleReset}
      onFormChange={rest.validateForm}
      title="Update User"
      errors={value.errors}
      data={value.data}
      onInputChange={rest.handleChange}
      setData={rest.setData}
      
     />      
  </Container>
  )
}
