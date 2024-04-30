import './style.css'
import { displayController } from "./modules/displayController";



const initializeApp = (function () {
const displayControl = displayController();

const app = document.getElementById('app');

app.appendChild(displayControl.renderToDoForm());
})();
