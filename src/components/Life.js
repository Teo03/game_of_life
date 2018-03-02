import React from 'react';
import {Grid} from './Grid';
import _ from 'lodash';
export class Life extends React.Component {
    constructor(props) {
        super(props);
        this.cols = 50;
        this.rows = 30;
        this.select = this.select.bind(this);
        this.state = {
            grid:  Array(this.rows).fill(Array(this.cols).fill(0))
        }
    }
    
    randomise() {
        let copy = _.map(this.state.grid, _.clone);
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                copy[i][j] = Math.round(Math.random());
            }
        }
        this.setState({
            grid: copy
        });
    }

    start() {
        let gridCopy = _.map(this.state.grid, _.clone);
        let origGrid = this.state.grid;
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                let count = 0;
                if (i > 0)
                    if (origGrid[i - 1][j]) count++;
                if (i > 0 && j > 0)
                    if (origGrid[i - 1][j - 1]) count++;
                if (i > 0 && j < this.cols - 1)
                    if (origGrid[i - 1][j + 1]) count++;
                if (j < this.cols - 1)
                    if (origGrid[i][j + 1]) count++;
                if (j > 0)
                    if (origGrid[i][j - 1]) count++;
                if (i < this.rows - 1)
                    if (origGrid[i + 1][j]) count++;
                if (i < this.rows - 1 && j > 0)
                    if (origGrid[i + 1][j - 1]) count++;
                if (i < this.rows - 1 && this.cols - 1)
                    if (origGrid[i + 1][j + 1]) count++;
                if (origGrid[i][j] && (count < 2 || count > 3)) gridCopy[i][j] = 0;
                if (!origGrid[i][j] && count === 3) gridCopy[i][j] = 1;
            }
        }
        this.setState({
            grid: gridCopy
        });
    }

    select(row, col) {
        let copy = _.map(this.state.grid, _.clone);
        //change to the opposite
        copy[row][col] = !copy[row][col];
        this.setState({
            grid: copy
        });
    }

    playButton() {
        clearInterval(this.intervalId);
        this.intervalId = setInterval(this.start, 100);
    }

    componentDidMount() {
        this.randomise();
        this.playButton();
    }

    render() {
        return ( 
            <div>
            <h1 className = 'text-center heading' > Game of Life </h1> 
            <Grid grid = {this.state.grid} cols = {this.cols} rows = {this.rows} select={this.select}/> 
            </div>
        );
    }
}