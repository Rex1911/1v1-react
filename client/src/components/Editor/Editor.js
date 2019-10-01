import React from "react";
import AceEditor from "react-ace";
import displayTime from '../../util/time'

import "./editor.css";

import "brace/mode/java";
import "brace/mode/c_cpp";
import "brace/mode/python";
import "brace/theme/dracula";
import "brace/ext/language_tools";

export default (props) => {
    const setResultOutput = () => {
        let {passedFailedList} = props;
        let list = passedFailedList.map((result, i) => {
            if(result === 'passed') return <p key={i}>Test Case {i+1} <span id="passed">passed</span></p>
            return <p key={i}>Test Case {i+1} <span id="failed">failed</span></p>
        })
        return list;
    }

    return (
        <div style={{ overflowY: "hidden" }}>
            <div id="topBar">
                <select id="lang" onChange={props.onLangChange}>
                    <option value="1">C</option>
                    <option value="2">C++</option>
                    <option value="3">Python</option>
                    <option value="4">Java</option>
                </select>
                <div id="timer">{displayTime(props.time)}</div>
                <button className="editor-button" id="run" onClick={props.onClickRun}>
                    RUN
                </button>
                <button className="editor-button" id="submit" onClick={props.onClickSubmit}>
                    SUBMIT
                </button>
            </div>

            <AceEditor
                value={props.code}
                onChange={props.onCodeChange}
                mode={props.mode}
                theme="dracula"
                name="UNIQUE_ID_OF_DIV"
                height="60vh"
                width="100%"
                showPrintMargin={false}
                enableLiveAutocompletion
                editorProps={{ $blockScrolling: true }}
                fontSize={20}
            />

            <div id="bottom">
                <div id="bottom-left">
                    <div id="output">Output:</div>
                    <pre id="output-text">{props.output}</pre>
                </div>
                <div id="bottom-right">
                    <div id="input">Result:</div>
                    <pre id="input-text">{setResultOutput()}</pre>
                </div>
            </div>
        </div>
    );
};
