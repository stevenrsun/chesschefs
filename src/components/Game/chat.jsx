import React, { Component } from 'react';
import { withFirebase } from "../FireBase";
import { Launcher } from 'react-chat-window'

const Chat = ({ uid, gameId }) => (
    <ChatFinal uid={uid} gameId={gameId} />
);

class ChatBase extends Component {
    constructor(props) {
        super(props);
        this.database = this.props.firebase.db;
        this.state = {
            chats: [],
            readError: null,
            writeError: null
        };
    }

    async componentDidMount() {
        this.setState({ readError: null });
        try {
            this.database.ref("games/" + this.props.gameId + "/chats").on("value", snapshot => {
                let chats = [];
                console.log(snapshot.key)
                snapshot.forEach((snap) => {
                    let message = snap.val();
                    if (message.author === this.props.uid)
                        message.author = "me"
                    else
                        message.author = "them"
                    chats.push(message);
                    console.log(message)
                });
                this.setState({ chats });
            });
        } catch (error) {
            this.setState({ readError: error.message });
        }
    }

    async _onMessageWasSent(message) {
        this.setState({ writeError: null });
        try {
            await this.database.ref("games/" + this.props.gameId + "/chats").push({
                author: this.props.uid,
                type: 'text',
                data: {
                    text: message.data.text
                }
            });
        } catch (error) {
            this.setState({ writeError: error.message });
        }
    }

    render() {
        return (
            <div>
                <Launcher
                    agentProfile={{
                    }}
                    onMessageWasSent={this._onMessageWasSent.bind(this)}
                    messageList={this.state.chats}
                    showEmoji={false}
                />
            </div>
        );
    }
}

const ChatFinal = withFirebase(ChatBase);

export default Chat;