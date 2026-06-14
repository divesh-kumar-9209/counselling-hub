console.log("app.js loaded");

let selectedIssues = [];
let selectedSubIssues = [];
let selectedResources = [];
document.addEventListener(
"DOMContentLoaded",
async () => {

await loadCategories();
await loadIssues();
await loadCategories();


document
.getElementById("addIssueBtn")
.addEventListener(
"click",
addIssue
);

document
.getElementById("addSubIssueBtn")
.addEventListener(
"click",
addSubIssue
);

document
.getElementById("addResourceBtn")
.addEventListener(
"click",
addResource
);

document
.getElementById("issues")
.addEventListener(
"change",
issueChanged
);

document
.getElementById("saveBtn")
.addEventListener(
"click",
saveCase
);

document
.getElementById("phrasesBtn")
.addEventListener(
"click",
openPhrases
);

document
.getElementById("closePhrases")
.addEventListener(
"click",
closePhrases
);

document
.getElementById("supportCategory")
.addEventListener(
"change",
categoryChanged
);

});

function addIssue(){

const select =
document.getElementById(
"issues"
);

const id =
Number(select.value);

const text =
select.options[
select.selectedIndex
].text;

if(
selectedIssues.some(
x => x.id === id
)
){
return;
}

selectedIssues.push({
id,
text
});

renderIssues();

}

function renderIssues(){

const box =
document.getElementById(
"selectedIssues"
);

box.innerHTML = "";

selectedIssues.forEach(
issue => {

const chip =
document.createElement(
"div"
);

chip.className =
"chip";

chip.innerHTML = `

${issue.text}

<button
type="button"
onclick="removeIssue(${issue.id})">
×
</button>

`;

box.appendChild(
chip
);

});

}

function removeIssue(id){

selectedIssues =
selectedIssues.filter(
x => x.id !== id
);

renderIssues();

}

function removeIssue(id){

selectedIssues =
selectedIssues.filter(
x => x.id !== id
);

renderIssues();

}

function addSubIssue(){

const select =
document.getElementById(
"subIssues"
);

const id =
Number(select.value);

const text =
select.options[
select.selectedIndex
].text;

if(
selectedSubIssues.some(
x => x.id === id
)
){
return;
}

selectedSubIssues.push({
id,
text
});

renderSubIssues();

}

function renderSubIssues(){

const box =
document.getElementById(
"selectedSubIssues"
);

box.innerHTML = "";

selectedSubIssues.forEach(
item => {

const chip =
document.createElement(
"div"
);

chip.className =
"chip";

chip.innerHTML = `

${item.text}

<button
type="button"
onclick="removeSubIssue(${item.id})">
×
</button>

`;

box.appendChild(
chip
);

});

}

function removeSubIssue(id){

selectedSubIssues =
selectedSubIssues.filter(
x => x.id !== id
);

renderSubIssues();

}

function addResource(){

const select =
document.getElementById(
"resources"
);

const id =
Number(select.value);

const text =
select.options[
select.selectedIndex
].text;

if(
selectedResources.some(
x => x.id === id
)
){
return;
}

selectedResources.push({
id,
text
});

renderResources();

}

function renderResources(){

const box =
document.getElementById(
"selectedResources"
);

box.innerHTML = "";

selectedResources.forEach(
item => {

const chip =
document.createElement(
"div"
);

chip.className =
"chip";

chip.innerHTML = `

${item.text}

<button
type="button"
onclick="removeResource(${item.id})">
×
</button>

`;

box.appendChild(
chip
);

});

}

function renderResources(){

const box =
document.getElementById(
"selectedResources"
);

box.innerHTML = "";

selectedResources.forEach(
item => {

const chip =
document.createElement(
"div"
);

chip.className =
"chip";

chip.innerHTML = `

${item.text}

<button
type="button"
onclick="removeResource(${item.id})">
×
</button>

`;

box.appendChild(
chip
);

});

}

function openPhrases(){

document
.getElementById(
"phrasesDrawer"
)
.classList.add(
"open"
);

}

function closePhrases(){

document
.getElementById(
"phrasesDrawer"
)
.classList.remove(
"open"
);

}


async function loadIssues(){

console.log("loading issues");

const { data, error } =
await supabaseClient
.from("issues")
.select("*")
.order("name");

console.log(data);
console.log(error);

if(error){
    return;
}

const issueBox =
document.getElementById("issues");

issueBox.innerHTML = "";

data.forEach(issue => {

    const option =
    document.createElement("option");

    option.value = issue.id;
    option.textContent = issue.name;

    issueBox.appendChild(option);

});

}

async function loadCategories(){

const { data, error } =
await supabaseClient
.from("knowledge_categories")
.select("*")
.order("name");

console.log(data);
console.log(error);

if(error){
return;
}

const select =
document.getElementById(
"supportCategory"
);

if(!select){
return;
}

select.innerHTML =
'<option value="">Select Category</option>';

data.forEach(cat => {

const option =
document.createElement("option");

option.value = cat.id;
option.textContent = cat.name;

select.appendChild(option);

});

}

async function loadResources(){
console.log("loading resources");
const { data } =
await supabaseClient
.from("resources")
.select("*")
.order("title");

const box =
document.getElementById("resources");

box.innerHTML = "";

data.forEach(resource => {

const option =
document.createElement("option");

option.value = resource.id;
option.textContent = resource.title;

box.appendChild(option);

});

}


async function saveCase(){

const client_name =
document.getElementById("clientName").value;

const age =
document.getElementById("age").value;

const gender =
document.getElementById("gender").value;

const issue_remarks =
document.getElementById("issueRemarks").value;

const resource_remarks =
document.getElementById("resourceRemarks").value;

const counsellor_remarks =
document.getElementById("counsellorRemarks").value;

const case_summary =
document.getElementById("caseSummary").value;

const session_duration =
document.getElementById("sessionDuration").value;

const follow_up_required =
document.getElementById("followUpRequired").checked;

const follow_up_date =
document.getElementById("followUpDate").value;

const notes =
document.getElementById("generalRemarks").value;

const case_status =
document.getElementById("caseStatus").value;

const { data: caseRow , error } =
await supabaseClient
.from("cases")
.insert([{
client_name,
age,
gender,
issue_remarks,
resource_remarks,
counsellor_remarks,
case_summary,
session_duration,
follow_up_required,
follow_up_date,
notes,
case_status
}])
.select()
.single();

if(error){

alert(error.message);
return;

}

const caseId = caseRow.id;

for(const issue of selectedIssues){

await supabaseClient
.from("case_issues")
.insert([{
case_id: caseId,
issue_id: issue.id
}]);

}
}

for(const subIssue of selectedSubIssues){

await supabaseClient
.from("case_sub_issues")
.insert([{
case_id: caseId,
sub_issue_id: subIssue.id
}]);

}



async function loadCategories(){

const { data } =
await supabaseClient
.from("knowledge_categories")
.select("*")
.order("name");

const select =
document.getElementById(
"supportCategory"
);

select.innerHTML =
'<option value="">Select Category</option>';

data.forEach(cat=>{

const option =
document.createElement("option");

option.value = cat.id;
option.textContent = cat.name;

select.appendChild(option);

});

}


async function categoryChanged(){

const category =
document.getElementById(
"supportCategory"
).value;

const { data } =
await supabaseClient
.from("resources")
.select("*")
.eq("category", category)
.order("title");

const box =
document.getElementById(
"resources"
);

box.innerHTML = "";

data.forEach(resource=>{

const option =
document.createElement("option");

option.value = resource.id;
option.textContent = resource.title;

box.appendChild(option);

});

}