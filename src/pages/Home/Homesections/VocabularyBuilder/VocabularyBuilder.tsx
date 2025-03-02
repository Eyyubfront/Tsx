// import 'swiper/swiper-bundle.css';
// import { Pagination } from 'swiper/modules';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import "./VocabularyBuilder.scss";
// import { useAppDispatch, useAppSelector } from '../../../../store';
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Skeleton } from '@mui/material';
// import { categoryfetch } from '../../../../store/actions/categoryActions/categoryActions';

// interface VocabularyBuilderProps {
//     className?: string;
// }

// const VocabularyBuilder: React.FC<VocabularyBuilderProps> = ({ className }) => {
//     const navigate = useNavigate();
//     const categories = useAppSelector((state) => state.category.categories);
//     const status = useAppSelector((state) => state.category.status);
//     const dispatch = useAppDispatch();

//     const [clickedCardId, setClickedCardId] = useState<number | null>(null);


//     const handleCategoryClick = async (categoryId: number) => {
//         try {
//             setClickedCardId(categoryId);
//             navigate(`/category/${categoryId}`);
//         } catch (error) {
//             console.error(error);
//         }
//     };
//     useEffect(() => {
//         dispatch(categoryfetch())

//     }, [dispatch]);

//     return (
//         <>
//             {
//                 status === "loading" ? <Skeleton style={{ height: "121px" }} /> : <div className="vocablary-builder">
//                     <Swiper
//                         className={`swipers ${className}`}
//                         spaceBetween={10}
//                         loop
//                         slidesPerView="auto"
//                         breakpoints={{
//                             320: {
//                                 slidesPerView: 4,
//                             },
//                             600: {
//                                 slidesPerView: 2.5,
//                             },
//                             1024: {
//                                 slidesPerView: 3.3,
//                             }
//                         }}
//                         modules={[Pagination]}
//                     >
//                         {categories.map(item => (
//                             <SwiperSlide
//                                 className='swiper_slide'
//                                 key={item.id}
//                                 onClick={() => handleCategoryClick(item.id)}
//                             >
//                                 <div className={`vocablary_card ${clickedCardId === item.id ? 'clicked' : ''}`}>
//                                     <div className="vocablary_left">
//                                         <h3 className='vocablary_tittlename'>{item.name}</h3>
//                                         <div className="vocablaryleft_butom">
//                                             <p>Mastered</p>
//                                             <p>{item.masteredCount}</p>
//                                             <p>of</p>
//                                             <p>{item.vocabularyCount}</p>
//                                         </div>
//                                     </div>
//                                     <div className="vocablary_right">
//                                         <img
//                                             src={`data:image/png;base64,${item.image}`}
//                                             className="item-flag"
//                                         />
//                                     </div>
//                                 </div>
//                             </SwiperSlide>
//                         ))}
//                     </Swiper>
//                 </div>
//             }
//         </>
//     );
// }

// export default VocabularyBuilder;