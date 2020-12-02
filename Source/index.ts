import { App } from "./Classes/App";

export const app = new App();
console.log("Jestem w index.ts");
app.renderDocument(app.TestForm);