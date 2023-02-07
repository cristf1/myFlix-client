import { createRoot } from 'react-dom/client';
import { MainView } from "./components/main-view/main-view";

/*const app = express();
const cors = require('cors');
app.use(cors());
let auth = require('./auth')(app); */

// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";



// Main component (will eventually use all the others)

const MyFlixApplication = () => {

    return (
        <div className="my-flix">
            <MainView />
        </div>
    );
};

//let auth = require('./')(app);


// Finds the root of app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<MyFlixApplication></MyFlixApplication>)