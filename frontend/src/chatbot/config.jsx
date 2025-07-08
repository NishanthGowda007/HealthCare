import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  botName: "HealthBot",

  initialMessages: [
    createChatBotMessage("👋 Hello! I’m HealthBot. How can I help you today?")
  ],

  customComponents: {
    botAvatar: () => <div className="bot-avatar">🤖</div>,
    userAvatar: () => <div className="user-avatar">🧑</div>,
  },

  widgets: [
    {
      widgetName: "loginLink",
      widgetFunc: () => (
        <a
          href="/login"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#1890ff",
            textDecoration: "underline",
            fontWeight: "bold",
            fontSize: "14px",
            paddingTop: "6px",
            display: "inline-block",
          }}
        >
          🔐 Click here to login
        </a>
      ),
    },
    {
      widgetName: "registerLink",
      widgetFunc: () => (
        <a
          href="/register"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#1890ff",
            textDecoration: "underline",
            fontWeight: "bold",
            fontSize: "14px",
            paddingTop: "6px",
            display: "inline-block",
          }}
        >
          📝 Click here to register
        </a>
      ),
    },
  ],
};

export default config;

