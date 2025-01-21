import { useEffect } from 'react';
import { fetchTexts, saveText, removeText, updateText, TextItem } from '../../../../store/actions/learingActions/learingnowActions';
import { RootState, useAppDispatch, useAppSelector } from '../../../../store';
import TableComponent from '../../../../components/TableComponents/TableComponents';

const LearningNow = () => {
    const dispatch = useAppDispatch();

    const savedTexts = useAppSelector((state: RootState) => state.learningNow.items);
    const userId = useAppSelector((state: RootState) => state.Auth.userId);

    useEffect(() => {
        if (userId) {
            dispatch(fetchTexts(userId));
        }
    }, [dispatch, userId]);
    
    const handleSaveText = (item:TextItem) => {
        dispatch(saveText(item));
    };

    return (
        <TableComponent
            title="Latest Added Words"
            items={savedTexts}
            saveText={handleSaveText} 
            // removeText={(id) => dispatch(removeText({ id, userId }))} Men tablecomponentdinden id bura gonderecem burda biden HandleRemove acib id dondurecem is bele olur
            updateText={({ id, source, translation }) => dispatch(updateText({ id, source, translation, userId }))} 
        />
    );
};

export default LearningNow;