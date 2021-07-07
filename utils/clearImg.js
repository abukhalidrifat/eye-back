const fs = require('fs');
const path = require('path');

clearImage = (filePath) => {
    const file = path.join(__dirname,'../uploads/', filePath);
    fs.unlink(file,() => {});
}

module.exports = clearImage;