import { useForm, FormProvider } from "react-hook-form";
import { Box, Typography, TextField, Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import Favorite from "../../assets/images/home/Heart_01.svg";
import FavroiteBorder from "../../assets/images/home/UnHeart.svg";
import Savedicon from "../../assets/images/home/Bookmark.svg";
import NotSavedicon from "../../assets/images/home/nosaved.svg";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchQuizData, quizSaveData, quizcountReport } from "../../store/actions/quizActions/quizActions";
import { useEffect, useState } from "react";
import { Close } from '@mui/icons-material';
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import Paragrafy from "../Paragrafy/Paragrafy";
import { closeQuizModal } from "../../store/slice/LanguageHomeSlice";
import "./QuizModal.scss";
import { RxEyeOpen } from "react-icons/rx";
import { FaRegEyeSlash } from "react-icons/fa";

const QuizModal = () => {

    const dispatch = useAppDispatch();
    const isQuizModalOpen = useAppSelector((state) => state.LanguagetextData.isOpen);
    const { quizData } = useAppSelector((state) => state.quizslice);
    const methods = useForm();
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [lives, setLives] = useState(3);
    const [answerMessage, setAnswerMessage] = useState<string>("");
    const [isSaved, setIsSaved] = useState(true);
    const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([0]);
    const [showGameOver, setShowGameOver] = useState(false);
    const [correctAnsewrscount, setCorrectAnsewrsCount] = useState(0);
    const [isNodata, setDatadialog] = useState(false);

    const [isAnswered, setIsAnswered] = useState(false)


    useEffect(() => {
        if (isQuizModalOpen) {
            dispatch(fetchQuizData({ excludeIds: answeredQuestions, isMastered: false }));
            setLives(3);
            setAnswerMessage("");
            setSelectedAnswer(null);
            setIsAnswered(false);
            setIsCorrect(null);
            setShowGameOver(false);
            setIsAnswersOpen(false);
            setCorrectAnsewrsCount(0);
            setIsSaved(false);
            setAnsweredQuestions([0]);
        }
    }, [isQuizModalOpen]);


    useEffect(() => {
        if (lives === 0) {
            setAnswerMessage("Game Over!");
            setShowGameOver(true);
            setSelectedAnswer(null);

        }




    }, [lives, correctAnsewrscount, quizData]);




    const handleAnswerClick = (answer: string, isCorrect: boolean) => {
        if (isAnswered) return;

        setSelectedAnswer(answer);
        setIsCorrect(isCorrect);
        setAnswerMessage(isCorrect ? "Correct!" : "Wrong!");
        setIsAnswered(true);

        if (isCorrect) {
            setCorrectAnsewrsCount((prevCount) => prevCount + 1);
        } else {
            setLives((prevLives) => prevLives - 1);
        }
    };

    const handleSubmit = async () => {
        if (selectedAnswer === null) {
   
            return;
        }
        if (quizData?.id) {
            const response = await dispatch(fetchQuizData({
                excludeIds: [...answeredQuestions, Number(quizData?.id)],
                isMastered: false
            })).unwrap();

            if (response === null) {
                setDatadialog(true);
                dispatch(quizcountReport(correctAnsewrscount));
            } else {
                setDatadialog(false);
            }
            setAnsweredQuestions((prev) => [...prev, Number(quizData?.id)]);
        }

        setAnswerMessage("");
        setSelectedAnswer(null);
        setIsAnswered(false);
        setIsSaved(false);
        setIsAnswersOpen(false);
    };

    const handleRestart = () => {
        setLives(3);
        setShowGameOver(false);
        setAnsweredQuestions([]);
        dispatch(fetchQuizData({ excludeIds: answeredQuestions, isMastered: false })).unwrap();

        setSelectedAnswer(null);
        setAnswerMessage("");
        setIsAnswered(false);
    };
    const handleClose = () => {
        dispatch(closeQuizModal());
        setAnsweredQuestions([0])
        setShowGameOver(false);
        setCorrectAnsewrsCount(0)

    };
    const handleCloseDialog = () => {
        dispatch(closeQuizModal());
        setDatadialog(false);
    };


    const [isAnswersOpen, setIsAnswersOpen] = useState(false);

    const handleAnswersToggle = () => {
        setIsAnswersOpen(!isAnswersOpen);
    };

    const toggleSave = async () => {
        setIsSaved(!isSaved);

        if (!isSaved && quizData?.id) {
            await dispatch(quizSaveData(quizData?.id));


            const response = await dispatch(fetchQuizData({ excludeIds: answeredQuestions, isMastered: false })).unwrap();

            setIsSaved(false);

            if (response === null) {
                setDatadialog(true);
                dispatch(quizcountReport(correctAnsewrscount));
            } else {
                setDatadialog(false);
            }
        }


        setSelectedAnswer(null);
        setIsAnswered(false);
        setIsAnswersOpen(false);
    };


    return (
        <Dialog open={isQuizModalOpen ?? false} className='dialoq' maxWidth="sm" fullWidth>
            <DialogTitle className='dialoqtitte_tops'>
                <span className='tittledialoq'>Quiz</span>
                <IconButton className='iconbutton' onClick={handleClose}>
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <FormProvider {...methods}>
                    <div className="quiz__form">
                        <div className="quizmodal_top">
                            <Paragrafy className="quiz_toptittle" text={quizData?.question} />
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                {Array.from({ length: 3 }).map((_, index) => (
                                    index < lives ? <img src={Favorite} key={index} /> : <img src={FavroiteBorder} key={index} />
                                ))}
                            </Box>
                        </div>

                        <div className="quizmodal_inputbox">
                            <div className="inputbox_label">
                                <Paragrafy className="input_label" text="Tap the right answer:" />
                            </div>
                            <TextField
                                className="input_quiz"
                                label=""
                                variant="outlined"
                                value={selectedAnswer || ""}
                                fullWidth
                                disabled
                                sx={{ mt: 2, color: "red" }}
                            />
                        </div>

                        <div>
                            <div style={{ cursor: "pointer" }} onClick={handleAnswersToggle}>
                                {isAnswersOpen ?   <RxEyeOpen style={{ color: "rgba(157, 10, 187, 0.685)" }} />:   <FaRegEyeSlash style={{ color: "rgba(157, 10, 187, 0.685)" }} />}
                            </div>
                            <div className={`ansewrs__alls ${!isAnswersOpen ? "answers-closed" : ""}`}>
                                {quizData?.answers &&
                                    Object.keys(quizData.answers).map((key) => (
                                        <div
                                            key={key}
                                            className={`answers_box ${isAnswersOpen ? "active" : ""} 
                            ${isAnswered && key === selectedAnswer && !isCorrect ? 'wrong-answer' : ''} 
                            ${isAnswered && key === selectedAnswer && isCorrect ? 'correct-answer' : ''} 
                            ${isAnswered && key !== selectedAnswer && quizData.answers[key] ? 'correct-answer' : ''}`}
                                            onClick={() => handleAnswerClick(key, quizData.answers[key])}
                                            style={{ pointerEvents: isAnswersOpen && !isAnswered ? 'auto' : 'none' }}
                                        >

                                            {key}

                                        </div>
                                    ))}
                            </div>

                        </div>


                    </div>


                    <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
                        {answerMessage && isCorrect && quizData?.id ? (
                            <div className="save__words">
                                <div className="savewords__tittle">
                                    <Paragrafy className="master_wordstittle" text="Add to Master words" />
                                </div>
                                <div onClick={toggleSave}>
                                    <img className="icons_savequiz" src={isSaved ? Savedicon : NotSavedicon} />
                                </div>
                            </div>
                        ) : null}
                    </Typography>


                    {quizData?.id ? (
                        <div className="button_quiznext">
                            <PrimaryButton
                                type="submit"
                                label="Next"
                                onClick={handleSubmit}
                                disabled={selectedAnswer === null}
                            />
                        </div>
                    ) : null}




                    {showGameOver && (
                        <Dialog open={showGameOver}>
                            <DialogTitle className="finished_top">Finished</DialogTitle>
                            <DialogContent>
                                <Typography className="mistake_tittle" variant="body1">You did 3mistakes</Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, gap: "5px" }}>

                                    <div onClick={handleClose} className="Finish">
                                        Finish
                                    </div>

                                    <div onClick={handleRestart} className="Restart">
                                        Restart
                                    </div>
                                </Box>
                            </DialogContent>
                        </Dialog>
                    )}


                    {isNodata && <Dialog open={isNodata} onClose={handleCloseDialog}>
                        <DialogContent className="correct_box">
                            <DialogTitle className="finished_top">Quiz Finished</DialogTitle>
                            <Typography className="mistake_tittle" variant="body1">You got {correctAnsewrscount} correct answer (s). </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, gap: "5px" }}>

                                <div onClick={handleCloseDialog} className="Finishtruetext">
                                    Finish
                                </div>
                            </Box>
                        </DialogContent>
                    </Dialog>}
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
};

export default QuizModal;