import { Button, TableBody, TableRow, TableCell, Typography } from "@mui/material"; 
import TableComponent from "../../../../components/TableComponents/TableComponents";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { getAllMastered, IMasteredProps, MasteredPropsUse } from "../../../../store/actions/masteredActions/masteredActions";
import { useEffect } from "react";
import Savedicon from "../../../../assets/images/home/Bookmark.svg";
import NotSavedicon from "../../../../assets/images/home/nosaved.svg";
import { selecetwordText } from "../../../../store/actions/learingActions/learingwordsActions";
import "./MasteredWords.scss"
interface LearnSearchProps {
    searchTerm: string;
}

const MasteredWords = ({ searchTerm = "" }: LearnSearchProps) => {
    const dispatch = useAppDispatch();
    const mastereds = useAppSelector((state) => state.mastered.mastereds);

    useEffect(() => {
        dispatch(getAllMastered());
    }, [dispatch]);

    const handleSaveClick = (item: MasteredPropsUse) => { 
        dispatch(selecetwordText(item.id));
    };

    const filteredItems = mastereds.filter((item: IMasteredProps) =>
        item.source?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.translation?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <TableComponent title="Mastered Words">
              
                <TableBody>
                    {filteredItems?.length ? filteredItems.map((item) => ( 
                        <TableRow className='table_aligns' key={item.id}>
                            <TableCell sx={{ borderBottom: "none" }}>
                                <Typography>{`${item.source} - ${item.translation}`}</Typography>
                            </TableCell>
                            <TableCell className='table_cards'>
                                <Button
                                    className='table_button'
                                    variant="outlined"
                                    onClick={() => handleSaveClick(item)} 
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
        </div>
    );
}

export default MasteredWords;