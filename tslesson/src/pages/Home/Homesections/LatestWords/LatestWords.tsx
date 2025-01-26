import { useEffect, useState } from 'react';
import { wordfetchTexts, saveText, removeText, updateText as updateTextAction, TextItem } from '../../../../store/actions/learingActions/learingwordsActions';
import { RootState, useAppDispatch, useAppSelector } from '../../../../store/index';
import TableComponent from '../../../../components/TableComponents/TableComponents';
import { MdDeleteOutline } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import Savedicon from "../../../../assets/images/home/Bookmark.svg";
import { Button, TableBody, TableRow, TableCell, Typography, TextField } from '@mui/material';


const LatestWords = () => {
    const dispatch = useAppDispatch();
    const items = useAppSelector((state: RootState) => state.latestWords.items);
    const userId = useAppSelector((state) => state.Auth.userId);
    const [editText, setEditText] = useState<{ id: number; source: string; translation: string; userId: string } | null>(null);
  

    useEffect(() => {
        if (userId) { 
            dispatch(wordfetchTexts(userId));
        }
    }, [dispatch, userId]);

    const handleSaveText = (item: TextItem) => {
        dispatch(saveText(item));
    };

    const handleRemoveText = (id: number, userId: string) => {
        dispatch(removeText({ id, userId }));
    };

    const handleUpdateText = ({ id, source, translation, userId }: { id: number, source: string, translation: string, userId: string }) => {
        const updatedItem = { id, source, translation, userId };
        dispatch(updateTextAction(updatedItem));
    };

    const handleEdit = (id: number, source: string, translation: string, userId: string) => {
        setEditText({ id, source, translation, userId });
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
                    {items.map(({ id, userId, source, translation, sourceLanguageId, translationLanguageId }) => (
                        <TableRow className='table_aligns' key={id}>
                            <TableCell>
                                <Typography>{`${source} - ${translation}`}</Typography>
                            </TableCell>
                            <TableCell className='table_cards'>
                                <Button
                                    className='table_button'
                                    variant="outlined"
                                    onClick={() => handleSaveText({ id, userId, source, translation, sourceLanguageId, translationLanguageId, isLearningNow: true })}
                                >
                                    <img src={Savedicon} alt="" />
                                </Button>
                                <Button
                                    className='table_button'
                                    variant="outlined"
                                    onClick={() => handleRemoveText(id, userId)}
                                >
                                    <MdDeleteOutline />
                                </Button>
                                <Button
                                    className='table_button'
                                    variant="outlined"
                                    onClick={() => handleEdit(id, source || '', translation || '', userId || '')}
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
