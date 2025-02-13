import { useForm, FormProvider } from "react-hook-form";
import { Box, Typography, TextField } from "@mui/material";
import Favorite from "../../assets/images/home/Heart_01.svg";
import FavroiteBorder from "../../assets/images/home/UnHeart.svg";
import Savedicon from "../../assets/images/home/Bookmark.svg";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchQuizData, quizSaveData } from "../../store/actions/quizActions/quizActions";
import { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import Paragrafy from "../Paragrafy/Paragrafy";
import "./QuizModal.scss"
const QuizModal = ({ show, onClose }: { show: boolean; onClose: () => void }) => {
    const dispatch = useAppDispatch();
    const { quizData } = useAppSelector((state) => state.quizslice);
    const methods = useForm();
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [lives, setLives] = useState(3);
    const [answerMessage, setAnswerMessage] = useState<string>("");

    useEffect(() => {
        if (show) {
            dispatch(fetchQuizData(0));
            setLives(3);
            setAnswerMessage("");
        }
    }, [dispatch, show]);

    const handleAnswerClick = (answer: string, isCorrect: boolean) => {
        setSelectedAnswer(answer);
        setIsCorrect(isCorrect);
    };

    const handleSubmit = () => {
        if (isCorrect) {
            setAnswerMessage(" Correct !");
            dispatch(fetchQuizData(0));
        } else {
            setAnswerMessage("Incorrect");
            setLives((prevLives) => prevLives - 1);
        }

        setTimeout(() => {
            if (lives - 1 <= 0) {
                setAnswerMessage("Finish game");
                setTimeout(() => {
                    onClose();
                }, 3000);
            } else {
                setAnswerMessage("");
                setSelectedAnswer(null);
            }
        }, 3000);
    };

    return (
        <Dialog className='dialoq' open={show} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle className='dialoqtitte_tops'>
                <span className='tittledialoq'>Quiz</span>
                <IconButton className='iconbutton' onClick={onClose}>
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <FormProvider  {...methods}>
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

                        <div className="ansewrs__alls" >
                            {quizData?.answers &&
                                Object.keys(quizData.answers).map((key) => (
                                    <div
                                        key={key}
                                        color="primary"
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
                        label=" Cavabı yoxla"
                        onClick={handleSubmit}
                        disabled={selectedAnswer === null}
                    />
                 
                    <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
                        {answerMessage &&isCorrect && quizData?.id ?    <div onClick={()=>  dispatch(quizSaveData(quizData?.id))}>
                        <img src={Savedicon} alt="" />
                    </div>:null}
                    </Typography>
                </FormProvider>
            </DialogContent>

        </Dialog>
    );
};

export default QuizModal;







