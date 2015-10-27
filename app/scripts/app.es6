google.load('search', '1');

var MXSearch = function () {
    var currentSearch = 'Shaun White',
        searchers = new Set(),
        searchControl = new google.search.SearchControl();

    searchControl.addSearcher(new google.search.ImageSearch()); // Create a search control
    searchControl.draw(document.getElementById('searchcontrol')); // tell the searcher to draw itself and tell it where to attach
    searchControl.execute(currentSearch); // execute an inital search

    function initSearchControl(e) {
        if (e.target.checked) {
            searchers.add(e.target.id);
        } else {
            searchers.delete(e.target.id);
        }
        searchControl = new google.search.SearchControl();
        searchers.forEach(searcher => {
            // Add in a full set of searchers
            searchControl.addSearcher(new google.search[searcher]());
            console.log(`Add searcher: ${ searcher }`);
        });
        searchControl.draw(document.getElementById('searchcontrol'));
        $('.gsc-input input').val(currentSearch);
        executeSearch(currentSearch);
        createObserver().onValue(executeSearch);
    }

    function executeSearch(val) {
        searchControl.execute(val);
    }

    function createObserver() {
        return $(searchControl.input)
            .asEventStream('keyup')
            .map(e => e.target.value)
            .debounce(300)
            .filter(v => v.length > 2);
    }

    $('.search-type input').on('change', initSearchControl);
};

google.setOnLoadCallback(() => {
    MXSearch();
});
