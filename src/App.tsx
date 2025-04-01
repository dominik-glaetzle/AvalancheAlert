import './App.css';
import Page from './components/Page.tsx';
import { AnimatedBackground } from 'animated-backgrounds';

function App() {
    return (
        <>
            <AnimatedBackground animationName={'cosmicDust'} />
            <Page />
        </>
    );
}

export default App;
