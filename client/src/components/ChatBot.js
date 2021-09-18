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
import SendIcon from "@mui/icons-material/Send";
//import botImage from "./images/my-bot.png";
//import DoneIcon from "@mui/icons-material/Done";

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

    checkIfEnterPressed = (event) => {
        if (event.key === "Enter") {
            this.addMessageToChat();
        }
    };

    addMessageToChat = () => {
        const message = this.state.message;
        if (message == "") {
            alert("please type your message first");
        } else {
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
    // ani = () => {
    //     document.getElementById('plane').className ='animation';
    // }
    // function anitwo(){
    //     document.getElementById('bg').className ='animation2';
    // }

    /*
    function render
    Description: This function generates the HTML required for the final output on the webpage
    Arguments: None
    Returns: None (sets )
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
                                        <h4>
                                            {who === "Bot:" ? (
                                                <span> &#129302; </span>
                                            ) : (
                                                <span> &#129312; </span>
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
