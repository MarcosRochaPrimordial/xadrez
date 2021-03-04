import { FieldModel } from '../../../../core/models/FieldModel';
import './field.css';

interface OwnProps {
    field: FieldModel
}

const Field = (props: OwnProps) => {
    const { field } = props;
    const teste = '\u2654';
    return (
        <div className={`field-board ${field.position}`} style={{ backgroundColor: field.color }}>
            <span className="piece">{teste}</span>
        </div>
    );
}

export default Field;