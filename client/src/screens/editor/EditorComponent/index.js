import React from "react";
// eslint-disable-next-line
import brace from "brace";
import AceEditor from "react-ace";

import "./index.css";

import "brace/mode/java";
import "brace/theme/dracula";
import "brace/ext/language_tools";

export default (props) => {
    return (
        <div style={{ overflowY: "hidden" }}>
            <div id="topBar">
                <select id="lang">
                    <option value="1">C</option>
                    <option value="2">C++</option>
                    <option value="3">Python</option>
                    <option value="4">Java</option>
                </select>
                <button id="run" onClick={props.onClickRun}>
                    Run
                </button>
                <button id="submit">
                    Submit
                </button>
            </div>

            <AceEditor
                mode="java"
                theme="dracula"
                name="UNIQUE_ID_OF_DIV"
                height="60vh"
                width="100%"
                showPrintMargin={false}
                enableLiveAutocompletion
                editorProps={{ $blockScrolling: true }}
            />

            <div id="bottom">
                <div id="bottom-left">
                    <div id="output">Output:</div>
                    <pre id="output-text">{props.output}</pre>
                </div>
                <div id="bottom-right">
                    <div id="input">Result:</div>
                    <pre id="input-text"></pre>
                </div>
            </div>
        </div>
    );
};
