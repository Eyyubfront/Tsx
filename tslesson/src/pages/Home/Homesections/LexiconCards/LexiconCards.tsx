import { Link } from "react-router-dom";
import Paragrafy from "../../../../components/Paragrafy/Paragrafy";
import "./LexiconCards.scss"

interface LexioncardControl {
    id: number;
    count: string;
    title: string;
}

let cardsabout: LexioncardControl[] = [
    {
        id: 0,
        count: "24", 
        title: "Vocabulary"
    },
    {
        id: 1,
        count: "24",
        title: "Learning now"
    },
    {
        id: 2,
        count: "24",
        title: "Mastered Words"
    }
];

const LexiconCards = () => {
    return (
        <div className="lexicon_cardsall">
            <div className="lexion_cards">
                {cardsabout.map(card => (
                    <div key={card.id} className="lexicon_card">
                    <Link to="/vocablarypage">
                    <div className="lexioncard_about">
                       <Paragrafy className="lexions_count" text={card.count}/>                   
                            <Paragrafy  className="lexions_title" text={card.title}/>
                       </div>
                    </Link>
                    
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LexiconCards;