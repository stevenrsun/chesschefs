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
import red_square from "../pictures/Indicators/red_square.jpg";
import highlight_square from "../pictures/Indicators/highlight_square.png";
import transparent_square from "../pictures/transparent.png";

const Square = ({ isLight, onClick, coords, indicator, gameId, uid }) => (
    isLight ? <LightSquareFinal onClick={onClick} coords={coords} indicator={indicator} gameId={gameId} uid={uid}/> : <DarkSquareFinal onClick={onClick} coords={coords} indicator={indicator} gameId={gameId} uid={uid}/>
)

class LightSquare extends Component {
    constructor(props) {
        super(props);

        this.database = this.props.firebase.db;
        this.node = this.database.ref('games/' + this.props.gameId + '/board/' + this.props.coords[0] + "/" + this.props.coords[1]);

        this.state = {
            customSquares: false,
            piece: 0,
            squareMap: [light_square, gray_square],
            selectedSquare: light_square,
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
            opacity: 0.5
        }
    }

    async componentDidMount() {
        await this.database.ref("skins").once("value", (snap) => {
            if(snap.hasChild(this.props.uid)){
                this.setState({ customSquares: true })
            }
        })
        this.node.on("value", (snap) => {
            this.setState({
                piece: snap.val()
            });
        });
        if(this.state.customSquares){
            this.database.ref("skins/" + this.props.uid + "/board_colors").on("value", (snap) => {
                this.setState({ selectedSquare: this.state.squareMap[snap.val()]});
            })
        }
    }

    render() {
        let square;
        if (this.props.indicator === 0) {
            square =
                <View style={this.styles.container}>
                    <ImageBackground source={this.state.selectedSquare} style={this.styles.image}>
                        <img src={this.state.pieceMap[this.state.piece]} style={this.styles.piece} alt="" />
                    </ImageBackground>
                </View>
        }
        else {
            square =
                <View style={this.styles.container}>
                    <ImageBackground source={this.state.selectedSquare} style={this.styles.image}>
                        <ImageBackground source={this.state.pieceMap[this.state.piece]} style={this.styles.piece}>
                            <img src={this.state.indicatorMap[this.props.indicator]} style={this.styles.indicator} alt="" />
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
            selectedSquare: dark_square,
            squareMap: [dark_square, dark_gray_square],
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
            opacity: 0.5
        }
    }

    async componentDidMount() {
        await this.database.ref("skins").once("value", (snap) => {
            if(snap.hasChild(this.props.uid)){
                this.setState({ customSquares: true })
            }
        })
        this.node.on("value", (snap) => {
            this.setState({
                piece: snap.val()
            });
        });
        if(this.state.customSquares){
            this.database.ref("skins/" + this.props.uid + "/board_colors").on("value", (snap) => {
                this.setState({ selectedSquare: this.state.squareMap[snap.val()]});
            })
        }
    }

    render() {
        let square;
        if (this.props.indicator === 0) {
            square =
                <View style={this.styles.container}>
                    <ImageBackground source={this.state.selectedSquare} style={this.styles.image}>
                        <img src={this.state.pieceMap[this.state.piece]} style={this.styles.piece} alt="" />
                    </ImageBackground>
                </View>
        }
        else {
            square =
                <View style={this.styles.container}>
                    <ImageBackground source={this.state.selectedSquare} style={this.styles.image}>
                        <ImageBackground source={this.state.pieceMap[this.state.piece]} style={this.styles.piece}>
                            <img src={this.state.indicatorMap[this.props.indicator]} style={this.styles.indicator} alt="" />
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