

export default class Section {
  
  constructor({data, renderer}, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) { // Добавляет элемент на страницу
    this._container.prepend(element);
  }

  renderItems() { // Перебирает массив элементов для отрисовки
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }

}