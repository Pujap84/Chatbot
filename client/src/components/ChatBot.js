/*
File: ChatBot.js
Author: Puja Pradhan
Date: Sept 2021
App: BuddyBot
Description: This file contains the React component which <>
*/
import { Component } from "react";
import axios from "axios";
import "./ChatBot.css";
import SendIcon from "@material-ui/icons/Send";

export class ChatBot extends Component {
    state = {
        message: "",
        chatContent: [],
    };
    /*
    function handleChange
    Description: The purpose of handleChange is to capture text input in the textbox when onChange event occurs
    Arguments: an event listener
    Returns: string containing input from the textbox
    */
    handleChange = (event) => {
        this.setState({
            message: event.target.value,
        });
    };
    /*
    function getBotResponse
    Description: The purpose of getBotResponse is to pass the text received from user and make an API call to Google DialogFlow API to get a response from our bot service
    Arguments: message (string)
    Returns: a string containing the response from our Dialogflow bot
    */
    getBotResponse = (message) => {
        let params = {
            message: message,
        };
        return axios.get("/api/message", { params }).then((res) => {
            return res.data.fulfillmentText;
        });
    };
    /*
    function addMessageToChat
    Description: The purpose of the addMessageToChat is to retain a list of messages exchanged between the user and the responses received from the bot. The 
    Arguments: An event listener
    Returns: None. sets the state for ChatBot component
    */
    addMessageToChat = (event) => {
        if (event.key === "Enter") {
            if (!event.target.value) {
                return alert("please type your message first"); //prevent user from entering a blank message
            } else {
                const message = event.target.value;
                const currentConversation = [...this.state.chatContent];
                currentConversation.push({ message: message, who: "Me:" });
                this.setState(
                    {
                        who: "Me:",
                        chatContent: currentConversation,
                    },
                    async () => {
                        const botResponse = await this.getBotResponse(message);
                        const currentConversation = [...this.state.chatContent];
                        currentConversation.push({
                            message: botResponse,
                            who: "Bot:",
                        });
                        //console.log(currentConversation);
                        this.setState({
                            message: "",
                            chatContent: currentConversation,
                        });
                    }
                );
            }
        }
    };
    /*
    Function: getBoxClassNames
    Description: THe purpose of getBoxClassNames is to set the class name used for the div depending on the user/bot 
    Arguments: string (who)
    Returns: a string containing the class name
    */
    getBoxClassNames = (who) => {
        if (who === "Me:") {
            return "messages-item messages-item-me";
        } else if (who === "Bot:") {
            return "messages-item messages-item-bot";
        }
    };
    /*
    function render
    Description: This function generates the HTML required for the final output on the webpage
    Arguments: None
    Returns: None (sets )
    */
    render() {
        const isDisabled = this.state.message === ""; //disable the Send button unless the user has some text written in the textbox
        return (
            <div>
                <div className="chatbox-content">
                    <div className="chatbox-header">
                        <div className="chatbox-image-header">
                            <img src="./images/image.png" alt="image" />
                        </div>
                        <div className="chatbox-content-header">
                            <h4 className="chatbox-heading-header">
                                BuddyBot :)
                            </h4>
                            <p className="chatbox-description-header">
                                Need a friend to chat? You can talk to me!
                            </p>
                        </div>
                    </div>
                    <div className="chatbox-messages">
                        {this.state.chatContent.map(({ message, who }) => {
                            // We go through each chat message and its sender and present it on screen
                            return (
                                <div>
                                    <div className={this.getBoxClassNames(who)}>
                                        <h3>{who}</h3>
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
                        <img src="./images/icons/emojis.svg" alt="" />
                        <img src="./images/icons/microphone.svg" alt="" />
                        <input
                            className="chat-input"
                            type="text"
                            placeholder="Send a message..."
                            value={this.state.message}
                            onChange={this.handleChange}
                            onKeyPress={this.addMessageToChat}
                        />
                        <p className="chatbox-send-footer">Send</p>
                        <img src="./images/icons/attachment.svg" alt="" />
                    </div>
                </div>
                <div className="chatbox-button">
                    <button>button</button>
                </div>
            </div>
        );
    }
}
