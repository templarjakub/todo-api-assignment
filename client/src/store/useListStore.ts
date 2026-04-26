import { create } from 'zustand';
import { ShoppingList, Item } from '../types/todo';

const DEFAULT_LISTS: ShoppingList[] = [
    {
        id: 'list-001',
        name: 'Weekly Groceries List',
        ownerId: 'u123',
        isArchived: false,
        members: [{ userId: 'u123', name: 'Frontend Student' }],
        items: []
    },
    {
        id: 'list-002',
        name: 'Weekend BBQ',
        ownerId: 'u123',
        isArchived: false,
        members: [],
        items: []
    }
];

interface ListState {
    lists: ShoppingList[];
    currentUserId: string;

    createList: (name: string) => void;
    deleteList: (id: string) => void;

    addMember: (listId: string, name: string) => void;
    removeMember: (listId: string, userId: string) => void;
    renameList: (listId: string, newName: string) => void;
    addItem: (listId: string, text: string) => void;
    toggleItem: (listId: string, itemId: string) => void;
    deleteItem: (listId: string, itemId: string) => void;
}

export const useListStore = create<ListState>((set) => ({
    currentUserId: 'u123',
    lists: DEFAULT_LISTS,

    createList: (name) => set((state) => ({
        lists: [
            ...state.lists,
            {
                id: crypto.randomUUID(),
                name,
                ownerId: state.currentUserId,
                isArchived: false,
                members: [{ userId: state.currentUserId, name: 'Owner' }],
                items: []
            }
        ]
    })),

    deleteList: (id) => set((state) => ({
        lists: state.lists.filter((list) => list.id !== id)
    })),

    addMember: (listId, name) => set((state) => ({
        lists: state.lists.map(list => list.id === listId
            ? { ...list, members: [...list.members, { userId: crypto.randomUUID(), name }] }
            : list)
    })),

    removeMember: (listId, userId) => set((state) => ({
        lists: state.lists.map(list => list.id === listId
            ? { ...list, members: list.members.filter((m) => m.userId !== userId) }
            : list)
    })),

    renameList: (listId, newName) => set((state) => ({
        lists: state.lists.map(list => list.id === listId
            ? { ...list, name: newName }
            : list)
    })),

    addItem: (listId, text) => set((state) => ({
        lists: state.lists.map(list => list.id === listId
            ? { ...list, items: [...list.items, { itemId: crypto.randomUUID(), text, isResolved: false }] }
            : list)
    })),

    toggleItem: (listId, itemId) => set((state) => ({
        lists: state.lists.map(list => list.id === listId
            ? { ...list, items: list.items.map(item => item.itemId === itemId ? { ...item, isResolved: !item.isResolved } : item) }
            : list)
    })),

    deleteItem: (listId, itemId) => set((state) => ({
        lists: state.lists.map(list => list.id === listId
            ? { ...list, items: list.items.filter(item => item.itemId !== itemId) }
            : list)
    }))
}));