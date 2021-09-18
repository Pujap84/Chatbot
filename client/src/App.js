import "./App.css";
import { ChatBot } from "./components/ChatBot.js";
import botImage from "./images/my-bot2.png";
function App() {
    return (
        <div className="chatbot-app">
            <div className="bubble bubble-bottom-left">
                Hello! I am BuddyBot! I am always around for any small talk!
            </div>
            <img src={botImage} alt="" />
            <ChatBot />
        </div>
    );
}

export default App;
