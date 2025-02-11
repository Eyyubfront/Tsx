
import { Table, TableContainer, Paper, Skeleton } from '@mui/material';

import "./TableComponents.scss";
import { useEffect, useState } from 'react';

interface TableComponentProps {
    title: string;
    children: React.ReactNode;
}

const TableComponent: React.FC<TableComponentProps> = ({ title, children }) => {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        },30)
    }, [])
    return (
        <>

            {
                loading ? <Skeleton style={{height:"600px",width:"100vh"}} /> : <div className='table_alls'>
                    <h2>{title}</h2>
                    <TableContainer className='table_container' component={Paper}>
                        <Table>
                            {children}
                        </Table>
                    </TableContainer>
                </div>
            }

        </>
    );
};

export default TableComponent;
