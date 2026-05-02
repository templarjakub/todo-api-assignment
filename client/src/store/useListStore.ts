import { create } from 'zustand';
import { api } from '../utils/api';
import { ShoppingList } from '../types/todo';

const DEFAULT_LISTS: ShoppingList[] = [
    { id: 'list-001', name: 'Weekly Groceries List', ownerId: 'u123', isArchived: false, members: [], items: [] }
];

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

interface ListState {
    lists: ShoppingList[];
    isLoading: boolean;

    fetchLists: () => Promise<void>;
    createList: (name: string) => Promise<void>;
    deleteList: (id: string) => Promise<void>;
    renameList: (listId: string, newName: string) => Promise<void>;

    addItem: (listId: string, text: string) => Promise<void>;
    toggleItem: (listId: string, itemId: string) => Promise<void>;
    deleteItem: (listId: string, itemId: string) => Promise<void>;

    addMember: (listId: string, name: string) => Promise<void>;
    removeMember: (listId: string, userId: string) => Promise<void>;
}

export const useListStore = create<ListState>((set, get) => ({
    lists: [],
    isLoading: false,

    fetchLists: async () => {
        const currentLists = get().lists;

        if (USE_MOCK) {
            if (currentLists.length === 0) {
                set({ isLoading: true });
                setTimeout(() => set({ lists: DEFAULT_LISTS, isLoading: false }), 300);
            }
        } else {
            set({ isLoading: true });
            try {
                const response = await api.post('/list/list');

                const rawLists = Array.isArray(response.data?.dtoOut) ? response.data.dtoOut : [];

                const fetchedLists = rawLists.map(list => ({
                    ...list,
                    items: (list.items || []).map(item => ({
                        ...item,
                        itemId: item.id || item.itemId
                    })),
                    members: (list.members || []).map(member => ({
                        ...member,
                        userId: member.id || member.userId
                    }))
                }));

                set({ lists: fetchedLists, isLoading: false });
            } catch (error) {
                console.error("Failed to fetch lists:", error);
                set({ lists: [], isLoading: false });
            }
        }
    },

    createList: async (name) => {
        if (USE_MOCK) {
            set((state) => ({ lists: [...state.lists, { id: crypto.randomUUID(), name, ownerId: 'u123', isArchived: false, members: [], items: [] }] }));
        } else {
            try {
                const response = await api.post('/list/create', { name });

                const serverList = response.data?.dtoOut || response.data;
                
                const newList = {
                    ...serverList,
                    items: serverList.items || [],
                    members: serverList.members || []
                };

                set((state) => ({ lists: [...state.lists, newList] }));
            } catch (error) {
                console.error("Failed to create list:", error);
            }
        }
    },

    deleteList: async (id) => {
        if (USE_MOCK) {
            set((state) => ({ lists: state.lists.filter(list => list.id !== id) }));
        } else {
            try {
                await api.post('/list/delete', { id });
                set((state) => ({ lists: state.lists.filter(list => list.id !== id) }));
            } catch (error) {
                console.error("Failed to delete list:", error);
            }
        }
    },

    renameList: async (listId, newName) => {
        if (USE_MOCK) {
            set((state) => ({ lists: state.lists.map(list => list.id === listId ? { ...list, name: newName } : list) }));
        } else {
            try {
                await api.post('/list/update', { id: listId, name: newName });
                set((state) => ({ lists: state.lists.map(list => list.id === listId ? { ...list, name: newName } : list) }));
            } catch (error) {
                console.error("Failed to rename list:", error);
            }
        }
    },

    addItem: async (listId, text) => {
        if (USE_MOCK) {
            set((state) => ({
                lists: state.lists.map(list => list.id === listId
                    ? { ...list, items: [...list.items, { itemId: crypto.randomUUID(), text, isResolved: false }] }
                    : list)
            }));
        } else {
            try {
                const response = await api.post('/item/create', { listId, text });

                const serverItem = response.data?.dtoOut || response.data;

                const newItem = {
                    ...serverItem,
                    itemId: serverItem.id || serverItem.itemId
                };

                set((state) => ({
                    lists: state.lists.map(list => list.id === listId ? { ...list, items: [...list.items, newItem] } : list)
                }));
            } catch (error) {
                console.error("Failed to add item:", error);
            }
        }
    },

    toggleItem: async (listId, itemId) => {
        if (USE_MOCK) {
            set((state) => ({
                lists: state.lists.map(list => list.id === listId
                    ? { ...list, items: list.items.map(item => item.itemId === itemId ? { ...item, isResolved: !item.isResolved } : item) }
                    : list)
            }));
        } else {
            try {
                await api.post('/item/update', { listId, itemId });
                set((state) => ({
                    lists: state.lists.map(list => list.id === listId
                        ? { ...list, items: list.items.map(item => item.itemId === itemId ? { ...item, isResolved: !item.isResolved } : item) }
                        : list)
                }));
            } catch (error) {
                console.error("Failed to toggle item:", error);
            }
        }
    },

    deleteItem: async (listId, itemId) => {
        if (USE_MOCK) {
            set((state) => ({
                lists: state.lists.map(list => list.id === listId
                    ? { ...list, items: list.items.filter(item => item.itemId !== itemId) }
                    : list)
            }));
        } else {
            try {
                await api.post('/item/delete', { listId, itemId });
                set((state) => ({
                    lists: state.lists.map(list => list.id === listId ? { ...list, items: list.items.filter(item => item.itemId !== itemId) } : list)
                }));
            } catch (error) {
                console.error("Failed to delete item:", error);
            }
        }
    },

    addMember: async (listId, name) => {
        if (USE_MOCK) {
            set((state) => ({
                lists: state.lists.map(list => list.id === listId ? { ...list, members: [...list.members, { userId: crypto.randomUUID(), name }] } : list)
            }));
        } else {
            try {
                const response = await api.post('/member/add', { listId, name });

                const serverMember = response.data?.dtoOut || response.data;

                const newMember = {
                    ...serverMember,
                    userId: serverMember.id || serverMember.userId
                };

                set((state) => ({
                    lists: state.lists.map(list => list.id === listId ? { ...list, members: [...list.members, newMember] } : list)
                }));
            } catch (error) {
                console.error("Failed to add member:", error);
            }
        }
    },

    removeMember: async (listId, userId) => {
        if (USE_MOCK) {
            set((state) => ({
                lists: state.lists.map(list => list.id === listId ? { ...list, members: list.members.filter(m => m.userId !== userId) } : list)
            }));
        } else {
            try {
                await api.post('/member/remove', { listId, userId });
                set((state) => ({
                    lists: state.lists.map(list => list.id === listId ? { ...list, members: list.members.filter(m => m.userId !== userId) } : list)
                }));
            } catch (error) {
                console.error("Failed to remove member:", error);
            }
        }
    }
}));