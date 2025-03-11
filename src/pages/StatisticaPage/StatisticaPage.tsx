import { useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { QuizRaportFetch } from '../../store/actions/quizActions/quizActions';
import { useAppDispatch, useAppSelector } from '../../store';
import './StatisticaPage.scss';

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

    const totalAnswers = quizraports.totalQuestions;
    const totalCorrectAnswers = quizraports.totalCorrectAnswers;
    const totalIncorrectAnswers = totalAnswers - totalCorrectAnswers;

    const correctPercentage = ((totalCorrectAnswers / totalAnswers) * 100).toFixed(1);
    const incorrectPercentage = ((totalIncorrectAnswers / totalAnswers) * 100).toFixed(1);

    const pieChartData = [
        { label: 'Correct', value: totalCorrectAnswers, percentage: correctPercentage },
        { label: 'Incorrect', value: totalIncorrectAnswers, percentage: incorrectPercentage },
    ];

    const renderLabel = (params: any) => {
        const { label, value } = params;

        if (value === 0) {
            return '';
        }
        return `${label}: ${params.percentage}%`;
    };


    return (
        <div className='statistica_page'>
            <h1 className='statistica_tittle'>Statistics</h1>

            <div className="OverAll_Acuraybox">
                <h2 className='overAll_top'>Overall Accuracy</h2>
                <p className='overaccuray'>{quizraports.overallAccuracy} %</p>
                <div className="line"></div>
                <p>Total Questions Answered: {quizraports.totalQuestions}</p>
                <p>Total Correct Answers: {quizraports.totalCorrectAnswers}</p>
            </div>

            <div className='piechart_section'>
                <h2 className='piechart_top'>Correct vs Incorrect</h2>
                <PieChart
                    series={[
                        {
                            data: pieChartData,
                            arcLabel: renderLabel,
                        },
                    ]}
                    colors={['#8B6DE8', '#c5c0c0']}

                    height={300}
                    slotProps={{
                        legend: { hidden: false },
                    }}
                    className="custom-piechart"
                />
            </div>
            <div className='hiperbola'>
                <h2 className='hiperbola_top'>Performance Overview</h2>
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