export enum ActionType {
  Add = 0,
  Remove = 1,
  Update = 2, 
  SelectRow = 3,
  InlineEdit = 4
}

export enum ConditionOp {
  Equal = 0,
  Gt = 1,
  Lt = 2,
  Gte = 3,
  Lte = 4
}

export class TableStructure {
  public columnDef: string;
  public header: string;
  public show: boolean;
  public sort?: boolean = false;
  public filter?: boolean = false;
  public editable?: boolean = false;
  public cell: any;
  public isAction: boolean;
  public actionList? : TableActionList[];
  public detailList? : TableStructure[];
  public className?: string;  
  public cellSize?: string;  
  public pipeName?: string;
  public conditionOp?: ConditionOp;
  public conditionBaseVal?: any;
}

export class TableActionList {
  public label: string;
  public actionType: ActionType;
  public icon?: string;
  public field: any;
  public isVisible?: boolean = true;
  public funcAction?: (id: any) => void;
}
 

