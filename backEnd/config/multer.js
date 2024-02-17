import multer from "multer";

const storage= multer.diskStorage(
  { 
    destination:(req, file, callback) => {
      callback(null, 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/')
    },
    filename:(req, file, callback) => {
      callback(null, file.originalname)
    }
  });

const upload = multer({storage:storage}).single('file');

export default upload