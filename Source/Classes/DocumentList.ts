import { LocStorage } from './LocStorage';

export class DocumentList {
    constructor() {
        const localStorage = new LocStorage();
        this.ListOfDocuments = localStorage.getDocuments();
    }

    private ListOfDocuments: string[];

    getDocuments(): string[] {
        return this.ListOfDocuments;
    }

    getDocument(id: string): object {
        let documentObject;
        for (const key of this.ListOfDocuments) {
            if(key === id) {
                documentObject = localStorage.getItem(key);
            }
        }
        return JSON.parse(documentObject);
    }

    getLength(): number {
        return this.getDocuments().length;
    }

    render(container: HTMLElement): void {
        const table = document.createElement('table');
        for (let r = 0; r < this.ListOfDocuments.length; r++) {
            const row = document.createElement('tr');
            for (let c = 0; c < 4; c++) {
                let cell = document.createElement('td');
                if (c==0) {
                    cell.appendChild(document.createTextNode((r+1).toString()));
                }
                else if (c==1) {
                    cell.appendChild(document.createTextNode(this.ListOfDocuments[r]));
                }
                else if (c==2) {
                    let editbutton = document.createElement('span');
                    editbutton.classList.add("fas", "fa-edit", "hov");
                    editbutton.addEventListener('click', (ev) => {
                        ev.stopImmediatePropagation();
                        ev.preventDefault();
                        console.log(this.ListOfDocuments[r]);
                        const value = confirm("Are You sure you want to edit this document?");
                        if (value == true){
                        window.location.href = `/edit-document.html?id=${this.ListOfDocuments[r]}`;
                        }
                    });
                    cell.appendChild(editbutton);
                }
                else {
                     let deletebutton = document.createElement('span');
                     deletebutton.classList.add("fas", "fa-times", "hov");
                     deletebutton.addEventListener('click', (ev) => {
                         ev.stopImmediatePropagation();
                         ev.preventDefault();
                         const value = confirm("Are You sure you want to delete this document?");
                         if (value == true){
                             this.removeDocument(this.ListOfDocuments[r]);
                         }
                     });
                    cell.appendChild(deletebutton);
                }
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
        container.appendChild(table);
    }

    removeDocument(id: string): any {
        window.localStorage.removeItem(id);
        window.location.href = "document-list.html";
    }
}