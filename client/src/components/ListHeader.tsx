import React, { useState } from 'react';
import { Pencil, Archive } from 'lucide-react';

interface ListHeaderProps {
    name: string;
    isOwner: boolean;
    onRename: (newName: string) => void;
    onArchive: () => void;
}

export const ListHeader: React.FC<ListHeaderProps> = ({ name, isOwner, onRename, onArchive }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(name);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onRename(title);
        setIsEditing(false);
    };

    return (
        <div className="flex justify-between items-start mb-8">
            <div className="flex-1">
                {isEditing && isOwner ? (
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <input
                            autoFocus
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="text-4xl font-black uppercase tracking-tighter border-b-4 border-gray-800 outline-none w-full"
                        />
                    </form>
                ) : (
                    <div className="flex items-center gap-4">
                        <h1 className="text-5xl font-black uppercase tracking-tighter text-gray-800 leading-none">
                            {name}
                        </h1>
                        {isOwner && (
                            <button onClick={() => setIsEditing(true)} className="text-gray-300 hover:text-gray-800 transition-colors">
                                <Pencil size={24} />
                            </button>
                        )}
                    </div>
                )}
                <div className="mt-2 inline-block bg-gray-100 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-500">
                    Owner: {isOwner ? 'You' : 'Collaborator'}
                </div>
            </div>

            {isOwner && (
                <button
                    onClick={onArchive}
                    className="flex flex-col items-center gap-1 group">
                    <div className="p-3 border-2 border-gray-800 rounded-xl group-hover:bg-gray-800 group-hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(31,41,55,1)]">
                        <Archive size={24} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-tighter">Archive</span>
                </button>
            )}
        </div>
    );
};