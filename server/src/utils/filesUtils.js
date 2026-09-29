import { v2 as cloudinary } from "cloudinary";

const generateFileBase64Url = (fileBuffer, fileMimetype) => {
    const fileBase64 = fileBuffer.toString("base64");
    const fileUrl = `data:${fileMimetype};base64,${fileBase64}`;
    return fileUrl;
}

const streamUpload = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: "post_photos", resource_type: "auto" },
            (error, result) => {
                if(result) resolve(result);
                else reject(error);
            }
        );
        stream.end(fileBuffer);
    });
};

export { generateFileBase64Url, streamUpload };
