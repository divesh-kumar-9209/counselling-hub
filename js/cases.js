document.addEventListener(
"DOMContentLoaded",
loadCases
);

async function loadCases(){

const { data , error } =
await supabaseClient
.from("cases")
.select("*")
.order("id",{ascending:false});

if(error){
alert(error.message);
return;
}

renderCases(data);

}

function renderCases(rows){

const tbody =
document.querySelector(
"#casesTable tbody"
);

tbody.innerHTML = "";

rows.forEach(row=>{

tbody.innerHTML += `
<tr>

<td>${row.id}</td>

<td>${row.client_name || ""}</td>

<td>${row.age || ""}</td>

<td>${row.gender || ""}</td>

<td>${row.case_status || ""}</td>

<td>${row.session_date || ""}</td>

<td>
<a href="case.html?id=${row.id}">
Open
</a>
</td>

</tr>
`;

});

}