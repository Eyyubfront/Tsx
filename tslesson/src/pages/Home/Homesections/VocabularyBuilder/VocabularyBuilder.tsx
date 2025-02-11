import 'swiper/css';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import "./VocabularyBuilder.scss";
import { useAppDispatch, useAppSelector } from '../../../../store';
import { categoryfetch } from '../../../../store/actions/categoryActions/categoryActions';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@mui/material';

interface VocabularyBuilderProps {
    className?: string;
}

const VocabularyBuilder: React.FC<VocabularyBuilderProps> = ({ className }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const categories = useAppSelector((state) => state.category.categories);
    const status = useAppSelector((state) => state.category.status);

    const [clickedCardId, setClickedCardId] = useState<number | null>(null);
    const [layout, setLayout] = useState<'horizontal' | 'vertical'>('vertical');

    useEffect(() => {
        dispatch(categoryfetch());

        const handleResize = () => {
            if (window.innerWidth <= 600) {
                setLayout('horizontal'); 
            } else {
                setLayout('vertical'); 
            }
        };

        handleResize(); 
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [dispatch]);

    const handleCategoryClick = async (categoryId: number) => {
        try {
            setClickedCardId(categoryId); 
            navigate(`/category/${categoryId}`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
     <>
        {
            status==="loading" ? <Skeleton style={{height:"121px"}} /> :  <div className="vocablary-builder">
            <Swiper
                className={`swipers ${className}`}
                spaceBetween={10}
                pagination={{ clickable: true }}
                loop
                breakpoints={{
                    320: {
                        slidesPerView:  4,
                    },
                    600: {
                        slidesPerView:2.5,
                    },
                    1024: {
                        slidesPerView: 3.3,
                    }
                }}
                modules={[Pagination]}
            >
                {categories.map(item => (
                    <SwiperSlide 
                        className='swiper_slide'
                        key={item.id} 
                        onClick={() => handleCategoryClick(item.id)}
                    >
                        <div className={`vocablary_card ${clickedCardId === item.id ? 'clicked' : ''}`}>
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
        }
     </>
    
    );
}

export default VocabularyBuilder;