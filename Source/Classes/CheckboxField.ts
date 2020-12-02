import { IField } from './../Interfaces/IField';
import { FieldType } from './../Enums/FieldType';
import { FieldLabel } from './FieldLabel';

export class CheckboxField implements IField {
    constructor(name: string, label: string, value: boolean) {
        this.Name = name;
        this.Label = label;
        this.Value = value;
    }

    Name: string;    
    Label: string;
    Type: FieldType = FieldType.Checkbox;
    Value: boolean;
    Input: HTMLInputElement;

    render(container: HTMLElement): void {
        new FieldLabel(container, 'question-label', this.Label);
        const element = document.createElement('input');
        element.setAttribute('type', this.Type);
        container.appendChild(element);
        this.Input = element;
        if(this.Value === true) { element.checked = true };
        element.addEventListener('change', () => {
            if(element.checked == true) {
                this.Value = true;
            } else {
                this.Value = false;
            }
        });
    }
    
    setValue(event: Event): any {
        event.preventDefault();
        event.stopImmediatePropagation();
        this.Value = true;
    }

    getValue(): boolean{
        return this.Value;
    }
}