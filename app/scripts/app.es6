google.load('search', '1')

function MXSearch () {
    var currentSearch = 'Shaun White',
        searchers = new Set(['ImageSearch']),
        searchControl = new google.search.SearchControl()

    const DEBOUNCE_DELAY = 500

    searchControl.addSearcher(new google.search.ImageSearch()) // Create a search control
    searchControl.draw(document.getElementById('searchcontrol')) // tell the searcher to draw itself and tell it where to attach
    searchControl.execute(currentSearch) // execute an initial search

    function executeSearch(val) {
        searchControl.execute(val)
    }

    function createObserver() {
        return $(searchControl.input)
            .asEventStream('keyup')
            .map(e => e.target.value)
            .debounce(DEBOUNCE_DELAY)
            .filter(v => v.length > 2)
    }

    function initSearchControl(e) {
        searchControl = new google.search.SearchControl()
        searchControl.draw(document.getElementById('searchcontrol'))
        $('.gsc-input input').val(currentSearch)
        executeSearch(currentSearch)
        createObserver().onValue(executeSearch)
    }

    function updateSearchers(v) {
        if (v.currentTarget.checked) {
            searchers.add(v.currentTarget.id)
        } else {
            searchers.delete(v.currentTarget.id)
        }
        return v
    }

    function initInputStream() {
        $(searchControl.input).asEventStream('keyup')
            .map(e => e.target.value)
            .debounce(DEBOUNCE_DELAY)
            .filter(v => v.length > 2)
            .onValue((v) => { currentSearch = v; searchControl.execute(v) })
    }

    function updateSearchControl() {
        searchControl = new google.search.SearchControl()
        searchers.forEach(searcher => {
            // Add in a full set of searchers
            searchControl.addSearcher(new google.search[searcher]())
            //console.log(`Add searcher: ${ searcher }`)

            searchControl.draw(document.getElementById('searchcontrol'))
            searchControl.execute(currentSearch)
            initInputStream()
        })
    }

    $('.search-type input').asEventStream('change').filter((v) => { return updateSearchers(v) })
        .debounce(300) .onValue(() => { updateSearchControl() })

    initInputStream()
}

google.setOnLoadCallback(() => { MXSearch() })
