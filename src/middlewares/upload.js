import multer from 'multer';

const documentFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(doc(x)?|htm(l)?|odt|pdf|ppt(x)?|txt)$/)) {
        return cb({ name: 'FileUploadError', message: 'Somente documentos (.doc, .docx, .htm, .html, .odt, .pdf, .ppt, .pptx, .txt) são aceitos!' }, false);
    }
    cb(null, true);
};

const storage = multer.diskStorage({
    destination: './uploadedFiles/',
    filename: (_, file, callback) => {
        callback(null, `${file.originalname}__${new Date()}`);
    },
});

const upload = multer({ storage, fileFilter: documentFilter });

export default upload;
