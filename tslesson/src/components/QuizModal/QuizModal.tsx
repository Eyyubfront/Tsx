import { useForm, FormProvider } from "react-hook-form";
import { Box, Typography, TextField, Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import Favorite from "../../assets/images/home/Heart_01.svg";
import FavroiteBorder from "../../assets/images/home/UnHeart.svg";
import Savedicon from "../../assets/images/home/Bookmark.svg";
import NotSavedicon from "../../assets/images/home/nosaved.svg";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchQuizData, quizcountReport, quizSaveData } from "../../store/actions/quizActions/quizActions";
import { useEffect, useState } from "react";
import { Close } from '@mui/icons-material';
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import Paragrafy from "../Paragrafy/Paragrafy";
import { closeQuizModal } from "../../store/slice/LanguageHomeSlice";
import Smile from "../../assets/images/home/Smile.svg";
import BadSmile from "../../assets/images/home/BadSmile.svg";
import "./QuizModal.scss";

const QuizModal = () => {


    const dispatch = useAppDispatch();
    const isQuizModalOpen = useAppSelector((state) => state.LanguagetextData.isOpen);
    const { quizData } = useAppSelector((state) => state.quizslice);
    const methods = useForm();
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [lives, setLives] = useState(3);
    const [answerMessage, setAnswerMessage] = useState<string>("");
    const [isSaved, setIsSaved] = useState(false);
    const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
    const [showGameOver, setShowGameOver] = useState(false);
    const [isAnswerChecked, setIsAnswerChecked] = useState(false);

    useEffect(() => {
        if (isQuizModalOpen) {
            dispatch(fetchQuizData([0]));
            setLives(3);
            setAnsweredQuestions([]);
            setAnswerMessage("");
            setIsAnswerChecked(false);
            setSelectedAnswer(null);
        }
    }, [dispatch, isQuizModalOpen]);

    useEffect(() => {
        if (lives <= 0) {
            setShowGameOver(true);
        }
    }, [lives]);

    const handleAnswerClick = (answer: string, isCorrect: boolean) => {
        if (!isAnswerChecked) {
            setSelectedAnswer(answer);
            setIsCorrect(isCorrect);
            setAnswerMessage(isCorrect ? "Correct!" : "Incorrect");
            console.log(selectedAnswer, isAnswerChecked);

            if (!isCorrect) {
                setLives((prevLives) => prevLives - 1);
            }

            setIsAnswerChecked(true);
           
            setTimeout(() => {
                setAnswerMessage("");
                setSelectedAnswer(null);
                setIsAnswerChecked(false);
            }, 3000);
        }
    };


    const handleSubmit = () => {
        if (isCorrect) {
            dispatch(quizcountReport(Number(quizData?.id)));
        }

        if (lives <= 0) {

            setAnswerMessage("Game Over!");
            setShowGameOver(true);
            setSelectedAnswer(null);
        } else {
            if (quizData) {
                dispatch(fetchQuizData([...answeredQuestions, quizData.id]));
                setAnsweredQuestions((prev) => [...prev, quizData.id]);
            }
            setAnswerMessage("");
            setSelectedAnswer(null);
            setIsAnswerChecked(false);
        }
    };

    const handleRestart = () => {
        setLives(3);
        setShowGameOver(false);
        setAnsweredQuestions([]);
        dispatch(fetchQuizData([0]));
        setSelectedAnswer(null);
        setIsAnswerChecked(false);
        setAnswerMessage("");
    };

    const handleClose = () => {
        dispatch(closeQuizModal());
        setShowGameOver(false);
    };


    const toggleSave = () => {
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
                                disabled={selectedAnswer === null|| !isAnswerChecked}  
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
                            <DialogTitle>Game Over</DialogTitle>
                            <DialogContent>
                                <Typography variant="body1">You have lost all your lives!</Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                    <PrimaryButton type="submit" label="Close" onClick={handleClose} />
                                    <PrimaryButton type="submit" label="Restart" onClick={handleRestart} />
                                </Box>
                            </DialogContent>
                        </Dialog>
                    )}

                </FormProvider>
            </DialogContent>
        </Dialog>
    );
};

export default QuizModal;
