import { google } from "googleapis";
import fs from "fs";

// Fungsi untuk mengunggah file ke Google Drive
async function uploadFile(authClient, file, folderId) {
  return new Promise((resolve, reject) => {
    const drive = google.drive({ version: "v3", auth: authClient });

    const fileMetadata = {
      name: file.originalname,
      parents: [folderId],
    };

    const media = {
      mimeType: file.mimetype,
      body: fs.createReadStream(file.path),
    };

    drive.files.create(
      {
        resource: fileMetadata,
        media: media,
        fields: "id",
      },
      (err, file) => {
        if (err) {
          reject(err);
          return;
        }

        const fileId = file.data.id;
        const webViewLink = `https://drive.google.com/uc?export=view&id=${fileId}`;
        resolve(webViewLink);
      }
    );
  });
}

export default uploadFile;
