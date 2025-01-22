import { useEffect } from 'react';
import { fetchTexts, saveText, removeText, updateText as updateTextAction, TextItem } from '../../../../store/actions/learingActions/learingnowActions';
import { RootState, useAppDispatch, useAppSelector } from '../../../../store';
import TableComponent from '../../../../components/TableComponents/TableComponents';

const LearningNow = () => {
    const dispatch = useAppDispatch();
    const items = useAppSelector((state: RootState) => state.learningNow.items);
    const userId = useAppSelector((state: RootState) => state.Auth.userId);

    useEffect(() => {
        if (userId) {
            dispatch(fetchTexts(userId));
        }
    }, [dispatch, userId]);

    const handleSaveText = (item: TextItem) => {
        dispatch(saveText(item));
    };

    const handleRemoveText = (id: number, userId: string) => {
        dispatch(removeText({ id, userId }));
    };


    const handleUpdateText = ({ id, source, translation, userId }: { id: number, source: string, translation: string, userId: string }) => {
        const updatedItem = { id, source, translation, userId };
        dispatch(updateTextAction(updatedItem));
    };
    return (
        <TableComponent
            title="Latest Added Words"
            items={items}
            saveText={handleSaveText}
            removeText={handleRemoveText}
            updateText={handleUpdateText}
        />
    );
};

export default LearningNow;