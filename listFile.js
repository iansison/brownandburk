const fs = require('fs');

// Directory path
const directoryPath = './product-inserts';

// Read the contents of the directory
fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    // Log the filenames
    files.forEach(file => {
        console.log(file);
    });
});