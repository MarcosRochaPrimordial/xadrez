import { FieldModel } from '../../../../core/models/FieldModel';
import './field.css';

interface OwnProps {
    field: FieldModel
}

const Field = (props: OwnProps) => {
    const { field } = props;
    let classElement = 'field';
    if (!!field.code) {
        classElement = `field-${field.code}-${field.position}`;
        const el = document.querySelector(`.${classElement}`);
        if (el != null) {
            el.innerHTML = `&#${field.code};`;
        }
    }
    
    return (
        <div className={`field-board ${field.position}`} style={{ backgroundColor: field.color }}>
            <span className={`piece ${classElement}`}></span>
        </div>
    );
}

export default Field;