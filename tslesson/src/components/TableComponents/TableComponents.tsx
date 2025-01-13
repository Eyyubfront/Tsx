import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Button,
    TextField,
    Paper
} from '@mui/material';
import { MdDeleteOutline } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import "./TableComponents.scss"

interface TextItem {
    id: number;
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
            updateText(editText);
            setEditText(null);
        }
    };

    return (
        <div className='table_alls'>
            <h2>{title}</h2>

            <TableContainer className='table_container' component={Paper}>
                <Table >
                    <TableBody>
                        {items.map(({ id, text }) => (
                            <TableRow className='table_aligns' key={id}>
                                <TableCell className='table_borders'>{text}</TableCell>
                                <TableCell  className='table_cards '>
                                    <Button className='table_button  ' variant="outlined" onClick={() => saveText({ id, text })}>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 5.99984V13.9041C5 15.0384 5 15.6054 5.1701 15.9524C5.48537 16.5956 6.17631 16.9653 6.88639 16.8708C7.2695 16.8199 7.74136 16.5053 8.68508 15.8761L8.68735 15.8746C9.0614 15.6253 9.24846 15.5006 9.44413 15.4314C9.80351 15.3044 10.1956 15.3044 10.555 15.4314C10.7511 15.5007 10.9389 15.6259 11.3144 15.8763C12.2582 16.5054 12.7305 16.8197 13.1137 16.8707C13.8237 16.9652 14.5146 16.5956 14.8299 15.9524C15 15.6054 15 15.0382 15 13.9041V5.9971C15 5.0655 15 4.59901 14.8185 4.24284C14.6587 3.92924 14.4031 3.67445 14.0895 3.51466C13.733 3.33301 13.2669 3.33301 12.3335 3.33301H7.66683C6.73341 3.33301 6.26635 3.33301 5.90983 3.51466C5.59623 3.67445 5.34144 3.92924 5.18166 4.24284C5 4.59936 5 5.06642 5 5.99984Z" fill="#8B6DE8" stroke="#8B6DE8" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    </Button>
                                    <Button className='table_button' variant="outlined" onClick={() => removeText(id)}><MdDeleteOutline />
                                    </Button>
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