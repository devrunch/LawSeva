import fs from 'fs';
// Read the JSON file
fs.readFile('src/data/fillingDetails.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    // Parse the JSON data
    const jsonData = JSON.parse(data);

    // Group the data by 'rtntype'
    const groupedData = jsonData.AppCommonRetTrackResponse.finlstAppTrackReturnResponse.EFiledlist.reduce((acc, item) => {
        const { rtntype } = item;
        if (!acc[rtntype]) {
            acc[rtntype] = [];
        }
        acc[rtntype].push(item);
        return acc;
    }, {});

    // Convert the grouped data back to JSON format
    const groupedDataJson = JSON.stringify(groupedData, null, 4);

    // Write the grouped data to a new JSON file
    fs.writeFile('path_to_output_json_file.json', groupedDataJson, 'utf8', (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Grouped data saved to path_to_output_json_file.json');
    });
});
