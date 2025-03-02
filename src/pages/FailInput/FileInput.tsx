import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { addformFile } from '../../store/actions/authActions';
import { useAppDispatch } from '../../store';
import "./FailInput.scss"
const FileInput: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [data, setData] = useState<Array<Record<string, unknown>> | null>(null);
    const dispatch = useAppDispatch();

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files![0];

        if (!selectedFile) {
            return;
        }

        setFile(selectedFile);

        const reader = new FileReader();
        console.log(data);

        reader.onload = (event) => {
            const arrayBuffer = event.target?.result;

            if (!arrayBuffer) {
                console.error('Failed to read file');
                return;
            }

            const workbook = XLSX.read(arrayBuffer, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const sheetData = XLSX.utils.sheet_to_json(sheet);

            setData(sheetData as Array<Record<string, unknown>>);
        };

        reader.readAsArrayBuffer(selectedFile);
    };

    const handleUpdateForm = () => {
        if (file) {
            dispatch(addformFile(file));
        } else {
            console.error('No file selected');
        }
    };

    return (
        <div>
            <div className="top_file">
                <input className='file__input' type="file" onChange={handleFileUpload} />
                <button className='submit_inputdata' onClick={handleUpdateForm}>Submit</button>

            </div>
        </div>
    );
};

export default FileInput;