import React from 'react'
import { func, object, string } from "prop-types";
import Form from './Forms/Form';
import Input from './Forms/Input';

const ProductForm = ({
  onSubmit,
  onReset,
  errors,
  onFormChange,
  onInputChange,
  data,
  title,
}) => {
  return (
    <Form
    onSubmit={onSubmit}
    onReset={onReset}
    errors={errors}
    onChange={onFormChange}
    styles={{ maxWidth: "800px" }}
    title={title}
  >
    <Input
      name="title"
      label="title"
      error={errors.title}
      onChange={onInputChange}
      data={data}
      sm={6}
    />
    
    <Input
      name="description"
      label="description"
      error={errors.description}
      onChange={onInputChange}
      data={data}
      sm={6}
    />
     <Input
      name="price"
      label="price"
      error={errors.price}
      onChange={onInputChange}
      data={data}
      sm={6}
      required={false}
    />
    <Input
      name="imageUrl"
      label="image url"
      error={errors.imageUrl}
      onChange={onInputChange}
      data={data}
      sm={6}
      required={false}
    />
    <Input
      name="quantity"
      label="quantity"
      error={errors.quantity}
      onChange={onInputChange}
      data={data}
      sm={6}
      required={false}
    />
    <Input
      name="imageAlt"
      label="image alt"
      error={errors.imageAlt}
      onChange={onInputChange}
      data={data}
      sm={6}
      required={false}
    />
    
   
  </Form>
  );
}
ProductForm.propTypes = {
    onSubmit: func.isRequired,
    onReset: func.isRequired,
    errors: object.isRequired,
    onFormChange: func.isRequired,
    onInputChange: func.isRequired,
    data: object.isRequired,
    title: string.isRequired,
  };

export default React.memo(ProductForm)