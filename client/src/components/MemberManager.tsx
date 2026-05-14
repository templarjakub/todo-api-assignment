import React, { useState } from 'react';
import { UserPlus, X, ArrowLeft } from 'lucide-react';
import { Member } from '../types/todo';
import { useTranslation } from 'react-i18next';

interface MemberManagerProps {
    members: Member[];
    isOwner: boolean;
    currentUserId: string;
    onAddMember: (name: string) => void;
    onRemoveMember: (userId: string) => void;
}

export const MemberManager: React.FC<MemberManagerProps> = ({
                                                                members, isOwner, currentUserId, onAddMember, onRemoveMember
                                                            }) => {
    const { t } = useTranslation();
    const [isAdding, setIsAdding] = useState(false);
    const [nameInput, setNameInput] = useState('');

    const handleInvite = () => {
        if (nameInput.trim()) {
            onAddMember(nameInput.trim());
            setNameInput('');
            setIsAdding(false);
        }
    };

    return (
        <div className="mb-10 pt-6 border-t-2 border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 flex items-center gap-2">
                    <UserPlus size={14} /> {t('members.title')}
                </h3>

                {isOwner && !isAdding && (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="text-[10px] font-black uppercase text-indigo-600 dark:text-indigo-400 hover:underline">
                        {t('members.addBtn')}
                    </button>
                )}
            </div>

            {isAdding && (
                <div className="flex gap-2 mb-4 animate-in fade-in slide-in-from-top-1">
                    <input
                        autoFocus
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        placeholder={t('members.placeholder')}
                        className="flex-1 border-2 border-gray-800 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg px-3 py-1 text-xs font-bold outline-none"
                        onKeyDown={(e) => e.key === 'Enter' && handleInvite()}
                    />
                    <button onClick={handleInvite} className="bg-gray-800 dark:bg-indigo-500 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase hover:opacity-90">
                        {t('members.invite')}
                    </button>
                    <button onClick={() => setIsAdding(false)} className="text-gray-400 dark:text-gray-500 hover:text-gray-800 dark:hover:text-white p-1">
                        <ArrowLeft size={14} />
                    </button>
                </div>
            )}

            <div className="flex flex-wrap gap-2">
                {members.map((member) => (
                    <div key={member.userId} className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-700 px-3 py-1.5 rounded-full">
                        <div className="w-5 h-5 rounded-full bg-gray-300 dark:bg-gray-600 text-[10px] flex items-center justify-center font-bold text-white">
                            {member.name.charAt(0)}
                        </div>
                        <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                            {member.name} {member.userId === currentUserId && "(" + t('common.you') + ")"}
                        </span>

                        {isOwner && member.userId !== currentUserId && (
                            <button onClick={() => onRemoveMember(member.userId)} className="text-gray-300 dark:text-gray-600 hover:text-red-500 dark:hover:text-red-400">
                                <X size={14} />
                            </button>)}
                    </div>))}
            </div>
        </div>
    );
};