import "./style.css";
import { displayController } from "./modules/displayController";

const displayControl = displayController();

displayControl.renderToDosList();
displayControl.renderMenu();
