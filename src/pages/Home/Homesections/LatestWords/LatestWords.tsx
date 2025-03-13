import { useEffect, useState } from 'react';
import {
    wordfetchTexts,
    removeText,
    updateText as updateTextAction,
    WordsItem,
    IWordsitem,
    selecetwordText,
    deletAll,
} from '../../../../store/actions/learingActions/learingwordsActions';
import { RootState, useAppDispatch, useAppSelector } from '../../../../store/index';
import TableComponent from '../../../../components/TableComponents/TableComponents';
import { MdEdit } from "react-icons/md";
import Savedicon from "../../../../assets/images/home/Bookmark.svg";
import NotSavedicon from "../../../../assets/images/home/nosaved.svg";
import { Button, TableBody, TableRow, TableCell, Typography, TextField, DialogContent, Pagination } from '@mui/material';
import "./LatestWords.scss";
import { useLocation } from 'react-router-dom';
import FileInput from '../../../FailInput/FileInput';
import e from "../../../../assets/images/home/Savedmastered.svg";
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import AlertDialog from '../../../../components/AlertDialog/AlertDialog';
import Trash from "../../../../assets/images/home/Trash_Full.svg";
import { masteredisfetch } from '../../../../store/actions/masteredActions/masteredActions';
import exceldowland from '../../../../assets/images/header/exceldowland.svg';

interface LearnSearchProps {
    searchTerm?: string;
    showAll?: boolean;
}

