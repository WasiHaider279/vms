export interface ICondition {
  field: string;
  condition: string;
  statement: string;
}

export interface IInputs {
  title: string;
  description: string;
  image: File;
  type: string;
  conditions: ICondition[];
  status: string;
}

