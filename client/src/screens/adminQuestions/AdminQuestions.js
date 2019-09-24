import React, { useState, useEffect, Fragment } from "react";
import Question from "../../components/Question";
import QuestionsList from "../../components/QuestionsList";
import AddQuestion from "../../components/AddQuestion";
import AppBar from "../../components/AppBar";

export default () => {
    const [questions, setQuestions] = useState();
    const [selectedQuestion, setSelectedQuestion] = useState();
    const [mode, setMode] = useState("none");

    useEffect(() => {
        const asyncFetch = async () => {
            let res = await fetch("/api/question");
            let data = await res.json();
            setQuestions(data);
        };
        asyncFetch();
    }, []);

    const handleListClick = i => {
        setSelectedQuestion(questions[i]);
        setMode("display");
    };

    const handleEditClick = i => {
        let tempQuestion = questions[i];
        tempQuestion.testCasesAnswer = tempQuestion.testCasesAnswer.join("\n");
        tempQuestion.privateCasesAnswer = tempQuestion.privateCasesAnswer.join(
            "\n"
        );
        tempQuestion.testCases = questions[i].testCases[0];
        tempQuestion.privateCases = questions[i].privateCases[0];
        setSelectedQuestion(tempQuestion);
        setMode("edit");
    };

    const handleDeleteClick = async i => {
        let res = await fetch("/api/question", {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({ id: questions[i]._id })
        });
        let json = await res.json();
        if (json.status === "success") {
            let newQuestionsList = [...questions];
            newQuestionsList.splice(i, 1);
            setQuestions(newQuestionsList);
            setMode("none");
        }
    };

    let questionDisplay;
    if (mode === "display") {
        questionDisplay = (
            <Question
                questionData={{
                    ...selectedQuestion.question,
                    title: selectedQuestion.title
                }}
                width="100%"
            />
        );
    } else if (mode === "edit") {
        questionDisplay = (
            <AddQuestion question={selectedQuestion} mode="edit" />
        );
    } else {
        questionDisplay = null;
    }

    return (
        <Fragment>
            <AppBar currentActive={1} />
            <div
                style={{
                    margin: 10,
                    display: "grid",
                    gridTemplateColumns: "29% 69%",
                    gridColumnGap: "1%"
                }}
            >
                <QuestionsList
                    questions={questions}
                    onItemClick={handleListClick}
                    onEditClick={handleEditClick}
                    onDeleteClick={handleDeleteClick}
                    width="100%"
                />
                {questionDisplay}
            </div>
        </Fragment>
    );
};
