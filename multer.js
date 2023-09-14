      
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        // Determine the destination folder based on the file type
        if (file.mimetype.startsWith('image')) {
            callback(null, path.join(__dirname, '..', 'C:\\Users\\Mactosys-10\\Desktop\\view\\images'));
        } else if (file.mimetype === 'application/pdf') {
            callback(null, path.join(__dirname, '..', '/view/documents'));
        } else {
            callback(new Error('Unsupported file type'), null);
        }
    },
    filename: (req, file, callback) => {
        // Generate a unique filename for the uploaded file
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        const fileName = file.fieldname +'-'+ uniqueSuffix + fileExtension;
        callback(null, fileName);
    }
});
const uploads = multer({ storage: storage });
module.exports = uploads;
