import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';
import { Item } from '../types/todo';

interface ListStatisticsProps {
    items: Item[];
}

export const ListStatistics: React.FC<ListStatisticsProps> = ({ items }) => {
    const { t } = useTranslation();

    const totalItems = items.length;
    const resolvedCount = items.filter(item => item.isResolved).length;
    const unresolvedCount = totalItems - resolvedCount;

    const data = [
        { name: t('statistics.resolved'), value: resolvedCount },
        { name: t('statistics.unresolved'), value: unresolvedCount }
    ];

    const COLORS = ['#10B981', '#F59E0B'];

    return (
        <div className="mb-10 pt-6 border-t-2 border-gray-100 dark:border-gray-700">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-6">
                {t('statistics.title')}
            </h3>

            {totalItems === 0 ? (
                <div className="flex items-center justify-center h-48 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700">
                    <span className="text-sm font-bold text-gray-400">{t('statistics.noData')}</span>
                </div>
            ) : (
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    borderRadius: '12px',
                                    border: 'none',
                                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                    fontWeight: 'bold'
                                }}
                            />
                            <Legend
                                verticalAlign="bottom"
                                height={36}
                                iconType="circle"
                                wrapperStyle={{ fontWeight: 'bold', fontSize: '12px' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
};