import 'swiper/css'; // CSS faylını düzgün daxil edin
import { Pagination } from 'swiper/modules'; // Pagination modulunu import edin
import { Swiper, SwiperSlide } from 'swiper/react';

import vocablarytwo from "../../../../assets/images/vocablary/vocablarytwo.svg";
import vocablaryone from "../../../../assets/images/vocablary/vocablaryone.svg";
import vocablarythree from "../../../../assets/images/vocablary/vocablarythree.svg";
import vocablarythfive from "../../../../assets/images/vocablary/vocablarythfive.svg";
import vocablaryfoor from "../../../../assets/images/vocablary/vocablaryfoor.svg";
import "./VocabularyBuilder.scss";


const vocablaryabout = [
    {
        id: 0,
        count: "3 of 25",
        title: "Vegetables",
        svg: <img src={vocablarytwo} alt="Vegetables" />
    },
    {
        id: 1,
        count: "3 of 25",
        title: "Travel",
        svg: <img src={vocablaryone} alt="Travel" />
    },
    {
        id: 2,
        count: "3 of 25",
        title: "Fruits",
        svg: <img src={vocablarythree} alt="Fruits" />
    },
    {
        id: 3,
        count: "3 of 25",
        title: "Weather",
        svg: <img src={vocablarythfive} alt="Weather" />
    },
    {
        id: 4,
        count: "3 of 25",
        title: "Camping",
        svg: <img src={vocablaryfoor} alt="Camping" />
    }
];

interface VocabularyBuilderProps {
    className?: string;
}

const VocabularyBuilder: React.FC<VocabularyBuilderProps> = ({ className }) => {
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
                        slidesPerView: 3.5, 
                    }
                }}  
                modules={[Pagination]}  
            >
                {vocablaryabout.map(item => (
                    <SwiperSlide className='swiper_slide' key={item.id}>
                        <div className="vocablary_card">
                            <div className="vocablary_left">
                                <h3 className='vocablary_tittlename'>{item.title}</h3>
                                <p>{item.count}</p>
                            </div>
                            <div className="vocablary_right">
                                {item.svg}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default VocabularyBuilder;
