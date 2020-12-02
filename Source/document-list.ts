import { DocumentList } from "./Classes/DocumentList";

const forms = new DocumentList();
if (forms.getLength() === 0) {
    document.body.append('You do not have any saved documents');
}
else {
    forms.render(document.body);
}