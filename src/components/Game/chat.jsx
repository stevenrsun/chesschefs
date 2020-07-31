import React, { Component } from 'react';
import { withFirebase } from "../FireBase";
import {Launcher} from 'react-chat-window'

const Chat = ({ uid, whiteId, blackId }) => (
    <ChatFinal uid={uid} whiteId={whiteId} blackId={blackId} />
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
          this.database.ref("games/game-ID/chats").on("value", snapshot => {
            let chats = [];
            console.log(snapshot.key)
            snapshot.forEach((snap) => {
                let message = snap.val();
                if(message.author == this.props.uid)
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
            await this.database.ref("games/game-ID/chats").push({
              author: this.props.uid,
              type: 'text',
              data:{
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
                    teamName: 'Megu-chan',
                    imageUrl: 'https://64.media.tumblr.com/f807e520f6779196aa0be7d9145842c1/e4847e976b5bc01d-a4/s400x600/7013c4a2686649f41a9fb68b07e5561454101912.jpg'
                    }}
                    onMessageWasSent={this._onMessageWasSent.bind(this)}
                    messageList={this.state.chats}
                    showEmoji
                />
            </div>
         );
    }
}

const ChatFinal = withFirebase(ChatBase);
 
export default Chat;