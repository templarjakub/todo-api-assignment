import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Users } from 'lucide-react';
import { useListStore } from '../store/useListStore';
import { CreateListModal } from '../components/CreateListModal';
import { DeleteConfirmationModal } from '../components/DeleteConfirmationModal';

export const ListsOverview: React.FC = () => {
    const { lists, deleteList } = useListStore();
    const navigate = useNavigate();

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [listToDelete, setListToDelete] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-4xl font-black uppercase tracking-tighter text-gray-800">
                        My Shopping Lists
                    </h1>
                    <button
                        onClick={() => setIsCreateOpen(true)}
                        className="flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-2xl font-black uppercase tracking-wider hover:scale-105 transition-transform shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)]">
                        <Plus size={20} /> New List
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {lists.map((list) => (
                        <div
                            key={list.id}
                            onClick={() => navigate(`/list/${list.id}`)}
                            className="group relative bg-white border-4 border-gray-800 rounded-[32px] p-8 cursor-pointer hover:-translate-y-2 transition-all shadow-[8px_8px_0px_0px_rgba(31,41,55,1)]">

                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-2xl font-black uppercase tracking-tight text-gray-800 line-clamp-1">
                                    {list.name}
                                </h2>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setListToDelete(list.id);
                                    }}
                                    className="p-2 text-gray-300 hover:text-red-500 transition-colors">
                                    <Trash2 size={20} />
                                </button>
                            </div>

                            <div className="flex items-center gap-4 mt-6">
                                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase">
                                    <Users size={14} /> {list.members.length} Members
                                </div>
                                <div className="text-[10px] font-black uppercase bg-gray-100 px-2 py-1 rounded">
                                    {list.items.length} Items
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <CreateListModal
                isOpen={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
            />

            <DeleteConfirmationModal
                isOpen={!!listToDelete}
                onClose={() => setListToDelete(null)}
                onConfirm={() => {
                    if (listToDelete) deleteList(listToDelete);
                    setListToDelete(null);
                }}
            />
        </div>
    );
};