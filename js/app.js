console.log("app.js loaded");

let selectedIssues = [];
let selectedSubIssues = [];
let selectedResources = [];
let allIssues = [];
let allSubIssues = [];
let allResources = [];

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        await loadIssues();
        await loadCategories();
        await loadResources();

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
            .getElementById("supportCategory")
            .addEventListener(
                "change",
                categoryChanged
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

        const phrasesBtn =
            document.getElementById(
                "phrasesBtn"
            );

        const phrasesDrawer =
            document.getElementById(
                "phrasesDrawer"
            );

        const closePhrases =
            document.getElementById(
                "closePhrases"
            );

        if (phrasesBtn) {

            phrasesBtn.addEventListener(
                "click",
                () => {

                    phrasesDrawer.classList.add(
                        "open"
                    );

                }
            );

        }

        if (closePhrases) {

            closePhrases.addEventListener(
                "click",
                () => {

                    phrasesDrawer.classList.remove(
                        "open"
                    );

                }
            );

        }

    });


function addIssue() {

    const select =
        document.getElementById("issues");

    if (!select.value) {
        return;
    }

    const id =
        Number(select.value);

    const text =
        select.options[
            select.selectedIndex
        ].text;

    if (
        selectedIssues.some(
            x => x.id === id
        )
    ) {
        return;
    }

    selectedIssues.push({
        id,
        text
    });

    renderIssues();

}

function renderIssues() {

    const box =
        document.getElementById(
            "selectedIssues"
        );

    box.innerHTML = "";

    selectedIssues.forEach(
        issue => {

            const chip =
                document.createElement("div");

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

            box.appendChild(chip);

        });

}

function removeIssue(id) {

    selectedIssues =
        selectedIssues.filter(
            x => x.id !== id
        );

    renderIssues();

}


function addSubIssue() {

    const select =
        document.getElementById(
            "subIssues"
        );

    if (!select.value) {
        return;
    }

    const id =
        Number(select.value);

    const text =
        select.options[
            select.selectedIndex
        ].text;

    if (
        selectedSubIssues.some(
            x => x.id === id
        )
    ) {
        return;
    }

    selectedSubIssues.push({
        id,
        text
    });

    renderSubIssues();

}

function renderSubIssues() {

    const box =
        document.getElementById(
            "selectedSubIssues"
        );

    box.innerHTML = "";

    selectedSubIssues.forEach(
        item => {

            const chip =
                document.createElement("div");

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

            box.appendChild(chip);

        });

}

function removeSubIssue(id) {

    selectedSubIssues =
        selectedSubIssues.filter(
            x => x.id !== id
        );

    renderSubIssues();

}

function addResource() {

    const select =
        document.getElementById(
            "resources"
        );

    if (!select.value) {
        return;
    }

    const id =
        Number(select.value);

    const text =
        select.options[
            select.selectedIndex
        ].text;

    if (
        selectedResources.some(
            x => x.id === id
        )
    ) {
        return;
    }

    selectedResources.push({
        id,
        text
    });

    renderResources();

}

function renderResources() {

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

            box.appendChild(chip);

        });

}

function removeResource(id) {

    selectedResources =
        selectedResources.filter(
            x => x.id !== id
        );

    renderResources();

}



function renderResources() {

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

            box.appendChild(chip);

        });

}

function removeResource(id) {

    selectedResources =
        selectedResources.filter(
            x => x.id !== id
        );

    renderResources();

}


async function saveCase() {

    const client_name =
        document.getElementById(
            "clientName"
        ).value;

    const age =
        document.getElementById(
            "age"
        ).value;

    const gender =
        document.getElementById(
            "gender"
        ).value;

    const occupation =
        document.getElementById(
            "occupation"
        ).value;

    const issue_remarks =
        document.getElementById(
            "issueRemarks"
        ).value;

    const sub_issue_remarks =
        document.getElementById(
            "subIssueRemarks"
        ).value;

    const support_remark =
        document.getElementById(
            "supportRemark"
        ).value;

    const counsellor_remarks =
        document.getElementById(
            "counsellorRemarks"
        ).value;

    const case_summary =
        document.getElementById(
            "caseSummary"
        ).value;

    const session_duration =
        document.getElementById(
            "sessionDuration"
        ).value;

    const { data: caseRow, error } =
        await supabaseClient
            .from("cases")
            .insert([{

                client_name,
                age,
                gender,
                occupation,

                issue_remarks,
                sub_issue_remarks,

                support_remark,

                counsellor_remarks,
                case_summary,

                session_duration

            }])
            .select()
            .single();

    if (error) {

        console.log(error);

        alert(
            error.message
        );

        return;

    }

    const caseId =
        caseRow.id;


    for (const issue of selectedIssues) {

        await supabaseClient
            .from("case_issues")
            .insert([{

                case_id: caseId,
                issue_id: issue.id

            }]);

    }

    for (const subIssue of selectedSubIssues) {

        await supabaseClient
            .from("case_sub_issues")
            .insert([{

                case_id: caseId,
                sub_issue_id: subIssue.id

            }]);

    }


    for (const resource of selectedResources) {

        await supabaseClient
            .from("case_resources")
            .insert([{

                case_id: caseId,
                resource_id: resource.id

            }]);

    }

    alert(
        "Case Saved Successfully"
    );

    location.reload();

}

