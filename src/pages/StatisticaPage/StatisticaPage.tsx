import { useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { QuizRaportFetch } from '../../store/actions/quizActions/quizActions';
import { useAppDispatch, useAppSelector } from '../../store';
import "./StatisticaPage.scss";

const StatisticaPage = () => {
    const dispatch = useAppDispatch();
    const quizraports = useAppSelector((state) => state.quizslice.quizRaports);

    useEffect(() => {
        dispatch(QuizRaportFetch());
    }, [dispatch]);

    if (!quizraports) {
        return <div>Loading...</div>;
    }

    const { daily, monthly, weekly } = quizraports;

    const barChartData = [
        { label: 'Daily', data: daily.map(report => report.correctAnswers || 0) },
        { label: 'Weekly', data: weekly.map(report => report.correctAnswers || 0) },
        { label: 'Monthly', data: monthly.map(report => report.correctAnswers || 0) },
    ];

    return (
        <div className='statistica_page'>

            <h1 className='statistica_tittle'>Statistica</h1>
            <div className="statistica__one">

                <div className="statistica_daily">
                    <h2 className='list_topname'>Daily Reports</h2>
                    <ul >
                        {daily?.map((report, index) => (
                            <li className='list' key={index}>
                                <strong>Date:</strong> {report.dayStart}<br />
                                <strong>Questions Answers:</strong> {report.questions}<br />
                                <strong>Correct Answers:</strong> {report.correctAnswers}<br />
                                <strong>Accuracy Questions:</strong> {report.accuracy}<br />

                            </li>
                        ))}
                    </ul>
                </div>

                <div className="statistica_weekly">
                    <h2 className='list_topname'>Weekly Reports</h2>
                    <ul>
                        {weekly?.map((report, index) => (
                            <li className='list' key={index}>
                                <strong>Week:</strong> {report.weekStart}<br />
                                <strong>Questions Answers:</strong> {report.questions}<br />
                                <strong>CorrectAnswers Questions:</strong> {report.correctAnswers}<br />
                                <strong>Accuracy Questions:</strong> {report.accuracy}<br />
                            </li>
                        ))}
                    </ul>
                </div>


                <div className="statistica_montly">

                    <h2 className='list_topname'>Monthly Reports</h2>
                    <ul>
                        {monthly?.map((report, index) => (
                            <li className='list' key={index}>
                                <strong>Month:</strong> {report.monthStart}<br />
                                <strong>Questions Answers:</strong> {report.questions}<br />
                                <strong>CorrectAnswers Questions:</strong> {report.correctAnswers}<br />
                                <strong>Accuracy Questions:</strong> {report.accuracy}<br />

                            </li>
                        ))}
                    </ul>
                </div>
            </div>



            <div className='hiperbola'>
                <h2>Performance Overview</h2>
                <BarChart
                    series={barChartData.map(({ label, data }) => ({ label, data }))}
                    height={290}
                    xAxis={[{ data: ['Daily', 'Weekly', 'Monthly'], scaleType: 'band' }]}
                    margin={{ top: 10, bottom: 30, left: 40, right: 40 }}
                />
            </div>
        </div>
    );
};

export default StatisticaPage;