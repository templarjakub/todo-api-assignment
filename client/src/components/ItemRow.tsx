import React from 'react';
import { Check, Trash2 } from 'lucide-react';
import { Item } from '../types/todo';
import { useTranslation } from 'react-i18next';

interface ItemRowProps {
    item: Item;
    onToggle: (itemId: string) => void;
    onDelete: (itemId: string) => void;
}

export const ItemRow: React.FC<ItemRowProps> = ({ item, onToggle, onDelete }) => {
    const { t } = useTranslation();
    return (
        <div
            className={`group flex items-center justify-between p-4 border-2 rounded-xl transition-all ${
                item.isResolved
                    ? 'border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50 opacity-60'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
            }`}>
            <div
                className="flex items-center gap-4 flex-1 cursor-pointer"
                onClick={() => onToggle(item.itemId)}>

                <div
                    className={`w-6 h-6 rounded flex items-center justify-center border-2 transition-colors ${
                        item.isResolved
                            ? 'bg-gray-800 border-gray-800 dark:bg-indigo-500 dark:border-indigo-500 text-white'
                            : 'border-gray-300 dark:border-gray-600'
                    }`}>
                    {item.isResolved && <Check size={16} strokeWidth={3} />}
                </div>

                <span
                    className={`font-bold text-lg transition-all ${
                        item.isResolved ? 'line-through text-gray-400 dark:text-gray-600 italic' : 'text-gray-800 dark:text-gray-100'
                    }`}>
                    {item.text}
                </span>
            </div>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(item.itemId);
                }}
                className="text-gray-300 dark:text-gray-600 hover:text-red-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-2"
                aria-label={t('items.deleteAria')}>
                <Trash2 size={20} />
            </button>
        </div>
    );
};