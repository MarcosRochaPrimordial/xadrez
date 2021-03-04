import { FieldModel } from '../../../../core/models/FieldModel';
import './field.css';

interface OwnProps {
    field: FieldModel
}

const Field = (props: OwnProps) => {
    const { field } = props;
    return (
        <div className={`field-board ${field.position}`} style={{ backgroundColor: field.color }}>
            <span className="piece">&#9814;</span>
        </div>
    );
}

export default Field;