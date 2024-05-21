import { Expo } from "expo-server-sdk";

const expo = new Expo();
let expoPushTokens = [];

export const saveToken = (token) => {
  if (!Expo.isExpoPushToken(token)) {
    throw new Error("Token is not a valid Expo push token");
  }
  if (expoPushTokens.indexOf(token) === -1) {
    expoPushTokens.push(token);
  }
};

export const sendNotification = async (messages) => {
  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];

  for (const chunk of chunks) {
    try {
      let ticketChunks = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...ticketChunks);
    } catch (error) {
      console.error(error);
    }
  }
};

export const createNotificationMessage = (pushToken, title, body, iconApp) => {
  return pushToken.map((pushToken) => ({
    to: pushToken,
    sound: "default",
    title,
    body,
    iconApp,
  }));
};

export const getAllTokens = () => {
  return expoPushTokens;
};
