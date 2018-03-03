import React from 'react';
import {Grid} from './Grid';
import _ from 'lodash';
export class Life extends React.Component {
    constructor(props) {
        super(props);
        this.cols = 50;
        this.rows = 30;
        this.start = this.start.bind(this);
        this.select = this.select.bind(this);
        this.buttonActions = this.buttonActions.bind(this);
        this.state = 
        {
            grid:  Array(this.rows).fill(Array(this.cols).fill(0)),
            gen: 1
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
        let origGrid = this.state.grid;
        let gridCopy = _.map(this.state.grid, _.clone);
        let gen = 0;

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
            grid: gridCopy,
            gen: this.state.gen + 1
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
    
    componentDidMount() {
        this.randomise();
    }

    buttonActions(action){
        switch(action){
            case 'start':
                clearInterval(this.intervalId);
                this.intervalId = setInterval(this.start, 100);
                break;
            case 'pause':
                clearInterval(this.intervalId);
                break;
            case 'clear':
                clearInterval(this.intervalId);
                this.setState({grid: Array(this.rows).fill(Array(this.cols).fill(0)), gen: 0})
                break;
            case 'randomise':
                this.setState({gen: 1});
                clearInterval(this.intervalId);
                this.randomise();
                break;
            default:
                alert('Something went wrong. Check the console (Ctrl+shift+i)');
        }
    }

    render() {
        return ( 
            <div className="container">
                <h1 className ='text-center heading'> Game of Life </h1>
                <div className="buttons col-sm-12">
                    <button className="btn btn-success col-sm-2" onClick={() => this.buttonActions('start')}>Start</button>
                    <button className="btn btn-info col-sm-2" onClick={() => this.buttonActions('pause')}>Pause</button>
                    <button className="btn btn-danger col-sm-2" onClick={() => this.buttonActions('clear')}>Clear</button>
                    <button className="btn btn-primary col-sm-2" onClick={() => this.buttonActions('randomise')}>Randomise</button>
                </div>
                <Grid grid = {this.state.grid} cols = {this.cols} rows = {this.rows} select={this.select}/>
                <h3>Generation: {this.state.gen}</h3>
            </div>
        );
    }
}