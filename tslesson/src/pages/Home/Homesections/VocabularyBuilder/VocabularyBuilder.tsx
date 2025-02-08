import 'swiper/css';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import "./VocabularyBuilder.scss";
import { RootState, useAppDispatch, useAppSelector } from '../../../../store';
import { categoryIdfetch, categoryfetch } from '../../../../store/actions/categoryActions/categoryActions';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



interface VocabularyBuilderProps {
    className?: string;
}

const VocabularyBuilder: React.FC<VocabularyBuilderProps> = ({ className }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const categories = useAppSelector((state: RootState) => state.category.categories);
    useEffect(() => {
        dispatch(categoryfetch());
    }, [dispatch]);
    const handleCategoryClick = (categoryId: number, categoryName: string) => {
        dispatch(categoryIdfetch(categoryId));
        
        // Pass the category name along with the ID using the state
        navigate(`/category/${categoryId}`, { state: { categoryName } });
        console.log("vocabid", categoryId);
    };
    return (
        <div className="vocablary-builder">
            <Swiper
                className={`swipers ${className}`}
                spaceBetween={10}
                pagination={{ clickable: true }}
                loop
                breakpoints={{
                    320: {
                        slidesPerView: 1.3,
                    },
                    600: {
                        slidesPerView: 2.5,
                    },
                    1024: {
                        slidesPerView: 3.3,
                    }
                }}
                modules={[Pagination]}
            >
                {categories.map(item => (
                    <SwiperSlide className='swiper_slide' key={item.id} onClick={() => handleCategoryClick(item.id,item.name)}>
                        <div className="vocablary_card">
                            <div className="vocablary_left">
                                <h3 className='vocablary_tittlename'>{item.name}</h3>
                                <div className="vocablaryleft_butom">
                                    <p>Mastered</p>
                                    <p>{item.masteredCount}</p>
                                    <p>of</p>
                                    <p>{item.vocabularyCount}</p>
                                </div>
                            </div>
                            <div className="vocablary_right">
                                <img
                                    src={`data:image/png;base64,${item.image}`}
                                    className="item-flag"
                                />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default VocabularyBuilder;