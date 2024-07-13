import db from "@/lib/db";
import PageHeader from "../../_components/page-header";

import ProductForm from "../../_components/product-form";

type Props = {
  params: { id: string };
};

const EditProductPage = async ({ params: { id } }: Props) => {
  const product = await db.product.findUnique({
    where: { id },
  });

  return (
    <>
      <PageHeader>Edit Product</PageHeader>
      <ProductForm product={product} />
    </>
  );
};

export default EditProductPage;
