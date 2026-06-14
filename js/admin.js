document.addEventListener(
"DOMContentLoaded",
loadIssues
);

async function loadIssues(){

const { data } =
await supabaseClient
.from("issues")
.select("*")
.order("name");

const select =
document.getElementById(
"issueSelect"
);

select.innerHTML = "";

data.forEach(issue=>{

select.innerHTML += `
<option value="${issue.id}">
${issue.name}
</option>
`;

});

}

async function addIssue(){

const name =
document
.getElementById("issueName")
.value
.trim();

if(!name){
alert("Enter issue");
return;
}

const { error } =
await supabaseClient
.from("issues")
.insert([
{
name:name
}
]);

if(error){

alert(error.message);
return;

}

alert("Saved");

location.reload();

}

async function addSubIssue(){

const issueId =
document.getElementById(
"issueSelect"
).value;

const name =
document.getElementById(
"subIssueName"
).value;

const { error } =
await supabaseClient
.from("sub_issues")
.insert([
{
issue_id:issueId,
name:name
}
]);

if(error){

alert(error.message);
return;

}

alert("Saved");

}

async function addCategory(){

const name =
document.getElementById(
"categoryName"
).value;

const { error } =
await supabaseClient
.from("knowledge_categories")
.insert([
{
name:name
}
]);

if(error){

alert(error.message);
return;

}

alert("Saved");

}

async function addResource(){

const title =
document.getElementById(
"resourceTitle"
).value;

const { error } =
await supabaseClient
.from("resources")
.insert([
{
title:title
}
]);

if(error){

alert(error.message);
return;

}

alert("Saved");

}