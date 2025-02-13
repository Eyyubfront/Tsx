import { useForm, FormProvider } from "react-hook-form";
import { Box, Typography, TextField } from "@mui/material";
import Favorite from "../../assets/images/home/Heart_01.svg";
import FavroiteBorder from "../../assets/images/home/UnHeart.svg";
import Savedicon from "../../assets/images/home/Bookmark.svg";
import NotSavedicon from "../../assets/images/home/nosaved.svg";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchQuizData, quizSaveData } from "../../store/actions/quizActions/quizActions";
import { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import Paragrafy from "../Paragrafy/Paragrafy";
import "./QuizModal.scss"
import { closeQuizModal } from "../../store/slice/LanguageHomeSlice";
import Heart from "../../assets/images/home/UnHeart.svg";
import Noheart from "../../assets/images/home/Heart_01.svg";
const QuizModal = () => {
    const dispatch = useAppDispatch();
    const isQuizModalOpen = useAppSelector((state) => state.LanguagetextData.isOpen);
    console.log("Modal open state:", isQuizModalOpen);  
    
    
    const { quizData } = useAppSelector((state) => state.quizslice);
    const methods = useForm();
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [lives, setLives] = useState(3);
    const [answerMessage, setAnswerMessage] = useState<string>("");
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        dispatch(fetchQuizData(0));
        setLives(3);
        setAnswerMessage("");
    }, [dispatch]);

    const handleAnswerClick = (answer: string, isCorrect: boolean) => {
        setSelectedAnswer(answer);
        setIsCorrect(isCorrect);
    };

    const handleSubmit = () => {
        if (isCorrect) {
            setAnswerMessage("Correct!");
            dispatch(fetchQuizData(0));
        } else {
            setAnswerMessage("Incorrect");
            setLives((prevLives) => prevLives - 1);
        }

        setTimeout(() => {
            if (lives - 1 <= 0) {
                setAnswerMessage("Game Over!");
            } else {
                setAnswerMessage("");
                setSelectedAnswer(null);
            }
        }, 3000);
    };

    const handleClose = () => {
        dispatch(closeQuizModal());
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
                    <PrimaryButton
                        type="submit"
                        label="Next"
                        onClick={handleSubmit}
                        disabled={selectedAnswer === null}
                    />

                    <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
                        {answerMessage && isCorrect && quizData?.id ? (
                            <div onClick={toggleSave}>
                                <img src={isSaved ? Savedicon : NotSavedicon} alt="Save icon" />
                            </div>
                        ) : null}

                        {answerMessage && (
                            <div className={`feedback-icon ${isCorrect ? "correct" : "incorrect"}`}>
                                <img src={isCorrect ? Heart : Noheart} />
                            </div>
                        )}
                    </Typography>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
};

export default QuizModal;
