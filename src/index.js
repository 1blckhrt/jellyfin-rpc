// Setting up environment variables
const { config } = require("dotenv");
config();

// Grabbing environment variables
const APP_ID = process.env.APP_ID;
const JELLYFIN_URL = process.env.JELLYFIN_URL;
const API_KEY = process.env.JELLYFIN_API_KEY;

// Importing required modules
const { Client } = require("@xhayper/discord-rpc");
const axios = require("axios");

// Initializing Discord RPC client
const client = new Client({ clientId: APP_ID });

// Function to check for active session
async function checkSession() {
  try {
    const nowPlaying = await axios.get(`${JELLYFIN_URL}/Sessions?Active=true`, {
      headers: {
        "X-Emby-Token": API_KEY,
      },
    });

    // If there is a nowPlayingItem, return true
    return nowPlaying && nowPlaying.data[0]?.NowPlayingItem;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// Function to update the presence
async function updatePresence() {
  try {
    const isPlaying = await checkSession(); // Check if there's an active session

    if (isPlaying) {
      const nowPlayingItem = isPlaying;

      const mediaTitle = nowPlayingItem.Name;
      const mediaArtist = nowPlayingItem.Artists[0];

      // Set the presence
      await client.user.setActivity({
        details: `🎵 ${mediaTitle}`,
        state: `👤 ${mediaArtist}`,
        instance: false,
        largeImageKey: "icon",
        largeImageText: "Jellyfin Media Server",
      });
    } else {
      await client.user.clearActivity(); // Clear the presence if there's no active session
    }
  } catch (error) {
    console.error(error);
  }
}

// Ready event
client.on("ready", async () => {
  setInterval(updatePresence, 30000); // Check for active sessions every 15 seconds
});

client.login();
