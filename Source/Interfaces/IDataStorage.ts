export interface IDataStorage {
    saveDocument(param: any): string;
    loadDocument(param: string): object;
    getDocuments(): string[];
}