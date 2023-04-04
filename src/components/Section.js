

export default class Section {
  
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) { // Добавляет элемент на страницу
    this._container.prepend(element);
  }

  renderItems(data, info) { // Перебирает массив элементов для отрисовки
    for (let i = data.length - 1; i >= 0; i --) { // Перебор массива с конца, для отображения
      this._renderer(data[i], info);              // карточек на странице в нужном порядке
    }
    // data.forEach(item => { 
    //   this._renderer(item, info);
    // });
  }

}