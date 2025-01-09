import { Container } from '@mui/material';
import "./Home.scss";
import Header from '../../components/Header/Header';
import LexiconCards from '../../components/LexiconCards/LexiconCards';
import VocabularyBuilder from '../../components/VocabularyBuilder/VocabularyBuilder';
import LearingNow from '../../components/LearingNow/LearingNow';
import LatestWords from '../../components/LatestWords/LatestWords';
import { Link } from 'react-router-dom';
import Paragrafy from '../../components/Paragrafy/Paragrafy';

const Home = () => {
    return (
        <Container>
            <Header />
            <div className="homepage">
            <div className="homepage_center">
            <LexiconCards />
            <VocabularyBuilder className="customvocabularyclass" />
            </div>
            
                <div className="homepage_bottom">
                    <div className="homepage_left">
                        <VocabularyBuilder className="vocablarpasscomponents" />
                        <LearingNow />
                    </div>
                    <div className="homepage_right">
                        <LatestWords />
                    </div>
                </div>
                <div className="homepage_quiz">
                    <Link style={{ textDecoration: "none", color: 'black' }} to="">
                        <Paragrafy className='quiz_center' fontsize='24px' fontfamily='DM Serif Display' text='Let’s start quiz' />
                    </Link>
                </div>
            </div>
        </Container>
    );
};

export default Home;