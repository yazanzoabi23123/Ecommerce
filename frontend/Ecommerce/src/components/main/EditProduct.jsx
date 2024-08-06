import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import useProducts from './hooks/useProducts';
import { useUser } from '../../Users/providers/UserProvider';
import useForm from '../../Users/hooks/useForm';
import initialProductForm from '../../components/products/helpers/initialForms/initialProductForm';
import productSchema from '../../components/products/helpers/initialForms/joi-schema/productSchema';
import { normalize } from 'joi-browser';
import normalizeProduct from '../../components/products/helpers/initialForms/normalizeProduct';
import ProductForm from './ProductForm';
import { Container } from '@mui/material';
import mapProductToModel from '../../components/products/mapToModel';
export default function EditProduct() {
    const {id} = useParams();
    const { handleUpdateProduct,handleGetProduct, value:{product} } = useProducts();
    const {user} =useUser();
    const {value ,...rest} =useForm(initialProductForm,productSchema,()=>{
        handleUpdateProduct(id,{
            ...normalizeProduct({...value.data}),
            user_id:id,
            
        });

    })
    useEffect(()=>{
        handleGetProduct(id).then((data)=>{
            const modelProduct = mapProductToModel(data);
            rest.setData(modelProduct);
        });
    },[]);
  return (
    <Container
    sx={{
      paddingTop: 5 ,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom:16,
      
    }}
  >
    <ProductForm
     title="edit product"
     onSubmit={rest.onSubmit}
     onReset={rest.handleReset}
     errors={value.errors}
     onFormChange={rest.validateForm}
     onInputChange={rest.handleChange}
     data={value.data}
    />
    </Container>
    

  )
}
