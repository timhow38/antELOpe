import '../compStyles/button.css';

function Button(props) {
    let defaultOnClick = () => alert("Not yet implemented")
    return <div className='button' onClick={props.onClick ?? defaultOnClick}>{props.text}</div>;
}

export default Button;