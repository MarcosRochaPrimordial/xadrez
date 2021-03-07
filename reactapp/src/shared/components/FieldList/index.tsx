import { Col } from "../../../core/models/FieldModel";
import { IPieceMovments } from "../../../core/models/PieceMovments";
import { Room } from "../../../core/models/Room";
import Field from './Field';
import './fieldlist.css';

interface OwnProps {
    fields: Col[];
    pieceMovments: IPieceMovments;
    room: Room;
    reload: (room: Room) => void;
}

const FieldList = (props: OwnProps) => {
    const { fields, pieceMovments, reload } = props;
    return (
        <div className="line-row">
            {fields.map(i => (
                <Field key={i.colLocation} field={i.field} pieceMovments={pieceMovments} room={props.room} reload={reload} />
            ))}
        </div>
    );
};

export default FieldList;