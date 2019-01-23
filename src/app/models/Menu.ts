
export interface Menu {
    id: number;
    name: string;
    link?: string;
    icon?: string;
    parentId?: number;
    position?: string;
    selected?: boolean;
    childs?: Menu[];

}

