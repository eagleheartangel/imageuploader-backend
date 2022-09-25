import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const imageSchema = new Schema(
  {
    url: { type: String },
    publicid: { type: String },
    description: String,
  },
  {
    timestamps: true,
    versionKey: false,
    sparse: true,
  }
);

imageSchema.plugin(mongoosePaginate);

imageSchema.methods.toJSON = function () {
  const { password, _id, ...image } = this.toObject();
  image.uid = _id;
  return image;
};
export default model('Image', imageSchema);
