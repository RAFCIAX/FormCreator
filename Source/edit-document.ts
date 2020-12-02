import { app } from './index';
import { DocumentList } from './Classes/DocumentList';
import { Router } from "./Classes/Router";

const id = Router.getParam();
console.log(id);

const listOfDocuments = new DocumentList();
const requestedDocument = listOfDocuments.getDocument(id);
app.renderDocumentToEdit(requestedDocument);