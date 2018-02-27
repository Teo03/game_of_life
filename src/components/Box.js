import React from "react";

export class Box extends React.Component {
    render(){
        return <div className={this.props.val} id='box'></div>
    }
}