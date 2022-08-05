import React, { useState } from 'react';
import {PieChart, Pie, Cell} from 'recharts';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';


//documentation https://recharts.org/en-US/api 
// const data = [
// 	{ name: 'Group A', value: 400 },
// 	{ name: 'Group B', value: 300 },
// 	{ name: 'Group C', value: 300 },
// 	{ name: 'Group D', value: 200 },
// ];

const COLORS = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
'#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
'#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
'#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
'#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
'#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
'#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
'#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
'#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
'#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
	cx, cy, midAngle, innerRadius, outerRadius, percent, index, value, payload
}) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	return (
        <>
		<text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
			{`${(percent * 100).toFixed(0)}%`}
		</text>
            <text x={x} y={y} fill='white' dy={20} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">{`${payload.name}`}</text>
        </>
	);
};

const groupExpenses = (expenses) => {

    //expenses = expenses.map((ex)=>({name: ex.category.name, value: new Number(ex.amount)}))

    //categories expenses
    return Object.entries(
        expenses.reduce((exs, ex)=>{
            const category = ex.category.name;
            exs[category] = exs[category] ? [...exs[category], ex] : [ex]; 
            return exs;
        }, {})
    );
}

export default function PieChartComponent(){

    const {expenses} = useSelector(state=>state.expenseReducer);
    const [data, setData] = useState([]);

    let expensesCategorized = [];

    useEffect(()=>{

        if (expenses.length > 0  && data.length === 0){
            expensesCategorized = groupExpenses(expenses);
            expensesCategorized.forEach((categorizedExpense)=>{
                setData(data=>{
                    let newArr = [...data]
                    newArr.push({name:categorizedExpense[0], value: categorizedExpense[1].map(item => item.amount).reduce((prev,next)=> prev+next)})
                    //categorizedExpense[1].map(item => item.amount).reduce((prev,next)=> prev+next) //count the sum of the amount of expense category
                    return newArr;
                })
            })
        }
    },[expenses.length, expenses])

    return (
        <PieChart width={500} height={500}>
            <Pie
                data={data}
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={250}
                fill="#8884d8"
                dataKey="value"
                isAnimationActive={true}
            >
                {
                data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                }
            </Pie>
        </PieChart>
    )
}