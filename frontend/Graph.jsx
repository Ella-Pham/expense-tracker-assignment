
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";

function Graph({expenses}) {
    const expenseOnly = expenses.filter(item => item.type === "Expense");

    const categoryTotalsObject = {};
    expenseOnly.forEach(item => {
        if (!categoryTotalsObject[item.category]) {
            categoryTotalsObject[item.category] = 0;
        }
        categoryTotalsObject[item.category] += Number(item.amount);
    });

    const categoryTotals = Object.keys(categoryTotalsObject).map(category => ({
        category: category,
        amount: categoryTotalsObject[category]
    }));

    const monthlyTotalsObject = {};
    expenseOnly.forEach(item => {
        const month = item.date.slice(0, 7);
        if (!monthlyTotalsObject[month]) {
            monthlyTotalsObject[month] = 0;
        }
        monthlyTotalsObject[month] += Number(item.amount);
    });

    const monthlyTotals = Object.keys(monthlyTotalsObject)
        .sort()
        .map(month => ({
            month: month,
            amount: monthlyTotalsObject[month]
        }));

    return (
        <div className="analysis-section">
            <h2>Summary & Analysis</h2>

            <div className="analysis-grid">
                <div className="chart-card">
                    <h3>Total by Category</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={categoryTotals}>
                            <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />

                            <XAxis
                                dataKey="category" 
                                stroke="#9aa0ac"
                                tick={{ fill: "#9aa0ac", fontSize: 13 }}>
                            </XAxis> 

                            <YAxis 
                                stroke="#9aa0ac"
                                tick={{ fill: "#9aa0ac", fontSize: 13 }}>
                            </YAxis>

                            <Tooltip 
                                contentStyle={{
                                    backgroundColor: "#1c1f2b",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    borderRadius: "10px",
                                    color: "#fff"
                                }}
                                labelStyle={{ color: "#fff" }}>
                            </Tooltip>

                            <Bar 
                                dataKey="amount" 
                                fill="#1E73BE"
                                radius={[6, 6, 0, 0]}>
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-card">
                    <h3>Monthly Expenditure Trend</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={monthlyTotals}>
                            <CartesianGrid 
                                stroke="rgba(255,255,255,0.08)" 
                                strokeDasharray="3 3" 
                            />

                            <XAxis 
                                dataKey="month" 
                                stroke="#9aa0ac"
                                tick={{ fill: "#9aa0ac", fontSize: 13 }}
                            />

                            <YAxis 
                                stroke="#9aa0ac"
                                tick={{ fill: "#9aa0ac", fontSize: 13 }}
                            />

                            <Tooltip 
                                contentStyle={{
                                    backgroundColor: "#1c1f2b",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    borderRadius: "10px",
                                    color: "#fff"
                                }}
                                labelStyle={{ color: "#fff" }}
                            />

                            <Line 
                                type="monotone"
                                dataKey="amount"
                                stroke="#1E73BE"
                                strokeWidth={3}
                                dot={{ fill: "#1E73BE", strokeWidth: 0, r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default Graph;