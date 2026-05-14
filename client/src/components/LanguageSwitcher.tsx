import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();
    const currentLang = i18n.language?.split('-')[0] || 'en';

    return (
        <div className="flex items-center gap-3">
            <Globe size={16} className="text-gray-400 dark:text-gray-500" />
            <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                <button
                    onClick={() => i18n.changeLanguage('en')}
                    className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase transition-all ${
                        currentLang === 'en'
                            ? 'bg-white dark:bg-gray-600 shadow-sm text-gray-800 dark:text-white'
                            : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                    }`}>
                    EN
                </button>
                <button
                    onClick={() => i18n.changeLanguage('cs')}
                    className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase transition-all ${
                        currentLang === 'cs'
                            ? 'bg-white dark:bg-gray-600 shadow-sm text-gray-800 dark:text-white'
                            : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                    }`}>
                    CS
                </button>
            </div>
        </div>
    );
};