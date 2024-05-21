import { google } from "googleapis";

const SCOPE = ["https://www.googleapis.com/auth/drive"];

// Fungsi untuk mengotentikasi dan memberikan akses ke Google Drive API
async function authorize() {
  const jwtClient = new google.auth.JWT(
    process.env.GOOGLE_CLIENT_EMAIL,
    null,
    process.env.GOOGLE_PRIVATE_KEY,
    SCOPE
  );

  await jwtClient.authorize();

  return jwtClient;
}

export default authorize;
