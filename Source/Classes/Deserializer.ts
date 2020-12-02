import { IField } from '../Interfaces/IField';
import { CheckboxField } from './CheckboxField';
import { DateField } from './DateField';
import { EmailField } from './EmailField';
import { SelectField } from './SelectField';
import { TextAreaField } from './TextAreaField';
import { InputField } from './InputField';

export class Deserializer {
    
    constructor() {
        
    }

    static Deserialize(documentObject: any): IField[] {
        const newFields: IField[] = [];
        const objEntries = Object.entries(documentObject);
        const arrayOfObjects = objEntries[0][1];
        for(const element of arrayOfObjects) {
            switch (element.Type) {
                case 'text':
                    const instance1 = new InputField(element.Name, element.Label, element.Value);
                    Object.assign(instance1, element);
                    console.log(instance1);
                    newFields.push(instance1);
                    break;
                case 'checkbox':
                    const instance2 = new CheckboxField(element.Name, element.Label, element.Value);
                    Object.assign(instance2, element);
                    newFields.push(instance2);
                    break;
                case 'date':
                    const instance3 = new DateField(element.Name, element.Label, element.Value);
                    Object.assign(instance3, element);
                    newFields.push(instance3);
                    break;
                case 'email':
                    const instance4 = new EmailField(element.Name, element.Label, element.Value);
                    Object.assign(instance4, element);
                    newFields.push(instance4);
                    break;
                case 'radio':
                    const instance5 = new SelectField(element.Name, element.Label, [], element.Value);
                    Object.assign(instance5, element);
                    newFields.push(instance5);
                    break;
                case 'textarea':
                    const instance6 = new TextAreaField(element.Name, element.Label, element.Value);
                    Object.assign(instance6, element);
                    newFields.push(instance6);
                    break;
            
                default:
                    break;
            }
        }
        return newFields;
    }
}
  
