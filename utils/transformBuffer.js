const fs = require('fs');

exports.transformBuffer = fileName => {
    const array = fileName.split("\n");
    const dataArray = []
    for (let i = 0; i < array.length; i++) {
        if (array[i] == '') continue 
        dataArray.push(JSON.parse(array[i]));
    }
    return dataArray;
}