import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadImage = (req, res, next) => {
    upload.single("image")(req, res, (err) => {
        if(err) return res.status(400).json({ success: false, message: err.message });
        next();
    });
};

const uploadImages = (req, res, next) => {
    upload.array("images", 5)(req, res, (err) => {
        if(err) return res.status(400).json({ success: false, message: err.message });
        next();
    });
};

const validateFilePresence = (req, res, next) => {
    try {
        const hasSignleFile = req.file;
        const hasMultipleFiles = req.files && req.files.length > 0;

        if(!hasSignleFile && !hasMultipleFiles) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        next();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export { uploadImage, validateFilePresence, uploadImages };
