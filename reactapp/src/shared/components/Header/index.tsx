import { Navbar, Button } from 'react-bootstrap';

import auth from './../../services/auth.service';
import './header.css';

interface OwnProps {
    history: any;
    gameCode?: string;
}

const Header = (props: OwnProps) => {

    const { gameCode, history } = props;

    const signout = () => {
        auth.logout();
        history.push('/login');
    }

    const exitRoom = () => {
        history.push('/');
    }

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand>Chess</Navbar.Brand>
            <div className="btn-logout">
                <h3 className="chess-code">{gameCode}</h3>
                {!!gameCode && (
                    <Button variant="outline-warning mr-10" onClick={exitRoom.bind(this)}>Exit</Button>
                )}
                <Button variant="outline-success" onClick={signout.bind(this)}>Logout</Button>
            </div>
        </Navbar>
    );
};

export default Header;