import React, { useState } from 'react';
import { useListStore } from '../store/useListStore';
import { useTranslation } from 'react-i18next';

interface Props { isOpen: boolean; onClose: () => void; }

export const CreateListModal: React.FC<Props> = ({ isOpen, onClose }) => {
    const { t } = useTranslation();
    const [name, setName] = useState('');
    const createList = useListStore(s => s.createList);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            createList(name.trim());
            setName('');
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-900 border-4 border-gray-800 dark:border-gray-700 rounded-[32px] p-8 w-full max-w-md shadow-[12px_12px_0px_0px_rgba(31,41,55,1)] dark:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <h2 className="text-2xl font-black uppercase mb-6 dark:text-white">{t('modals.createTitle')}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        autoFocus
                        placeholder={t('modals.createPlaceholder')}
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white p-4 rounded-xl font-bold mb-6 outline-none focus:border-gray-800 dark:focus:border-indigo-500 transition-colors"
                    />
                    <div className="flex gap-4">
                        <button type="button" onClick={onClose} className="flex-1 font-black uppercase py-3 border-2 border-gray-800 dark:border-gray-600 dark:text-white rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">{t('common.cancel')}</button>
                        <button type="submit" className="flex-1 font-black uppercase py-3 bg-gray-800 dark:bg-indigo-500 hover:opacity-90 transition-opacity text-white rounded-xl">{t('common.create')}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};