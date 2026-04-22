import React, { useState } from 'react';
import { UserPlus, X, Check, ArrowLeft } from 'lucide-react';
import { Member } from '../types/todo';

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
        <div className="mb-10 pt-6 border-t-2 border-gray-100">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                    <UserPlus size={14} /> Members
                </h3>

                {isOwner && !isAdding && (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="text-[10px] font-black uppercase text-indigo-600 hover:underline">
                        + Add Member
                    </button>
                )}
            </div>

            {isAdding && (
                <div className="flex gap-2 mb-4 animate-in fade-in slide-in-from-top-1">
                    <input
                        autoFocus
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        placeholder="Friend's name..."
                        className="flex-1 border-2 border-gray-800 rounded-lg px-3 py-1 text-xs font-bold outline-none"
                        onKeyDown={(e) => e.key === 'Enter' && handleInvite()}
                    />
                    <button onClick={handleInvite} className="bg-gray-800 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase">
                        Invite
                    </button>
                    <button onClick={() => setIsAdding(false)} className="text-gray-400 p-1">
                        <ArrowLeft size={14} />
                    </button>
                </div>
            )}

            <div className="flex flex-wrap gap-2">
                {members.map((member) => (
                    <div key={member.userId} className="flex items-center gap-2 bg-gray-50 border-2 border-gray-100 px-3 py-1.5 rounded-full">
                        <div className="w-5 h-5 rounded-full bg-gray-300 text-[10px] flex items-center justify-center font-bold text-white">
                            {member.name.charAt(0)}
                        </div>
                        <span className="text-xs font-bold text-gray-700">
                            {member.name} {member.userId === currentUserId && "(You)"}
                        </span>

                        {isOwner && member.userId !== currentUserId && (
                            <button onClick={() => onRemoveMember(member.userId)} className="text-gray-300 hover:text-red-500">
                                <X size={14} />
                            </button>)}
                    </div>))}
            </div>
        </div>
    );
};