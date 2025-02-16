import 'swiper/css'; 
import { Pagination } from 'swiper/modules'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import  VocabularyTwo  from "../../../../assets/images/vocablary/vocablarytwo.svg";
import  VocabularyOne  from "../../../../assets/images/vocablary/vocablaryone.svg";
import  VocabularyThree  from  "../../../../assets/images/vocablary/vocablarythree.svg";
import  VocabularyFive  from "../../../../assets/images/vocablary/vocablarythfive.svg"; 
import  VocabularyFour  from "../../../../assets/images/vocablary/vocablaryfoor.svg"; 
import "./VocabularyBuilder.scss";

const vocabularyItems = [
    { id: 0, count: "3 of 25", title: "Vegetables", svg: VocabularyTwo  },
    { id: 1, count: "3 of 25", title: "Travel", svg: VocabularyOne },
    { id: 2, count: "3 of 25", title: "Fruits", svg: VocabularyThree  },
    { id: 3, count: "3 of 25", title: "Weather", svg: VocabularyFive },
    { id: 4, count: "3 of 25", title: "Camping", svg: VocabularyFour }
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
                        slidesPerView: 3.3, 
                    }
                }}  
                modules={[Pagination]}  
            >
                {vocabularyItems.map(item => (
                    <SwiperSlide className='swiper_slide' key={item.id}>
                        <div className="vocablary_card">
                            <div className="vocablary_left">
                                <h3 className='vocablary_tittlename'>{item.title}</h3>
                                <p>{item.count}</p>
                            </div>
                            <div className="vocablary_right">
                               <img src={item.svg} alt="" /> 
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default VocabularyBuilder;