import { useEffect, useState } from 'react';
import {
    wordfetchTexts,
    saveText,
    removeText,
    updateText as updateTextAction,
    WordsItem,
} from '../../../../store/actions/learingActions/learingwordsActions';
import { RootState, useAppDispatch, useAppSelector } from '../../../../store/index';
import TableComponent from '../../../../components/TableComponents/TableComponents';
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import Savedicon from "../../../../assets/images/home/Bookmark.svg";
import { Button, TableBody, TableRow, TableCell, Typography, TextField } from '@mui/material';

const LatestWords = () => {
    const dispatch = useAppDispatch();
    const items = useAppSelector((state: RootState) => state.latestWords.items.items);

    
    const [editText, setEditText] = useState<{ id: number; source: string; translation: string; } | null>(null);

    useEffect(() => {
            dispatch(wordfetchTexts());
    
    }, [dispatch]);

    const handleSaveText = (item: WordsItem) => {
        dispatch(saveText(item));
    };

    const handleRemoveText = (id: number) => {
        dispatch(removeText({ id }));
    };

    const handleUpdateText = ({ id, source, translation }: { id: number; source: string; translation: string}) => {
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

    return (
        <div>
            <TableComponent title="Words">
                <TableBody>
                    {items.map(({ id,source, translation }) => (
                        <TableRow className='table_aligns' key={id}>
                            <TableCell sx={{ borderBottom: "none" }}>
                                <Typography>{`${source} - ${translation}`}</Typography>
                            </TableCell>
                            <TableCell className='table_cards'>
                                <Button
                                    className='table_button'
                                    variant="outlined"
                                    onClick={() => handleSaveText({ id,source, translation ,isLearningNow: true})}
                                >
                                    <img src={Savedicon} alt="Save" />
                                </Button>
                                <Button
                                    className='table_button'
                                    variant="outlined"
                                    onClick={() => handleRemoveText(id)}
                                >
                                    <MdDeleteOutline />
                                </Button>
                                <Button
                                    className='table_button'
                                    variant="outlined"
                                    onClick={() => handleEdit(id, source || '', translation || '')}
                                >
                                    <MdEdit />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
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