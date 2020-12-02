import {FieldType} from "../Enums/FieldType";

export interface IField {
    Name: string;
    Label: string;
    Type: FieldType;
    Value: string | boolean;
    render(propos: any): void;
    getValue(): string | boolean;
    setValue(propos: Event) : any;
}