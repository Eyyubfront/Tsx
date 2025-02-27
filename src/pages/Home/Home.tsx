import "./Home.scss";
import Header from '../../components/Header/Header';
import { Link } from 'react-router-dom';
import Paragrafy from '../../components/Paragrafy/Paragrafy';
import LexiconCards from './Homesections/LexiconCards/LexiconCards';
import LearningNow from './Homesections/LearingNow/LearingNow';
import LatestWords from './Homesections/LatestWords/LatestWords';
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { openDialog, openQuizModal } from "../../store/slice/LanguageHomeSlice";
import QuizModal from "../../components/QuizModal/QuizModal";

const Home = () => {
    const dispatch = useAppDispatch();


    const items = useAppSelector((state: RootState) => state.learningNow.items.nowitems);
    const handleHomeQuizClick = () => {
        if (!items || items.length === 0) {
            dispatch(openDialog());
        } else {
            dispatch(openQuizModal());
        }
    };

    return (
        <div className="home_container">
            <Header />
            <div className="homepage">
                <div className="homepage_center">
                    <LexiconCards />
           
                </div>

                <div className="homepage_bottom">
                    <div className="homepage_left">
                        <LearningNow />

                    </div>
                    <div className="homepage_right">
                        <LatestWords showAll={true} />
                    </div>
                </div>
                <div className="homepage_quiz">
                    <Link onClick={handleHomeQuizClick} style={{ textDecoration: "none", color: 'black' }} to="">
                        <Paragrafy className='quiz_center' fontsize='24px' fontfamily='DM Serif Display' text='Let’s start quiz' />
                    </Link>
                </div>

                <QuizModal />
            </div>
        </div>


    );
};

export default Home;