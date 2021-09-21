import "./App.css";
import { ChatBot } from "./components/ChatBot.js";
import botImage from "./images/my-bot2.png";
import { useState } from "react";
function App() {
    const [bounce, setBounce] = useState(false);
    return (
        <div className="chatbot-app">
            <div className="bubble bubble-bottom-left hithere">
                <p>
                    Hello! I am BuddyBot! I am always around for any small talk!
                </p>
            </div>
            <div className={bounce ? "bounce" : ""}>
                <img src={botImage} alt="" />
            </div>
            <ChatBot toggleBounce={setBounce} />
        </div>
    );
}

export default App;
