import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../store';
import Header from '../../../../components/Header/Header';
import "./CategoryDetail.scss"
import { addFromVocabulary } from '../../../../store/actions/LearingaddformActions/LearingaddformActions';
import VocabularyBuilder from '../VocabularyBuilder/VocabularyBuilder';
import { useEffect, useState } from 'react';
import { categoryIdfetch } from '../../../../store/actions/categoryActions/categoryActions';
import { Button, TableBody, TableCell, TableRow, Typography, TextField, Skeleton } from '@mui/material';
import TableComponent from '../../../../components/TableComponents/TableComponents';
import Savedicon from "../../../../assets/images/home/Bookmark.svg";
import NotSavedicon from "../../../../assets/images/home/nosaved.svg";
import BackButton from '../../../../components/BackButton/BackButton';
import Search from '../../../../assets/images/home/Search_Magnifying_Glass.svg';
import Paragrafy from '../../../../components/Paragrafy/Paragrafy';
import QuizModal from '../../../../components/QuizModal/QuizModal';

 export interface CategoryItem {
    id: number;
    source: string;
    translation: string;
    isAdded: boolean; 
}

const CategoryDetail: React.FC = () => {
    const navigate = useNavigate();
    const { categoryId } = useParams();
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useAppDispatch();
    const categoryDetails = useAppSelector((state) => state.category.categoryDetails);
    const loading = useAppSelector((state) => state.category.status);
    const [savedItems, setSavedItems] = useState<CategoryItem[]>([]);

    useEffect(() => {
        dispatch(categoryIdfetch(Number(categoryId)));
    }, [categoryId, dispatch]);

    useEffect(() => {
        const savedItemsArray: CategoryItem[] = [];
        
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('item-')) {
                const savedItem = JSON.parse(localStorage.getItem(key) || '{}');
                savedItemsArray.push(savedItem);
            }
        }

        setSavedItems(savedItemsArray);
    }, []);

    const handleSaveClick = (item: CategoryItem) => {
        const isItemSaved = savedItems.some(savedItem => savedItem.id === item.id);
        if (isItemSaved) {
            setSavedItems(prevItems => prevItems.filter(savedItem => savedItem.id !== item.id));
            localStorage.removeItem(`item-${item.id}`);
        } else {
            const newItem = { ...item, isAdded: true };
            setSavedItems(prevItems => [...prevItems, newItem]);
            localStorage.setItem(`item-${item.id}`, JSON.stringify(newItem));
        }

        dispatch(addFromVocabulary(item.id));
    };

    const filteredItems = categoryDetails?.filter((item: CategoryItem) => 
        item.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.translation.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="category-detail">
            <Header />
            <div className="category_container">
                <div className="categorydetail_left">
                    <BackButton onClick={() => navigate("/")} />
                    <VocabularyBuilder className='category_vocablary' />
                </div>
            {
                loading==="loading" ? <Skeleton /> :     <div className="categorydetailabout">
                <div className="search_category">
                    <div className="search_icons">
                        <img className='search_img' src={Search} alt="Search" />
                    </div>
                    <div className="input_categorbox">
                        <TextField
                            className='inputs_category'
                            variant="outlined"
                            placeholder="Search for word"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            value={searchTerm}
                            fullWidth
                            style={{padding:"16px 11px"}}
                            margin="normal"
                        />
                    </div>
                </div>
                <TableComponent title="">
                    <TableBody>
                        {filteredItems?.map((item: CategoryItem) => (
                            <TableRow className='table_aligns' key={item.id}>
                                <TableCell sx={{ borderBottom: "none" }}>
                                    <Typography>{`${item.source} - ${item.translation}`}</Typography>
                                </TableCell>
                                <TableCell className='table_cards'>
                                    <Button
                                        variant="outlined"
                                        onClick={() => handleSaveClick(item)}
                                        className="save-button"
                                    >
                                        <img src={savedItems.some(saved => saved.id === item.id) ? Savedicon : NotSavedicon} alt="" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </TableComponent>
            </div>
            }
            </div>

            <div className="homepage_quiz">
                <Link style={{ textDecoration: "none", color: 'black' }} to="">
                    <Paragrafy className='quiz_center' fontsize='24px' fontfamily='DM Serif Display' text='Let’s start quiz' />
                </Link>
            </div>
            <QuizModal />
        </div>
    );
};

export default CategoryDetail;