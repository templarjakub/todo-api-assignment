import { create } from 'zustand';
import { ShoppingList, Item } from '../types/todo';

interface ListState {
    list: ShoppingList;
    currentUserId: string;
    addMember: (name: string) => void;
    removeMember: (userId: string) => void;
    renameList: (newName: string) => void;
    // ADD THESE ACTIONS:
    addItem: (text: string) => void;
    toggleItem: (itemId: string) => void;
    deleteItem: (itemId: string) => void;
}

export const useListStore = create<ListState>((set) => ({
    currentUserId: 'u123',
    list: {
        id: 'list-001',
        name: 'Weekly Groceries List',
        ownerId: 'u123',
        isArchived: false,
        members: [{ userId: 'u123', name: 'Frontend Student' }],
        items: [] // Initial empty items array
    },

    addMember: (name) => set((state) => ({
        list: { ...state.list, members: [...state.list.members, { userId: crypto.randomUUID(), name }] }
    })),

    removeMember: (userId) => set((state) => ({
        list: { ...state.list, members: state.list.members.filter((m) => m.userId !== userId) }
    })),

    renameList: (newName) => set((state) => ({
        list: { ...state.list, name: newName }
    })),

    // IMPLEMENT THE ITEM ACTIONS:
    addItem: (text) => set((state) => ({
        list: {
            ...state.list,
            items: [
                ...state.list.items,
                { itemId: crypto.randomUUID(), text, isResolved: false }
            ]
        }
    })),

    toggleItem: (itemId) => set((state) => ({
        list: {
            ...state.list,
            items: state.list.items.map((item) =>
                item.itemId === itemId ? { ...item, isResolved: !item.isResolved } : item
            )
        }
    })),

    deleteItem: (itemId) => set((state) => ({
        list: {
            ...state.list,
            items: state.list.items.filter((item) => item.itemId !== itemId)
        }
    }))
}));