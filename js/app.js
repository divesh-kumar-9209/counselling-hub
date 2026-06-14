let selectedIssues = [];
let selectedSubIssues = [];

document.addEventListener("DOMContentLoaded", async () => {

await loadIssues();
await loadResources();

document
.getElementById("issues")
.addEventListener("change", issueChanged);

document
.getElementById("saveBtn")
.addEventListener("click", saveCase);

});

async function loadIssues(){

console.log("loading issues");

const result =
await supabaseClient
.from("issues")
.select("*");

console.log(result);

}

async function loadResources(){

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

async function issueChanged(){

const issueSelect =
document.getElementById("issues");

const issueIds =
Array.from(issueSelect.selectedOptions)
.map(x => Number(x.value));

selectedIssues = issueIds;

const subBox =
document.getElementById("subIssues");

subBox.innerHTML = "";

for(const issueId of issueIds){

const { data } =
await supabaseClient
.from("sub_issues")
.select("*")
.eq("issue_id", issueId);

data.forEach(sub => {

const option =
document.createElement("option");

option.value = sub.id;
option.textContent = sub.name;

subBox.appendChild(option);

});

}

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

for(const issueId of selectedIssues){

await supabaseClient
.from("case_issues")
.insert([{
case_id: caseId,
issue_id: issueId
}]);

}

const selectedSubIssueIds =
Array.from(
document.getElementById("subIssues")
.selectedOptions
).map(x => Number(x.value));

for(const subIssueId of selectedSubIssueIds){

await supabaseClient
.from("case_sub_issues")
.insert([{
case_id: caseId,
sub_issue_id: subIssueId
}]);

}

alert("Case Saved");

}

async function selectedResources(){

const selectedResources =
Array.from(
document.getElementById("resources")
.selectedOptions
).map(x => Number(x.value));

for(const resourceId of selectedResources){

await supabaseClient
.from("case_resources")
.insert([{
case_id: caseId,
resource_id: resourceId
}]);

}
}