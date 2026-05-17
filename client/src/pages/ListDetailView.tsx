import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useListStore } from '../store/useListStore';
import { ListHeader } from '../components/ListHeader';
import { MemberManager } from '../components/MemberManager';
import { ItemManager } from '../components/ItemManager';
import { useTranslation } from 'react-i18next';
import { ListStatistics } from '../components/ListStatistics';

export const ListDetailView: React.FC = () => {
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { lists, currentUserId, addMember, removeMember, renameList, addItem, toggleItem, deleteItem } = useListStore();
    const list = lists.find(l => l.id === id);

    const [currentUserRole, setCurrentUserRole] = useState<'OWNER' | 'MEMBER'>('OWNER');
    const isOwner = currentUserRole === 'OWNER';

    if (!list) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 dark:bg-gray-900 dark:text-white">
                <h1 className="text-2xl font-black uppercase">{t('detail.notFound')}</h1>
                <Link to="/" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">{t('detail.returnDash')}</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors p-4 sm:p-8">
            <div className="max-w-3xl mx-auto mb-8 flex justify-between items-center bg-white dark:bg-gray-800 p-2 border-2 border-gray-800 dark:border-gray-600 rounded-xl">
                <div className="flex items-center gap-2 px-3">
                    <span className="text-[10px] font-black uppercase bg-yellow-200 dark:bg-yellow-500/20 dark:text-yellow-500 px-2 py-1 rounded">{t('detail.devView')}</span>
                    <span className="text-xs font-bold dark:text-gray-300">{t('detail.viewingAs')}: {currentUserRole}</span>
                </div>
                <button
                    onClick={() => setCurrentUserRole(prev => prev === 'OWNER' ? 'MEMBER' : 'OWNER')}
                    className="text-xs font-black uppercase border-2 border-gray-800 dark:border-gray-500 dark:text-gray-300 px-4 py-1 rounded-lg hover:bg-gray-800 hover:text-white dark:hover:bg-gray-700 dark:hover:text-white transition-all">
                    {t('detail.switchTo')} {currentUserRole === 'OWNER' ? t('common.member') : t('common.owner')} View
                </button>
            </div>

            <div className="max-w-3xl mx-auto">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-gray-400 hover:text-gray-800 dark:hover:text-white mb-6 font-black uppercase text-[10px] tracking-widest transition-colors">
                    <ChevronLeft size={14} /> {t('detail.backToDash')}
                </button>

                <div className="bg-white dark:bg-gray-800 border-4 border-gray-800 dark:border-gray-600 rounded-[40px] p-10 shadow-[12px_12px_0px_0px_rgba(31,41,55,1)] dark:shadow-[12px_12px_0px_0px_rgba(0,0,0,0.8)] transition-colors">
                    <ListHeader
                        name={list.name}
                        isOwner={isOwner}
                        onRename={(newName) => renameList(list.id, newName)}
                        onArchive={() => alert(t('detail.archivedAlert'))}/>

                    <MemberManager
                        members={list.members}
                        isOwner={isOwner}
                        currentUserId={currentUserId}
                        onAddMember={(name) => addMember(list.id, name)}
                        onRemoveMember={(userId) => removeMember(list.id, userId)}/>

                    <ListStatistics items={list.items} />

                    <ItemManager
                        items={list.items}
                        onAddItem={(text) => addItem(list.id, text)}
                        onToggleItem={(itemId) => toggleItem(list.id, itemId)}
                        onDeleteItem={(itemId) => deleteItem(list.id, itemId)}/>
                </div>
            </div>
        </div>
    );
};