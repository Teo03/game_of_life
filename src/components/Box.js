import React from "react";

export class Box extends React.Component {
    render(){
        return <div className={this.props.val} id='box' onClick={() => this.props.select(this.props.row, this.props.col)}></div>
    }
}