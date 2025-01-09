import {  Container } from '@mui/material';
import "./Home.scss"
import Header from '../../components/Header/Header';
import LexiconCards from '../../components/LexiconCards/LexiconCards';
import VocabularyBuilder from '../../components/VocabularyBuilder/VocabularyBuilder';
import LearingNow from '../../components/LearingNow/LearingNow';
import LatestWords from '../../components/LatestWords/LatestWords';
const Home = () => {
    return (
        <Container>
       <Header/>
       <LexiconCards/>
    <div className="homepage_bottom">
    <div className="homepage_left">
     <VocabularyBuilder/>
     <LearingNow/>
     </div>
     <div className="homepage_right">
        <LatestWords/>
     </div>
    </div>
        </Container>
    );
};

export default Home;