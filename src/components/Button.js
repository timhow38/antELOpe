import './../styles/Button.css';
import Button from '@mui/material/Button';

export default function BasicButtons(props) {
    let defaultOnClick = () => alert("Not yet implemented")
    return (
    <Button 
    style={{
        backgroundColor: "#2277d9",
    }}
    variant="contained" onClick={props.onClick ?? defaultOnClick} disabled={props.disabled}>{props.text}</Button>
    );
}