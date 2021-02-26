import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { Col, FieldModel, Row } from "../../core/models/FieldModel";
import { Room } from "../../core/models/Room";
import FieldList from '../../shared/components/FieldList';
import Header from "../../shared/components/Header";
import RoomService from "../../shared/services/room.service";
import UserStorage from "../../shared/services/user.storage";
import * as MessageActions from './../../core/store/ducks/Messages/actions';
import './playarea.css';

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
    room: Room,
};

interface DispatchProps {
    alertFailure(message: string): void;
}

interface OwnProps {
    match: {
        params: {
            id: number,
        }
    },
    history: any,
};

type Props = DispatchProps & OwnProps;

class Playarea extends Component<Props, IState> {

    state: IState = {
        chessBoard: buildBoard(),
        room: {
            id: 0,
            gameCode: '',
            playerOne: {
                username: ''
            },
            playerTwo: {
                username: ''
            },
            dStart: new Date(),
        }
    };

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        const { match } = this.props;
        RoomService.getRoomAndApply(match.params.id, UserStorage.getUser().id)
            .then(result => {
                if (result.success && result.result !== null) {
                    this.setState(state => ({
                        ...state,
                        room: result.result
                    }));
                } else {
                    this.props.alertFailure('Not available');
                    this.props.history.push('/');
                }
            })
    }

    render() {
        const { chessBoard } = this.state;
        const { history } = this.props;

        return (
            <div>
                {this.state.room.id !== 0 && (
                    <>
                        <Header history={history} gameCode={this.state.room.gameCode} />
                        <div className="chess-board">
                            {chessBoard.map(i => (
                                <FieldList key={i.rowLocation} fields={i.cols} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => 
    bindActionCreators({ ...MessageActions }, dispatch);

export default connect(null, mapDispatchToProps)(Playarea);