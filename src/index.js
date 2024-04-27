// Setting up environment variables
require("dotenv").config();

// Grabbing environment variables
const APP_ID = process.env.APP_ID;
const JELLYFIN_URL = process.env.JELLYFIN_URL;
const API_KEY = process.env.JELLYFIN_API_KEY;

// Importing required modules
const { Client } = require("@xhayper/discord-rpc");

// Initializing Discord RPC client
const client = new Client({ clientId: APP_ID });

// Function to check for active session
async function checkSession() {
  try {
    const response = await fetch(`${JELLYFIN_URL}/Sessions?Active=true`, {
      headers: {
        "X-Emby-Token": API_KEY,
      },
    });

    // Check if the response is not okay
    if (!response.ok) {
      console.error("Error fetching data:", response.statusText);
      return null;
    }

    // Parse the response
    const nowPlaying = await response.json();
    return nowPlaying && nowPlaying[0]?.NowPlayingItem;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
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
  updatePresence(); // Update the presence on startup
  setInterval(updatePresence, 30000); // Check for active sessions every 30 seconds
});

client.login();
