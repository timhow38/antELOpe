function Header(props) {
    return <>
        <div id='header'>
            <input type='text' placeholder='Enter your name' onBlur={props.onNameEntered} />
        </div>
    </>
}

export default Header;