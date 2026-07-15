import productModel, { IProduct } from "../models/product.model";

export async function getAllProducts() {
  const products = await productModel.find();

  return products;
}

export async function getProductById(id: string) {
  const product = await productModel.findById(id);

  return product;
}

export async function createProduct(data: IProduct) {
  const product = await productModel.create(data);

  return product;
}

export async function updateProductById(id: string, data: Partial<IProduct>) {
  const updatedProduct = await productModel.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  });

  return updatedProduct;
}

export async function deleteProductById(id: string) {
  const deletedProduct = await productModel.findByIdAndDelete(id);

  return deletedProduct;
}
