import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadImage = upload.single("image");

const validateFilePresence = (req, res, next) => {
    try {
        if(!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        next();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export { uploadImage, validateFilePresence };
