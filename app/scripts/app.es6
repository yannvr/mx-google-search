google.load('search', '1')

function MXSearch () {
    var currentSearch = 'Space X',
        searchers = new Set(['WebSearch', 'ImageSearch']),
        searchControl = new google.search.SearchControl()

    const DEBOUNCE_DELAY = 500

    updateSearchControl()

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
            searchControl.draw(document.getElementById('searchcontrol'))
            searchControl.execute(currentSearch)
            initInputStream()
        })
    }

    // Search engines selection
    $('.search-type input').asEventStream('change').filter((v) => { return updateSearchers(v) })
         .onValue(() => { updateSearchControl() })

    initInputStream()
}

google.setOnLoadCallback(() => { MXSearch() })
