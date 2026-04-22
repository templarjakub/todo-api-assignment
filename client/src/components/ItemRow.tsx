import React from 'react';
import { Check, Trash2 } from 'lucide-react';
import { Item } from '../types/todo';

interface ItemRowProps {
    item: Item;
    onToggle: (itemId: string) => void;
    onDelete: (itemId: string) => void;
}

export const ItemRow: React.FC<ItemRowProps> = ({ item, onToggle, onDelete }) => {
    return (
        <div
            className={`group flex items-center justify-between p-4 border-2 rounded-xl transition-all ${
                item.isResolved
                    ? 'border-gray-100 bg-gray-50 opacity-60'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}>
            <div
                className="flex items-center gap-4 flex-1 cursor-pointer"
                onClick={() => onToggle(item.itemId)}>
                {/* Checkbox Styled with Tailwind */}
                <div
                    className={`w-6 h-6 rounded flex items-center justify-center border-2 transition-colors ${
                        item.isResolved
                            ? 'bg-gray-800 border-gray-800 text-white'
                            : 'border-gray-300'
                    }`}>
                    {item.isResolved && <Check size={16} strokeWidth={3} />}
                </div>

                {/* Item Text */}
                <span
                    className={`font-bold text-lg transition-all ${
                        item.isResolved ? 'line-through text-gray-400 italic' : 'text-gray-800'
                    }`}>
          {item.text}
        </span>
            </div>

            {/* Delete Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(item.itemId);
                }}
                className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-2"
                aria-label="Delete item">
                <Trash2 size={20} />
            </button>
        </div>
    );
};