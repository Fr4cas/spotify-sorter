// For changing between datasets
const DATASET = "large"; // change to "small" or "large"

const dataPath =
    DATASET === "large"
        ? "data_large.json"
        : "mockdata.json";

// Data rendering
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

// Data fetching
fetch(dataPath)
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


// Sorting functions
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

/* Temoorary code used to generate the large dataset

const artists = [
    "Artist One",
    "Artist Two",
    "Artist Three",
    "Artist Four",
    "Artist Five"
];

const tracks = [];

for (let i = 1; i <= 500; i++) {
    tracks.push({
        id: i,
        title: `Track ${i}`,
        artist: artists[i % artists.length],
        tempo: Math.floor(Math.random() * 80) + 80,
        energy: Math.random().toFixed(2),
        valence: Math.random().toFixed(2)
    });
}

console.log(JSON.stringify(tracks, null, 2)); 
*/