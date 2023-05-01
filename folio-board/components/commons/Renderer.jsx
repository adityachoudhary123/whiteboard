import React from "react";
import {Canvas} from "folio-core";

import {SCREENSHOT_FILL_COLOR, SCREENSHOT_STROKE_COLOR} from "../../constants.js";
import {SELECTION_FILL_COLOR, SELECTION_STROKE_COLOR} from "../../constants.js";
import {ACTIONS} from "../../constants.js";

import {useBoard} from "../../contexts/BoardContext.jsx";
import {useEvents} from "../../hooks/useEvents.js";
import {useCursor} from "../../hooks/useCursor.js";
import {useBounds} from "../../hooks/useBounds.js";
import {useHandlers} from "../../hooks/useHandlers.js";

export const Renderer = props => {
    const board = useBoard();
    const events = useEvents({
        onChange: props.onChange,
        onScreenshot: props.onScreenshot,
    });
    const cursor = useCursor();
    const bounds = useBounds();
    const handlers = useHandlers();
    const isSelection = board.activeAction === ACTIONS.SELECT;
    const isScreenshot = board.activeAction === ACTIONS.SCREENSHOT;

    return (
        <Canvas
            id={board.id}
            elements={board.elements}
            assets={board.assets}
            backgroundColor={board.background}
            cursor={cursor}
            translateX={board.translateX}
            translateY={board.translateY}
            zoom={board.zoom}
            bounds={bounds}
            handlers={handlers}
            showEdgeHandlers={handlers?.showEdgeHandlers}
            showCornerHandlers={handlers?.showCornerHandlers}
            showNodeHandlers={handlers?.showNodeHandlers}
            brush={board.selection}
            brushFillColor={isScreenshot ? SCREENSHOT_FILL_COLOR : SELECTION_FILL_COLOR}
            brushStrokeColor={isScreenshot ? SCREENSHOT_STROKE_COLOR : SELECTION_STROKE_COLOR}
            showBrush={isSelection || isScreenshot}
            pointer={board.erase}
            showPointer={board.activeAction === ACTIONS.ERASE}
            showGrid={board.grid}
            {...events}
        />
    );
};
