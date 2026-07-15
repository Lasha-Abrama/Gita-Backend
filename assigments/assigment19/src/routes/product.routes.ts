import { Request, Response, Router } from "express";
import { adminOnly } from "../middlewares/admin-only.middleware";
import { validateObjectId } from "../middlewares/validate-object-id.middleware";
import { validate } from "../middlewares/validate.middleware";
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById,
} from "../services/product.service";
import {
  createProductSchema,
  updateProductSchema,
} from "../validations/product.validation";

const productRouter = Router();

productRouter.get("/", async (req: Request, res: Response) => {
  const products = await getAllProducts();

  res.status(200).json({
    data: products,
  });
});

productRouter.get(
  "/:id",
  validateObjectId,
  async (req: Request, res: Response) => {
    const product = await getProductById(req.params.id as string);

    if (!product) {
      res.status(404).json({
        message: "Product not found",
      });
      return;
    }

    res.status(200).json({
      data: product,
    });
  },
);

productRouter.post(
  "/",
  validate(createProductSchema),
  async (req: Request, res: Response) => {
    const product = await createProduct(req.body);

    res.status(201).json({
      message: "Product created successfully",
      data: product,
    });
  },
);

productRouter.put(
  "/:id",
  validateObjectId,
  adminOnly,
  validate(updateProductSchema),
  async (req: Request, res: Response) => {
    const updatedProduct = await updateProductById(
      req.params.id as string,
      req.body,
    );

    if (!updatedProduct) {
      res.status(404).json({
        message: "Product not found",
      });
      return;
    }

    res.status(200).json({
      message: "Product updated successfully",
      data: updatedProduct,
    });
  },
);

productRouter.delete(
  "/:id",
  validateObjectId,
  adminOnly,
  async (req: Request, res: Response) => {
    const deletedProduct = await deleteProductById(
      req.params.id as string,
    );

    if (!deletedProduct) {
      res.status(404).json({
        message: "Product not found",
      });
      return;
    }

    res.status(200).json({
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  },
);

export default productRouter;
