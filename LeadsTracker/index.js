let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn= document.getElementById("delete-btn")
const saveTabBtn=document.getElementById("save-tab-btn")

// Get the leads from the localStorage - PS: JSON.parse()
// Store it in a variable, leadsFromLocalStorage
// Log out the variable

const leadsFromLocalStorage= JSON.parse(localStorage.getItem("myLeads"))


if (leadsFromLocalStorage){
    myLeads=leadsFromLocalStorage
    render(myLeads)
}

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    console.log(myLeads)
    // saving the leads to localStorage
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})

deleteBtn.addEventListener('dblclick',deleteMyLeads)

saveTabBtn.addEventListener("click", saveTab)





// Let's try a different method!

function render(leads){
    let listItems=""
    for (let i = 0; i < leads.length; i++) {
    // listItems+= "<li><a href='" + myLeads[i] + "' target='_blank'>" + myLeads[i]  +"</a></li>"

    //Replacing the above code with template strings
    listItems+=`
        <li>
            <a href='${leads[i]}' target='_blank'>
                ${leads[i]}
            </a>
        </li>
    `


    }

    ulEl.innerHTML=listItems

    inputEl.value="" // Clear input value after submitting
}

// Function to delete leads, local storage and DOM

function deleteMyLeads(){
    console.log("Leads Deleted!!!!!!!!!")
    localStorage.clear()

    //Clearing myLeads
    myLeads=[]
    render(myLeads)
}

//Function to save tab

function saveTab(){

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })


}



