# Jellyfin Rich Presence

# made by 1blckhrt

### Note: This assumes you already have a working Jellyfin URL and can access it through a web browser

## Discord Developer Portal

- To configure the RPC, you will need to make an application in the Discord Developer Portal.
- Follow these steps to create a Discord Developer Portal application:
- 1. Go to the Discord Developer Portal website: https://discord.com/developers/applications
- 2. Click on the "New Application" button.
- 3. Enter a name for your application and click "Create".
- 4. Create or download an image, and add it to your application with the name "icon"
- 5. Save your changes.
- 6. Write down the Application ID.
- Once you have created your application in the Discord Developer Portal, you will receive a Client ID.
- You will need to use this Client ID in your code to authenticate and interact with the Discord API.

## Generate Jellyfin API Key

To generate an API key in Jellyfin Music Server, follow these steps:

- 1. Open your Jellyfin Music Server in a web browser.
- 2. Log in to your account.
- 3. Go to the **Dashboard** or **Settings** page.
- 4. Look for the **API Keys** section.
- 5. Click on the **Generate New Key** button.
- 6. A new API key will be generated for you.
- 7. Make sure you write it down.

## Install modules

- `cd` into the project directory and run `npm i`

## Setup .env

To configure the environment variables, you need to set up a `.env` file in the root directory. This file will contain environment variables that the project relies on, in our case your Jellyfin API key and URL. Follow the steps below to set it up:

1.  Create a new file named `.env` in the root directory of the project.

2.  Open the `.env` file in a text editor.

3.  Add the following environment variables to the file:

    ```
    APP_ID=
    JELLYFIN_URL=
    JELLYFIN_API_KEY=
    ```

    Put the corresponding strings with the name of the environment variable you want to set.

    For example:
    (These aren't actual values, just placeholders)

    ```
    APP_ID=123123123 <- Discord Developer Portal Application ID
    JELLYFIN_URL=0.0.0.0:8096 <- Jellyfin URL
    JELLYFIN_API_KEY=APIKEYGOESHERE <- Jellyfin API key
    ```

4.  Save the `.env` file.

## Running the script

### Note: You have to either self host this script or put it on a hosting service - it must be running to be able to work

1. `node .` to run the script
2. You could also use `pm2` for hosting this script.

## You're done!
