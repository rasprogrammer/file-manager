<?php 

class FileManage {

    public function index () {

    }

    public function loadFiles () {
        
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $json = file_get_contents("php://input");
            $data = json_decode($json, true);

            $path = $data['dir'];
            $parentPath = $data['parentPath'];

            if($path == ''){
                $path = getcwd();
            }
            if($parentPath){
                $path = dirname($path); 
            }
            
            $directory = scandir($path);

            $fileList = [];
            $folderList = [];

            foreach ($directory as $value) {
                if($value == '.' || $value == '..')
                    continue;

                $file = $path.DIRECTORY_SEPARATOR.$value;
                if (is_dir($file)) {
                    $arr = [
                        'file_name' => $value,
                        'url' => $file,
                        'is_dir' => 1,
                        'file_size' => filesize($file),
                        'date_modified' => date('Y-m-d H:i:s', filemtime($file))
                    ];

                    $folderList[] = $arr;
                } else {
                    $arr = [
                        'file_name' => $value,
                        'url' => $file,
                        'is_dir' => 0,
                        'file_size' => filesize($file),
                        'date_modified' => date('Y-m-d H:i:s', filemtime($file))
                    ];

                    $fileList[] = $arr;
                }
            }
            
            $return = ['folderList' => $folderList, 'fileList' => $fileList, 'start_location' => $path];
            return json_encode($return);

        } 
        
    }
}