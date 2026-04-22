import React, { useState } from 'react';
import { ItemRow } from './ItemRow';
import { Item } from '../types/todo';

interface ItemManagerProps {
    items: Item[];
    onAddItem: (text: string) => void;
    onToggleItem: (itemId: string) => void;
    onDeleteItem: (itemId: string) => void;
}

type FilterState = 'all' | 'unresolved';

export const ItemManager: React.FC<ItemManagerProps> = ({
                                                            items,
                                                            onAddItem,
                                                            onToggleItem,
                                                            onDeleteItem
                                                        }) => {
    const [filter, setFilter] = useState<FilterState>('all');
    const [inputText, setInputText] = useState('');

    const filteredItems = items.filter(item =>
        filter === 'all' ? true : !item.isResolved
    );

    const handleAddSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        onAddItem(inputText.trim());
        setInputText('');
    };

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">
                    List Items
                </h2>
                <div className="flex bg-gray-100 p-1 rounded-lg">
                    {(['all', 'unresolved'] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase transition-all ${
                                filter === f ? 'bg-white shadow-sm text-gray-800' : 'text-gray-400 hover:text-gray-600'
                            }`}>
                            {f === 'all' ? 'Show All' : 'Unresolved'}
                        </button>
                    ))}
                </div>
            </div>

            <form onSubmit={handleAddSubmit} className="flex gap-3 mb-6">
                <input
                    type="text"
                    placeholder="Add item..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="flex-1 border-2 border-gray-200 p-3 rounded-xl outline-none focus:border-gray-800 transition-colors text-gray-800 font-medium"/>
                <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className="bg-gray-800 text-white px-8 rounded-xl font-black uppercase tracking-wider text-sm hover:bg-gray-900 disabled:opacity-50 transition-all">
                    Add
                </button>
            </form>

            <div className="space-y-3">
                {filteredItems.map(item => (
                    <ItemRow
                        key={item.itemId}
                        item={item}
                        onToggle={onToggleItem}
                        onDelete={onDeleteItem}/>))}
            </div>
        </div>
    );
};