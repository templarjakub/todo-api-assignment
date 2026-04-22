export interface Item {
    itemId: string;
    text: string;
    isResolved: boolean;
}

export interface Member {
    userId: string;
    name: string;
}

export interface ShoppingList {
    id: string;
    name: string;
    ownerId: string;
    isArchived: boolean;
    members: Member[];
    items: any[];
}