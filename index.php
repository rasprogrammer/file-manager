
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>File Management App</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha512-SfTiTlX6kk+qitfevl/7LibUOeJWlt9rbyDn92a1DqWOw9vWG2MFoays0sgObmWazO5BQPiFucnnEAjpAB+/Sw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>File Management Application</h1>
    <div class="toolbar">
      
      <div class="toolbar-row">
        <button onclick="createNewFile()"> 
          <i class="fa fa-plus" aria-hidden="true"></i>
          Create New File 
        </button>
        <button onclick="createNewFolder()">
          <i class="fa fa-plus" aria-hidden="true"></i>
          Create New Folder
        </button>
        <input type="file" id="uploadFile" multiple hidden onchange="uploadFile()">
        <button onclick="document.getElementById('uploadFile').click()">
          <i class="fa fa-upload" aria-hidden="true"></i>
          Upload File
        </button>
        <input type="file" id="uploadFolder" webkitdirectory hidden onchange="uploadFolder()">
        <button onclick="document.getElementById('uploadFolder').click()">
          <i class="fa fa-upload" aria-hidden="true"></i>
          Upload Folder
        </button>
        <button onclick="setPermissions()">
          <i class="fa fa-lock" aria-hidden="true"></i>
          Set Permissions
        </button>
        <button onclick="zipFiles()">
          <i class="fa fa-file-archive-o" aria-hidden="true"></i>
          Zip
        </button>
        <button onclick="extractFiles()">
          <i class="fa fa-folder-open" aria-hidden="true"></i>
          Extract
        </button>
        <button onclick="moveFile()">
          <i class="fa fa-arrows" aria-hidden="true"></i>
          Move File
        </button>
        <button onclick="copyFile()">
          <i class="fa fa-copy" aria-hidden="true"></i>
          Copy File
        </button>
        <button onclick="downloadFile()">
          <i class="fa fa-download" aria-hidden="true"></i>
          Download File
        </button>
      </div>
      
      <div class="toolbar-row" id="pathinfo">
        <h3 style="padding-left: 10px;"> Directory : 
          <a> <i class="fa fa-home"></i> / </a> 
            <a data-url=""> Classes / </a>
            <a data-url=""> Menu / </a>
            <a data-url=""> Location / </a>
        </h3>
      </div>
      <div class="toolbar-row">
        <button onclick="backPath()"> <i class="fa fa-arrow-up" aria-hidden="true"></i> Up One Level </button>
        <button onclick="backPath()"> <i class="fa fa-arrow-left" aria-hidden="true"></i> Back </button>
        <button onclick="backPath()"> <i class="fa fa-arrow-right" aria-hidden="true"></i> Forward </button>
      </div>

    </div>
    <div class="file-area-container">
      <div class="file-area-topbar">
        
      </div>

      <div class="file-area" id="fileArea">
        <p>No files or folders created yet.</p>
      </div>
    </div>
  </div>
  <script src="script.js"></script>
</body>
</html>
