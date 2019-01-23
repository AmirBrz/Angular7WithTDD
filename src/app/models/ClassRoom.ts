import { TableActionList, ActionType, TableStructure } from "./TableStructure";

export class ClassRoom {
    id : number ;
    className : string;
    teacherId : number;
    teacherName? : string;
    location : string;
    capacity? : number;

    constructor(){
        this.location = '';        
    }
}

const ClassRoomActions: TableActionList[] = [    
    { label: 'Remove', field: (row: ClassRoom) => `${row.id}`, actionType: ActionType.Remove, icon: 'clear', isVisible : true },
    { label: 'Edit', field: (row: ClassRoom) => `${row.id}`, actionType: ActionType.Update, icon: 'edit' , isVisible : true}
];

export const ClassRoomColumns: TableStructure[] = [
    { columnDef: 'id', header: 'id', show: false, cell: (row: ClassRoom) => `${row.id}`, isAction: false },
    { columnDef: 'className', header: 'class name', show: true, cell: (row: ClassRoom) => `${row.className}`, isAction: false, cellSize: "30%" },
    { columnDef: 'teacherName', header: 'teacher name', show: true, cell: (row: ClassRoom) => `${row.teacherName}`, isAction: false, cellSize: "30%" },
    { columnDef: 'location', header: 'location', show: true, cell: (row: ClassRoom) => `${row.location}`, isAction: false, cellSize: "20%" }
    //{ columnDef: 'Action', header: 'Actions', show: true, cell: (row: User) => `${row.id}`, isAction: true, actionList: this.MyActions , className: "col-md-1" }
];

export const ClassRoomAdminColumns: TableStructure[] = 
[...ClassRoomColumns, 
    { columnDef: 'Action', header: '', show: true, cell: (row: ClassRoom) => `${row.id}`, isAction: true, actionList: ClassRoomActions, cellSize:"20%" }];
