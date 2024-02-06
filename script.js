$(document).ready(function () {
    $('#fullpage').fullpage({
        sectionsColor: ['#e0fcff', '#c1d8db', '#c8cfce'],
        anchors: ['home', 'stats', 'inventory'],
        menu: '#menu',
        navigation: true,
        navigationPosition: 'right',
        slidesNavigation: true,
        slidesNavPosition: 'bottom',
        autoScrolling: true,
    });

    $("#searchButton").on("click", function () {
        performSearch();
    });

    $("#searchInput").on("keyup", function (event) {
        if (event.key === "Enter") {
            performSearch();
        }
    });

    $(document).on('click', '.card-img-top', function () {
        var cardDescription = $(this).closest(".card").find(".card-text.description").html();
        var cardTitle = $(this).closest(".card").find(".card-title").text();
        var cardGenre = $(this).closest(".card").find(".card-text").not(".description").text();
    
        $("#bookModalLabel").text(cardTitle);
        $("#bookModalBody").html("<p><strong>Genre: </strong>" + cardGenre + "<br><br>" + cardDescription + "</p>");
    
        $('#bookModal').modal('show');
    });


    $(document).on('click', '.reserve-button', function () {
        var reserveButton = $(this);

        if (!reserveButton.hasClass('clicked')) {
            alert('Reserved Book!');

            reserveButton.text('Reserved');
            reserveButton.addClass('clicked');
        }
    });

    createBarChart();
    animateNumbers();
});

function performSearch() {
    var searchTerm = $("#searchInput").val().toLowerCase();
    var selectedGenre = $("#genreFilter").val().toLowerCase();

    $(".card").each(function () {
        var cardTitle = $(this).find(".card-title").text().toLowerCase();
        var cardGenre = $(this).find(".card-text").text().toLowerCase();

        var titleMatch = cardTitle.includes(searchTerm);
        var genreMatch = selectedGenre === "all" || cardGenre.includes(selectedGenre);

        if (titleMatch && genreMatch) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}




$(function () {
    $('[data-toggle="tooltip"]').tooltip();

    $("#avatarToggle").click(function () {
        $("#avatarIcon").toggleClass("fa-online fa-offline");
    });

    $(".fa-bookmark").click(function () {
        var cardTitle = $(this).closest(".card").find(".card-title").text();
        var cardDuration = $(this).closest(".card").find(".card-text").text();
        var cardInstructor = $(this).closest(".card").find(".text-muted").text();

        var bookmarkedCardHTML = `
                    <div class="card mb-2">
                        <div class="card-body">
                            <h5 class="card-title">${cardTitle}</h5>
                            <p class="card-text">${cardDuration}</p>
                            <small class="text-muted">${cardInstructor}</small>
                        </div>
                    </div>
                `;

        $("#bookmarkOffcanvas .offcanvas-body").append(bookmarkedCardHTML);

        $('#bookmarkOffcanvas').offcanvas('show');
    });
});



// Function to create the bar chart
function createBarChart() {
    const labels = [
        'Young Adult',
        'Self-help',
        'Comic',
        'Thriller',
        'Fiction'
    ];

    const data = {
        labels: labels,
        datasets: [{
            label: 'Number of Books',
            backgroundColor: 'rgba(255, 188, 0, 0.5)',
            borderColor: 'rgb(255, 188, 0, 1)',
            borderWidth: 1,
            data: [101, 321, 92, 203, 182],
        }]
    };

    const config = {
        type: 'bar',
        data: data
    };

    const myChart = new Chart(
        document.getElementById('libraryChart'),
        config
    );
}


// Function to create inventory
var dataSet = [
    ["A Good Girl's Guide to Murder", "Holly Jackson", "Thriller", "2019", "Hardcover"],
    ["A Little Life", "Hanya Yanagihara", "Fiction", "2015", "Hardcover"],
    ["Atomic Habits", "James Clear", "Self-help", "2018", "Softcover"],
    ["Can't Hurt Me", "David Goggins", "Self-help", "2018", "Hardcover"],
    ["Fifty Shades of Grey", "E.L. James", "Romance", "2011", "Softcover"],
    ["Don Quixote", "David Quint", "Fiction", "1605", "Softcover"],
    ["I Had That Same Dream Again", "Yoru Sumino", "Fiction", "2016", "Hardcover"],
    ["Then She Was Gone", "Lisa Jewell", "Thriller", "2017", "Softcover"],
    ["No Longer Human", "Osamu Dazai", "Fiction", "1948", "Hardcover"],
    ["Ikigai", "Hector Garcia and Francesc Miralles", "Self-help", "2016", "Softcover"],
    ["Kiki's Delivery Service", "Eiko Kadono", "Comic", "1985", "Hardcover"],
    ["Milk & Mocha", "Melani Sie", "Comic", "2017", "Webcomic"],
    ["The Silent Patient", "Alex Michaelides", "Thriller", "2019", "Softcover"],
    ["The 48 Laws of Power", "Robert Greene", "Self-help", "1998", "Hardcover"],
    ["I Want to Die But I Want to Eat Tteokbokki", "Baek Sehee", "Comic", "2019", "Webtoon"],
    ["The Night Circus", "Erin Morgenstern", "Fantasy", "2011", "Hardcover"]
];

$(document).ready(function () {
    if (!$.fn.DataTable.isDataTable('#inventoryTable')) {
        $('#inventoryTable').DataTable({
            data: dataSet,
            columns: [
                { title: "Title" },
                { title: "Author" },
                { title: "Genre" },
                { title: "Year" },
                { title: "Type" }
            ]
        });
    }
});


document.getElementById('openNav').addEventListener('click', function () {
    document.querySelector('.mobile-nav').style.right = '0';
});

document.getElementById('closeNav').addEventListener('click', function () {
    document.querySelector('.mobile-nav').style.right = '-50000px';
});