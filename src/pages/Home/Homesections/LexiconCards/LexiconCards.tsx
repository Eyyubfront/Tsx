import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Skeleton } from "@mui/material";
import { RootState, useAppDispatch, useAppSelector } from "../../../../store";
import { lexioncountfetch } from "../../../../store/actions/lexioncountActions/lexioncountActions";
import "./LexiconCards.scss";

interface LexionProps {
  className?: string;
}

const LexiconCards: React.FC<LexionProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const lexioncountalls = useAppSelector(
    (state: RootState) => state.lexioncard.lexionCards
  );
  const loading = useAppSelector((state: RootState) => state.lexioncard.loading);

  useEffect(() => {
    dispatch(lexioncountfetch());
  }, [dispatch]);


  const linkData = [
    { count: lexioncountalls.totalCount, label: "Vocabulary", id: "vocablary" },
    { count: lexioncountalls.learningCount, label: "Learning now", id: "learning" },
    { count: lexioncountalls.masteredCount, label: "Mastered", id: "mastered" },
  ];

  return (
    <>
      {loading ? (
        <Skeleton style={{ height: "200px" }} />
      ) : (
        <div className={`lexicon_cardsall ${className}`}>
          <div className={`lexicon_card`}>
            {linkData.slice(0, 3).map((data, index) => (
              <div className={`lexion${index + 1}`} key={data.id}>
                <Link className="links_lexion" to={`/lexioncards/${data.id}`}>
                  <div className="lexioncard_about">
                    <p className="about_toplexion">
                      {data.count}
                    </p>
                    <p className="about_bottomlexion">{data.label}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default LexiconCards;

