const express = require('express');

const router = express.Router();
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const MulterAzureStorage = require('multer-azure-blob-storage').MulterAzureStorage;

const resolveBlobName = (req, file) => {
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
      const blobName = `${Date.now()}-${uuidv4()}${path.extname(file.originalname)}`;
      resolve(blobName);
    });
  };

  const azureStorage = new MulterAzureStorage({
    connectionString:
      'DefaultEndpointsProtocol=https;AccountName=kelimecom;AccountKey=G143UhcYyGcZ2gqT7JSKkZawkmLwyigYHkWY6BIVaFN35Gyn+UkMEeJW6bFDU9sl8QFp5Fu6S0J25eOVWq34YA==;EndpointSuffix=core.windows.net',
    containerName: 'public',
    blobName: resolveBlobName,
    containerAccessLevel: 'blob',
  });

  const upload = multer({
    storage: azureStorage,
  });

router.route('/').post(upload.any(), (req, res) => {
    if (!req.session && !req.session.user) {
      return res.redirect("/");
    }
    if (req && req.files && req.files.length) {
      const files = req.files.map((file) => {
        const $file = file;
        // eslint-disable-next-line prefer-destructuring
        $file.url = $file.url.split('?')[0];
        // eslint-disable-next-line no-console
        return $file;
      });
      res.status(200).send({ success: true, url: files[0].url });
    } else {
        res.status(400).send({ success: false, error: 'Sistem yükleme hatası!' });
    }
  });

  module.exports = router;
