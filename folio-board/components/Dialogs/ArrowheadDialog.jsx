import React from "react";
import classNames from "classnames";
import {ARROWHEADS} from "folio-core";
import {Dialog} from "./Dialog.jsx";
import {Form} from "../Form/index.jsx";
import {
    ArrowheadNoneIcon,
    ArrowheadArrowIcon,
    ArrowheadTriangleIcon,
    ArrowheadSquareIcon,
    ArrowheadCircleIcon,
    ArrowheadSegmentIcon,
} from "../icons/index.jsx";

const arrowheadValues = [
    {value: ARROWHEADS.NONE, icon: ArrowheadNoneIcon()},
    {value: ARROWHEADS.ARROW, icon: ArrowheadArrowIcon()},
    {value: ARROWHEADS.TRIANGLE, icon: ArrowheadTriangleIcon()},
    {value: ARROWHEADS.SQUARE, icon: ArrowheadSquareIcon()},
    {value: ARROWHEADS.CIRCLE, icon: ArrowheadCircleIcon()},
    {value: ARROWHEADS.SEGMENT, icon: ArrowheadSegmentIcon()},
];

const options = {
    startArrowhead: {
        type: "select",
        title: "Start Arrowhead",
        grid: 3,
        values: arrowheadValues,
    },
    endArrowhead: {
        type: "select",
        title: "End Arrowhead",
        grid: 3,
        values: arrowheadValues,
    },
};

export const ArrowheadDialog = props => (
    <Dialog className={classNames("right:0 top:0 pt:4 pr:28", props.className)} width="11rem">
        <Form
            data={props.values || {}}
            items={options}
            onChange={props.onChange}
        />
    </Dialog>
);

ArrowheadDialog.defaultProps = {
    className: "",
    values: {},
    onChange: null,
};
