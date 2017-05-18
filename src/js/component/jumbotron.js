export default class Jumbotron {
    constructor() {
        console.log('Jumbotron component has been loaded');
    }

    render() {
        return `<div class="jumbotron">
        <div class="container">
            <h1>Anyeong!</h1>
            <p>This is a Front-End Setup with Gulp + ES6</p>
            <p>
                <a class="btn btn-primary btn-lg">Learn more</a>
            </p>
        </div>
    </div>`;
    }
}