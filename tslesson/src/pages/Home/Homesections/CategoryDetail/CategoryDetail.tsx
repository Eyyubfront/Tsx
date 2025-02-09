import { useParams, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store';

import Header from '../../../../components/Header/Header';
import { categoryIdfetch } from '../../../../store/actions/categoryActions/categoryActions';
import { addFromVocabulary } from '../../../../store/actions/LearingaddformActions/LearingaddformActions';

interface CategoryItem {
    id: number;
    source: string;
    translation: string;
    isAdded: boolean;
}

const CategoryDetail: React.FC = () => {
    const { categoryId } = useParams();
    const { state } = useLocation(); 
    const dispatch = useAppDispatch();
    const categoryDetails = useAppSelector((state) => state.category.categoryDetails);
    const status = useAppSelector((state) => state.category.status);
    const categoryName = state?.categoryName;

    useEffect(() => {
        if (categoryId) {
            dispatch(categoryIdfetch(Number(categoryId)));
        }
    }, [categoryId, dispatch]);

    const handleSaveClick = (item: CategoryItem) => {
        dispatch(addFromVocabulary(item.id));
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (!categoryDetails || !Array.isArray(categoryDetails)) {
        return <div>Category not found or data not available.</div>;
    }

    return (
        <div className="category-detail">
            <Header />
            <div className="categorydetailabout">
                <h2>{categoryName}</h2>
                {categoryDetails.map((item: CategoryItem) => (
                    <div key={item.id} className="category-item">
                        <p><strong>Source:</strong> {item.source}</p>
                        <p><strong>Translation:</strong> {item.translation}</p>
                        <button 
                            onClick={() => handleSaveClick(item)}
                            className="save-button"
                        >
                            Save
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryDetail;
