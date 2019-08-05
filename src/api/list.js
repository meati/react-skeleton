
var list = [
    {_id: 1, title: 'Список', parent:null},
    {_id: 2, title: 'Первый пункт', parent:1},
    {_id: 3, title: 'Второй пункт', parent:1},
    {_id: 4, title: 'Подпункт 2.1', parent:3},
    {_id: 5, title: 'Подпункт 2.2', parent:3},
    {_id: 6, title: 'Вложенный подпункт 2.2.1', parent:5},
    {_id: 7, title: 'Вложенный подпункт 2.2.2', parent:5},
    {_id: 8, title: 'Подпункт 2.3', parent:3},
    {_id: 9, title: 'Третий пункт', parent:1},
    {_id: 10, title: 'Четвертый пункт', parent:1}
];

export default {
  update: (item) => { 
    return new Promise((resolve, reject) => {
        const idx = list.findIndex(i=>i._id==item._id)
        if(~idx || item.title) {
            if(!item.title || !item.title.trim().length || item.title.trim().length > 25) {
                reject("Incorrect title value");
            } else {
                list[idx]=item;
                resolve(item);
            }
        } else {
            reject(`There is no item with id=${item._id}`);
        }
    });
    
  },
  get: () => {
    return Promise.resolve(list);
  } 
};
