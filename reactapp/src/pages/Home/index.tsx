import React, { Component } from 'react';

import Header from '../../shared/components/Header';
import RoomList from '../../shared/components/RoomList';
import SearchRoomForm from '../../shared/components/SearchRoomForm';

interface IState {
    
}

interface OwnProps {
    history: any[];
}

export default class Home extends Component<OwnProps, IState> {

    constructor(props: OwnProps) {
        super(props);
    }

    render() {
        const { history } = this.props;
        return (
            <div>
                <Header history={history} />
                <div className="mt-20">
                    <SearchRoomForm history={history} />
                    <div className="mt-20">
                        <RoomList history={history} />
                    </div>
                </div>
            </div>
        );
    }
}