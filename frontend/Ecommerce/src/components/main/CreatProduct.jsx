import { Container } from '@mui/material'
import React from 'react'
import Form from './Forms/Form'
import Input from './Forms/Input'
import useProducts from './hooks/useProducts'
import { useUser } from '../../Users/providers/UserProvider'
import useForm from '../../Users/hooks/useForm'
import initialProductForm from '../../components/products/helpers/initialForms/initialProductForm'
import productSchema from '../../components/products/helpers/initialForms/joi-schema/productSchema'
import normalizeProduct from '../../components/products/helpers/initialForms/normalizeProduct'
import ProductForm from './ProductForm'
import { Navigate } from 'react-router'
import ROUTES from '../../routes/routesModel'

export default function CreatProduct() {
    const {handleCreateProduct} = useProducts();
    const {user} = useUser();
    const { data,errors,setData, ...rest } = useForm(initialProductForm ,productSchema, ()=>{
        handleCreateProduct({
            ...normalizeProduct({...data}),
            
        })
    }
    )
    //if (!user) return <Navigate replace to={ROUTES.ROOT} />;

  return (
    <Container
      sx={{
        paddingTop: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom:12
      }}
      >
    <ProductForm
    title="Creat Product"
    onSubmit={rest.onSubmit}
    onReset={rest.handleReset}
    errors={errors}
    onFormChange={rest.validateForm}
    onInputChange={rest.handleChange}
    data={data}
    />
   
    </Container>
    
  );
}
