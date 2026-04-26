import React from 'react';

interface Props { isOpen: boolean; onClose: () => void; onConfirm: () => void; }

export const DeleteConfirmationModal: React.FC<Props> = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white border-4 border-gray-800 rounded-[32px] p-8 w-full max-w-sm shadow-[12px_12px_0px_0px_rgba(31,41,55,1)] text-center">
                <h2 className="text-2xl font-black uppercase mb-4">Are you sure?</h2>
                <p className="text-gray-500 font-bold mb-8">This will permanently delete this shopping list and all its items.</p>
                <div className="flex gap-4">
                    <button onClick={onClose} className="flex-1 font-black uppercase py-3 border-2 border-gray-800 rounded-xl">No, Keep it</button>
                    <button onClick={onConfirm} className="flex-1 font-black uppercase py-3 bg-red-500 text-white border-2 border-gray-800 rounded-xl">Yes, Delete</button>
                </div>
            </div>
        </div>
    );
};