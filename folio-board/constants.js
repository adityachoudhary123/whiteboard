import {EXPORT_FORMATS} from "folio-core";

export const IS_DARWIN = !!(/Mac|iPod|iPhone|iPad/.test(window.navigator.platform));

export const KEYS = {
    ESCAPE: "Escape",
    BACKSPACE: "Backspace",
    ARROW_DOWN: "ArrowDown",
    ARROW_LEFT: "ArrowLeft",
    ARROW_RIGHT: "ArrowRight",
    ARROW_UP: "ArrowUp",
    C: "c",
    P: "p",
    X: "x",
    Z: "z",
    Y: "y",
};

export const DIALOGS = {
    FILL: "fill",
    STROKE: "stroke",
    TEXT: "text",
    SHAPE: "shape",
    ARROWHEAD: "arrowhead",
};

export const ACTIONS = {
    MOVE: "action:move",
    SELECT: "action:select",
    SCREENSHOT: "action:screenshot",
    CREATE: "action:create",
    DRAG: "action:drag",
    RESIZE: "actionresize",
    EDIT: "action:edit",
};

export const CHANGES = {
    CREATE: "change:create",
    UPDATE: "change:update",
    REMOVE: "change:remove",
};

export const FILE_EXTENSIONS = {
    [EXPORT_FORMATS.PNG]: ".png",
    [EXPORT_FORMATS.SVG]: ".svg",
};
