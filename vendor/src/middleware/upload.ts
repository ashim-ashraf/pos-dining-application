import multerS3 from 'multer-s3';
const multer = require('multer')
const {S3Client} = require('@aws-sdk/client-s3')

const s3 = new S3Client({
  region: 'ap-south-1',
  credentials:{
    accessKeyId: "AKIA2XSQGD76W7UNSEFQ",
    secretAccessKey: "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",
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