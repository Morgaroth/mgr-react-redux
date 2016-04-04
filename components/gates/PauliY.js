import Gate from "./Gate";
import {PauliYHref} from "../../aliases/index";


export default class PauliY extends Gate {

    gateHref() {
        return PauliYHref;
    }
}