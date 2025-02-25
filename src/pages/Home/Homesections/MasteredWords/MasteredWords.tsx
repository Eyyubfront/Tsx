import { Button, TableBody, TableRow, TableCell, Typography, DialogContent } from "@mui/material";
import TableComponent from "../../../../components/TableComponents/TableComponents";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { getAllMastered, IMasteredProps, MasteredPropsUse } from "../../../../store/actions/masteredActions/masteredActions";
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

interface LearnSearchProps {
    searchTerm: string;
}

const MasteredWords = ({ searchTerm = "" }: LearnSearchProps) => {
    const dispatch = useAppDispatch();
    const mastereds = useAppSelector((state) => state.mastered.mastereds);
    const { defaultText } = useAppSelector((state) => state.LanguagetextData);
    const [showGameOver, setShowGameOver] = useState(false);
    useEffect(() => {
        dispatch(getAllMastered());
    }, [dispatch]);


    const handlePlusClick = (item: MasteredPropsUse) => {

        dispatch(quizSaveData(item.id));
    };

    const filteredItems = mastereds.filter((item: IMasteredProps) =>
        item.source?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.translation?.toLowerCase().includes(searchTerm.toLowerCase())
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

 

    return (
        <div>
            <MasteredModal />
            <TableComponent title="Mastered Words">

                <TableBody>
                    {filteredItems?.length ? filteredItems.map((item) => (
                        <TableRow className='table_aligns' key={item.id}>
                            <TableCell sx={{ borderBottom: "none" }}>
                            {defaultText?.isSwapped
                                ? <Typography>{`${item.source} - ${item.translation}`}</Typography>
                                : <Typography>{`${item.translation} - ${item.source}`}</Typography>
                            }
                            </TableCell>
                         
                            <TableCell className='table_cards'>
                                <Button
                                    className='table_button'
                                    variant="outlined"
                                    onClick={() => handlePlusClick(item)}
                                >
                                    <img src={mastereds.some(saved => saved.id === item.id && item.isLearningNow) ? Savedicon : NotSavedicon} alt="" />
                                </Button>

                            </TableCell>
                        </TableRow>
                    ))
                        :
                        <div className='data_undifendsbox'>NO DATA FOUND</div>
                    }
                </TableBody>
            </TableComponent>


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