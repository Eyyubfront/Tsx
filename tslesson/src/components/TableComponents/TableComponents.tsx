import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Button, TextField, Paper, Typography } from '@mui/material';
import { MdDeleteOutline } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import Savedicon from "../../assets/images/home/Bookmark.svg";
import { TextItem } from '../../store/actions/learingActions/learingnowActions';

import "./TableComponents.scss"

interface TableComponentProps {
    title: string;
    items: TextItem[];
    saveText: (item: TextItem) => void;
    removeText: (id: number, userId: string) => void;
    updateText: (item: { id: number, source: string, translation: string, userId: string }) => void;
}

const TableComponent: React.FC<TableComponentProps> = ({ title, items, saveText, removeText, updateText }) => {
    const [editText, setEditText] = useState<{ id: number; source: string; translation: string, userId: string } | null>(null);

    const handleEdit = (id: number, source: string, translation: string, userId: string) => {
        setEditText({ id, source, translation, userId });
    };

    const handleUpdate = () => {
        if (editText) {
            updateText(editText);
            setEditText(null);
        }
    };

    return (
        <div className='table_alls'>
            <h2>{title}</h2>
            <TableContainer className='table_container' component={Paper}>
                <Table>
                    <TableBody>
                        {items.map(({ id, userId, source, translation, sourceLanguageId, translationLanguageId }) => (
                            <TableRow className='table_aligns' key={id}>
                                    <Typography>{`${source} - ${translation}`}</Typography>
                                <TableCell className='table_cards'>
                                    <Button className='table_button' variant="outlined" onClick={() => saveText({ id, userId, source, translation, sourceLanguageId, translationLanguageId, isLearningNow: true })}>
                                        <img src={Savedicon} alt="" />
                                    </Button>
                                    <Button className='table_button' variant="outlined" onClick={() => removeText(id, userId)}><MdDeleteOutline /></Button>
                                    <Button className='table_button' variant="outlined" onClick={() => handleEdit(id, source || '', translation || '', userId || '')}><MdEdit /></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

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

export default TableComponent;