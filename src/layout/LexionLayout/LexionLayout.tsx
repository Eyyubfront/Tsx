import { Link, useNavigate, useParams } from "react-router-dom"
import Header from "../../components/Header/Header"
import LexiconCards from "../../pages/Home/Homesections/LexiconCards/LexiconCards"
import "./LexionLayout.scss"
import LearningNow from "../../pages/Home/Homesections/LearingNow/LearingNow"
import LatestWords from "../../pages/Home/Homesections/LatestWords/LatestWords"
import { useEffect, useState } from "react"
import { TextField } from "@mui/material"
import Search from '../../assets/images/home/Search_Magnifying_Glass.svg';
import MasteredWords from "../../pages/Home/Homesections/MasteredWords/MasteredWords"
import Paragrafy from "../../components/Paragrafy/Paragrafy"
import BackButton from "../../components/BackButton/BackButton"
import { useAppDispatch, useAppSelector } from "../../store"
import { openDialog, openQuizModal } from "../../store/slice/LanguageHomeSlice"
import QuizModal from "../../components/QuizModal/QuizModal"
import { fetchSearchResults } from "../../store/actions/learingActions/learingwordsActions"
const LexionLayout = () => {
    const { id } = useParams()
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const items = useAppSelector((state) => state.learningNow.items.nowitems);

    const handleHomeQuizClick = () => {
        if (!items || items.length === 0) {
            dispatch(openDialog());
        } else {
            dispatch(openQuizModal());
        }
    };

    const handleSearch = () => {
        if (searchTerm.trim()) {
            dispatch(fetchSearchResults({
                searchText: searchTerm  || "",
                page: 1,
                pageSize: 10
            }));
           
        } else {
            console.log("Search term is empty, skipping search request.");
        }
    };
    useEffect(() => {
        if (searchTerm) {
            handleSearch();
        }
    }, [searchTerm, dispatch]);
    



    return (
        <div className="lexion_layout">
            <Header />
            <div className="back_components">
                <BackButton className="settingsbackicon" onClick={() => navigate("/")} />
            </div>
            <div className="lexion_container">
                <LexiconCards className="layout_lexionprops" />
                <div className="lexionslayout_cards">
                    <div className="lexionslayout_search">
                        <div className="search_icons">
                            <img className='search_img' src={Search} alt="Search" />
                        </div>
                        <TextField
                            className='inputs_category'
                            variant="outlined"
                            placeholder="Search for word"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            value={searchTerm}
                            fullWidth
                            style={{ padding: "16px 11px" }}
                            margin="normal"
                        />
                    </div>
                    <div className="lexionlayout_secioncomponnet">
                        {id === "learning" && <LearningNow searchTerm={searchTerm} showAll={true} />}
                        {id === "vocablary" && <LatestWords searchTerm={searchTerm} showAll={true} />}
                        {id === "mastered" && <MasteredWords searchTerm={searchTerm} />}
                    </div>
                </div>
            </div>
            <div className="homepage_quiz">
                <Link onClick={handleHomeQuizClick} style={{ textDecoration: "none", color: 'black' }} to="">
                    <Paragrafy className='quiz_center' fontsize='24px' fontfamily='DM Serif Display' text='Let’s start quiz' />
                </Link>
            </div>
            <QuizModal />
        </div>
    )
}

export default LexionLayout