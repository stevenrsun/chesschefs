import React, { Component } from 'react';
import white_knight from "../pictures/Pieces/WKnight.png";
import white_bishop from "../pictures/Pieces/WBishop.png";
import white_rook from "../pictures/Pieces/WRook.png";
import white_queen from "../pictures/Pieces/WQueen.png";
import black_knight from "../pictures/Pieces/BKnight.png";
import black_bishop from "../pictures/Pieces/BBishop.png";
import black_rook from "../pictures/Pieces/BRook.png";
import black_queen from "../pictures/Pieces/BQueen.png";

class PromoMenu extends Component {
    state = { 
        blackPieces: [black_knight, black_bishop, black_rook, black_queen],
        whitePieces: [white_knight, white_bishop, white_rook, white_queen]
    }

    styles = {
        piece: {
            height: '64px',
            width: '64px'
        }
    }

    render() { 
        let images;
        if(this.props.color === "white")
            images = <div class="col-sm-1">
                        <a href="#" onClick = {(e) => this.props.onClick(2, e)}>
                            <img src={this.state.whitePieces[0]} style={this.styles.piece}/>
                        </a>
                        <a href="#" onClick = {(e) => this.props.onClick(3, e)}>
                            <img src={this.state.whitePieces[1]} style={this.styles.piece}/>
                        </a>
                        <a href="#" onClick = {(e) => this.props.onClick(4, e)}>
                            <img src={this.state.whitePieces[2]} style={this.styles.piece}/>
                        </a>
                        <a href="#" onClick = {(e) => this.props.onClick(5, e)}>
                            <img src={this.state.whitePieces[3]} style={this.styles.piece}/>
                        </a>
                     </div>
        else
            images = <div class="col-sm-1">
                            <a href="#" onClick = {(e) => this.props.onClick(8, e)}>
                            <img src={this.state.blackPieces[0]} style={this.styles.piece}/>
                        </a>
                        <a href="#" onClick = {(e) => this.props.onClick(9, e)}>
                            <img src={this.state.blackPieces[1]} style={this.styles.piece}/>
                        </a>
                        <a href="#" onClick = {(e) => this.props.onClick(10, e)}>
                            <img src={this.state.blackPieces[2]} style={this.styles.piece}/>
                        </a>
                        <a href="#" onClick = {(e) => this.props.onClick(11, e)}>
                            <img src={this.state.blackPieces[3]} style={this.styles.piece}/>
                        </a>
                    </div>
        return ( 
            <div>
                {images}
            </div>
         );
    }
}
 
export default PromoMenu;