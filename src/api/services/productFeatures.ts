import { Log } from "../lib/log";
import { dbOperatorData } from "../utils/utilFunctions";

console.log("ProductFeatureServices");

export class ProductFeatureServices {
  constructor(private productFeatures:any) {}

  async addFeature(data:any) {
    const { family, features } = data;
    const response = await this.productFeatures.create({ family, features });
    return response;
  }

  async updateFeature(data:any) {
    const { family, id, removingFeatures, addingFeatures } = data;
    const response = await this.productFeatures.findOneAndUpdate(
      { family },
      {
        $pull: dbOperatorData(removingFeatures, id),
        $addToSet: dbOperatorData(addingFeatures, id),
      },
      { upsert: true, new: true }
    );
    return response;
  }

  async getFeature(family:any) {
    const response = await this.productFeatures.find({ family });
    return response;
  }
}
