import { IField } from './../Interfaces/IField';
import { FieldType } from './../Enums/FieldType';
import { FieldLabel } from './FieldLabel';

export class EmailField  implements IField {
    constructor(name: string, label: string, value: string | '') {
        this.Name = name;
        this.Label = label;
        this.Value = value;
    }

    Name: string;    
    Label: string;
    Type: FieldType = FieldType.Email;
    Value: string;
    Input: HTMLInputElement;
    
    render(container: HTMLElement): void {
        new FieldLabel(container, 'question-label', this.Label);
        const element = document.createElement('input');
        element.setAttribute('type', this.Type);
        container.appendChild(element);
        element.value = this.Value;
        this.Input = element;

        element.addEventListener('keyup', (ev) => {
            this.Value = ev.target.value;
        });
        element.addEventListener('paste', (ev) => {
            this.Value = ev.target.value;
        });
        element.addEventListener('cut', (ev) => {
            this.Value = ev.target.value;
        });
    }

    setValue(event: Event): any {
        event.preventDefault();
        event.stopImmediatePropagation();
        this.Value = event.target.value;
    }

    getValue(): string {
        return this.Value;
    }
}