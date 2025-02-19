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
import Smile from "../../assets/images/home/Smile.svg";
import BadSmile from "../../assets/images/home/BadSmile.svg";
import "./QuizModal.scss";

const QuizModal = () => {

    const learignowdata  = useAppSelector((state) => state.learningNow.items.nowitems);

    const dispatch = useAppDispatch();
    const isQuizModalOpen = useAppSelector((state) => state.LanguagetextData.isOpen);
    const { quizData } = useAppSelector((state) => state.quizslice);
    const methods = useForm();
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [lives, setLives] = useState(3);
    const [answerMessage, setAnswerMessage] = useState<string>("");
    const [isSaved, setIsSaved] = useState(false);
    const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([0]);
    const [showGameOver, setShowGameOver] = useState(false);
    const [correctAnsewrscount, setCorrectAnsewrsCount] = useState(0);
    const [isNodata, setDatadialog] = useState(false);
   


    useEffect(() => {
        if (isQuizModalOpen) {
            dispatch(fetchQuizData(answeredQuestions));
            setLives(3);
            setAnswerMessage("");
            setSelectedAnswer(null);
            setIsSaved(false);
            setDatadialog(false);
        }
       
    }, [isQuizModalOpen, learignowdata]);

    useEffect ( () => {
        if (lives === 0) {
            setAnswerMessage("Game Over!");
            setShowGameOver(true);
            setSelectedAnswer(null);
            setDatadialog(quizData?.id == null); 
        }
        if (quizData?.id == null) {
          
            setDatadialog(true)
        }else{
            setDatadialog(false) 
        }


    }, [lives, correctAnsewrscount, quizData]);

    



    const handleAnswerClick = (answer: string, isCorrect: boolean) => {
        setSelectedAnswer(answer);
        setIsCorrect(isCorrect);
        setAnswerMessage(isCorrect ? "Correct!" : "Incorrect");
        if (isCorrect) {
            setCorrectAnsewrsCount((prevLives) => prevLives + 1);
        } else {
            setLives((prevLives) => prevLives - 1);
        }

        setTimeout(() => {
            setAnswerMessage("");
            setSelectedAnswer(null);
        }, 3000);
    };


    const handleSubmit = () => {
        if (isCorrect) {
            dispatch(quizcountReport(correctAnsewrscount));
        }
        dispatch(fetchQuizData([...answeredQuestions, Number(quizData?.id)]));
        setAnsweredQuestions((prev) => [...prev, Number(quizData?.id)]);
        setAnswerMessage("");
        setSelectedAnswer(null);
    };

    const handleRestart = () => {
        setLives(3);
        setShowGameOver(false);
        setAnsweredQuestions([]);
        dispatch(fetchQuizData([0]));
        setSelectedAnswer(null);

        setAnswerMessage("");
    };

    const handleClose = () => {
        dispatch(closeQuizModal());
        setShowGameOver(false);
   
    };
    const handleCloseDialog = () => {
        dispatch(closeQuizModal());
        setDatadialog(false);
    };
  

    const toggleSave = () => {
        setDatadialog(false)
        setIsSaved(!isSaved);
        if (!isSaved && quizData?.id) {
            dispatch(quizSaveData(quizData?.id));
        }
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
                                sx={{ mt: 2 }}
                            />
                        </div>

                        <div className="ansewrs__alls">
                            {quizData?.answers &&
                                Object.keys(quizData.answers).map((key) => (
                                    <div
                                        key={key}
                                        className="answers_box"
                                        onClick={() => handleAnswerClick(key, quizData.answers[key])}
                                    >
                                        {key}
                                    </div>
                                ))}
                        </div>
                    </div>

                    {answerMessage ? null : (
                        <div className="button_quiznext">
                            <PrimaryButton
                                type="submit"
                                label="Next"
                                onClick={handleSubmit}
                            />
                        </div>
                    )}

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

                    <div className={`feeadback_bottom `}>
                        {answerMessage && <div className={`feedback_container ${isCorrect ? "correct" : "incorrect"}`}>
                            <div>
                                <img src={isCorrect ? Smile : BadSmile} />
                            </div>
                            <div className="feedback_bottomright">
                                <div className="feedback_tittle">
                                    {answerMessage}
                                </div>
                                {answerMessage && <div className="feedback_text">
                                    <Paragrafy text="Friend" />
                                </div>}
                            </div>
                        </div>}
                    </div>

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


//  finish dialogu quizdata null oldukda gelmelidir ve birde cixib girdikde eledikde modalda data yadda qalmagi ve saved qalmagi problemdir 