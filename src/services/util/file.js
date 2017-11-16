import fs from 'fs';
import path from 'path';

const readFileUploaded = (filename) => {
    const fullPath = path.join('uploadedFiles', filename);
    try {
        const result = fs.createReadStream(fullPath);
        return Promise.resolve(result);
    } catch (err) {
        return Promise.reject(err);
    }
};

export default readFileUploaded;
