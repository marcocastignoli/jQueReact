# jQueReact
> A stupid experiment (47 lines) to add declarative functionalities to jQuery

## Install
```bash
npm install...
```
Just kidding, simply open index.html in the browser.

## How it works
1. Create a state
    ```javascript
    const State2 = $.createState({
        title: "asd",
        counter: "0"
    })
    ```
2. Create a template, use **data-bind** instead of *{this.state.variable}*
    ```html
    <div id="test1">
        <h1 data-bind="title"></h1>
        <h1 data-bind="counter"></h1>
        <button onclick="State2.counter++">Increment</button>
        <input data-bind="title">
    </div>
    ```
3. Connect the state with the template
    ```javascript
    $("#test1").bindState(State2)
    ```
4. Play with the state and watch the template update automagically 🧙
    ```javascript
    State2.counter++
    State2.title = "ciao"
    ```

## Why?
It's late and I randomly though about it, I realized that it wasn't so hard to do, so I did it.

## How it really works?
The state is handled by javascript's getters/setters. As you can see in the example above, I'm using the data attribute to keep the text value of the doms with the getter. Each time the setter is called, I search for all the elements that are binding with the updated state using jquery's `$('[data-state="..."]')`, and I update them with the state getter.

## Would it be cool to build the same thing but without jQuery, same idea but with plain JS?
You have to tell me!