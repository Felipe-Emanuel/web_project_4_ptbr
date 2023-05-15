export class Section {
  constructor({ items, renderer }, listElement) {
    this._renderItems = items;
    this._renderer = renderer;
    this._listElement = document.querySelector(listElement);
  }

  addItems(listElement) {
    this._listElement.append(listElement);
  }

  renderSection() {
    this._renderItems.forEach((item) => {
      const renderedItems = this._renderer(item);
      this.addItems(renderedItems);
    });
  }
}
