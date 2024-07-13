import React from 'react'
import PageHeader from '../_components/page-header'
import ProductForm from '../_components/product-form'

type Props = {}

const NewProductPage = (props: Props) => {
  return (
    <>
    <PageHeader>Add Product</PageHeader>

    <ProductForm />

    </>
  )
}

export default NewProductPage