import { IField } from './../Interfaces/IField';
import { FieldType } from './../Enums/FieldType';
import { FieldLabel } from './FieldLabel';

export class TextAreaField implements IField {
    constructor(name: string, label: string, value: string) {
        this.Name = name;
        this.Label = label;
        this.Value = value;
    }

    Name: string;
    Label: string;
    Type: FieldType = FieldType.Textlargebox;
    Value: string;
    Input: HTMLTextAreaElement;

    render(container: HTMLTextAreaElement): void {
        new FieldLabel(container, 'question-label', this.Label);
        const element = document.createElement('textarea');
        element.value = this.Value;
        container.appendChild(element);
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