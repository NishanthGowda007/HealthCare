class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lower = message.toLowerCase().trim();

    if (lower.includes("login")) {
      this.actionProvider.handleLogin();
    } else if (lower.includes("register")) {
      this.actionProvider.handleRegister();
    } else if (lower.includes("how many doctors") || lower.includes("doctor")) {
      this.actionProvider.handleShowDoctors();
    } else if (["hi", "hello", "hey"].some(greet => lower.includes(greet))) {
      this.actionProvider.greet();
    } else if (lower.includes("how are you") || lower.includes("what's up")) {
      this.actionProvider.feeling();
    } else {
      this.actionProvider.handleUnknown(); // ✅ cleaner & safer
    }
  }
}

export default MessageParser;
