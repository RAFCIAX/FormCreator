export class FieldLabel {
    constructor (container: HTMLElement, tagStyle: string, content: string){
        const element = document.createElement("LABEL");
        element.className = tagStyle;
        element.innerHTML = content;
        container.appendChild(element);
    };
    
}