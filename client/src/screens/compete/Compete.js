import React, { useState, useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import Question from "../../components/Question";
import Editor from "../../components/Editor";
import Modal from "../../components/Modal";
import io from "socket.io-client";
import displayTime from "../../util/time";

export default props => {
    const [gameState, setGameState] = useState("waiting");
    const [questionData, setQuestionData] = useState();
    const [timeRemaining, setTimeRemaining] = useState(-1);
    const [totalTime, setTotaltime] = useState(0);
    const [output, setOutput] = useState("");
    const [passedFailedList, setPassedFailedList] = useState([]);
    const [lang, setLang] = useState({ lang: "c_cpp", langCode: 1 });
    const [code, setCode] = useState();

    let socket = useRef();
    let timer = useRef();
    let editorButton = useRef(null);

    useEffect(() => {
        socket.current = io();
        socket.current.emit("joinContest", props.match.params.roomid);

        socket.current.on("start", data => {
            setTimeRemaining(data.totalTime * 60);
            setTotaltime(data.totalTime * 60);
            if (timer.current) return;
            setQuestionData(data.question[0]);
            setGameState("running");
            timer.current = setInterval(() => {
                setTimeRemaining(currentTime => currentTime - 1);
            }, 1000);
        });
        socket.current.on("lost", () => {
            setGameState("lost");
            clearInterval(timer.current);
        });

        return () => {
            socket.current.disconnect();
        };
    }, [props.match.params.roomid]);

    useEffect(() => {
        if (timeRemaining === 0) {
            clearInterval(timer.current);
            setGameState("timeup");
        }
    }, [timeRemaining]);

    useEffect(() => {
        document.addEventListener("scroll", () => {
            let style = "margin-left: 47vw; width: 6vw; height: 4vh; z-index: 100; position: fixed; bottom: 50px;";
            let scrollPosition = document.documentElement.scrollTop + window.innerHeight - 50;
            if (scrollPosition > document.body.offsetHeight - window.innerHeight) {
                let opacity = ((document.body.offsetHeight - scrollPosition) / window.innerHeight)-0.1;
                editorButton.current.style = style + 'opacity: ' + opacity;
                return;
            }
            editorButton.current.style = style + "opacity: 0.95;";
        });
    }, []);

    const handleLangChange = e => {
        switch (e.target.value) {
            case "1":
                setLang({ lang: "c_cpp", langCode: 1 });
                break;
            case "2":
                setLang({ lang: "c_cpp", langCode: 2 });
                break;
            case "3":
                setLang({ lang: "python", langCode: 3 });
                break;
            case "4":
                setLang({ lang: "java", langCode: 4 });
                break;
            default:
                break;
        }
    };

    const handleEditorChange = value => {
        setCode(value);
    };

    const handleRun = async () => {
        setOutput("Compiling...");
        setPassedFailedList([]);
        try {
            let res = await fetch("http://localhost:8080/compile", {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    code: lang.langCode,
                    source: code,
                    input: ""
                })
            });
            let { stdout, stderr } = await res.json();

            if (stderr) {
                setOutput(stderr);
                return;
            }
            if(stdout.endsWith('\n')) {
                stdout = stdout.substring(0, stdout.length-1);
            }
            //eslint-disable-next-line
            if(stdout == questionData.testCasesAnswer[0]) {
                clearInterval(timer.current);
                setGameState("won");
                socket.current.emit("gameOver", props.match.params.roomid);
            }
            let updatedList = [];
            setOutput(stdout);
            setPassedFailedList(updatedList);
        } catch (e) {
            console.log(e);
            setOutput("Something went wrong! Please try again!");
        }
    };

    const scrollToQuestion = () => {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }

    const scrollToEditor = () => {
        window.scrollTo({ top: (1 * document.body.scrollHeight), left: 0, behavior: 'smooth' });
    }

    let modal;
    if (gameState === "waiting")
        modal = <Modal>WAITING FOR ADMIN TO START</Modal>;
    else if (gameState === "lost") modal = <Modal>The other person won</Modal>;
    else if (gameState === "timeup")
        modal = (
            <Modal>
                The times up!
            </Modal>
        );
    else if (gameState === "won")
        modal = (
            <Modal>
                You won
                <br />
                Final time: {displayTime(totalTime - timeRemaining)}
            </Modal>
        );
    else modal = null;

    return (
        <div>
            {modal}
            <Question
                questionData={
                    questionData
                        ? {
                            ...questionData.question,
                            title: questionData.title
                        }
                        : ""
                }
                width="90vw"
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={scrollToEditor}
                ref={editorButton}
            >
                <span>Editor&darr;</span>
            </Button>
            <Editor
                code={code}
                output={output}
                time={timeRemaining}
                onClickRun={handleRun}
                onClickQuestion={scrollToQuestion}
                onLangChange={handleLangChange}
                onCodeChange={handleEditorChange}
                mode={lang.lang}
                passedFailedList={passedFailedList}
            />
        </div>
    );
};
