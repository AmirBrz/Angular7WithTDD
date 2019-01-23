import { TableActionList, ActionType, TableStructure } from "./TableStructure";

export class User {
    public id: number;
    public name: string;
    public surename: string;
    public age: number;
    public roleId: RoleType;

    constructor(_roleId : number){
        this.roleId = _roleId;
        this.name  = '';
        this.surename = '';
    }
}

export enum RoleType {
    student = 0,
    teacher = 1,
    admin = 2
}
 
const UserActions: TableActionList[] = [
    //{ label: 'Add New', field: (row: any) => `${row.id}`, actionType: ActionType.Add, icon: 'add' , isVisible : true},
    { label: 'Remove', field: (row: User) => `${row.id}`, actionType: ActionType.Remove, icon: 'clear', isVisible : true },
    { label: 'Edit', field: (row: User) => `${row.id}`, actionType: ActionType.Update, icon: 'edit' , isVisible : true}
];

export const UserColumns: TableStructure[] = [
    { columnDef: 'id', header: 'id', show: false, cell: (row: User) => `${row.id}`, isAction: false },
    { columnDef: 'name', header: 'name', show: true, cell: (row: User) => `${row.name}`, isAction: false, cellSize: "25%" },
    { columnDef: 'surename', header: 'surename', show: true, cell: (row: User) => `${row.surename}`, isAction: false, cellSize: "40%" },
    { columnDef: 'age', header: 'age', show: true, cell: (row: User) => `${row.age}`, isAction: false, cellSize: "15%" },
    { columnDef: 'roleId', header: 'roleId', show: false, cell: (row: User) => `${row.roleId}`, isAction: false, cellSize: "10%" }
    //{ columnDef: 'Action', header: 'Actions', show: true, cell: (row: User) => `${row.id}`, isAction: true, actionList: this.MyActions , className: "col-md-1" }
];

export const UserAdminColumns: TableStructure[] = 
[...UserColumns, 
    { columnDef: 'Action', header: '', show: true, cell: (row: User) => `${row.id}`, isAction: true, actionList: UserActions, cellSize:"20%" }];


