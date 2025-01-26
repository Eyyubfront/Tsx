
import { Table,TableContainer, Paper } from '@mui/material';

import "./TableComponents.scss";

interface TableComponentProps {
    title: string;
    children: React.ReactNode; 
}

const TableComponent: React.FC<TableComponentProps> = ({ title, children }) => {
    return (
        <div className='table_alls'>
            <h2>{title}</h2>
            <TableContainer className='table_container' component={Paper}>
                <Table>
                    {children}
                </Table>
            </TableContainer>
        </div>
    );
};

export default TableComponent;
