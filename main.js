fetch("mockdata.json")
    .then(response => response.json())
    .then(data => {
        console.log("Data loaded:", data);
    })
    .catch(error => {
        console.error("Error loading data:", error);
    });