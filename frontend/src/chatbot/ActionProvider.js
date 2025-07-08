class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  // Reusable helper method to add message
  addMessageToState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };

  // Greeting message
  greet = () => {
    const message = this.createChatBotMessage("Hello there! 👋");
    this.addMessageToState(message);
  };

  // Bot's response to "How are you?"
  feeling = () => {
    const message = this.createChatBotMessage("I'm doing great! How can I help you today?");
    this.addMessageToState(message);
  };

  // Login link handler
  handleLogin = () => {
    const message = this.createChatBotMessage("You can login here:", {
      widget: "loginLink",
    });
    this.addMessageToState(message);
  };

  // Register link handler
  handleRegister = () => {
    const message = this.createChatBotMessage("You can register here:", {
      widget: "registerLink",
    });
    this.addMessageToState(message);
  };

  // Show list of doctors
  handleShowDoctors = () => {
    const doctors = ["Dr. Ravi Kumar", "Dr. Anjali Sharma", "Dr. Neha Raj", "Dr. Suresh B"];
    const formattedList = doctors.map((doc, index) => `${index + 1}. ${doc}`).join("\n");
    const message = this.createChatBotMessage(
      `Here are the available doctors:\n\n${formattedList}`
    );
    this.addMessageToState(message);
  };
}

export default ActionProvider;  

