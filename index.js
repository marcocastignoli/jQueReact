$._states = {}

$.fn.bindState = function(state) {
    this.attr("data-state", state._id)
    this.find(`input[data-bind]:not([data-bind=""])`).keyup(function(){
        const bind = $(this).attr("data-bind")
        $._states[state._id][bind] = $(this).val()
    })
    this.reloadState()
};

$.fn.reloadState = function () {
    const stateId = this.attr("data-state")
    const getters = Object.entries(Object.getOwnPropertyDescriptors($._states[stateId]))
        .filter(([key, descriptor]) => typeof descriptor.get === 'function')
        .map(([key]) => key)
    getters.forEach(get => {
        this.find(`[data-bind="${get}"]`).text($._states[stateId][get])
    })
}

$.updateState = function(stateId) {
    $(`[data-state="${stateId}"]`).reloadState()
};

let unique_id = 0

$.createState = function(properties) {
    function State(properties) {
        Object.keys(properties).forEach(function (prop) {
            Object.defineProperty(this, prop, {
                get: function () {
                    return properties[prop];
                },
                set: function (val) {
                    properties[prop] = val;
                    $.updateState(this._id)
                }
            })
        }, this);
        this._id = unique_id
        unique_id++
    }
     const state = new State(properties)
     $._states[state._id] = state
    return $._states[state._id]
};
