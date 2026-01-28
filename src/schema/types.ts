
export type Condition = {
  field: string;
  equals: unknown;
};

export type BaseField = {
  name: string;
  label: string;
  required?: boolean;
  visibleIf?: Condition;
};

export type TextField = BaseField & {
  type: "text";
  placeholder?: string;
};

export type SelectOption = {
  label: string;
  value: string;
};

export type SelectField = BaseField & {
  type: "select";
  options: SelectOption[] | "async";
};

export type GroupField = {
  type: "group";
  name: string;
  fields: FieldSchema[];
};

export type RepeatField = {
  type: "repeat";
  name: string;
  fields: FieldSchema[];
};

export type FieldSchema =
  | TextField
  | SelectField
  | GroupField
  | RepeatField;
