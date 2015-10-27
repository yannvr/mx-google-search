google.load('search', '1');
const MXSearch = function () {
    const searchers = new Set();

    // Create a search control
    let searchControl = new google.search.SearchControl();

    searchControl.addSearcher(new google.search.ImageSearch());

    // tell the searcher to draw itself and tell it where to attach
    searchControl.draw(document.getElementById('searchcontrol'));

    // execute an inital search
    searchControl.execute('Shaun White');

    const initSearchControl = function (e) {
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
        createObserver().onValue(executeSearch);
    };

    const executeSearch = function (val) {
        searchControl.execute(val);
    };

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
