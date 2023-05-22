import multerS3 from 'multer-s3';
const multer = require('multer')
const {S3Client , DeleteObjectCommand} = require('@aws-sdk/client-s3')

const s3 = new S3Client({
  region: 'ap-south-1',
  credentials:{
    accessKeyId: process.env.BUCKET_ACCESSKEYID,
    secretAccessKey: process.env.BUCKET_SECRET_ACCESSKEY,
  }});

  const uploadS3 = multer({
    storage: multerS3({
      s3: s3,
      bucket: "yummersbucket",
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
      }
    }),
  });

  module.exports=uploadS3;

 export const deleteFile = async (filename: string) => {
    const deleteParams = {
      Bucket: 'yummersbucket',
      Key: filename,
    };
    return s3.send(new DeleteObjectCommand(deleteParams));
  };


  
 