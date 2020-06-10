import React, { Component } from 'react';
import { ImageBackground, View } from "react-native";
import light_square from "../pictures/chess_square_light.png";
import dark_square from "../pictures/chess_square_dark.png";
import black_pawn from "../pictures/black_pawn_test.png";

const Square = ({isLight}) => (
    isLight ? <LightSquare/> : <DarkSquare/>
)

class LightSquare extends Component {
    state = { 
        piece: 0,
        pieceMap: [black_pawn]
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
            height: '45px',
            width: '45px'
        }
    }
    render() { 
        return ( 
            <View style={this.styles.container}>
                <ImageBackground source={light_square} style={this.styles.image}>
                    <img src={this.state.pieceMap[this.state.piece]} style={this.styles.piece}/>
                </ImageBackground>
            </View>
         );
    }
}

class DarkSquare extends Component {
    state = { 
        piece: 0,
        pieceMap: [black_pawn]
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
            height: '45px',
            width: '45px'
        }
    }
    render() { 
        return ( 
            <View style={this.styles.container}>
                <ImageBackground source={dark_square} style={this.styles.image}>
                    <img src={this.state.pieceMap[this.state.piece]} style={this.styles.piece}/>
                </ImageBackground>
            </View>
         );
    }
}
 
export default Square;