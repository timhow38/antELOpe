import logo from './logo.svg';
import './App.css';
import Button from './components/Button'

function App() {
    return (
        <div className="App">
            <Button text="Start a ranked climb" />
            <Button text="Start a casual climb" />
            <Button text="Record a hangboard time" />
        </div>
    );
}

export default App;
