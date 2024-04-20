import { ProductFeatureServices } from "./productFeatures";
import { Log } from "../lib/log";

console.log("ProductServices");

export class ProductServices {
  constructor(
    private Product:any,
    private ProductMainList:any,
    private ProductFeatureServices: ProductFeatureServices
  ) {}

  public async getProductById(id:any) {
    console.log("manikutty",id)
    const product = await this.Product.findById(id);
    if (product?._id) return product;
    
    return "Product is no more available.";
  }
public async greeting() {
  await new Promise(resolve => setTimeout(resolve, 5000));
  console.log("Hello, world!");
}

  async getProductMainList() {
    // await this.greeting()
    return await this.ProductMainList.find();
  }

  async createProduct(data:any) {
    const product = await this.Product.create(data);
    if (product?._id) {
      await Promise.all([
        this.featureUpdate(product, true, false),
        this.updateProductFromMainList(product),
      ]);
    }
    return product;
  }

  async findProductFromMainList(product:any) {
    const { family, category, name } = product;
    return await this.ProductMainList.find({
      type: category,
      [`data.${family}.name`]: name,
    });
  }

  async removeProductFromMainList(product:any) {
    const { name, category, family } = product;
    return await this.ProductMainList.findOneAndUpdate(
      { type: category, [`data.${family}.name`]: name },
      { $unset: { [`data.${family}`]: {} }, updatedAt: new Date() },
      { new: true }
    );
  }

  async updateProductFromMainList(product:any) {
    const {
      _id,
      category,
      name,
      description,
      price,
      image,
      stock,
      ratings,
      family,
    } = product;

    return await this.ProductMainList.findOneAndUpdate(
      { type: category },
      {
        $set: {
          [`data.${family}`]: {
            productId: _id,
            category,
            name,
            description,
            price,
            image,
            stock,
            ratings,
          },
        },
        updatedAt: new Date(),
      },
      { upsert: true, new: true }
    );
  }

  async updateProductById(id:any, body:any) {
    const product = await this.Product.findByIdAndUpdate(
      id,
      { ...body },
      { new: true }
    );
    if (product?._id) {
      await this.updateProductFromMainList(product);
    }
    return product;
  }

  async deleteProductById(id:any) {
    const product = await this.Product.findByIdAndDelete(id, { new: true });
    if (product?._id) {
      await this.featureUpdate(product, false, true);
      const updatedList = await this.removeProductFromMainList(product);
      const numberOfProducts = updatedList?.data?.keys()
        ? Array.from(updatedList.data.keys()).length
        : 0;
      if (updatedList._id && !numberOfProducts) {
        await this.ProductMainList.findByIdAndDelete(updatedList._id);
      }
    }
    return product;
  }

  async featureUpdate(product:any, add:any, remove:any) {
    if (Array.isArray(product?.features) && product.features.length) {
      const { family, _id, features } = product;
      const data = {
        family,
        id: _id,
        addingFeatures: add ? features : [],
        removingFeatures: remove ? features : [],
      };
      await this.ProductFeatureServices.updateFeature(data);
    }
  }

  async updateOrAddField(body:any) {
    const product = await this.Product.updateMany(
      {},
      {
        $set: {
          images: body.images,
        },
      },
      { multi: true }
    );

    return product;
  }
}
