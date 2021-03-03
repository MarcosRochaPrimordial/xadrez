import './field.css';

interface OwnProps {
    color: string;
}

const Field = (props: OwnProps) => {
    const { color } = props;
    return (
        <div className="field-board" style={{ backgroundColor: color }}>
            <span className="piece">&#9814;</span>
        </div>
    );
}

export default Field;