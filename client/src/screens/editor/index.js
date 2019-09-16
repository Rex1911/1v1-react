import React, {useState, useEffect} from 'react';
import QuestionArea from './QuestionArea/';
import Editor from './EditorComponent/';
import Modal from './Modal/';
import io from 'socket.io-client';

let socket;

export default (props) => {
    console.log(props)
    const [gameState, setGameState] = useState("running");
    const [output,setOutput] = useState("");
    
    useEffect(() => {
        socket = io('http://localhost:5000');
        socket.emit('joinContest', props.match.params.roomid)
        
        socket.on('lost', () => setGameState("lost"))
        
        return () => {
            socket.disconnect();
        }
    }, [props.match.params.roomid])
    
    const handleRun = () => {
        socket.emit('gameOver', props.match.params.roomid)
    }
    
    let modal;
    if(gameState === "waiting") modal = <Modal>Waiting for admin to start</Modal>
    else if(gameState === "lost") modal = <Modal>The other person won</Modal>
    else modal = null;

    return(
        <div>
            {modal}
            <QuestionArea/>
            <Editor output={output} onClickRun={handleRun}/>
        </div>
    )
}