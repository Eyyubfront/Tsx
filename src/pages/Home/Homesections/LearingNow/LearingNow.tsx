import { useEffect, useState } from 'react';
import { fetchTexts, TextItem, ITextItem } from '../../../../store/actions/learingActions/learingnowActions';
import { useAppDispatch, useAppSelector } from '../../../../store/index';
import TableComponent from '../../../../components/TableComponents/TableComponents';
import { Button, TableBody, TableRow, TableCell, Typography, Pagination } from '@mui/material';
import "./LearingNow.scss"
import { selecetwordText } from '../../../../store/actions/learingActions/learingwordsActions';
import NotSavedicon from "../../../../assets/images/home/nosaved.svg";
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import e from "../../../../assets/images/home/Savedmastered.svg";


const LearningNow = ({ showAll = false }: { showAll?: boolean }) => {
    const dispatch = useAppDispatch();
    const items = useAppSelector((state) => state.learningNow.items.nowitems);
    const pageitems = useAppSelector((state) => state.learningNow.items);
    const { defaultText } = useAppSelector((state) => state.LanguagetextData);
    const [page, setPage] = useState(1);
    useEffect(() => {
        dispatch(fetchTexts({ page, pageSize: showAll ? 1000 : 10 }));
    }, [dispatch]);

    const handleSaveText = (item: TextItem) => {
        if (item.id !== null) {
            dispatch(selecetwordText(item.id));
        }
    };
    const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);

    }; 


    const speak = (text: string) => {

        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    };


    const filteredItems = items.filter((item: ITextItem) =>
        item.source?.toLowerCase().includes('') || item.translation?.toLowerCase().includes('')
    );

    return (
        <div>
            <TableComponent title="Learning Now">
                <TableBody >
                    {filteredItems?.length ?
                        filteredItems?.map(({ id, source, translation }) => (
                            <TableRow className='table_aligns' key={id}>

                                <TableCell sx={{ borderBottom: "none" }}>
                                    {defaultText?.isSwapped
                                        ? <Typography>{`${translation} - ${source}`}</Typography>
                                        : <Typography>{`${source} - ${translation}`}</Typography>
                                    }
                                </TableCell>
                                <TableCell className='table_cards'>
                                    <Button
                                        className='table_button'
                                        variant="outlined"
                                        onClick={() => handleSaveText({ id, source, translation, isLearningNow: true })}
                                    >
                                        <img src={items.some(saved => saved.id === id && saved.isLearningNow) ? e : NotSavedicon} alt="Save" />
                                    </Button>
                                    <Button
                                        className='table_button'
                                        variant="outlined"
                                        onClick={() => speak(translation || '')}
                                    >
                                        <Typography><KeyboardVoiceIcon /></Typography>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                        :
                        <div className='data_undifendsbox'>NO DATA FOUND</div>
                    }
                    <Pagination
                        count={pageitems.pageCount}
                        page={page}
                        onChange={handleChange}
                    />
                </TableBody>

            </TableComponent>
        </div>
    );
};

export default LearningNow;
