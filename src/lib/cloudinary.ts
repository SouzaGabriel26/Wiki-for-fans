import {
  v2 as cloudinary,
  UploadApiOptions,
  UploadApiResponse,
} from 'cloudinary';

cloudinary.config({
  cloud_name: 'gabrielfree',
  secure: true,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function createAsset(buffer: Uint8Array, options: UploadApiOptions) {
  const uploadResponse = await new Promise<UploadApiResponse>(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(options, (error, result) => {
          if (error) {
            reject(error);
            return;
          }

          result && resolve(result);
          return;
        })
        .end(buffer);
    },
  );

  return uploadResponse;
}

async function deleteAsset(public_id: string) {
  await cloudinary.uploader.destroy(public_id);
}

export const cloudinaryService = Object.freeze({
  createAsset,
  deleteAsset,
});
