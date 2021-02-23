import React, { Component } from 'react';

import { Row, Col, FieldModel } from '../../core/models/FieldModel';
import FieldList from '../../shared/components/FieldList';
import Header from '../../shared/components/Header';
import './home.css'

interface IState {
    chessBoard: Row[],
}

interface OwnProps {
    history: any[];
}

function fieldColor(rowIndex: number, colorIndex: number) {
    if (rowIndex % 2 !== 0) {
        if (colorIndex % 2 !== 0) {
            return '#FFF';
        } else {
            return '#212121';
        }
    } else {
        if (colorIndex % 2 !== 0) {
            return '#212121';
        } else {
            return '#FFF';
        }
    }
}

function buildBoard() {
    const colList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    let buildedBoard: Row[] = new Array(8).fill({});
    buildedBoard = buildedBoard.map((row, key) => {
        let columns: Col[] = new Array(8).fill({});
        columns = columns.map((col, ikey) => ({
            colLocation: colList[ikey],
            field: {
                color: fieldColor(key, ikey),
            } as FieldModel
        } as Col));
        return {
            rowLocation: ++key,
            cols: columns
        } as Row;
    });
    return buildedBoard;
}

export default class Home extends Component<OwnProps, IState> {

    state = {
        chessBoard: buildBoard()
    };

    constructor(props: OwnProps) {
        super(props);
    }

    render() {
        const { history } = this.props;
        const { chessBoard } = this.state;
        console.log(chessBoard);
        return (
            <div>
                <Header history={history} />
                <div className="chess-board">
                    {chessBoard.map(i => (
                        <FieldList key={i.rowLocation} fields={i.cols} />
                    ))}
                </div>
            </div>
        );
    }
}