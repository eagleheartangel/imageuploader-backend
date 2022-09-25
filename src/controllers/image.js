import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import Image from '../models/images';

import fsExtra from 'fs-extra';
import dotenv from 'dotenv';
dotenv.config();

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: process.env.SECURE,
});

export const upload = async (req, res) => {
  try {
    const { description } = req.body;
    if (
      !req.files ||
      req.files == null ||
      Object.keys(req.files).length === 0
    ) {
      return await res.status(400).send({ message: 'There is not an image!' });
    }
    // Limit
    const imageCount = await Image.estimatedDocumentCount();
    if (imageCount >= 27) {
      return await res
        .status(500)
        .send({ message: 'Limit exceeded, please delete some images!' });
    }
    // validating extension
    const ext = req.files.image.mimetype.split('/')[1];
    const extension = {
      jpg: true,
      png: true,
      jpeg: true,
      gif: true,
    };
    const validate = extension[ext] || false;
    if (validate == false) {
      return await res.status(400).send({
        message: 'Invalid image extension!',
      });
    }
    // creating a name and path to upload
    const fileName = uuidv4() + '.' + ext;
    const uploadPat = path.join(process.cwd(), 'src', 'uploads', fileName);
    await req.files.image.mv(uploadPat);
    // uploading to cloudinary and saving to mongoDB
    const result = await cloudinary.uploader.upload(uploadPat);
    const data = new Image({
      url: result.secure_url,
      publicid: result.public_id,
      description: description,
    });
    await data.save();
    fsExtra.removeSync(uploadPat);
    return await res.status(200).send({ message: 'Image uploaded!' });
  } catch (error) {
    return await res.status(500).send({
      message: 'There is an error uploading your image!',
    });
  }
};

export const getImages = async (req, res) => {
  try {
    var { page } = req.params;
    page ? (page = parseInt(page)) : (page = 1);
    const options = {
      sort: { createdAt: -1 },
      limit: 9,
      page: page,
    };
    const images = await Image.paginate({}, options);
    return await res.status(200).send({
      images: images.docs,
      totalDocs: images.totalDocs,
      totalPages: images.totalPages,
    });
  } catch (error) {
    return await res.status(500).send({
      message: 'There is an error searching images!',
    });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Image.findByIdAndRemove(id);
    const deleted = await cloudinary.uploader.destroy(image.publicid);
    return await res.status(200).send({
      message: 'The image has been deleted!',
      image: image,
      cloudinary: deleted,
    });
  } catch (error) {
    return await res.status(500).send({
      message: 'There is an error deleting your image!',
    });
  }
};
