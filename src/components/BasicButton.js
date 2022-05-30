import './../styles/Button.css';
import Button from '@mui/material/Button';

function BasicButton(props) {
    let defaultOnClick = () => alert("Not yet implemented")
    return (
    <Button variant="contained" onClick={props.onClick ?? defaultOnClick} disabled={props.disabled}>{props.text}</Button>
    );
}

export default BasicButton;