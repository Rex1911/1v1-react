import React, {useState, useEffect, useRef} from 'react';
import Question from '../../components/Question';
import Editor from '../../components/Editor';
import Modal from '../../components/Modal';
import io from 'socket.io-client';
import displayTime from '../../util/time';

export default (props) => {
    const [gameState, setGameState] = useState("waiting");
    const [questionData, setQuestionData] = useState();
    const [totalTime, setTotalTime] = useState()
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [output,setOutput] = useState("");
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [passedFailedList, setPassedFailedList] = useState([])
    const [lang,setLang] = useState({lang: "c_cpp", langCode: 1});
    const [code, setCode] = useState();
    
    let socket = useRef()
    let timer = useRef()
    useEffect(() => {
        socket.current = io('http://localhost:5000');
        socket.current.emit('joinContest', props.match.params.roomid)
        
        socket.current.on('start', (data) => {
            if(timer.current) return;
            setQuestionData(data.question[0]);
            setTotalTime(data.totalTime * 60);
            setGameState('running');
            timer.current = setInterval(() => {
                setTimeElapsed(currentTime => currentTime + 1)
            },1000)
        })
        socket.current.on('lost', () => {
            setGameState("lost")
            clearInterval(timer.current);
        })
        
        return () => {
            socket.current.disconnect();
        }
    }, [props.match.params.roomid])

    useEffect(() => {
        if(timeElapsed === totalTime) {
            clearInterval(timer.current);
            setGameState("timeup");
        }
    }, [totalTime, timeElapsed])
    
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
    
    const handleRun = async () => {
        setOutput('Compiling...');
        setPassedFailedList([])
        let res =  await fetch('http://localhost:8080/compile', {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                code: lang.langCode,
                source: code,
                input: questionData.testCases[0]
            })
        })
        let {stdout, stderr} = await res.json();

        if(stderr) {
            setOutput(stderr)
            return;
        }
        let answers = stdout.split('\n');
        let updatedList = [];
        for(let i = 0; i < questionData.testCasesAnswer.length; i++) {
            // eslint-disable-next-line
            if(answers[i] == questionData.testCasesAnswer[i]) {
                updatedList.push('passed');               
            } else {
                updatedList.push('failed');   
            }
        }
        setOutput(stdout);
        setPassedFailedList(updatedList);
    }

    const handleSubmit = async () => {
        setOutput('Compiling...');
        setPassedFailedList([]);
        let res =  await fetch('http://localhost:8080/compile', {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                code: lang.langCode,
                source: code,
                input: questionData.privateCases[0]
            })
        })
        let {stdout, stderr} = await res.json();

        if(stderr) {
            setOutput(stderr)
            return;
        }

        let answers = stdout.split('\n');
        let updatedList = [];
        let _correctAnswers = 0;
        for(let i = 0; i < questionData.privateCasesAnswer.length; i++) {
            // eslint-disable-next-line
            if(answers[i] == questionData.privateCasesAnswer[i]) {
                _correctAnswers++;
                updatedList.push('passed');               
            } else {
                updatedList.push('failed');   
            }
        }
        if(_correctAnswers === questionData.noOfPrivateCases) {
            clearInterval(timer.current);
            setGameState('won');
            socket.current.emit('gameOver', props.match.params.roomid)
        }
        setCorrectAnswers(_correctAnswers);
        setOutput(stdout);
        setPassedFailedList(updatedList);
    }
    
    let modal;
    if(gameState === "waiting") modal = <Modal>WAITING FOR ADMIN TO START</Modal>
    else if(gameState === "lost") modal = <Modal>The other person won</Modal>
    else if(gameState === "timeup") modal = <Modal>The times up!<br/>Passed cases: {correctAnswers}</Modal>
    else if(gameState === 'won') modal = <Modal>You won<br/>Final time: {displayTime(timeElapsed)}</Modal>
    else modal = null;

    return (
        <div>
            {modal}
            <Question
                questionHtml={questionData ? questionData.question : ""}
                width="90vw"
            />
            <Editor
                code={code}
                output={output}
                time={timeElapsed}
                onClickRun={handleRun}
                onClickSubmit={handleSubmit}
                onLangChange={handleLangChange}
                onCodeChange={handleEditorChange}
                mode={lang.lang}
                passedFailedList={passedFailedList}
            />
        </div>
    );
}