const LatestWords = ({ searchTerm = "", showAll }: LearnSearchProps) => {
    const dispatch = useAppDispatch();
    const items = useAppSelector((state: RootState) => state.latestWords.items.items);
    const pagitems = useAppSelector((state: RootState) => state.latestWords.items);


    const { defaultText } = useAppSelector((state) => state.LanguagetextData);
    const [editText, setEditText] = useState<{ id: number; source: string; translation: string; } | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [deletopen, seDelettOpen] = useState<boolean>(false);
    const location = useLocation();
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState(false)
    const [page, setPage] = useState(1);


    useEffect(() => {

        dispatch(wordfetchTexts({ page, pageSize: showAll ? 10 : 10, isGrouped: true }));
    }, [showAll, page])


    const handleEditDialogClose = () => {
        setOpen(false);
    };


    const handleChange = (_: unknown, value: number) => {
        setPage(value);
    };

    const speak = (text: string) => {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    };

    const handleSaveText = (item: WordsItem) => {
        if (item.id !== null) {
            dispatch(selecetwordText({ id: item.id, page: page }));
        }
    };
    const handleRemoveText = (id: number) => {
        dispatch(removeText({ id }));
    };

    const handleUpdateText = ({ id, source, translation }: { id: number; source: string; translation: string }) => {
        const updatedItem = { id, source, translation };
        dispatch(updateTextAction(updatedItem));
        handleEditDialogClose();
    };

    const handleEdit = (id: number, source: string, translation: string) => {
        setEditText({ id, source, translation });
        setOpen(true);
    };

    const handleUpdate = () => {
        if (editText) {
            handleUpdateText(editText);
            setEditText(null);
        }

    };


    const handleDeletAllsAlert = () => {
        seDelettOpen(false)
    };

    const handleDeleteAll = () => {

        dispatch(deletAll());

    };

    const handleexportfile = async () => {
        if (selectedItems.length === 0) {
            alert("No items selected");
            return;
        }

        await dispatch(masteredisfetch({
            ids: selectedItems,

        }));

        setSelectedItems([]);
    }
    const handleSelectAllChange = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            const allIds = items.map(item => item.id);
            setSelectedItems(allIds);
        } else {
            setSelectedItems([]);
        }
    };
    const handleCheckboxChange = (id: number) => {
        setSelectedItems((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((item) => item !== id)
                : [...prevSelected, id]
        )

    }



    const filteredItems = items.filter((item: IWordsitem) =>
        item.source?.toLowerCase().includes(searchTerm?.toLowerCase()) || item.translation?.toLowerCase().includes(searchTerm?.toLowerCase())
    );


    const title = location.pathname === '/lexioncards/vocablary' ? 'Vocabulary' : 'Latest added words';


    return (
        <>
            <FileInput />
            <TableComponent title={title}>

                <AlertDialog
                    open={deletopen}
                    onClose={handleDeletAllsAlert}
                    title='Are you sure you want to delete them??' >
                    <DialogContent >
                        <div style={{ padding: "5px 10px", marginTop: "20px", display: "flex", justifyContent: "center", gap: "6px" }}>
                            <Button className='alert_buton' onClick={handleDeletAllsAlert} variant="outlined" >
                                Cansel
                            </Button>

                            <Button onClick={() => {
                                handleDeleteAll()
                                seDelettOpen(false)
                            }} variant="outlined" className='alert_buton'>
                                Delete
                            </Button>
                        </div>
                    </DialogContent>
                </AlertDialog>

                <div className="export_text" onClick={handleexportfile}>
                    <div>
                        <img src={exceldowland} alt="" />
                    </div>
                    <p className="words_tittle">Download Words</p>
                </div>

                <TableBody>
                    <div className='alls_checkbutton'>
                        <TableRow onClick={() => seDelettOpen(true)}>
                            <Button variant="outlined" color="error">
                                Delete All
                            </Button>
                        </TableRow>

                        <TableRow onClick={handleSelectAllChange}>
                            <Button variant="outlined" >
                                Select All
                            </Button>
                        </TableRow>
                    </div>

                    {filteredItems?.length ? filteredItems.map(({ id, source, translation, isMastered, isLearningNow }) => (
                        <TableRow className='table_aligns' key={id}>
                            <TableCell sx={{ borderBottom: "none" }}>
                                <div className="check_box" >
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.includes(id)}
                                        onChange={() => handleCheckboxChange(id)} />
                                </div>
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
                                            isLearningNow ? e : isMastered
                                                ? Savedicon
                                                : NotSavedicon
                                        }
                                    />
                                </Button>
                                <Button
                                    className='table_button'
                                    variant="outlined"
                                    onClick={() => handleEdit(id, source || '', translation || '')}
                                >
                                    <MdEdit style={{ fontSize: "20px" }} />
                                </Button>
                                <Button
                                    className='table_button'
                                    variant="outlined"
                                    onClick={() => handleRemoveText(id)}
                                >
                                    <img src={Trash} alt="" />
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


                <Pagination
                    count={pagitems.pageCount}
                    page={page}
                    onChange={handleChange}
                />
                {
                    open &&
                    <AlertDialog
                        open={open}
                        onClose={handleEditDialogClose}
                        title='Update Word'
                    >
                        <DialogContent>
                            {editText && (
                                <div style={{ width: "100%", padding: '10px', gap: "10px", display: "flex", justifyContent: 'center', flexDirection: 'column' }}>
                                    <TableRow>
                                        <TableRow>
                                            <p>Source word</p>
                                        </TableRow>
                                        <TextField
                                            className='edit_input'
                                            value={defaultText?.isSwapped ? editText.translation : editText.source}
                                            onChange={(e) => setEditText({ ...editText, source: e.target.value })}
                                            style={{ marginRight: '10px', border: "1px solid black", borderRadius: "16px" }}
                                        />
                                    </TableRow>
                                    <TableRow>
                                        <p>Translation word</p>
                                        <TextField
                                            variant="outlined"
                                            className='edit_input'
                                            value={defaultText?.isSwapped ? editText.source : editText.translation}
                                            onChange={(e) => setEditText({ ...editText, translation: e.target.value })}
                                            style={{ marginRight: '10px', border: "1px solid black", borderRadius: "16px" }}
                                        />
                                    </TableRow>
                                </div>
                            )}
                            <TableRow className='editdialog_buttom'>
                                <Button className='buton_edithandle' onClick={handleEditDialogClose}>Cancel</Button>
                                <Button className='buton_edithandle' onClick={handleUpdate}>Update</Button>
                            </TableRow>
                        </DialogContent>
                    </AlertDialog>
                }
            </TableComponent>
        </>
    );
};

export default LatestWords;
