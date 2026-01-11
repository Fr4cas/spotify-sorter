function renderGroupedTracks(groupedTracks) {
    const output = document.getElementById("output");
    output.innerHTML = "";

    for (const group in groupedTracks) {
        const groupTitle = document.createElement("h2");
        groupTitle.textContent = group;
        output.appendChild(groupTitle);

        const list = document.createElement("ul");

        groupedTracks[group].forEach(track => {
            const item = document.createElement("li");
            item.textContent = `${track.title} (tempo: ${track.tempo})`;
            list.appendChild(item);
        });

        output.appendChild(list);
    }
}

fetch("mockdata.json")
    .then(response => response.json())
    .then(data => {
        console.log("Original data:", data);

        const groupedByArtist = groupByAttribute(data, "artist");

        const sortedGroups = {};
        for (const artist in groupedByArtist) {
            sortedGroups[artist] = sortTracksByAttribute(
                groupedByArtist[artist],
                "tempo"
            );
        }

        renderGroupedTracks(sortedGroups);
    })
    .catch(error => {
        console.error("Error loading data:", error);
    });

function groupByAttribute(tracks, attribute) {
    return tracks.reduce((groups, track) => {
        const key = track[attribute];

        if (!groups[key]) {
            groups[key] = [];
        }

        groups[key].push(track);
        return groups;
    }, {});
}

function sortTracksByAttribute(tracks, attribute) {
    return [...tracks].sort((a, b) => {
        if (a[attribute] < b[attribute]) return -1;
        if (a[attribute] > b[attribute]) return 1;
        return 0;
    });
}