import './LatestWords.scss';
import { saveText, removeText, updateText } from '../../store/LearingNowSlice';
import { RootState, useAppDispatch, useAppSelector } from '../../store';
import TableComponent from '../TableComponents/TableComponents';
const predefinedWords = [
    { id: 1, text: 'Welcome - Salam' },
    { id: 2, text: 'Goodbye - Sagol' },
    { id: 3, text: 'Thank you - Tesekkur' },
   
];
const LatestWords = () => {
     const dispatch = useAppDispatch();
        const savedTexts = useAppSelector((state: RootState) => state.latestWords.items);

    return (
        <TableComponent
        title="Learning Now"
        items={savedTexts.length > 0 ? savedTexts : predefinedWords}
        saveText={(item) => dispatch(saveText(item))}
        removeText={(id) => dispatch(removeText(id))}
        updateText={(item) => dispatch(updateText(item))}
    />

    );
};

export default LatestWords;
