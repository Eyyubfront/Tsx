import { saveText, removeText, updateText } from '../../store/LearingNowSlice';
import { RootState, useAppDispatch, useAppSelector } from '../../store';
import { useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Paper, TextField, Button
} from '@mui/material';
import "./TableLearingNow.scss"

const TableLearingNow: React.FC = () => {
    const dispatch = useAppDispatch();
    const savedTexts = useAppSelector((state: RootState) => state.learningNow.items);

    const [editText, setEditText] = useState<{ id: number; text: string } | null>(null);
    const [newWord, setNewWord] = useState<string>('');
    const [newTranslation, setNewTranslation] = useState<string>('');

    const handleSave = (id: number, text: string) => {
        const exists = savedTexts.some(item => item.id === id);
        if (!exists) {
            dispatch(saveText({ id, text }));
        }
    };

    const handleRemove = (id: number) => {
        dispatch(removeText(id));
    };

    const handleEdit = (id: number, text: string) => {
        setEditText({ id, text });
    };

    const handleUpdate = () => {
        if (editText) {
            dispatch(updateText(editText));
            setEditText(null);
        }
    };

    const handleAddNewWord = () => {
        if (newWord && newTranslation) {
            const newId = savedTexts.length + 1;
            dispatch(saveText({ id: newId, text: `${newWord} - ${newTranslation}` }));
            setNewWord('');
            setNewTranslation('');
        }
    };

    return (
        <div className='tablelearing_now'>
            <h2>Learning Now</h2>
            <div className="add-word">
                <TextField
                    label="Text"
                    variant="outlined"
                    value={newWord}
                    onChange={(e) => setNewWord(e.target.value)}
                    style={{ marginRight: '10px' }}
                />
                <TextField
                    label="Translate"
                    variant="outlined"
                    value={newTranslation}
                    onChange={(e) => setNewTranslation(e.target.value)}
                    style={{ marginRight: '10px' }}
                />
                <Button variant="contained" onClick={handleAddNewWord}>Add Text</Button>
            </div>

            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        {savedTexts.map(({ id, text }) => (
                            
                            <TableRow key={id}>
                                <TableCell>{text}</TableCell>
                                <TableCell>
                                    <Button variant="outlined" onClick={() => handleSave(id, text)}>Save</Button>
                                    <Button variant="outlined" onClick={() => handleRemove(id)}>Delete</Button>
                                    <Button variant="outlined" onClick={() => handleEdit(id, text)}>Edit</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {editText && (
                <div style={{ marginTop: '20px' }}>
                    <TextField
                        label="Edit Text"
                        variant="outlined"
                        value={editText.text}
                        onChange={(e) => setEditText({ id: editText.id, text: e.target.value })}
                        style={{ marginRight: '10px' }}
                    />
                    <Button variant="contained" onClick={handleUpdate}>Update</Button>
                </div>
            )}
        </div>
    );
};

export default TableLearingNow;