import React from 'react';
import { Grid } from './Grid';
import _ from 'lodash';
export class App extends React.Component {
    constructor(props){
        super(props);
        this.cols = 50;
        this.rows = 30;
        this.state = {
            grid: Array(this.rows).fill().map(() => Array(this.cols).fill(0))
        }
    }

    randomise(){
        let copy = _.map(this.state.grid, _.clone); 
        console.log('copy');
        for(var i = 0; i < this.rows; i++){
            for(var j = 0; j < this.cols; j++){
                copy[i][j] = Math.round(Math.random());
                this.setState({
                    grid: copy
                });
            }
        }
        }

        componentDidMount(){
            this.randomise;
        }

    render(){
        return (
        <div>
            <h1 className='text-center heading'>Game of Life</h1>
            <Grid grid={this.state.grid} cols={this.cols} rows={this.rows}/>
        </div>
        );
    }
}
