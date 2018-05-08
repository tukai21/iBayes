import React, { Component } from 'react';
import { line } from 'd3';
import { nodeConfigs, edgeConfigs } from './configs';


export default class Edge extends Component {
    meta = {id: this.props.id};

    handleClick = (e) => {
        if (e.shiftKey) {
            this.props.onShiftKeyClick({}, this.meta);
        } else {
            this.props.onSingleClick({}, this.meta);
        }
    }
    handleDoubleClick = (e) => {
        this.props.onDoubleClick({}, this.meta);
    }
    handleContextMenu = (e) => {
        this.props.onContextMenu({}, this.meta);
    }
    handleMouseDown = (e) => {
        if (e.shiftKey) {
            return null;
        }
        this.props.onMouseDown({}, this.meta);
    }
    handleMouseUp = (e) => {
        if (e.shiftKey) {
            return null;
        }
        this.props.onMouseUp({}, this.meta)
    }
    handleMouseEnter = (e) => {
        this.props.onMouseEnter({}, this.meta);
    }
    handleMouseLeave = (e) => {
        this.props.onMouseLeave({}, this.meta);
    }

    computePath = () => {
        const { source, destination } = this.props;
        const xDiff = destination.x - source.x;
        const yDiff = destination.y - source.y;
        const theta = Math.atan2(yDiff, xDiff);
        const sourceRadius = nodeConfigs[source.type].radius;
        const destinationRadius = nodeConfigs[destination.type].radius;
        const x1 = source.x + 1.1 * Math.cos(theta) * sourceRadius;
        const y1 = source.y + 1.1 * Math.sin(theta) * sourceRadius;
        const x2 = destination.x + 1.1 * Math.cos(theta) * destinationRadius;
        const y2 = destination.y + 1.1 * Math.sin(theta) * destinationRadius;
        const data = [
            [x1, y1],
            [x2, y2]
        ]
        return data;
    }
    getPath = line()
        .x( (d) => { return d[0] } )
        .y( (d) => { return d[1] } );
    
    render() {
        const data = this.computePath();
        const path = this.getPath(data);
        return (
            <g className="edge" 
                onClick={this.handleClick}
                onDoubleClick={this.handleDoubleClick}
                onContextMenu={this.handleContextMenu}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                >
                <path {...edgeConfigs} d={path} />
            </g>
        )
    }
}