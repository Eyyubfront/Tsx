import { useForm, FormProvider } from "react-hook-form";
import {
  Box,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Tooltip,
} from "@mui/material";
import Favorite from "../../assets/images/home/Heart_01.svg";
import FavroiteBorder from "../../assets/images/home/UnHeart.svg";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  fetchQuizData,
  quizSaveData,
  quizcountReport,
} from "../../store/actions/quizActions/quizActions";
import { useEffect, useState } from "react";
import { Close } from "@mui/icons-material";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import Paragrafy from "../Paragrafy/Paragrafy";
import { closeDialogMastered } from "../../store/slice/LanguageHomeSlice";
import { RxEyeOpen } from "react-icons/rx";
import { FaRegEyeSlash } from "react-icons/fa";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import "./MasteredModal.scss";
import Savedicon from "../../assets/images/home/Bookmark.svg";
import NotSavedicon from "../../assets/images/home/nosaved.svg";
const MasteredModal = () => {
  const dispatch = useAppDispatch();
  const isMastereddialog = useAppSelector(
    (state) => state.LanguagetextData.isDialogOpenMastered
  );
  const { quizHidden, quizListenable } = useAppSelector((state) => state.Auth);
  const { quizData } = useAppSelector((state) => state.quizslice);
  const methods = useForm();
  const [isSaved, setIsSaved] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [lives, setLives] = useState(3);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([0]);
  const [showGameOver, setShowGameOver] = useState(false);
  const [correctAnsewrscount, setCorrectAnsewrsCount] = useState(0);
  const [isNodata, setDatadialog] = useState(false);
  const [answerMessage, setAnswerMessage] = useState<string>("");
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    if (isMastereddialog) {
      dispatch(
        fetchQuizData({ excludeIds: answeredQuestions, isMastered: true })
      );
      setLives(3);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setIsCorrect(null);
      setShowGameOver(false);
      setCorrectAnsewrsCount(0);
      setAnsweredQuestions([0]);
      setAnswerMessage("");
      setIsSaved(false);
    } else if (quizHidden == false) {
      setIsAnswersOpen(true);
    }
  }, [isMastereddialog, quizHidden]);

  useEffect(() => {
    if (lives === 0) {
      setShowGameOver(true);
      setSelectedAnswer(null);
      setAnswerMessage("Game Over!");
    }
  }, [lives]);

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const handleAnswerClick = (answer: string, source: string) => {
    if (!quizData) return;

    setSelectedAnswer(answer);

    const correctsource = quizData.question;

    const condition = correctsource == source;

    setIsCorrect(condition);
    setIsAnswered(true);
    setAnswerMessage(condition ? "Correct!" : "Wrong!");
    if (condition) {
      setCorrectAnsewrsCount((prevCount) => prevCount + 1);
      if (quizListenable) {
        speak(answer);
      }
    } else {
      setLives((prevLives) => prevLives - 1);
    }
  };

  const handleSubmit = async () => {
    if (selectedAnswer === null) {
      return;
    }
    if (quizData?.id) {
      const response = await dispatch(
        fetchQuizData({
          excludeIds: [...answeredQuestions, Number(quizData?.id)],
          isMastered: true,
        })
      ).unwrap();

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
    if (quizHidden == false) {
      setIsAnswersOpen(true);
    } else {
      setIsAnswersOpen(false);
    }
  };

  const handleRestart = () => {
    setLives(3);
    setShowGameOver(false);
    setAnsweredQuestions([]);
    dispatch(
      fetchQuizData({ excludeIds: answeredQuestions, isMastered: true })
    ).unwrap();

    setSelectedAnswer(null);
    setAnswerMessage("");
    setIsAnswered(false);
  };
  const handleClose = () => {
    dispatch(closeDialogMastered());
    setAnsweredQuestions([0]);
    setShowGameOver(false);
    setCorrectAnsewrsCount(0);
  };
  const handleCloseDialog = () => {
    dispatch(closeDialogMastered());
    setDatadialog(false);
  };

  const [isAnswersOpen, setIsAnswersOpen] = useState(false);

  const handleAnswersToggle = () => {
    setIsAnswersOpen(!isAnswersOpen);
    if (quizHidden == false) {
      setIsAnswersOpen(true);
    }
  };

  const toggleSave = async () => {
    setIsSaved(!isSaved);

    if (!isSaved && quizData?.id) {
      await dispatch(quizSaveData(quizData?.id));

      const response = await dispatch(
        fetchQuizData({ excludeIds: answeredQuestions, isMastered: false })
      ).unwrap();

      setIsSaved(false);

      if (response === null) {
        setDatadialog(true);
        dispatch(quizcountReport(correctAnsewrscount));
      } else {
        setDatadialog(false);
      }
    }

    setIsCorrect(false);
    setSelectedAnswer(null);
    setIsAnswered(false);

    if (quizHidden == false) {
      setIsAnswersOpen(true);
    } else {
      setIsAnswersOpen(false);
    }
  };

  return (
    <Dialog
      open={isMastereddialog ?? false}
      className="dialoq"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle className="dialoqtitte_tops">
        <span className="tittledialoq">Quiz</span>
        <IconButton className="iconbutton" onClick={handleClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent className="mastered_modal">
        <FormProvider {...methods}>
          <div className="quiz__form">
            <div className="quizmodal_top">
              <Paragrafy className="quiz_toptittle" text={quizData?.question} />
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                {Array.from({ length: 3 }).map((_, index) =>
                  index < lives ? (
                    <img src={Favorite} key={index} />
                  ) : (
                    <img src={FavroiteBorder} key={index} />
                  )
                )}
              </Box>
            </div>

            <div className="quizmodal_inputbox">
              <p>{correctAnsewrscount}/10</p>
              <div className="inputbox_label">
                <Paragrafy
                  className="input_label"
                  text="Tap the right answer:"
                />
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
                {isAnswersOpen ? (
                  <RxEyeOpen style={{ color: "rgba(157, 10, 187, 0.685)" }} />
                ) : (
                  <FaRegEyeSlash
                    style={{ color: "rgba(157, 10, 187, 0.685)" }}
                  />
                )}
              </div>

              <div
                className={`ansewrs__alls ${
                  !isAnswersOpen ? "answers-closed" : ""
                }`}
              >
                {quizData?.answers &&
                  quizData.answers.map((item, index) => {
                    const isSelected = selectedAnswer === item.answer;
                    const isCorrectAnswer =
                      isAnswered && isSelected && isCorrect;
                    const isWrongAnswer =
                      isAnswered && isSelected && !isCorrect;

                    const AnsewrsData =
                      isAnswered && quizData.question === item.source;

                    return (
                      <Tooltip title={selectedAnswer ? item.source : ""} arrow>
                        <span
                          style={{ display: "inline-block", width: "100%" }}
                        >
                          <div
                            key={index}
                            className={`answers_box ${
                              isAnswersOpen ? "actives" : ""
                            } 
                                                   ${
                                                     isCorrectAnswer
                                                       ? "correct-answer"
                                                       : ""
                                                   }
                                                   ${
                                                     isWrongAnswer
                                                       ? "wrong-answer"
                                                       : ""
                                                   }
                                                   ${
                                                     AnsewrsData
                                                       ? "bothcorectin"
                                                       : ""
                                                   } 
                                                   `}
                            onClick={() =>
                              handleAnswerClick(item.answer, item.source)
                            }
                            style={{
                              pointerEvents:
                                isAnswersOpen && !isAnswered ? "auto" : "none",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "6px",
                            }}
                          >
                            {item.answer}
                            {isAnswered && AnsewrsData && (
                              <div
                                className="voicedquiz"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  speak(item.answer);
                                }}
                              >
                                <KeyboardVoiceIcon />
                              </div>
                            )}
                          </div>
                        </span>
                      </Tooltip>
                    );
                  })}
              </div>
            </div>
          </div>

          <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
            {answerMessage && !isCorrect && quizData?.id ? (
              <div className="save__words">
                <div className="savewords__tittle">
                  <Paragrafy
                    className="master_wordstittle"
                    text="Remove from Master"
                  />
                </div>
                <div onClick={toggleSave}>
                  <img
                    className="icons_savequiz"
                    src={isSaved ? Savedicon : NotSavedicon}
                  />
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
                <Typography className="mistake_tittle" variant="body1">
                  You did 3mistakes
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                    gap: "5px",
                  }}
                >
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

          {isNodata && (
            <Dialog open={isNodata} onClose={handleCloseDialog}>
              <DialogContent className="correct_box">
                <DialogTitle className="finished_top">
                  Quiz Finished
                </DialogTitle>
                <Typography className="mistake_tittle" variant="body1">
                  You got {correctAnsewrscount} correct answer (s).{" "}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                    gap: "5px",
                  }}
                >
                  <div onClick={handleCloseDialog} className="Finishtruetext">
                    Finish
                  </div>
                </Box>
              </DialogContent>
            </Dialog>
          )}
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default MasteredModal;
