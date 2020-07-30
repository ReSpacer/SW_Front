

let formObj = JSON.parse(addPostForm);
form = createForm(formObj);
$(".mainSec").append(form);

$(".mainSec").append(createForm(JSON.parse(colorSchemeForm)));
$(".mainSec").append(createForm(JSON.parse(interviewForm)));
$(".mainSec").append(createForm(JSON.parse(signInForm)));
$(".mainSec").append(createForm(JSON.parse(signUpForm)));

function createForm(formObj)
{
    let form = $("<form>");
    form.attr("name", formObj.name);

    /* FIELDS */
    if (formObj.hasOwnProperty("fields"))
    {
        let fieldsDiv = $("<div>", {class: "fields"});
        let fieldID = 0;
        for (let fieldObj of formObj.fields)
        {
            fieldID++;
            let field = $("<div>", {class: "field", id: "field-" + fieldID});
            let input;
            if (fieldObj.input.type == "textarea")
                input = $("<textarea>", fieldObj.input);
            else 
                input = $("<input>", fieldObj.input);

            let inputID = field.attr("id")+"-input";
            input.attr("id", inputID);

            for (let key in fieldObj)
            {
                if (key == "label")
                {
                    let label = $("<label>" + fieldObj.label + "</label>");
                    label.attr("for", inputID);
                    field.append(label);
                }
                else if (key == "input")
                {
                    if (fieldObj.input.type == "file" && fieldObj.input.hasOwnProperty("filetype"))
                    {
                        input.removeAttr("filetype");
                        let ftypes = [];
                        for (let ftype of fieldObj.input.filetype)
                        {
                            ftypes.push("." + ftype);
                        }
                        input.attr("accept", ftypes);
                    }
                    else if (fieldObj.input.type == "technology")
                    {
                        input = $("<select>", fieldObj.input);
                        input.removeAttr("type");
                        input.removeAttr("technologies");
                        input.attr("class", "technologies");
                        input.attr("id", inputID);
                        for (let technology of fieldObj.input.technologies)
                        {
                            let option = $("<option>", {class: "technology"});
                            option.text(technology);
                            input.append(option);
                        }
                    }
                    else if (fieldObj.input.type == "color" && fieldObj.input.hasOwnProperty("colors"))
                    {
                        input.removeAttr("colors");
                        colorsID = field.attr("id")+"-colors";
                        input.attr("list", colorsID);
                        let colors = $("<datalist>", {id: colorsID});
                        for (let color of fieldObj.input.colors)
                        {
                            colors.append($("<option>" + color + "</option>"));
                        }
                        field.append(colors);
                    }
                    else if (fieldObj.input.type == "number")
                    {
                        input.attr("type", "text");
                    }

                    field.append(input);
                }
            }
            fieldsDiv.append(field);
        }
        form.append(fieldsDiv);
    }

    /* REFERENCES */
    if (formObj.hasOwnProperty("references"))
    {
        let refsDiv = $("<div>", {class: "references"});
        let refID = 0;
        for (let refObj of formObj.references)
        {
            refID++;
            let reference = $("<div>", {class: "reference", id: "reference-" + refID});

            if (refObj.hasOwnProperty("input"))
            {
                let input = $("<input>", refObj.input);
                reference.append(input);
            }
            else
            {
                let ref = $("<a>");
                ref.attr("href", refObj.ref);
                ref.text(refObj.text);

                if (refObj.hasOwnProperty("text without ref"))
                {
                    let span = $("<span>" + refObj["text without ref"] + " </span>");
                    span.append(ref);
                    reference.append(span);
                }
                else reference.append(ref);
            }
            refsDiv.append(reference);
        }
        form.append(refsDiv);
    }

    /* BUTTONS */
    if (formObj.hasOwnProperty("buttons"))
    {
        let btnsDiv = $("<div>", {class: "buttons"});
        let btnID = 0;
        for (let btnObj of formObj.buttons)
        {
            btnID++;
            let btn = $("<button>", {class: "button", id: "button-" + btnID});
            btn.text(btnObj.text);
            btnsDiv.append(btn);
        }
        form.append(btnsDiv);
    }

    return form;
}

$('input[mask]').each((index, element) => {
    $(element).inputmask($(element).attr("mask"));
});

$('input[type="checkbox"]').parent().children("label").css({"margin": "0 10px"});
$('input[type="checkbox"]').parent().css({"flex-direction": "row", "align-items": "center"});
$('#phone').inputmask("mask", {"mask": "(999) 999-9999"});