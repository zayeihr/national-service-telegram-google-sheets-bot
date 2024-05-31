# NS Enlistment Bot

# Telegram Google Sheets Bot for NS Information Distribution

## Project Overview

This project consists of a Google Apps Script integrated with the Telegram Bot API to efficiently distribute enlistment and other important information to 7,200 soldiers in National Service (NS). The bot retrieves data from a Google Sheet, processes user queries, and sends back relevant details about their enlistment status, company, PES status, and more.

## Features

- **Telegram Integration**: Utilizes the Telegram Bot API to handle user messages and send responses.
- **Google Sheets Integration**: Fetches and updates data in Google Sheets to ensure real-time accuracy of information.
- **Enlistment Details**: Provides detailed enlistment information including company, 4D number, PES status, food allergies, stay-in/out status, and oath form number.
- **Attendance Tracking**: Updates attendance status in the Google Sheet upon user query, ensuring accurate record-keeping.
- **Allergy Information**: Alerts users with food allergies and provides instructions to collect necessary items.
- **Slack Integration**: Shares a Slack link for parents/guardians to connect with officers in BMTC SCH V.

## Usage

Soldiers in NS can interact with the bot by sending a specific query format to the Telegram bot. The bot processes the input, queries the Google Sheet, and returns the relevant enlistment details along with additional instructions and information.

### Example Query

To retrieve your enlistment details, send a message to the Telegram bot in the following format:

Where `Z345B` represents the first letter of your name (per NRIC) and the last 4 characters of your NRIC.

## Setup

1. **Google Apps Script**: Deploy the provided Google Apps Script in your Google Apps Script editor.
2. **Telegram Bot**: Set up a new Telegram bot using BotFather and obtain the bot token.
3. **Webhook**: Configure the bot's webhook URL to point to your deployed Google Apps Script web app URL.
4. **Google Sheets**: Ensure the Google Sheet is properly set up with the necessary data and column headers.

## Future Enhancements

- Additional commands for more detailed queries.
- Enhanced error handling and user feedback.
- Integration with other communication platforms.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.

---

**Note**: This bot is specifically designed for use within the context of National Service (NS) and the provided dataset. Ensure that you have the appropriate permissions to access and modify the Google Sheet used for data storage.
