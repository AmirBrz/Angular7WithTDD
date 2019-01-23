import { TableActionList, TableStructure, ActionType, ConditionOp } from "./TableStructure";

export class ClassStudent {
    id : number;
    classId : number;
    studentId : number;
    gpa : number;
    studentFullName? : string;
    studentName? : string;
    studentSureName? : string;
    studentAge? : number;

    constructor(_classId : number , _studentId : number ){
        this.classId = _classId;
        this.studentId = _studentId;
        this.gpa = 0;
    }
}

const ClassStudentActions: TableActionList[] = [    
    { label: 'Remove', field: (row: ClassStudent) => `${row.id}`, actionType: ActionType.Remove, icon: 'clear', isVisible : true },
    { label: 'Edit', field: (row: ClassStudent) => `${row.id}`, actionType: ActionType.InlineEdit, icon: 'edit' , isVisible : true}
];

export const ClassStudentColumns: TableStructure[] = [
    { columnDef: 'id', header: 'id', show: false, cell: (row: ClassStudent) => `${row.id}`, isAction: false },
    { columnDef: 'classId', header: 'classId', show: false, cell: (row: ClassStudent) => `${row.classId}`, isAction: false },
    { columnDef: 'studentId', header: 'studentId', show: false, cell: (row: ClassStudent) => `${row.studentId}`, isAction: false },
    { columnDef: 'studentFullName', header: 'student name', show: true, cell: (row: ClassStudent) => `${row.studentName}` + ' ' + `${row.studentSureName}`, isAction: false, cellSize: "30%" },
    { columnDef: 'studentAge', header: 'age', show: true, cell: (row: ClassStudent) => `${row.studentAge}`, isAction: false, cellSize: "30%" },
    { columnDef: 'gpa', header: 'GPA', show: true, cell: (row: ClassStudent) => `${row.gpa}`, isAction: false, cellSize: "20%" , editable : true , conditionOp : ConditionOp.Gt , conditionBaseVal : 3.2 }
];

export const ClassStudentAdminColumns: TableStructure[] = 
[...ClassStudentColumns, 
    { columnDef: 'Action', header: '', show: true, cell: (row: ClassStudent) => `${row.id}`, isAction: true, actionList: ClassStudentActions, cellSize:"20%" }];
