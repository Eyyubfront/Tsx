import "./Home.scss";
import Header from '../../components/Header/Header';
import { Link } from 'react-router-dom';
import Paragrafy from '../../components/Paragrafy/Paragrafy';
import LexiconCards from './Homesections/LexiconCards/LexiconCards';
import VocabularyBuilder from './Homesections/VocabularyBuilder/VocabularyBuilder';
import LearningNow from './Homesections/LearingNow/LearingNow';
import LatestWords from './Homesections/LatestWords/LatestWords';
import { useAppDispatch } from "../../store";
import { openQuizModal } from "../../store/slice/LanguageHomeSlice";
import QuizModal from "../../components/QuizModal/QuizModal";




const Home = () => {
    const dispatch = useAppDispatch();

    const handleQuizClick = () => {
        dispatch(openQuizModal());
        console.log("aaa");

    };

    return (
        <div className="home_container">
            <Header />
            <div className="homepage">
                <div className="homepage_center">
                    <LexiconCards />
                    <VocabularyBuilder className="customvocabularyclass" />
                </div>

                <div className="homepage_bottom">
                    <div className="homepage_left">
                        <VocabularyBuilder className="vocablarpasscomponents" />
                        <LearningNow />

                    </div>
                    <div className="homepage_right">
                        <LatestWords />
                    </div>
                </div>
                <div className="homepage_quiz">
                    <Link onClick={handleQuizClick} style={{ textDecoration: "none", color: 'black' }} to="">
                        <Paragrafy className='quiz_center' fontsize='24px' fontfamily='DM Serif Display' text='Let’s start quiz' />
                    </Link>
                </div>
                <QuizModal />
            </div>
        </div>


    );
};

export default Home;