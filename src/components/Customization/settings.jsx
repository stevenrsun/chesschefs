import React, { Component } from 'react';
import { AuthUserContext } from "../Session";
import firebase from "firebase";
import { withFirebase } from "../FireBase";
import default_icon from "../pictures/Skins/Squares/Default/icon.png"
import classic_green_icon from "../pictures/Skins/Squares/Classic Green/icon.png"
import classic_red_icon from "../pictures/Skins/Squares/Classic Red/icon.png"
import classic_blue_icon from "../pictures/Skins/Squares/Classic Blue/icon.png"
import chess_chefs_icon from "../pictures/Skins/Squares/Chess Chefs/icon.png"
import christmas_icon from "../pictures/Skins/Squares/Christmas/icon.png"
import miami_vice_icon from "../pictures/Skins/Squares/Miami Vice/icon.png"
import mint_icon from "../pictures/Skins/Squares/Mint/icon.png"
import pomegranate_icon from "../pictures/Skins/Squares/Pomegranate/icon.png"
import texas_fight_icon from "../pictures/Skins/Squares/Texas Fight/icon.png"
import under_the_sea_icon from "../pictures/Skins/Squares/Under the Sea/icon.png"
import cherry_blossom_icon from "../pictures/Skins/Squares/Cherry Blossom/icon.png"

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
        let defaultSkin = this.state.boardColor === 0 ? <img src={default_icon} className="undraggable settingsIcon highlightedSkin" alt="" /> : <img src={default_icon} className="undraggable settingsIcon" alt="" />;
        let classicGreen = this.state.boardColor === 1 ? <img src={classic_green_icon} className="undraggable settingsIcon highlightedSkin" alt="" /> : <img src={classic_green_icon} className="undraggable settingsIcon" alt="" />;
        let classicBlue = this.state.boardColor === 2 ? <img src={classic_blue_icon} className="undraggable settingsIcon highlightedSkin" alt="" /> : <img src={classic_blue_icon} className="undraggable settingsIcon" alt="" />;
        let classicRed = this.state.boardColor === 3 ? <img src={classic_red_icon} className="undraggable settingsIcon highlightedSkin" alt="" /> : <img src={classic_red_icon} className="undraggable settingsIcon" alt="" />;
        let chessChefs = this.state.boardColor === 4 ? <img src={chess_chefs_icon} className="undraggable settingsIcon highlightedSkin" alt="" /> : <img src={chess_chefs_icon} className="undraggable settingsIcon" alt="" />;
        let christmas = this.state.boardColor === 5 ? <img src={christmas_icon} className="undraggable settingsIcon highlightedSkin" alt="" /> : <img src={christmas_icon} className="undraggable settingsIcon" alt="" />;
        let miamiVice = this.state.boardColor === 6 ? <img src={miami_vice_icon} className="undraggable settingsIcon highlightedSkin" alt="" /> : <img src={miami_vice_icon} className="undraggable settingsIcon" alt="" />;
        let mint = this.state.boardColor === 7 ? <img src={mint_icon} className="undraggable settingsIcon highlightedSkin" alt="" /> : <img src={mint_icon} className="undraggable settingsIcon" alt="" />;
        let pomegranate = this.state.boardColor === 8 ? <img src={pomegranate_icon} className="undraggable settingsIcon highlightedSkin" alt="" /> : <img src={pomegranate_icon} className="undraggable settingsIcon" alt="" />;
        let texasFight = this.state.boardColor === 9 ? <img src={texas_fight_icon} className="undraggable settingsIcon highlightedSkin" alt="" /> : <img src={texas_fight_icon} className="undraggable settingsIcon" alt="" />;
        let underTheSea = this.state.boardColor === 10 ? <img src={under_the_sea_icon} className="undraggable settingsIcon highlightedSkin" alt="" /> : <img src={under_the_sea_icon} className="undraggable settingsIcon" alt="" />;
        let cherryBlossom = this.state.boardColor === 11 ? <img src={cherry_blossom_icon} className="undraggable settingsIcon highlightedSkin" alt="" /> : <img src={cherry_blossom_icon} className="undraggable settingsIcon" alt="" />;

        return (
            <div class="main_content">
                {!this.state.loaded && <h1 class="kalyant-bold">Loading...</h1>}
                {this.state.loaded &&
                    <div>
                        <div class="row">
                            <h1 class="kalyant-bold" style={{ fontSize: 50 }}>Color Schemes</h1>
                            <button class="settingsButton" onClick={() => this.onChangeBoardColor(0)}>{defaultSkin}</button>
                            <button class="settingsButton" onClick={() => this.onChangeBoardColor(1)}>{classicGreen}</button>
                            <button class="settingsButton" onClick={() => this.onChangeBoardColor(2)}>{classicBlue}</button>
                            <button class="settingsButton" onClick={() => this.onChangeBoardColor(3)}>{classicRed}</button>
                        </div>
                        <div class="row">
                            <button class="settingsButton" onClick={() => this.onChangeBoardColor(4)}>{chessChefs}</button>
                            <button class="settingsButton" onClick={() => this.onChangeBoardColor(5)}>{christmas}</button>
                            <button class="settingsButton" onClick={() => this.onChangeBoardColor(6)}>{miamiVice}</button>
                            <button class="settingsButton" onClick={() => this.onChangeBoardColor(7)}>{mint}</button>
                        </div>
                        <div class="row">
                            <button class="settingsButton" onClick={() => this.onChangeBoardColor(8)}>{pomegranate}</button>
                            <button class="settingsButton" onClick={() => this.onChangeBoardColor(9)}>{texasFight}</button>
                            <button class="settingsButton" onClick={() => this.onChangeBoardColor(10)}>{underTheSea}</button>
                            <button class="settingsButton" onClick={() => this.onChangeBoardColor(11)}>{cherryBlossom}</button>
                        </div>
                        <h1 class="kalyant">{this.state.boardColor}</h1>
                    </div>}
            </div>
        );
    }
}

const SettingsFinal = withFirebase(SettingsBase);

export default Settings;