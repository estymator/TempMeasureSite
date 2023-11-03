<?php
	$file_path = 'temps.txt';

    if (file_exists($file_path)) {
        $file_handle = fopen($file_path, 'r');
    
        if ($file_handle) {
            $file_content = fread($file_handle, filesize($file_path));
            fclose($file_handle);
    
            if ($file_content !== false) {
                // Zawartość pliku została pomyślnie odczytana
                echo(json_encode($file_content));
            } else {
                echo 'File not read successfully';
            }
        } else {
            echo 'Failed to open file';
        }
    } else {
        echo 'File do not exist';
    }
    ?>