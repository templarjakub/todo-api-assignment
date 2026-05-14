import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props { isOpen: boolean; onClose: () => void; onConfirm: () => void; }

export const DeleteConfirmationModal: React.FC<Props> = ({ isOpen, onClose, onConfirm }) => {
    const { t } = useTranslation();
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-900 border-4 border-gray-800 dark:border-gray-700 rounded-[32px] p-8 w-full max-w-sm shadow-[12px_12px_0px_0px_rgba(31,41,55,1)] dark:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] text-center">
                <h2 className="text-2xl font-black uppercase mb-4 dark:text-white">{t('modals.deleteTitle')}</h2>
                <p className="text-gray-500 dark:text-gray-400 font-bold mb-8">{t('modals.deleteDesc')}</p>
                <div className="flex gap-4">
                    <button onClick={onClose} className="flex-1 font-black uppercase py-3 border-2 border-gray-800 dark:border-gray-600 dark:text-white rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">{t('modals.deleteKeep')}</button>
                    <button onClick={onConfirm} className="flex-1 font-black uppercase py-3 bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700 transition-colors text-white border-2 border-gray-800 dark:border-transparent rounded-xl">{t('modals.deleteConfirm')}</button>
                </div>
            </div>
        </div>
    );
};