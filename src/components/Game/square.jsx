import React, { Component } from 'react';
import { ImageBackground, View } from "react-native";
import { withFirebase } from "../FireBase";
import light_square from "../pictures/chess_square_light.png";
import dark_square from "../pictures/chess_square_dark.png";
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

const Square = ({isLight, onClick, coords}) => (
    isLight ? <LightSquareFinal onClick={onClick} coords={coords}/> : <DarkSquareFinal onClick={onClick} coords={coords}/>
)

class LightSquare extends Component {
    constructor(props){
        super(props);

        this.database = this.props.firebase.db;
        this.node = this.database.ref('games/game-ID/board/' + this.props.coords[0] + "/" + this.props.coords[1]);

        this.state = { 
            piece: 0,
            pieceMap: [light_square, white_pawn, white_knight, white_bishop, white_rook, white_queen, white_king, black_pawn, black_knight, black_bishop, black_rook, black_queen, black_king]
        }
    }
    styles = {
        container: {
            flex: 1,
            height: '64px',
            width: '64px',
            justifyContent: "center",
        },
        image: {
            flex: 1,
            resizeMode: "cover",
            justifyContent: "center",
            alignItems: "center"
        },
        piece: {
            height: '64px',
            width: '64px'
        }
    }

    componentDidMount() {
        this.node.on("value", (snap) => {
            this.setState({
                piece: snap.val()
            });
        });
    }

    render() { 
        return ( 
            <a href="#" onClick = {(e) => this.props.onClick(this.props.coords, this.state.piece, e)}>
                <View style={this.styles.container}>
                    <ImageBackground source={light_square} style={this.styles.image}>
                        <img src={this.state.pieceMap[this.state.piece]} style={this.styles.piece}/>
                    </ImageBackground>
                </View>
            </a>
         );
    }
}

class DarkSquare extends Component {
    constructor(props){
        super(props);

        this.database = this.props.firebase.db;
        this.node = this.database.ref('games/game-ID/board/' + this.props.coords[0] + "/" + this.props.coords[1]);
        
        this.state = { 
            piece: 0,
            pieceMap: [dark_square, white_pawn, white_knight, white_bishop, white_rook, white_queen, white_king, black_pawn, black_knight, black_bishop, black_rook, black_queen, black_king]
        }
    }
    styles = {
        container: {
            flex: 1,
            height: '64px',
            width: '64px',
            justifyContent: "center",
        },
        image: {
            flex: 1,
            resizeMode: "cover",
            justifyContent: "center",
            alignItems: "center"
        },
        piece: {
            height: '64px',
            width: '64px'
        }
    }

    componentDidMount() {
        this.node.on("value", (snap) => {
            this.setState({
                piece: snap.val()
            });
        });
    }
    
    render() { 
        return ( 
            <a href="#" onClick = {(e) => this.props.onClick(this.props.coords, this.state.piece, e)}>
                <View style={this.styles.container}>
                    <ImageBackground source={dark_square} style={this.styles.image}>
                        <img src={this.state.pieceMap[this.state.piece]} style={this.styles.piece}/>
                    </ImageBackground>
                </View>
            </a>
         );
    }
}
 
const LightSquareFinal = withFirebase(LightSquare);
const DarkSquareFinal = withFirebase(DarkSquare);

export default Square;