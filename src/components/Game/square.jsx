import React, { Component } from 'react';
import { ImageBackground, View } from "react-native";
import { withFirebase } from "../FireBase";
import light_square from "../pictures/chess_square_light.png";
import dark_square from "../pictures/chess_square_dark.png";
import gray_square from "../pictures/gray-square.png";
import dark_gray_square from "../pictures/dark_gray_square.jpg";
import white_pawn from "../pictures/Pieces/WPawn.png";
import white_knight from "../pictures/Pieces/WKnight.png";
import white_bishop from "../pictures/Pieces/WBishop.png";
import white_rook from "../pictures/Pieces/WRook.png";
import white_queen from "../pictures/Pieces/WQueen.png";
import white_king from "../pictures/Pieces/WKing.png";
import black_pawn from "../pictures/Pieces/BPawn.png";
import black_knight from "../pictures/Pieces/BKnight.png";
import black_bishop from "../pictures/Pieces/BBishop.png";
import black_rook from "../pictures/Pieces/BRook.png";
import black_queen from "../pictures/Pieces/BQueen.png";
import black_king from "../pictures/Pieces/BKing.png";
import green_dot from "../pictures/Indicators/green_dot.png"
import red_square from "../pictures/Indicators/red_square.png";
import highlight_square from "../pictures/Indicators/highlight_square.gif";
import transparent_square from "../pictures/transparent.png";

import default_light_square from "../pictures/Skins/Squares/Default/light_square.png"
import classic_green_light_square from "../pictures/Skins/Squares/Classic Green/light_square.png"
import classic_red_light_square from "../pictures/Skins/Squares/Classic Red/light_square.png"
import classic_blue_light_square from "../pictures/Skins/Squares/Classic Blue/light_square.png"
import chess_chefs_light_square from "../pictures/Skins/Squares/Chess Chefs/light_square.png"
import christmas_light_square from "../pictures/Skins/Squares/Christmas/light_square.png"
import miami_vice_light_square from "../pictures/Skins/Squares/Miami Vice/light_square.png"
import mint_light_square from "../pictures/Skins/Squares/Mint/light_square.png"
import pomegranate_light_square from "../pictures/Skins/Squares/Pomegranate/light_square.png"
import texas_fight_light_square from "../pictures/Skins/Squares/Texas Fight/light_square.png"
import under_the_sea_light_square from "../pictures/Skins/Squares/Under the Sea/light_square.png"
import cherry_blossom_light_square from "../pictures/Skins/Squares/Cherry Blossom/light_square.png"

import default_dark_square from "../pictures/Skins/Squares/Default/dark_square.png"
import classic_green_dark_square from "../pictures/Skins/Squares/Classic Green/dark_square.png"
import classic_red_dark_square from "../pictures/Skins/Squares/Classic Red/dark_square.png"
import classic_blue_dark_square from "../pictures/Skins/Squares/Classic Blue/dark_square.png"
import chess_chefs_dark_square from "../pictures/Skins/Squares/Chess Chefs/dark_square.png"
import christmas_dark_square from "../pictures/Skins/Squares/Christmas/dark_square.png"
import miami_vice_dark_square from "../pictures/Skins/Squares/Miami Vice/dark_square.png"
import mint_dark_square from "../pictures/Skins/Squares/Mint/dark_square.png"
import pomegranate_dark_square from "../pictures/Skins/Squares/Pomegranate/dark_square.png"
import texas_fight_dark_square from "../pictures/Skins/Squares/Texas Fight/dark_square.png"
import under_the_sea_dark_square from "../pictures/Skins/Squares/Under the Sea/dark_square.png"
import cherry_blossom_dark_square from "../pictures/Skins/Squares/Cherry Blossom/dark_square.png"

const Square = ({ isLight, onClick, coords, indicator, gameId, uid }) => (
    isLight ? <LightSquareFinal onClick={onClick} coords={coords} indicator={indicator} gameId={gameId} uid={uid} /> : <DarkSquareFinal onClick={onClick} coords={coords} indicator={indicator} gameId={gameId} uid={uid} />
)

class LightSquare extends Component {
    constructor(props) {
        super(props);

        this.database = this.props.firebase.db;
        this.node = this.database.ref('games/' + this.props.gameId + '/board/' + this.props.coords[0] + "/" + this.props.coords[1]);

        this.state = {
            customSquares: false,
            piece: 0,
            squareMap: [default_light_square, classic_green_light_square, classic_blue_light_square, classic_red_light_square,
                chess_chefs_light_square, christmas_light_square, miami_vice_light_square, mint_light_square,
                pomegranate_light_square, texas_fight_light_square, under_the_sea_light_square, cherry_blossom_light_square],

            selectedSquare: default_light_square,
            indicatorMap: [transparent_square, green_dot, red_square, highlight_square],
            pieceMap: [transparent_square, white_pawn, white_knight, white_bishop, white_rook, white_queen, white_king, black_pawn, black_knight, black_bishop, black_rook, black_queen, black_king]
        }
    }
    styles = {
        container: {
            flex: 1,
            height: '5vw',
            width: '5vw',
            justifyContent: "center",
        },
        image: {
            flex: 1,
            resizeMode: "cover",
            justifyContent: "center",
            alignItems: "center",
        },
        piece: {
            height: '5vw',
            width: '5vw'
        },
        indicator: {
            height: '5vw',
            width: '5vw',
            opacity: 1
        }
    }

