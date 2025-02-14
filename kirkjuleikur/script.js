

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
Sortable.create(document.querySelector('.cross-options'), {
    group: {
        name: 'shared',
        swap: true,
        swapClass: 'highlight'
    },
    animation: 150,
    onEnd: function(/**Event*/evt) {
        var from = evt.item.closest('.droppable');
        console.log(from);
        if (evt.to.classList.contains('middle') && evt.to.children.length >= 4) {
            //swap the last child with the new item
            const lastChild = evt.to.lastChild;
            const newItem = evt.item;
            evt.to.insertBefore(newItem, lastChild);
            console.log('middle');
        }
    }
});

// Initialize Sortable for each cross item
document.querySelectorAll('.droppable').forEach(item => {
    new Sortable(item, {
        group: {
            name: 'shared',
            swap: true
        },
        animation: 150
    });
});

function changeColor(color) {
    document.querySelector('.cross-container').classList.remove('red', 'blue', 'green');
    document.querySelector('.cross-container').classList.add(color);
}