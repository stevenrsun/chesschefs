import React, { Component } from 'react';
import Square from './square';

class Chessboard extends Component {
    state = {  }
    styles={
        board: {
            width: '512px',
            height: '512px'
        }
    }
    render() { 
        return ( 
            <div class="row-no-gutters mx-0">
                <div class="col-sm-1"><Square isLight={true}/><Square isLight={false}/></div>
                <div class="col-sm-1"><Square isLight={false}/></div>
                <div class="col-sm-1"><Square isLight={true}/></div>
            </div> 
         );
    }
}
 
export default Chessboard;