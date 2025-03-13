import { Button, TableBody, TableRow, TableCell, Typography, DialogContent } from "@mui/material";
import TableComponent from "../../../../components/TableComponents/TableComponents";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { getAllMastered, masteredisfetch, MasteredPropsUse } from "../../../../store/actions/masteredActions/masteredActions";
import { useEffect, useState } from "react";
import Savedicon from "../../../../assets/images/home/Bookmark.svg";
import NotSavedicon from "../../../../assets/images/home/nosaved.svg";
import "./MasteredWords.scss"
import { quizSaveData } from "../../../../store/actions/quizActions/quizActions";
import { closeDialogMastered, openDialogMastered } from "../../../../store/slice/LanguageHomeSlice";
import MasteredModal from "../../../../components/MasteredModal/MasteredModal";
import { Link } from "react-router-dom";
import Paragrafy from "../../../../components/Paragrafy/Paragrafy";
import AlertDialog from "../../../../components/AlertDialog/AlertDialog";
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import { storycreatgptcreat } from "../../../../store/actions/authActions";
import exceldowland from '../../../../assets/images/header/exceldowland.svg';

const MasteredWords = () => {
    const dispatch = useAppDispatch();
    const { mastereds, loading } = useAppSelector((state) => state.mastered);

    const { defaultText } = useAppSelector((state) => state.LanguagetextData);
    const [showGameOver, setShowGameOver] = useState(false);
    const [textShow, settextShow] = useState(false);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [generatestory, setGeneratestory] = useState<string>("");
    const [selectAll, setSelectAll] = useState(false)
    useEffect(() => {
        dispatch(getAllMastered());
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    const speak = (text: string) => {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    };
    const handlePlusClick = (item: MasteredPropsUse) => {

        dispatch(quizSaveData(item.id));
    };

    const filteredItems = mastereds.filter((item: MasteredPropsUse) =>
        item.source?.toLowerCase().includes('') || item.translation?.toLowerCase().includes('')
    );



    const handleQuizClick = () => {

        if (!mastereds || mastereds.length === 0) {
            setShowGameOver(!false)
        } else {
            dispatch(openDialogMastered())
        }
    }
    const HandleClose = () => {
        setShowGameOver(false)
        dispatch(closeDialogMastered())
    }

    const HandleTextClose = () => {
        settextShow(false)

    }

    const handleCheckboxChange = (id: number) => {
        setSelectedItems((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((item) => item !== id)
                : [...prevSelected, id]
        )

    }
    const handleexportfile = async () => {
        if (selectedItems.length === 0) {
            alert("No items selected");
            return;
        }

        await dispatch(masteredisfetch({
            ids: selectedItems,

        }));

        setSelectedItems([]);
    }


    const handleSelectAllChange = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            const allIds = mastereds.map(item => item.id);
            setSelectedItems(allIds);
        } else {
            setSelectedItems([]);
        }
    };


    const handlestory = async () => {
        if (selectedItems.length < 30) {
            settextShow(true);
            return;
        }

        const selectedTranslations = mastereds
            .filter(item => selectedItems.includes(item.id))
            .map(item => item.translation)
            .join("");

        try {
            const story = await dispatch(storycreatgptcreat({ translation: selectedTranslations })).unwrap();
            setGeneratestory(story);
        } catch (error) {
            console.error("Error creating story:", error);
        }
    };


    return (
        <div>
            <MasteredModal />
            <TableComponent title="Mastered Words">
                <div className="mastered_filetop" >
                    <div className="export_text" onClick={handleexportfile}>
                        <div>
                            <img src={exceldowland} alt="" />
                        </div>
                        <p className="words_tittle">Download Words</p>
                    </div>
                    <div
                        className='story_buttoncreat'

                        onClick={() => handlestory()}
                    >
                        <Typography> Create Story </Typography>
                    </div>
                </div>
                <Button variant="outlined" className="selecet_alls" onClick={handleSelectAllChange}>
                    <div >
                        Select All
                    </div>
                </Button>
                <TableBody>
                    {filteredItems?.length ? filteredItems.map((item) => (
                        <TableRow className='table_aligns' key={item.id}>

                            <TableCell sx={{ borderBottom: "none", display: "flex", alignItems: "center", gap: "6px" }}>
                                <div className="check_box" >
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.includes(item.id)}
                                        onChange={() => handleCheckboxChange(item.id)} />
                                </div>
                                {defaultText?.isSwapped
                                    ? <Typography>{`${item.translation} - ${item.source}`}</Typography>
                                    : <Typography>{`${item.source} - ${item.translation}`}</Typography>
                                }
                            </TableCell>

                            <TableCell className='table_cards'>
                                <Button
                                    className='table_button'
                                    variant="outlined"
                                    onClick={() => handlePlusClick(item)}
                                >
                                    <img
                                        src={
                                            mastereds.some(saved => saved.id === item.id && saved.isMastered)
                                                ? Savedicon
                                                : NotSavedicon
                                        }
                                    />
                                </Button>
                                <Button

                                    className='table_button'
                                    variant="outlined"
                                    onClick={() => speak(item.translation || '')}
                                >
                                    <Typography><KeyboardVoiceIcon /></Typography>
                                </Button>

                            </TableCell>
                        </TableRow>
                    ))
                        :
                        <div className='data_undifendsbox'>NO DATA FOUND</div>
                    }
                </TableBody>
            </TableComponent>


            {
                generatestory && (
                    <div>
                        <div className="voice_generatestroy">
                            <h2>Story Words</h2>
                            <Button
                                style={{ width: '40px' }}
                                className='table_button'
                                variant="outlined"
                                onClick={() => speak(generatestory || '')}
                            >
                                <Typography><KeyboardVoiceIcon /></Typography>
                            </Button>
                        </div>
                        <p>{generatestory}</p>
                    </div>
                )
            }
            {
                textShow &&
                <AlertDialog
                    title="Pay attention"
                    open={textShow}
                    onClose={HandleTextClose}
                >
                    <DialogContent>
                        <Typography className="error_data">
                            You need at least 30 mastered words to create a story.
                        </Typography>
                    </DialogContent>
                </AlertDialog>

            }
            <div onClick={handleQuizClick}
                className="masteredquiz_button">
                <Link style={{ textDecoration: "none", color: 'black', cursor: "pointer" }} to="">
                    <Paragrafy className='quiz_center' fontsize='24px' fontfamily='DM Serif Display' text='Mastered Quiz' />
                </Link>
            </div>

            {showGameOver && (
                <AlertDialog
                    open={showGameOver}
                    onClose={HandleClose}
                    title="Notice"
                >
                    <DialogContent>
                        <Typography className="error_data">
                            There are no mastered words available to start the quiz
                        </Typography>
                    </DialogContent>
                </AlertDialog>
            )}
        </div>
    );
}

export default MasteredWords;