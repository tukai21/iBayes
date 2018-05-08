import React, { Component } from 'react';

import Node from './Node';
import Edge from './Edge';
import Plate from './Plate';
import BackGround from './BackGround';


export default class Canvas extends Component {
    handleClick = (e) => {
        if (e.shiftKey) {
            this.props.canvasActions.onShiftKeyClick({}, {});
        } else {
            this.props.canvasActions.onSingleClick({}, {});
        }
    }
    handleDoubleClick = (e) => {
        this.props.canvasActions.onDoubleClick({}, {});
    }
    handleContextMenu = (e) => {
        this.props.canvasActions.onContextMenu({}, {});
    }
    handleMouseDown = (e) => {
        if (e.shiftKey) {
            return null;
        }
        document.addEventListener('mousemove', this.handleDrag);
        const payload = {
            originX: e.pageX, 
            originY: e.pageY,
        };
        this.props.canvasActions.onMouseDown(payload, {});
    }
    handleMouseUp = (e) => {
        if (e.shiftKey) {
            return null;
        }
        document.removeEventListener('mousemove', this.handleDrag);
        this.props.canvasActions.onMouseUp({}, {})
    }
    handleDrag = (e) => {
        const xDiff = e.pageX - this.props.canvas.originX;
        const yDiff = e.pageY - this.props.canvas.originY;
        const payload = {
            originX: e.pageX, 
            originY: e.pageY,
            xDiff: xDiff,
            yDiff: yDiff
        };
        this.props.canvasActions.onDrag(payload, {});
    }
    handleMouseEnter = (e) => {
        const payload = {
            originX: e.pageX,
            originY: e.pageY
        }
        this.props.canvasActions.onMouseEnter(payload, {});
    }
    handleMouseLeave = (e) => {
        this.props.canvasActions.onMouseLeave({}, {});
    }
    handleKeyPress = (e) => {
        if (e.key === 'Backspace' || e.key === 'Delete') {
            this.props.canvasActions.onDelete({}, {});
        }
    }

    renderGraph = () => {
        const nodesDOM = [];
        const edgesDOM = [];
        const platesDOM = [];
        
        const nodes = {...this.props.nodes}
        for (let key in nodes) {
            nodesDOM.push(<Node {...nodes[key]} {...this.props.canvas} {...this.props.nodeActions} />);
        }
        const edges = {...this.props.edges}
        for (let key in edges) {
            let source = nodes[edges[key].source];
            let destination = nodes[edges[key].destination];
            let edge = {source: source, destination: destination}
            edgesDOM.push(<Edge {...edge} {...this.props.canvas} {...this.props.edgeActions} />);
        }
        const plates = {...this.props.plates}
        for (let key in plates) {
            platesDOM.push(<Plate {...plates[key]} {...this.props.canvas} {...this.props.plateActions} />);
        }
        return { nodesDOM, edgesDOM, platesDOM };
    }

    render() {
        const { nodesDOM, edgesDOM, platesDOM } = this.renderGraph();
        const translate = `translate(${this.props.canvas.x}, ${this.props.canvas.y})`;
        return (
            <g transform={translate} className="canvas"
                onClick={this.handleClick}
                onDoubleClick={this.handleDoubleClick}
                onContextMenu={this.handleContextMenu}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onKeyPress={this.handleKeyPress}
                >
                <BackGround />
                <g className="graph">
                    {nodesDOM}
                    {edgesDOM}
                    {platesDOM}
                </g>
            </g>
        )

    }
}

