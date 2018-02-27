import React from 'react';
import {Box} from './Box';

export class Grid extends React.Component {
    render(){
        var arr = [];
        var boxValue = '';
        for(var i = 0; i < this.props.rows; i++){
            for(var j = 0; j < this.props.cols; j++){
                if(this.props.grid[i][j]){
                    boxValue = 'on';
                    console.log(boxValue);
                } else {
                    boxValue = 'off';
                }
                arr.push(<Box val={boxValue} key={i + '-' + j} row={i} col={j} />);
            } 
        }
        return (
        <div className='container-fluid'>
            <div className="grid">
             {arr}
           </div>
            </div>
        );
    }
}