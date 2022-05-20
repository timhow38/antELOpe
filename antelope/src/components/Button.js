function Button(props) {
    let defaultOnClick = () => alert("Not yet implemented")
    return <button className='button' onClick={props.onClick ?? defaultOnClick} disabled={props.disabled}>{props.text}</button>;
}

export default Button;