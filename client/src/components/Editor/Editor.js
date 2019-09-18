import React, {useState} from "react";
// eslint-disable-next-line
import brace from "brace";
import AceEditor from "react-ace";

import "./editor.css";

import "brace/mode/java";
import "brace/mode/c_cpp";
import "brace/mode/python";
import "brace/theme/dracula";
import "brace/ext/language_tools";

export default (props) => {
    const [lang,setLang] = useState({lang: "c_cpp", langCode: 1});
    const [code, setCode] = useState();
    
    const displayTime = () => {
        // console.log(props.time)
        let mins = Math.floor(props.time/60);
        mins = (mins < 10 ? '0':'') + mins 
        let secs = props.time%60;
        secs = (secs < 10 ? '0':'') + secs 
        return `${mins}:${secs}`
    }
    
    const handleLangChange = (e) => {
        switch(e.target.value) {
            case "1":
                setLang({lang:"c_cpp", langCode: 1});
                break;
            case "2":
                setLang({lang:"c_cpp", langCode: 2});
                break;
            case "3":
                setLang({lang:"python", langCode: 3});
                break;
            case "4":
                setLang({lang:"java", langCode: 4});
                break;
            default:
                break;
        }
    }

    const handleEditorChange = (value) => {
        setCode(value);
    }
    
    return (
        <div style={{ overflowY: "hidden" }}>
            <div id="topBar">
                <select id="lang" onChange={handleLangChange}>
                    <option value="1">C</option>
                    <option value="2">C++</option>
                    <option value="3">Python</option>
                    <option value="4">Java</option>
                </select>
                <div id="timer">{displayTime()}</div>
                <button className="editor-button" id="run" onClick={props.onClickRun}>
                    Run
                </button>
                <button className="editor-button" id="submit">
                    Submit
                </button>
            </div>

            <AceEditor
                value={code}
                onChange={handleEditorChange}
                mode={lang.lang}
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
                    <pre id="input-text"></pre>
                </div>
            </div>
        </div>
    );
};
