import { Component } from "react";

import { Col, FieldModel, Row } from "../../../core/models/FieldModel";
import FieldList from '../FieldList';

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

interface IState {
    chessBoard: Row[],
}

export default class Playarea extends Component<any, IState> {

    state = {
        chessBoard: buildBoard()
    };

    constructor(props: any) {
        super(props);
    }

    render() {
        const { chessBoard } = this.state;
        return (
            <div>
                <div className="chess-board">
                    {chessBoard.map(i => (
                        <FieldList key={i.rowLocation} fields={i.cols} />
                    ))}
                </div>
            </div>
        );
    }
}