import {HadamardHref} from "../../aliases/index";
import Gate from "./Gate"


export default class Hadamard extends Gate {

    gateHref() {
        return HadamardHref;
    }
}