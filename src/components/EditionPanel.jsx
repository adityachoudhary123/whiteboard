import React from "react";

import {COLORS, FIELDS} from "../constants.js";
import {TEXT_SIZES, FONT_FACES, TEXT_ALIGNS} from "../constants.js";
import {STROKES, STROKE_WIDTHS} from "../constants.js";
import {OPACITY_MIN, OPACITY_MAX, OPACITY_STEP} from "../constants.js";
import {SHAPES, FILL_STYLES} from "../constants.js";
import {ARROWHEADS} from "../constants.js";
import {FORM_OPTIONS} from "../constants.js";
import {useBoard} from "../contexts/BoardContext.jsx";
import {Form} from "./Form.jsx";
import {CircleSolidIcon, CircleDashedIcon, CircleDottedIcon} from "./Icons.jsx";
import {CircleSolidFillIcon, CircleHatchFillIcon} from "./Icons.jsx";
import {SquareIcon, CircleIcon, TriangleIcon, DiamondIcon} from "./Icons.jsx";
import {ArrowheadNoneIcon, ArrowheadArrowIcon, ArrowheadTriangleIcon, ArrowheadSquareIcon, ArrowheadCircleIcon} from "./Icons.jsx";
import {TextCenterIcon, TextLeftIcon, TextRightIcon, TextJustifyIcon} from "./Icons.jsx";
import {elementsConfig} from "../elements/index.jsx";

// Available sections
const SECTIONS = {
    FILL: "fill",
    STROKE: "stroke",
    TEXT: "text",
    EFFECTS: "effects",
    ARROWHEADS: "arrowheads",
    SHAPE: "shape",
};

const arrowheadValues = [
    {value: ARROWHEADS.NONE, icon: ArrowheadNoneIcon()},
    {value: ARROWHEADS.ARROW, icon: ArrowheadArrowIcon()},
    {value: ARROWHEADS.TRIANGLE, icon: ArrowheadTriangleIcon()},
    {value: ARROWHEADS.SQUARE, icon: ArrowheadSquareIcon()},
    {value: ARROWHEADS.CIRCLE, icon: ArrowheadCircleIcon()},
    // {value: ARROWHEADS.SEGMENT, icon: ArrowheadSegmentIcon()},
];

