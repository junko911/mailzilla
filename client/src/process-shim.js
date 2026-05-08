/* CRA omits Node `process`; some bundled deps (chunks) still reference it in browser. */
import process from "process";

window.process = process;
