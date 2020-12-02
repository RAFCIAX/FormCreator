import { IField } from './../Interfaces/IField';
import { LocStorage } from './LocStorage';
import { Router } from './Router';


export class Form {
    constructor(fields: IField[]) {
        this.fieldsArray = fields;
    }

    private fieldsArray: IField[];

    render(pole: HTMLElement): void {
        const formDocument: HTMLElement = document.createElement("form");
        formDocument.classList.add("form");

        const saveButton = document.createElement('button');
        saveButton.innerHTML = "Save";

        const backwardButton = document.createElement('button');
        backwardButton.innerHTML = "Back";

        this.fieldsArray.forEach(field => {field.render(formDocument)});
        formDocument.appendChild(saveButton);
        saveButton.addEventListener('click', (ev) => {
            ev.preventDefault();
            ev.stopImmediatePropagation();
            if (Router.getParam() != null) {
                this.saveEditedDoc(this, Router.getParam());
            }
            else {
                this.save(this);
            }
            });
        formDocument.appendChild(backwardButton);
        backwardButton.addEventListener('click', this.back);
        pole.appendChild(formDocument);
    }

    getValue(): object {
        return this.fieldsArray.map(field => {
            return {type: field.Type, label: field.Label, name: field.Name, value: field.Value};
        })
    }


    save(data: Form): void {
        const storage = new LocStorage();
        storage.saveDocument(data);
        alert("Document successfully saved!");
        window.location.href = "index.html";
    }

    saveEditedDoc(data: Form, key: string): void {
        const storage = new LocStorage();
        storage.saveEditedDocument(data, key);
        alert("Document saved!");
        window.location.href = "index.html";
    }

    back(): void {
        window.location.href = "index.html";
    }

}