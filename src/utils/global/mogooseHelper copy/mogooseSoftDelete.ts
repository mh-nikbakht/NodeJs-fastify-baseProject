import { Schema } from "mongoose";

function applyIsDeletedFilter(schema: Schema): void {
  schema.pre(/^find/, function (this: any, next) {
    this.find({ "delete.isDeleted": false });
    next();
  });
  schema.pre(/^findOne/, function (this: any, next) {
    this.findOne({ "delete.isDeleted": false });
    next();
  });
  schema.pre(/^findById/, function (this: any, next: any) {
    this.findById({ "delete.isDeleted": false });
    next();
  });
}

export { applyIsDeletedFilter };
