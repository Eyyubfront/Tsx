import { Swiper, SwiperSlide } from "swiper/react"; 
import 'swiper/css';
import vocablarytwo from "../../assets/images/vocablary/vocablarytwo.svg";
import vocablaryone from "../../assets/images/vocablary/vocablaryone.svg";
import vocablarythree from "../../assets/images/vocablary/vocablarythree.svg";
import vocablarythfive from "../../assets/images/vocablary/vocablarythfive.svg";
import vocablaryfoor from "../../assets/images/vocablary/vocablaryfoor.svg";

import "./VocabularyBuilder.scss";


interface VocabularyControl {
    id: number;
    count: string;
    title: string;
    svg: JSX.Element; 
}


const vocablaryabout: VocabularyControl[] = [
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

const VocabularyBuilder = () => {
    return (
        <Swiper
        className="swipers"
            slidesPerView={3.5}  
            spaceBetween={0}  
            pagination={{ clickable: true }} 
            loop
        >
            {vocablaryabout.map(item => (
                <SwiperSlide key={item.id}>
                    <div className="vocablary_card">
                        <div className="vocablary_left">
                            <h3>{item.title}</h3>
                            <p>{item.count}</p>
                        </div>
                        <div className="vocablary_right">
                            {item.svg}
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default VocabularyBuilder;