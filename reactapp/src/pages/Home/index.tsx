import React from 'react';

import Header from '../../shared/components/Header';
import RoomList from '../../shared/components/RoomList';
import SearchRoomForm from '../../shared/components/SearchRoomForm';

interface OwnProps {
    history: any[];
}

const Home = (props: OwnProps) => {
    const { history } = props;

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

export default Home;