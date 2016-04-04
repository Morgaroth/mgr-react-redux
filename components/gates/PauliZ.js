import Gate from "./Gate";
import {PauliZHref} from "../../aliases/index";


export default class PauliZ extends Gate {

    gateHref() {
        return PauliZHref;
    }
}