    async componentDidMount() {
        await this.database.ref("skins").once("value", (snap) => {
            if (snap.hasChild(this.props.uid)) {
                this.setState({ customSquares: true })
            }
        })
        this.node.on("value", (snap) => {
            this.setState({
                piece: snap.val()
            });
        });
        if (this.state.customSquares) {
            this.database.ref("skins/" + this.props.uid + "/board_colors").on("value", (snap) => {
                this.setState({ selectedSquare: this.state.squareMap[snap.val()] });
            })
        }
    }

    render() {
        let square;
        if (this.props.indicator === 0) {
            square =
                <View style={this.styles.container}>
                    <ImageBackground source={this.state.selectedSquare} style={this.styles.image}>
                        <img src={this.state.pieceMap[this.state.piece]} style={this.styles.piece} alt="" class="undraggable" />
                    </ImageBackground>
                </View>
        }
        else {
            square =
                <View style={this.styles.container}>
                    <ImageBackground source={this.state.selectedSquare} style={this.styles.image}>
                        <ImageBackground source={this.state.indicatorMap[this.props.indicator]} style={this.styles.indicator}>
                            <img src={this.state.pieceMap[this.state.piece]} style={this.styles.indicator} alt="" class="undraggable" />
                        </ImageBackground>
                    </ImageBackground>
                </View>
        }
        return (
            <a href="#" onClick={(e) => this.props.onClick(this.props.coords, this.state.piece, e)}>
                {square}
            </a>
        );
    }
}

class DarkSquare extends Component {
    constructor(props) {
        super(props);

        this.database = this.props.firebase.db;
        this.node = this.database.ref('games/' + this.props.gameId + '/board/' + this.props.coords[0] + "/" + this.props.coords[1]);

        this.state = {
            customSquares: false,
            piece: 0,
            selectedSquare: default_dark_square,
            squareMap: [default_dark_square, classic_green_dark_square, classic_blue_dark_square, classic_red_dark_square,
                chess_chefs_dark_square, christmas_dark_square, miami_vice_dark_square, mint_dark_square,
                pomegranate_dark_square, texas_fight_dark_square, under_the_sea_dark_square, cherry_blossom_dark_square],
            indicatorMap: [transparent_square, green_dot, red_square, highlight_square],
            pieceMap: [transparent_square, white_pawn, white_knight, white_bishop, white_rook, white_queen, white_king, black_pawn, black_knight, black_bishop, black_rook, black_queen, black_king]
        }
    }
    styles = {
        container: {
            flex: 1,
            height: '5vw',
            width: '5vw',
            justifyContent: "center",
        },
        image: {
            flex: 1,
            resizeMode: "cover",
            justifyContent: "center",
            alignItems: "center"
        },
        piece: {
            height: '5vw',
            width: '5vw',
        },
        indicator: {
            height: '5vw',
            width: '5vw',
            opacity: 1
        }
    }

    async componentDidMount() {
        await this.database.ref("skins").once("value", (snap) => {
            if (snap.hasChild(this.props.uid)) {
                this.setState({ customSquares: true })
            }
        })
        this.node.on("value", (snap) => {
            this.setState({
                piece: snap.val()
            });
        });
        if (this.state.customSquares) {
            this.database.ref("skins/" + this.props.uid + "/board_colors").on("value", (snap) => {
                this.setState({ selectedSquare: this.state.squareMap[snap.val()] });
            })
        }
    }

    render() {
        let square;
        if (this.props.indicator === 0) {
            square =
                <View style={this.styles.container}>
                    <ImageBackground source={this.state.selectedSquare} style={this.styles.image}>
                        <img src={this.state.pieceMap[this.state.piece]} style={this.styles.piece} alt="" class="undraggable" />
                    </ImageBackground>
                </View>
        }
        else {
            square =
                <View style={this.styles.container}>
                    <ImageBackground source={this.state.selectedSquare} style={this.styles.image}>
                        <ImageBackground source={this.state.indicatorMap[this.props.indicator]} style={this.styles.piece}>
                            <img src={this.state.pieceMap[this.state.piece]} style={this.styles.indicator} alt="" class="undraggable" />
                        </ImageBackground>
                    </ImageBackground>
                </View>
        }
        return (
            <a href="#" onClick={(e) => this.props.onClick(this.props.coords, this.state.piece, e)}>
                {square}
            </a>
        );
    }
}

const LightSquareFinal = withFirebase(LightSquare);
const DarkSquareFinal = withFirebase(DarkSquare);

export default Square;