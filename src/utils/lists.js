export default {
    list2tree: (list, sorted = true) => {
        var tree = [];
        var cache = {};
        if(sorted) {
            list.forEach((item) => {
                if(item.parent == null) {
                    var newItem = {
                        ...item,
                        children: []
                    };
                    tree.push(newItem);
                    cache[item._id] = newItem;
                } else {
                    var newItem = {
                        ...item,
                        children: []
                    };
                    cache[item.parent].children.push(newItem);
                    cache[item._id] = (newItem);
                }
            })
        } else {
            throw new Error("Not implemented");
            // TODO: implement tree mapping for list not sorted by addition time
        }
        return tree;
    },
    patch: (tree, item) => {
        const _patch = (tree, item) => {
            return tree.map(i => {
                if(i._id == item._id) {
                    return item;
                } else {
                    i.children = _patch(i.children, item);
                    return i;
                }
            })
        }
        return _patch(tree, item);
    }
};
  