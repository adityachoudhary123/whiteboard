import React from "react";
import {createRoot} from "react-dom/client";

import {Board} from "./components/Board.js";

const root = createRoot(document.getElementById("root"));
root.render(
    <div className="bg-white text-base c-dark position-fixed top-0 left-0 h-full w-full">
        <Board />
    </div>
);
