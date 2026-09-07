
const generateFileBase64Url = (fileBuffer, fileMimetype) => {
    const fileBase64 = fileBuffer.toString("base64");
    const fileUrl = `data:${fileMimetype};base64,${fileBase64}`;
    return fileUrl;
}

export { generateFileBase64Url };
