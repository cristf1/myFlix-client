import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
import Container from 'react-bootstrap/Container'
/*const app = express();
const cors = require('cors');
app.use(cors());
let auth = require('./auth')(app); */
import 'bootstrap/dist/css/bootstrap.min.css';
// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';



// Main component (will eventually use all the others)

const MyFlixApplication = () => {

    return (
        <Container style={{ border: '1px solid red' }}>
            <MainView />
        </Container>
    );
};

//let auth = require('./')(app);


// Finds the root of app
const container = document.querySelector('#root');
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<MyFlixApplication></MyFlixApplication>)