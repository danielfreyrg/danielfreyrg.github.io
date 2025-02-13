// Initialize Sortable for the options container
// new Sortable(document.querySelector('.cross-options'), {
//     group: {
//         name: 'shared',
//         pull: true,
//         put: false,
//         swap: true
//     },
//     animation: 150,
//     sort: false
// });
// Initialize Sortable for the cross-options as a drop zone
new Sortable(document.querySelector('.cross-options'), {
    group: {
        name: 'shared',
        // pull: true,
        // put: true,
        // swap: true
    },
    animation: 150,
    // sort: false,
    // onAdd: function(evt) {
    //     // Only allow one instance of each letter
    //     const letters = Array.from(evt.to.children).map(child => child.textContent);
    //     const duplicates = letters.filter((letter, index) => letters.indexOf(letter) !== index);
    //     if (duplicates.length > 0) {
    //         evt.to.removeChild(evt.item);
    //     }
    // }
});

// Initialize Sortable for each cross item
document.querySelectorAll('.droppable').forEach(item => {
    new Sortable(item, {
        group: {
            name: 'shared',
            // pull: true,
            put: true,
            // swap: true
            sort: true
        },
        animation: 150,
        // sort: false,
        // onAdd: function(evt) {
        //     // Only allow one item per cross-item
        //     if (evt.to.children.length > 1) {
        //         evt.to.removeChild(evt.to.children[0]);
        //     }
        // }
    });
});

function changeColor(color) {
    document.querySelector('.cross-container').classList.remove('red', 'blue', 'green');
    document.querySelector('.cross-container').classList.add(color);
}