import React, { Component } from 'react'

export class CompA extends Component {
    render() {
        return (
            <div>
                <p>{this.props.test}</p>
                {this.props.help}
            </div>
        )
    }
}

export default CompA
