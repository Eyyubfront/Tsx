import { useState } from 'react';
import {Table,TableBody,TableCell,TableContainer,TableRow,Button,TextField,Paper} from '@mui/material';
import { MdDeleteOutline } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import "./TableComponents.scss"
import Savedicon from "../../assets/images/home/Bookmark.svg"
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
                                   
                                     <img src={Savedicon} alt="" />
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