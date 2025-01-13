import './LearingNow.scss';
import { saveText, removeText, updateText } from '../../../../store/LearingNowSlice';
import { RootState, useAppDispatch, useAppSelector } from '../../../../store';
import TableComponent from '../../../../components/TableComponents/TableComponents';

const predefinedWords = [
    { id: 1, text: 'Welcome - Salam' },
    { id: 2, text: 'Goodbye - Sagol' },
    { id: 3, text: 'Thank you - Tesekkur' },
   
];

const LearningNow = () => {
    const dispatch = useAppDispatch();
    const savedTexts = useAppSelector((state: RootState) => state.learningNow.items);

    return (
        <TableComponent
            title="Latest added words"
            items={savedTexts.length > 0 ? savedTexts : predefinedWords}
            saveText={(item) => dispatch(saveText(item))}
            removeText={(id) => dispatch(removeText(id))}
            updateText={(item) => dispatch(updateText(item))}
        />
    );
};

export default LearningNow;