const pageSize = 12;

let currentPage = 1;
let allEvents = [];
let filteredEvents = [];

function applyFilters() {

    const searchText =
        document
            .getElementById('searchBox')
            .value
            .toLowerCase();

    filteredEvents = allEvents.filter(event =>

        (event.title || '')
            .toLowerCase()
            .includes(searchText)

        ||

        (event.description || '')
            .toLowerCase()
            .includes(searchText)

    );

    currentPage = 1;

    renderPage();
}

function renderPagination() {

    const totalPages =
        Math.ceil(filteredEvents.length / pageSize);

    document.getElementById('pagination')
        .innerHTML =

        `
        <button
        ${currentPage === 1 ? 'disabled' : ''}
        onclick="changePage(${currentPage - 1})">

        Previous

        </button>

        <span style="margin:0 15px;">
            Page ${currentPage}
            of
            ${Math.max(totalPages,1)}
        </span>

        <button
        ${currentPage >= totalPages ? 'disabled' : ''}
        onclick="changePage(${currentPage + 1})">

        Next

        </button>
        `;
}

function renderPage() {

    const start =
        (currentPage - 1) * pageSize;

    const end =
        start + pageSize;

    const pageEvents =
        filteredEvents.slice(start,end);

    let html =
        '<div class="grid">';

    pageEvents.forEach(event => {

        html +=
        `
        ondemand-training-details.html?id=${event.guid}

            <div class="card">

                <h3>
                    ${event.title || ''}
                </h3>

            </div>

        </a>
        `;
    });

    html += '</div>';

    if(pageEvents.length === 0){

        html =
        '<p>No training found.</p>';
    }

    document.getElementById('eventlist')
        .innerHTML = html;

    renderPagination();
}

function changePage(page){

    currentPage = page;

    renderPage();

    window.scrollTo({
        top:0,
        behavior:'smooth'
    });
}

fetch('ondemand-training.json')

.then(response => response.json())

.then(data => {

    allEvents = data;

    filteredEvents = data;

    renderPage();
})

.catch(error => {

    document.getElementById('eventlist')
        .innerHTML =
        '<p style="color:red;">Failed to load training.</p>';

    console.error(error);
});
