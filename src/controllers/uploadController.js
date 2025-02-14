const multer = require('multer');
const path = require('path');

// Configure Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Store files in 'uploads' directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Rename file with timestamp
    }
});

// File Filter (Only Allow Specific Formats)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/msword'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PDF, JPEG, XLSX, and DOCX are allowed.'));
    }
};

// Initialize Multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
});

exports.uploadFiles = (req, res) => {
    if (!req.files || req.files.length === 0) {
        return responseHelper.errorResponse(res, 'No files uploaded');
    }
    return responseHelper.successResponse(res, 'Files uploaded successfully', req.files);
};

// Multer Middleware Exported for Routes
exports.uploadMiddleware = upload.array('files', 10); 
