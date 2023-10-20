import mongoose from "mongoose";

class mongooseHelper {
  async findAll(collectionName: string, query?: any) {
    const dynamic = mongoose.model(collectionName);
    return await dynamic.find(query);
  }
}

export { mongooseHelper };
