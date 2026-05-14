import React, { useState } from 'react';
import { Pencil, Archive } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ListHeaderProps {
    name: string;
    isOwner: boolean;
    onRename: (newName: string) => void;
    onArchive: () => void;
}

export const ListHeader: React.FC<ListHeaderProps> = ({ name, isOwner, onRename, onArchive }) => {
    const { t } = useTranslation();
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
                            className="text-4xl font-black uppercase tracking-tighter border-b-4 border-gray-800 dark:border-gray-500 outline-none w-full bg-transparent dark:text-white"
                        />
                    </form>
                ) : (
                    <div className="flex items-center gap-4">
                        <h1 className="text-5xl font-black uppercase tracking-tighter text-gray-800 dark:text-white leading-none">
                            {name}
                        </h1>
                        {isOwner && (
                            <button onClick={() => setIsEditing(true)} className="text-gray-300 dark:text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors">
                                <Pencil size={24} />
                            </button>
                        )}
                    </div>
                )}
                <div className="mt-2 inline-block bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-300">
                    Owner: {isOwner ? t('common.you') : t('common.collaborator')}
                </div>
            </div>

            {isOwner && (
                <button
                    onClick={onArchive}
                    className="flex flex-col items-center gap-1 group text-gray-800 dark:text-gray-300">
                    <div className="p-3 border-2 border-gray-800 dark:border-gray-600 rounded-xl group-hover:bg-gray-800 dark:group-hover:bg-gray-700 group-hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(31,41,55,1)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] group-active:shadow-none group-active:translate-y-1">
                        <Archive size={24} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-tighter">{t('detail.archive')}</span>
                </button>
            )}
        </div>
    );
};