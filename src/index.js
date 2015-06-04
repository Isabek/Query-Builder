function QueryBuilder() {
    this._fields = [];
}

QueryBuilder.prototype.getFields = function () {
    return this._fields;
};

QueryBuilder.prototype.eq = function (field, value) {
    var temp = {
        'operator': 'eq'
    };

    temp[field] = value;
    this._fields.push(temp);

    return this;
};

QueryBuilder.prototype.gt = function (field, value) {
    var temp = {
        'operator': 'gt'
    };

    temp[field] = value;
    this._fields.push(temp);

    return this;
};

QueryBuilder.prototype.in = function (field, values) {
    var temp = {
        'operator': 'in'
    };

    temp[field] = values;
    this._fields.push(temp);

    return this;
};

QueryBuilder.prototype.toString = function () {
    return "";
};
