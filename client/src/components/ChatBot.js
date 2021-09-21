import React, { Component } from "react";
import axios from "axios";
import "./ChatBot.css";
import SendIcon from "@mui/icons-material/Send";

//import DoneIcon from "@mui/icons-material/Done";

/**
 * This is the React class which renders the chatbot onthe bottom right of the screen
 * @author Puja Pradhan
 * @date Sept 2021
 *
 */

export class ChatBot extends Component {
    chatContainer = React.createRef();

    state = {
        message: "",
        chatContent: [],
    };
    /**
     * The purpose of handleChange is to capture text input in the textbox when onChange event occurs and save in the state
     * @param event an event listener
     */
    handleChange = (event) => {
        this.setState({
            message: event.target.value,
        });
    };
    /**
     * The purpose of getBotResponse is to pass the text received from user and make an API call to Google DialogFlow API to get a response from our bot service
     * @param {string} message the message for the bot to respond to
     * @returns a promise containing a string with the response from our Dialogflow bot
     */
    getBotResponse = (message) => {
        let params = {
            message: message,
        };
        return axios.get("/api/message", { params }).then((res) => {
            return res.data.fulfillmentText;
        });
    };
    /**
     * keypress handler for the input box
     * @param event
     */

    checkIfEnterPressed = (event) => {
        if (event.key === "Enter") {
            this.addMessageToChat();
        }
    };

    scrollToMyRef = () => {
        const scroll =
            this.chatContainer.current.scrollHeight -
            this.chatContainer.current.clientHeight;
        this.chatContainer.current.scrollTo(0, scroll);
    };

    /**
     * addMessageToChat is to add a message from the user and the bot to the message list for display and sets the state for ChatBot component
     */
    addMessageToChat = () => {
        const message = this.state.message;
        if (message == "") {
            alert("please type your message first");
        } else {
            this.props.toggleBounce(false);
            const currentConversation = [...this.state.chatContent];
            currentConversation.push({ message: message, who: "Me:" });

            setTimeout(() => {
                this.props.toggleBounce(true);
            }, 1000);
            this.setState(
                {
                    chatContent: currentConversation,
                    message: "",
                },
                async () => {
                    const botResponse = await this.getBotResponse(message);
                    const currentConversation = [...this.state.chatContent];
                    currentConversation.push({
                        message: botResponse,
                        who: "Bot:",
                    });

                    //console.log(currentConversation);
                    this.setState(
                        {
                            chatContent: currentConversation,
                        },
                        () => this.scrollToMyRef()
                    );
                }
            );
        }
        this.props.toggleBounce(false);
    };

    /*
    Function: getBoxClassNames
    Description: returns the class name used for the div depending on the user/bot 
    Arguments: string (who)
    Returns: a string containing the class name
    */

    /**
     * returns the class name used for the div depending on the user/bot
     * @param {string} who
     * @returns a string containing the class name
     */

    getBoxClassNames = (who) => {
        if (who === "Me:") {
            return "messages-item messages-item-me";
        } else if (who === "Bot:") {
            return "messages-item messages-item-bot";
        }
    };
    // ani = () => {
    //     document.getElementById('plane').className ='animation';
    // }
    // function anitwo(){
    //     document.getElementById('bg').className ='animation2';
    // }

    /**
     * This function generates the HTML required for the final output on the webpage
     * @returns JSX element
     */
    render() {
        const isDisabled = this.state.message === ""; //disable the Send button unless the user has some text written in the textbox
        return (
            <div className="container">
                <div className="chatbox-content">
                    <div className="chatbox-header">
                        <div className="chatbox-image-header"></div>
                        <div className="chatbox-content-header">
                            <h4 className="chatbox-heading-header">
                                BuddyBot &#128512;
                            </h4>
                            <p className="chatbox-description-header">
                                Your colloquial friend
                            </p>
                        </div>
                    </div>
                    <div className="chatbox-messages" ref={this.chatContainer}>
                        {this.state.chatContent.map(({ message, who }) => {
                            // We go through each chat message and its sender and present it on screen
                            return (
                                <div>
                                    <div className={this.getBoxClassNames(who)}>
                                        <h4>
                                            {who === "Bot:" ? (
                                                <span> &#129302; </span>
                                            ) : (
                                                <span> &#128589; </span>
                                            )}
                                        </h4>
                                        <p>{message}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* <input
                                className="chat-input"
                                type="text"
                                placeholder="Send a message..."
                                value={this.state.message}
                                onChange={this.handleChange}
                                onKeyPress={this.addMessageToChat}
                            />
                            // <SendIcon />
                            <button
                                disabled={isDisabled}
                                onClick={this.addMessageToChat}
                                className="material-icons-send"
                            >
                                Send
                            </button> */}
                    <div className="chatbox-footer">
                        <input
                            className="chat-input"
                            type="text"
                            placeholder="Send a message..."
                            value={this.state.message}
                            onChange={this.handleChange}
                            onKeyPress={this.checkIfEnterPressed}
                        />
                        <div className="icons-container">
                            <button
                                className="chatbox-send-button"
                                onClick={this.addMessageToChat}
                                disabled={isDisabled}
                            >
                                <SendIcon />
                            </button>
                            {/* <div className="chatbox-done-button">
                                    <DoneIcon />
                                </div>
                                <div
                                    className="around around-boarder"
                                    onClick={this.ani} {this.anitwo}
                                ></div> */}
                        </div>
                    </div>
                </div>
                {/* <div className="chatbox-button">
                    <button>button</button>
                </div> */}
            </div>
        );
    }
}
