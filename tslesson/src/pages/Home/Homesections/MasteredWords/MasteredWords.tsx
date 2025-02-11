import { Button, TableBody, TableRow, TableCell, Typography } from "@mui/material"; 
import TableComponent from "../../../../components/TableComponents/TableComponents";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { getAllMastered, IMasteredProps, MasteredPropsUse } from "../../../../store/actions/masteredActions/masteredActions";
import { useEffect, useState } from "react";
import Savedicon from "../../../../assets/images/home/Bookmark.svg";
import NotSavedicon from "../../../../assets/images/home/nosaved.svg";
import { CategoryItem } from "../CategoryDetail/CategoryDetail";
import { selecetwordText } from "../../../../store/actions/learingActions/learingwordsActions";


interface LearnSearchProps {
    searchTerm: string;
}

const MasteredWords = ({ searchTerm = "" }: LearnSearchProps) => {
    const [savedItems, setSavedItems] = useState<CategoryItem[]>([]);
    const dispatch = useAppDispatch();
    const mastereds = useAppSelector((state) => state.mastered.mastereds);
    console.log(mastereds);

    useEffect(() => {
        dispatch(getAllMastered());
    }, [dispatch]);

    const handleSaveClick = (item: MasteredPropsUse) => { 
        const isItemSaved = savedItems.some(savedItem => savedItem.id === item.id);
        if (isItemSaved) {
            setSavedItems(prevItems => prevItems.filter(savedItem => savedItem.id !== item.id));
            localStorage.removeItem(`item-${item.id}`);
        } else {
            const newItem = { ...item, isAdded: true };
            setSavedItems(prevItems => [...prevItems, newItem]);
            localStorage.setItem(`item-${item.id}`, JSON.stringify(newItem));
        }
              dispatch(selecetwordText(item.id));
    };

    const filteredItems = mastereds.filter((item: IMasteredProps) =>
        item.source?.toLowerCase().includes(searchTerm?.toLowerCase()) || item.translation?.toLowerCase().includes(searchTerm?.toLowerCase())
    );

    return (
        <div>
            <TableComponent title="Mastered Words">
                <TableBody>
                    {filteredItems.map((item) => ( 
                        <TableRow className='table_aligns' key={item.id}>
                            <TableCell sx={{ borderBottom: "none" }}>
                                <Typography>{`${item.source} - ${item.translation}`}</Typography>
                            </TableCell>
                            <TableCell className='table_cards'>
                                <Button
                                    className='table_button'
                                    variant="outlined"
                                    onClick={() => handleSaveClick(item)} 
                                >
                                    <img src={savedItems.some(saved => saved.id === item.id) ? Savedicon : NotSavedicon} alt="" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </TableComponent>
       
        </div>
    );
}

export default MasteredWords;