const cloudinary = require('cloudinary');

cloudinary.config({ 
    cloud_name: 'softdevg2', 
    api_key: '724343993785433', 
    api_secret: 'RRGGdAR5VSxy3tc-3I74pD9nKgw' 
  });

module.exports = { cloudinary };