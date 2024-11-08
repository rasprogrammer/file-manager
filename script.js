const fileArea = document.getElementById("fileArea");
window.start_location = "";
let selectedFiles = [];

async function loadFiles(dir, parentPath = false) {
  const newPost = { dir, parentPath };
  try {
    const response = await fetch("FileManage/loadFiles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    });
    const data = await response.json();
    console.log("data =>", data);

    fileArea.innerHTML = "";  // Clear the file area

    if(data.start_location){
      start_location  = start_location
    }

    // Process folders and files together
    [...(data.folderList || []), ...(data.fileList || [])].forEach(val => {
      if (val.file_name !== "." && val.file_name !== "..") {
        createFileDesign(val);
      }
    });
  } catch (error) {
    console.error("Error loading files:", error);
  }
}

function createFileDesign({ file_name, url, is_dir, file_size, date_modified }) {
  const div = document.createElement("div");
  const iconClass = is_dir ? "fa-folder folder-icon" : "fa-file file-icon";
  div.innerHTML = `<i class="fa ${iconClass}" aria-hidden="true"></i> &nbsp; <span>${file_name}</span>`;
  div.classList.add("folder-look", "file-structure");


  // Attach the click event to handle selection on the div
  div.onclick = (event) => {
    // Check if the clicked target is the span
    if (event.target.tagName.toLowerCase() === 'span' && div.classList.contains('highlight-file')) {
        handleSpanClick(event, event.target, div);  // Call the function for the span 
    } else {
      handleFileClick(event, div);  // Handle click for the div (not the span)
    }
  };

  // Show toolbox on right-click
  div.oncontextmenu = (event) => {
    event.preventDefault();
    if(!div.classList.contains('highlight-file')){
      hideToolboxMenu();
      handleFileClick(event, div);  
      return;
    }
    toolboxMenu.style.display = "block";
    toolboxMenu.style.left = `${event.pageX}px`;
    toolboxMenu.style.top = `${event.pageY}px`;
  };

  // Double-click event for folder navigation
  div.ondblclick = () => {
    if (is_dir) {
      start_location = url;
      loadFiles(start_location);
    }
  };

  fileArea.appendChild(div);
}
// Handler for the span click (Rename)
function handleSpanClick(event, span, div=null) {
  hideToolboxMenu();  
  console.log('selectedFiles > ', selectedFiles);
  if(selectedFiles.length > 1){
    if (div) {
      handleFileClick(event, div);
    }
    return;
  }
  span.setAttribute('contenteditable', 'true');  
  // Select all the text inside the span
  selectAllText(span);
  event.stopPropagation();  
}

// Function to select all text inside a contenteditable element
function selectAllText(element) {
  const range = document.createRange();        
  const selection = window.getSelection();    

  range.selectNodeContents(element);
  selection.removeAllRanges();
  selection.addRange(range);
}

// Listener to handle clicks outside the span to make it non-editable
document.addEventListener('click', function (event) {
  hideToolboxMenu();
  const span = document.querySelector('span[contenteditable="true"]');
  
  // Check if the click was outside of the span and div
  if (span && !span.contains(event.target)) {
    span.setAttribute('contenteditable', 'false');
  }
});

function handleFileClick(event, selectedDiv) {
  hideToolboxMenu();
  // Multi-select with Ctrl (Cmd) or Shift
  if (event.ctrlKey || event.metaKey) { 
    toggleSelection(selectedDiv);
  } else if (event.shiftKey && selectedFiles.length > 0) { 
    selectRange(selectedDiv);
  } else { 
    clearSelection();
    toggleSelection(selectedDiv);
  }
}

function toggleSelection(div) {
  div.classList.toggle("highlight-file");
  const icon = div.querySelector(".folder-icon");
  if (icon) icon.style.color = div.classList.contains("highlight-file") ? "white" : "#007bff";

  const index = selectedFiles.indexOf(div);
  if (index > -1) {
    selectedFiles.splice(index, 1);
  } else {
    selectedFiles.push(div);
  }
}

function selectRange(selectedDiv) {
  const allFiles = Array.from(document.querySelectorAll(".file-structure"));
  const lastSelected = selectedFiles[selectedFiles.length - 1];
  const start = allFiles.indexOf(lastSelected);
  const end = allFiles.indexOf(selectedDiv);

  const range = start < end
    ? allFiles.slice(start, end + 1)
    : allFiles.slice(end, start + 1);
  
  console.log('range ', range);

  range.forEach(div => {
    if (!selectedFiles.includes(div)) {
      selectedFiles.push(div);
      div.classList.add("highlight-file");
      const icon = div.querySelector(".folder-icon");
      if (icon) icon.style.color = "white";
    }
  });
}


function clearSelection() {
  selectedFiles.forEach(div => {
    div.classList.remove("highlight-file");
    const icon = div.querySelector(".folder-icon");
    if (icon) icon.style.color = "#007bff";
  });
  selectedFiles = [];
}

function hideToolboxMenu () {
  toolboxMenu.style.display = "none";
}

// Create the toolbox menu
function createToolboxMenu() {
  // Create main toolbox div
  const toolboxMenu = document.createElement("div");
  toolboxMenu.id = "toolboxMenu";
  toolboxMenu.className = "toolbox hidden";

  // Create unordered list for options
  const ul = document.createElement("ul");

  // Define toolbox options
  const options = [
    { text: "<i class='fa fa-file' aria-hidden='true'></i> Open File", action: openFile },
    { text: "<i class='fa fa-pencil' aria-hidden='true'></i> Rename", action: renameFile },
    { text: "<i class='fa fa-download' aria-hidden='true'></i> Download", action: downloadFile },
    { text: "<i class='fa fa-copy' aria-hidden='true'></i> Copy", action: copyFile },
    { text: "<i class='fa fa-arrows-alt' aria-hidden='true'></i> Move", action: moveFile },
    { text: "<i class='fa fa-cogs' aria-hidden='true'></i> Set Permissions", action: setPermissions },
    { text: "<i class='fa fa-info-circle' aria-hidden='true'></i> Details", action: fileDetails },
  ];
  

  // Add options to the menu
  options.forEach(option => {
    const li = document.createElement("li");
    li.innerHTML = option.text;
    li.onclick = option.action;
    ul.appendChild(li);
  });

  // Append list to toolbox and toolbox to the document
  toolboxMenu.appendChild(ul);
  document.body.appendChild(toolboxMenu);
}

// Initialize toolbox menu
createToolboxMenu();

// Event listeners for showing and hiding the toolbox
const toolboxMenu = document.getElementById("toolboxMenu");




function backPath() {
  loadFiles(start_location, true);
}

// Initial load
loadFiles(start_location);


function fileDetails () {

}

function openFile () {

}

function renameFile () {

}



function createNewFile() {
  alert("Creating a new file...");
  // Placeholder for backend integration
}

function createNewFolder() {
  alert("Creating a new folder...");
  // Placeholder for backend integration
}

function uploadFile() {
  const uploadInput = document.getElementById("uploadFile");
  if (uploadInput.files.length > 0) {
    alert(`Uploaded ${uploadInput.files.length} files.`);
  }
}

function uploadFolder() {
  const uploadInput = document.getElementById("uploadFolder");
  if (uploadInput.files.length > 0) {
    alert(`Uploaded ${uploadInput.files.length} items from folder.`);
  }
}

function setPermissions() {
  alert("Setting permissions for the file/folder...");
  // Placeholder for backend integration
}

function zipFiles() {
  alert("Zipping selected files...");
  // Placeholder for backend integration
}

function extractFiles() {
  alert("Extracting zip file...");
  // Placeholder for backend integration
}

function moveFile() {
  alert("Moving the file...");
  // Placeholder for backend integration
}

function copyFile() {
  alert("Copying the file...");
  // Placeholder for backend integration
}

function downloadFile() {
  alert("Downloading the file...");
  // Placeholder for backend integration
}
