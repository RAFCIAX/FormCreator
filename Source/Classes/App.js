"use strict";
exports.__esModule = true;
var TextAreaField_1 = require("./TextAreaField");
var SelectField_1 = require("./SelectField");
var EmailField_1 = require("./EmailField");
var DateField_1 = require("./DateField");
var CheckboxField_1 = require("./CheckboxField");
var InputField_1 = require("./InputField");
var Form_1 = require("./Form");
var App = /** @class */ (function () {
    function App() {
        var fields = [];
        fields.push(new InputField_1.InputField('input-test', 'Czy podoba Ci się nauka na WSEI?', 'test'));
        fields.push(new CheckboxField_1.CheckboxField('checkbox-test1', 'Czy preferujesz e-learning?', 'test'));
        fields.push(new CheckboxField_1.CheckboxField('checkbox-test2', 'Checkbox2', 'test'));
        fields.push(new CheckboxField_1.CheckboxField('checkbox-test3', 'Checkbox3', 'test'));
        fields.push(new DateField_1.DateField('date-test', 'Data', ''));
        fields.push(new EmailField_1.EmailField('email-test', 'E-mail', 'test'));
        fields.push(new SelectField_1.SelectField('select-test', 'Wybrany kierunek studiów:', ['Informatyka', 'Ekonometria', 'Psychologia'], ''));
        fields.push(new TextAreaField_1.TextAreaField('textarea-test', 'Uwagi', 'test'));
        var formContainer = document.createElement('div');
        document.body.appendChild(formContainer);
        this.DocumentContainer = formContainer;
        var testForm = new Form_1.Form(fields);
        this.TestForm = testForm;
    }
    App.prototype.renderDocument = function (form) {
        form.render(this.DocumentContainer);
    };
    App.prototype.renderDocumentToEdit = function (documentObject) {
        var newFormEdit = new Form_1.Form(Deserializer.Deserialize(documentObject));
        newFormEdit.render(this.DocumentContainer);
    };
    return App;
}());
