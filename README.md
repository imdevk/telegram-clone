#  Telegram Clone (Frontend)

This project is a frontend clone of the Telegram messaging application built with React. It features a sidebar for chat navigation, a chat list, and a chat window for messaging. The UI is responsive and supports dark mode.

## Live Demo

Check out the live demo [here](https://telegram-clone-theta-three.vercel.app/).

## Features

- **Sidebar Navigation:** Access to profile, settings, and other options.
- **Chat List:** Displays a list of chats with a search functionality.
- **Chat Window:** Shows messages for the selected chat, with a date separator.
- **Responsive Design:** Optimized for both desktop and mobile devices.
- **Dark Mode:** Toggle between light and dark themes.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/telegram-clone.git
   cd telegram-clone

### Install dependencies:

```npm install```

**Start the development server:**

```npm start```

## Usage

**Open Sidebar:** Swipe from the left edge on mobile or click the menu icon.

**Toggle Theme:** Click the theme toggle button in the sidebar to switch between light and dark modes.

**Select Chat:** Click on a chat in the chat list to view its messages.

**Back to Chat List:** On mobile, use the back button in the chat window to return to the chat list.


### Components

**App:** The main component that ties everything together.

**Avatar:** A reusable component for displaying user avatars.

**ChatList:** Displays a list of chats with search functionality.

**ChatWindow:** Shows messages for the selected chat.

**Message:** Represents a single message in the chat window.

**Sidebar:** Navigation component with links to profile, settings, etc.


### Hooks

**useTheme:** Custom hook to manage theme (light/dark) state.

**useDragSidebar:** Custom hook to handle sidebar drag functionality.


### API
This project uses the following endpoints from the BeyondChat API:

GET /api/get_all_chats?page=1: Fetches all chats.
GET /api/get_chat_messages?chat_id={chatId}: Fetches messages for a specific chat.
