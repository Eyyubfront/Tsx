import { useEffect, useState } from 'react';
import {
    wordfetchTexts,
    removeText,
    updateText as updateTextAction,
    WordsItem,
    IWordsitem,
    selecetwordText,
} from '../../../../store/actions/learingActions/learingwordsActions';
import { RootState, useAppDispatch, useAppSelector } from '../../../../store/index';
import TableComponent from '../../../../components/TableComponents/TableComponents';
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import Savedicon from "../../../../assets/images/home/Bookmark.svg";
import NotSavedicon from "../../../../assets/images/home/nosaved.svg"; 
import { Button, TableBody, TableRow, TableCell, Typography, TextField } from '@mui/material';
import "./LatestWords.scss"
import { useLocation } from 'react-router-dom';

interface LearnSearchProps {
    searchTerm?: string;
}

const LatestWords = ({ searchTerm = "", showAll = false }: LearnSearchProps & { showAll?: boolean }) => {
    const dispatch = useAppDispatch();
    const items = useAppSelector((state: RootState) => state.latestWords.items.items);
    const [editText, setEditText] = useState<{ id: number; source: string; translation: string; } | null>(null);
    const location = useLocation();

    useEffect(() => {
        dispatch(wordfetchTexts({ page: 1, pageSize: showAll ? 20 : 10 }));
    }, [dispatch, showAll]);
    
    const handleSaveText = (item: WordsItem) => {
        if (item.id !== null) {
            dispatch(selecetwordText(item.id));
        }
    };

    const handleRemoveText = (id: number) => {
        dispatch(removeText({ id }));
    };
    const handleUpdateText = ({ id, source, translation }: { id: number; source: string; translation: string }) => {
        const updatedItem = { id, source, translation };
        dispatch(updateTextAction(updatedItem));
    };

    const handleEdit = (id: number, source: string, translation: string) => {
        setEditText({ id, source, translation });
    };

    const handleUpdate = () => {
        if (editText) {
            handleUpdateText(editText);
            setEditText(null);
        }
    };

    const filteredItems = items.filter((item: IWordsitem) =>
        item.source?.toLowerCase().includes(searchTerm?.toLowerCase()) || item.translation?.toLowerCase().includes(searchTerm?.toLowerCase())
    );

    const title = location.pathname === '/lexioncards/vocablary' ? 'Vocablary' : 'Latest added words';

    return (
        <div>
            <TableComponent title={title}>
                <TableBody>
                    {filteredItems?.length ? filteredItems.map(({ id, source, translation }) => (
                        <TableRow className='table_aligns' key={id}>
                            <TableCell sx={{ borderBottom: "none" }}>
                                <Typography>{`${source} - ${translation}`}</Typography>
                            </TableCell>
                            <TableCell className='table_cards'>
                                <Button
                                    className='table_button'
                                    variant="outlined"
                                    onClick={() => handleSaveText({ id, source, translation, isLearningNow: true })}
                                >
                                    <img src={items.some(saved => saved.id === id && saved.isLearningNow) ? Savedicon : NotSavedicon} alt="Save" />
                                </Button>
                                <Button
                                    className='table_button'
                                    variant="outlined"
                                    onClick={() => handleEdit(id, source || '', translation || '')}
                                >
                                    <MdEdit />
                                </Button>
                                <Button
                                    className='table_button'
                                    variant="outlined"
                                    onClick={() => handleRemoveText(id)}
                                >
                                    <MdDeleteOutline style={{ color: 'red' }} />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                        :
                        <div className='data_undifendsbox'>NO DATA FOUND</div>

                    }
                </TableBody>
            </TableComponent>
            {editText && (
                <div style={{ marginTop: '20px' }}>
                    <TextField
                        label="Source"
                        variant="outlined"
                        value={editText.source}
                        onChange={(e) => setEditText({ ...editText, source: e.target.value })}
                        style={{ marginRight: '10px' }}
                    />
                    <TextField
                        label="Translation"
                        variant="outlined"
                        value={editText.translation}
                        onChange={(e) => setEditText({ ...editText, translation: e.target.value })}
                        style={{ marginRight: '10px' }}
                    />
                    <Button variant="contained" onClick={handleUpdate}>Update</Button>
                </div>
            )}
        </div>
    );
};

export default LatestWords;
