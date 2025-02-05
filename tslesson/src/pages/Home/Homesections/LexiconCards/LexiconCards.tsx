import { Link } from "react-router-dom";
import "./LexiconCards.scss"
import { RootState, useAppDispatch, useAppSelector } from "../../../../store";
import { useEffect } from "react";
import { lexioncountfetch } from "../../../../store/actions/lexioncountActions/lexioncountActions";



const LexiconCards = () => {
    const dispatch = useAppDispatch();
    const lexioncountalls = useAppSelector((state: RootState) => state.lexioncard.lexionCards);
    useEffect(() => {
        dispatch(lexioncountfetch());
    }, [dispatch]);
    return (
        <div className="lexicon_cardsall">
            <div className="lexion_cards">
                <div className="lexicon_card">
                    <div className="lexionsseconds">
                        <div className="lexionone">
                            <Link className="links_lexion" to="/vocablarypage">
                                <div className="lexioncard_about">
                                    <p className="about_toplexion">{lexioncountalls.totalCount}</p>
                                    <p className="about_bottomlexion">Vocablary</p>
                                </div>
                            </Link>
                        </div>
                        <div className="lexiontwo">
                            <Link className="links_lexion" to="/learingnow">
                                <div className="lexioncard_about">
                                    <p className="about_toplexion">{lexioncountalls.learningCount}</p>
                                    <p className="about_bottomlexion">Learingnow</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="lexionthree">
                        <Link className="links_lexion" to="/mastered">
                            <div className="lexioncard_about">
                                <p className="about_toplexion">{lexioncountalls.masteredCount}</p>
                                <p className="about_bottomlexion">Mastered</p>
                            </div>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default LexiconCards;