function removeResource(id) {

    selectedResources =
        selectedResources.filter(
            x => x.id !== id
        );

    renderResources();

}


function renderResources() {

    const box =
        document.getElementById(
            "selectedResources"
        );

    box.innerHTML = "";

    selectedResources.forEach(
        resource => {

            const chip =
                document.createElement(
                    "div"
                );

            chip.className =
                "chip";

            chip.innerHTML = `

${resource.text}

<button
type="button"
onclick="removeResource(${resource.id})">
×
</button>

`;

            box.appendChild(
                chip
            );

        });

}

async function categoryChanged() {

    const categoryId =
        document.getElementById(
            "supportCategory"
        ).value;

    const resourceBox =
        document.getElementById(
            "resources"
        );

    resourceBox.innerHTML =
        '<option value="">Select Resource</option>';

    if (!categoryId) {
        return;
    }

    // mapping table se resource ids lao

    const { data: mappings, error: mapError } =
        await supabaseClient
            .from("resource_categories")
            .select("resource_id")
            .eq("category_id", categoryId);

    if (mapError) {
        console.log(mapError);
        return;
    }

    if (!mappings.length) {
        return;
    }

    const resourceIds =
        mappings.map(
            item => item.resource_id
        );

    // resources table se sirf mapped resources lao

    const { data: resources, error } =
        await supabaseClient
            .from("resources")
            .select("*")
            .in("id", resourceIds)
            .order("title");

    if (error) {
        console.log(error);
        return;
    }
    allResources = resources;
    resources.forEach(resource => {

        const option =
            document.createElement(
                "option"
            );

        option.value =
            resource.id;

        option.textContent =
            resource.title;

        resourceBox.appendChild(
            option
        );

    });

}

async function loadIssues() {

    const { data, error } =
        await supabaseClient
            .from("issues")
            .select("*")
            .order("name");

    if (error) {
        console.log(error);
        return;
    }

    const box =
        document.getElementById("issues");

    if (!box) {
        return;
    }

    box.innerHTML =
        '<option value="">Select Issue</option>';
    allIssues = data;
    data.forEach(issue => {

        const option =
            document.createElement("option");

        option.value =
            issue.id;

        option.textContent =
            issue.name;

        box.appendChild(option);

    });

}

async function issueChanged() {

    const issueId =
        document.getElementById("issues").value;

    const subBox =
        document.getElementById("subIssues");

    if (!subBox) {
        return;
    }

    subBox.innerHTML =
        '<option value="">Select Sub Issue</option>';

    if (!issueId) {
        return;
    }

    const { data, error } =
        await supabaseClient
            .from("sub_issues")
            .select("*")
            .eq("issue_id", issueId)
            .order("name");

    if (error) {
        console.log(error);
        return;
    }

    allSubIssues = data;

    data.forEach(sub => {

        const option =
            document.createElement("option");

        option.value =
            sub.id;

        option.textContent =
            sub.name;

        subBox.appendChild(option);

    });

}

async function loadCategories() {

    const { data, error } =
        await supabaseClient
            .from("knowledge_categories")
            .select("*")
            .order("name");

    if (error) {
        console.log(error);
        return;
    }

    const select =
        document.getElementById(
            "supportCategory"
        );

    if (!select) {
        return;
    }

    select.innerHTML =
        '<option value="">Select Category</option>';

    data.forEach(cat => {

        const option =
            document.createElement("option");

        option.value =
            cat.id;

        option.textContent =
            cat.name;

        select.appendChild(option);

    });

}

async function loadResources() {

    const box =
        document.getElementById(
            "resources"
        );

    if (!box) {
        return;
    }

    box.innerHTML =
        '<option value="">Select Resource</option>';

}





