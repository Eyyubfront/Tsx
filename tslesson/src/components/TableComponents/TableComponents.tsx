import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Button, TextField, Paper } from '@mui/material';
import { MdDeleteOutline } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import Savedicon from "../../assets/images/home/Bookmark.svg"; 


 export interface TextItem {
    id: number;
    userId?: string;              
    source?: string;           
    translation?: string;          
    sourceLanguageId?: number;     
    translationLanguageId?: number; 
    text: string;     
}

interface TableComponentProps {
    title: string;
    items: TextItem[];
    saveText: (item: TextItem) => void; 
    removeText: (id: number) => void;
    updateText: (item: TextItem) => void;
}

const TableComponent: React.FC<TableComponentProps> = ({ title, items, saveText, removeText, updateText }) => {
    const [editText, setEditText] = useState<{ id: number; text: string } | null>(null);

    const handleEdit = (id: number, text: string) => {
        setEditText({ id, text });
    };

    const handleUpdate = () => {
        if (editText) {
          
            const updatedItem = {
                id: editText.id,
                userId: '', // Replace with actual user ID if applicable
                source: '', // You need to retrieve this value appropriately
                translation: '', // You need to retrieve this value appropriately
                sourceLanguageId: 0, // Set as needed
                translationLanguageId: 0, // Set as needed
                text: editText.text // Set the edited text here
            };
    
            updateText(updatedItem); // Pass the complete updated Item
            setEditText(null); // Reset after update
        }
    };

    return (
        <div className='table_alls'>
            <h2>{title}</h2>
            <TableContainer className='table_container' component={Paper}>
                <Table>
                    <TableBody>
                        {items.map(({ id, text, userId, source, translation, sourceLanguageId, translationLanguageId }) => (
                            <TableRow className='table_aligns' key={id}>
                                <TableCell className='table_borders'>{text}</TableCell>
                                <TableCell className='table_cards'>
                                    <Button className='table_button' variant="outlined" onClick={() => saveText({ id, userId, source, translation, sourceLanguageId, translationLanguageId, text })}>
                                        <img src={Savedicon} alt="" />
                                    </Button>
                                    <Button className='table_button' variant="outlined" onClick={() => removeText(id)}><MdDeleteOutline /></Button>
                                    <Button className='table_button' variant="outlined" onClick={() => handleEdit(id, text)}><MdEdit /></Button>
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

export default TableComponent;