import React, { Component } from 'react';
import { AuthUserContext } from "../Session";
import firebase from "firebase";
import { withFirebase } from "../FireBase";

const Settings = () => (
    <div>
        <AuthUserContext.Consumer>
            {(authUser) =>
                authUser ? <SettingsFinal uid={authUser.uid} /> : <SettingsFinal uid={0} />
            }
        </AuthUserContext.Consumer>
    </div>
)

class SettingsBase extends Component {
    constructor(props) {
        super(props);

        this.database = this.props.firebase.db;
        this.skins = this.database.ref("skins");

        this.state = {
            loaded: false,

            boardColor: 0
        }
    }

    async componentDidMount() {
        if (this.props.uid === 0) {
            await firebase.auth().signInAnonymously();
        }
        this.skins.child(this.props.uid + "/board_colors").on("value", (snap) => {
            this.setState({ boardColor: snap.val() });
        })
        this.setState({ loaded: true })
    }

    onChangeBoardColor = (id) => {
        this.skins.child(this.props.uid + "/board_colors").set(id);
    }

    render() { 
        return ( 
            <div class="main_content">
                {!this.state.loaded && <h1 class="kalyant-bold">Loading...</h1>}
                {this.state.loaded && 
                <div>
                    <h1 class="kalyant-bold" style={{fontSize: 50}}>Choose your board color scheme:</h1>
                    <button class="btn btn-warning" onClick={() => this.onChangeBoardColor(0)}>Board Color Scheme 1</button>
                    <button class="btn btn-warning" onClick={() => this.onChangeBoardColor(1)}>Board Color Scheme 2</button>
                    <button class="btn btn-warning" onClick={() => this.onChangeBoardColor(2)}>Board Color Scheme 3</button>
                    <button class="btn btn-warning" onClick={() => this.onChangeBoardColor(3)}>Board Color Scheme 4</button>
                    <h1 class="kalyant">{this.state.boardColor}</h1>
                </div>}
            </div>
         );
    }
}

const SettingsFinal = withFirebase(SettingsBase);
 
export default Settings;