import { bindable } from 'aurelia';

export class JokesElement {
    @bindable public category: string;
    @bindable public data: string;
}