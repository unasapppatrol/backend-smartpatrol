import { google } from "googleapis";

const SCOPE = ["https://www.googleapis.com/auth/drive"];

// Fungsi untuk mengotentikasi dan memberikan akses ke Google Drive API
async function authorize() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!clientEmail || !privateKey) {
    throw new Error("Missing Google API credentials");
  }

  const jwtClient = new google.auth.JWT(
    clientEmail,
    null,
    privateKey.replace(/\\n/g, "\n"), // Mengganti string literal '\n' menjadi newline karakter sebenarnya
    SCOPE
  );

  await jwtClient.authorize();
  return jwtClient;
}

export default authorize;
