import React, {useState, useEffect, useRef} from 'react';
import Question from '../../components/Question';
import Editor from './EditorComponent/';
import Modal from './Modal/';
import io from 'socket.io-client';

export default (props) => {
    const [gameState, setGameState] = useState("waiting");
    const [questionData, setQuestionData] = useState();
    const [totalTime, setTotalTime] = useState()
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [output,setOutput] = useState("");
    
    let socket = useRef()
    let timer = useRef()
    useEffect(() => {
        socket.current = io('http://localhost:5000');
        socket.current.emit('joinContest', props.match.params.roomid)
        
        socket.current.on('start', (data) => {
            setQuestionData(data.question[0]);
            setTotalTime(data.totalTime * 60);
            timer.current = setInterval(() => {
                console.log(timer)
                setTimeElapsed(currentTime => currentTime + 1)
            },1000)
            setGameState('running');
        })
        socket.current.on('lost', () => setGameState("lost"))
        
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
    
    const handleRun = () => {
        console.log(questionData);
        // socket.current.emit('gameOver', props.match.params.roomid)
    }
    
    let modal;
    if(gameState === "waiting") modal = <Modal>Waiting for admin to start</Modal>
    else if(gameState === "lost") modal = <Modal>The other person won</Modal>
    else if(gameState === "timeup") modal = <Modal>The times up!</Modal>
    else modal = null;

    return(
        <div>
            {modal}
            <Question questionHtml={questionData ? questionData.question: ""} width="90vw"/>
            <Editor output={output} time={timeElapsed} onClickRun={handleRun}/>
        </div>
    )
}