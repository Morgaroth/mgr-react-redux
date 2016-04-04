import Gate from "./Gate"
import {PauliXHref} from "../../aliases/index";


export default class PauliX extends Gate {

    gateHref() {
        return PauliXHref;
    }
}