const allOptions = {
    [SECTIONS.FILL]: {
        title: "Fill",
        // icon: (<FillIcon />),
        test: FIELDS.FILL_COLOR,
        items: {
            [FIELDS.FILL_COLOR]: {
                type: FORM_OPTIONS.COLOR,
                title: "Fill Color",
                values: Object.values(COLORS),
            },
            [FIELDS.FILL_STYLE]: {
                type: FORM_OPTIONS.SELECT,
                title: "Fill Style",
                values: [
                    {value: FILL_STYLES.NONE, icon: CircleSolidIcon()},
                    {value: FILL_STYLES.HATCH, icon: CircleHatchFillIcon()},
                    {value: FILL_STYLES.SOLID, icon: CircleSolidFillIcon()},
                ],
            },
        },
    },
    [SECTIONS.STROKE]: {
        title: "Stroke",
        // icon: (<StrokeIcon />),
        test: FIELDS.STROKE_COLOR,
        items: {
            strokeColor: {
                type: FORM_OPTIONS.COLOR,
                title: "Stroke color",
                values: Object.values(COLORS),
            },
            strokeWidth: {
                type: FORM_OPTIONS.SELECT,
                title: "Stroke Width",
                values: [
                    {value: STROKE_WIDTHS.SMALL, text: "S"},
                    {value: STROKE_WIDTHS.MEDIUM, text: "M"},
                    {value: STROKE_WIDTHS.LARGE, text: "L"},
                    {value: STROKE_WIDTHS.XLARGE, text: "XL"},
                ],
            },
            strokeStyle: {
                type: FORM_OPTIONS.SELECT,
                title: "Stroke Style",
                values: [
                    {value: STROKES.DOTTED, icon: CircleDottedIcon()},
                    {value: STROKES.DASHED, icon: CircleDashedIcon()},
                    {value: STROKES.SOLID, icon: CircleSolidIcon()},
                ],
            },
        },
    },
    [SECTIONS.TEXT]: {
        title: "Text",
        // icon: (<TextIcon />),
        test: FIELDS.TEXT_COLOR,
        items: {
            textColor: {
                type: FORM_OPTIONS.COLOR,
                title: "Text Color",
                values: Object.values(COLORS),
            },
            textFont: {
                type: FORM_OPTIONS.FONT,
                title: "Text Font",
                values: Object.values(FONT_FACES),
            },
            textSize: {
                type: FORM_OPTIONS.SELECT,
                title: "Text Size",
                values: [
                    {value: TEXT_SIZES.SMALL, text: "S"},
                    {value: TEXT_SIZES.MEDIUM, text: "M"},
                    {value: TEXT_SIZES.LARGE, text: "L"},
                    {value: TEXT_SIZES.XLARGE, text: "XL"},
                ],
            },
            textAlign: {
                type: FORM_OPTIONS.SELECT,
                title: "Text Align",
                values: [
                    {value: TEXT_ALIGNS.LEFT, icon: TextLeftIcon()},
                    {value: TEXT_ALIGNS.CENTER, icon: TextCenterIcon()},
                    {value: TEXT_ALIGNS.RIGHT, icon: TextRightIcon()},
                    {value: TEXT_ALIGNS.JUSTIFY, icon: TextJustifyIcon()},
                ],
            },
        },
    },
    [SECTIONS.ARROWHEADS]: {
        title: "Arrowhead",
        test: FIELDS.START_ARROWHEAD,
        // icon: (<ArrowheadArrowIcon />),
        items: {
            [FIELDS.START_ARROWHEAD]: {
                type: FORM_OPTIONS.SELECT,
                title: "Start Arrowhead",
                values: arrowheadValues,
            },
            [FIELDS.END_ARROWHEAD]: {
                type: FORM_OPTIONS.SELECT,
                title: "End Arrowhead",
                values: arrowheadValues,
            },
        },
    },
    [SECTIONS.SHAPE]: {
        title: "Shape",
        test: FIELDS.SHAPE,
        // icon: (<ShapesIcon />),
        items: {
            [FIELDS.SHAPE]: {
                type: FORM_OPTIONS.SELECT,
                title: "Shape",
                values: [
                    {value: SHAPES.RECTANGLE, icon: SquareIcon()},
                    {value: SHAPES.ELLIPSE, icon: CircleIcon()},
                    {value: SHAPES.DIAMOND, icon: DiamondIcon()},
                    {value: SHAPES.TRIANGLE, icon: TriangleIcon()},
                ],
            },
        },
    },
    [SECTIONS.EFFECTS]: {
        title: "Effects",
        // icon: (<SunIcon />),
        test: FIELDS.OPACITY,
        items: {
            [FIELDS.OPACITY]: {
                type: FORM_OPTIONS.RANGE,
                title: "Opacity",
                minValue: OPACITY_MIN,
                maxValue: OPACITY_MAX,
                step: OPACITY_STEP,
            },
        },
    },
};

const useValues = (board, selection) => {
    // Check for active tool enabled
    // Generate initial default values for this element type
    if (board.activeTool && elementsConfig[board.activeTool]) {
        return elementsConfig[board.activeTool].initialize(board.defaults);
    }
    // Check if we have only one selected item
    if (selection.length === 1) {
        return selection[0];
    }
    // Compute common values from selection
    return selection.reduce((prev, item) => ({...prev, ...item}), {});
};

export const EditionPanel = props => {
    const board = useBoard();
    const selection = board.getSelectedElements();
    const values = useValues(board, selection);
    const keys = Object.keys(values);
    const visibleOptions = React.useMemo(
        () => {
            // If no keys are available, we will display all availabe options in this category
            if (keys.length === 0) {
                return Object.keys(allOptions);
            }
            // Filter options
            return Object.keys(allOptions).filter(option => {
                return typeof values[allOptions[option].test] !== "undefined";
            });
        },
        [keys.length],
    );

    // Handle selection change
    const handleChange = (key, value) => {
        board.updateElements(selection, [key], [value], true);
        props?.onChange?.();
    };

    return (
        <div className={props.className} style={props.style}>
            <div className="bg-white border border-gray-300 w-56 rounded-xl shadow-md overflow-y-auto scrollbar maxh-full" style={{pointerEvents: "all"}}>
                {visibleOptions.map(key => (
                    <React.Fragment key={key}>
                        <div className="first:hidden w-full h-px bg-gray-300" />
                        <div className="p-4">
                            <Form
                                className="flex flex-col gap-2"
                                key={selection.length + (selection.length > 0 ? selection[0].id : "")}
                                data={values || {}}
                                items={allOptions[key].items}
                                onChange={handleChange}
                            />
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

EditionPanel.defaultProps = {
    className: "absolute z-6",
    style: {},
    onChange: null,
};
