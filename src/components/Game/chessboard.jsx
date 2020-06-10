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
            <div class="container">
                <div class="row">
                    <div class="col">
                        asdf
                    </div>
                    <div class="col">
                        asdf
                    </div>
                    <div class="col">
                        asdf
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Chessboard;