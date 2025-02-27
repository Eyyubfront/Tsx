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
import { Button, TableBody, TableRow, TableCell, Typography, TextField, DialogContent } from '@mui/material';
import "./LatestWords.scss"
import { useLocation } from 'react-router-dom';
import FileInput from '../../../FailInput/FileInput';
import e from "../../../../assets/images/home/Savedmastered.svg";
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import AlertDialog from '../../../../components/AlertDialog/AlertDialog';

interface LearnSearchProps {
    searchTerm?: string;
    showAll?: boolean;
}

const LatestWords = ({ searchTerm = "", showAll = false }: LearnSearchProps) => {
    const dispatch = useAppDispatch();
    const items = useAppSelector((state: RootState) => state.latestWords.items.items);
    const { defaultText } = useAppSelector((state) => state.LanguagetextData);
    const [editText, setEditText] = useState<{ id: number; source: string; translation: string; } | null>(null);
    const location = useLocation();
    const [open, setOpen] = useState<boolean>(false);
    useEffect(() => {
        dispatch(wordfetchTexts({ page: 1, pageSize: showAll ? 1000 : 10 }));
    }, [dispatch, showAll]);

    const handleEditDialogClose = () => {
        setOpen(false)
    }


    const speak = (text: string) => {

        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    };

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
        handleEditDialogClose()
    };

    const handleEdit = (id: number, source: string, translation: string) => {
        setEditText({ id, source, translation });
        setOpen(true)
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
                <FileInput />
                <TableBody>
                    {filteredItems?.length ? filteredItems.map(({ id, source, translation }) => (
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
                                    <img
                                        src={
                                            items.some(saved => saved.id === id && saved.isLearningNow)
                                                ? e
                                                : items.some(item => item.isMastered)
                                                    ?  Savedicon
                                                    : NotSavedicon
                                        }
                                    
                                    />
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
                </TableBody>
                {
                    open &&
                    <AlertDialog
                        open={open}
                        onClose={handleEditDialogClose}
                        title='Update Word'
                    >
                        <DialogContent>
                            {editText && (
                                <div style={{width:"100%",padding:'10px',gap:"10px",display:"flex",justifyContent:'center' ,flexDirection:'column'}}>
                                  <div>
                                    <div>
                                        <p>Source word</p>
                                    </div>
                                  <TextField
                                     className='edit_input'
                                        value={editText.source}
                                        onChange={(e) => setEditText({ ...editText, source: e.target.value })}
                                        style={{ marginRight: '10px',border:"1px solid black",borderRadius:"16px" }}
                                    />
                                  </div>
                                  <div>
                                  <p>Translation word</p>
                                  <TextField
                                        variant="outlined"
                                             className='edit_input'
                                        value={editText.translation}
                                        onChange={(e) => setEditText({ ...editText, translation: e.target.value })}
                                        style={{ marginRight: '10px',border:"1px solid black",borderRadius:"16px" }}
                                    />
                                  </div>
                                </div>
                            )}
                              <div className='editdialog_buttom'>
                              <Button className='buton_edithandle'  onClick={handleEditDialogClose}>Cansel</Button>
                              <Button  className='buton_edithandle' onClick={handleUpdate}>Update</Button>
                              </div>
                        </DialogContent>
                    </AlertDialog>
                }
            </TableComponent>
        </div>
    );
};

export default LatestWords;
