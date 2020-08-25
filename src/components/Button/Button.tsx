import React, {FunctionComponent} from 'react';
import './Button.scss';

type Props = {
    onClick: (file: any) => void
}

const Button: FunctionComponent<Props> = (props) => {
    return (
        <button className="button" onClick={props.onClick}>Скачать</button>
    )
}

export default Button;
