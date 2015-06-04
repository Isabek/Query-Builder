function QueryBuilder() {
    this._fields = [];
}

QueryBuilder.prototype._operatorGenerate = function (operator, field, value) {
    var temp = {};
    temp[field] = value;

    return {
        operator: operator,
        field: temp
    };
};

QueryBuilder.prototype._getFieldKey = function (obj) {
    return Object.keys(obj.field)[0];
};

QueryBuilder.prototype._getFieldValue = function (obj) {
    return obj.field[this._getFieldKey(obj)];
};

QueryBuilder.prototype._fieldValuesToString = function (obj) {
    var value = this._getFieldValue(obj);

    if (value instanceof Array) {
        value = value.join(",");
    }

    return value;
};

QueryBuilder.prototype._fieldToString = function (obj) {
    return this._getFieldKey(obj) + "=" + obj.operator + "." + this._fieldValuesToString(obj);
};

QueryBuilder.prototype.getFields = function () {
    return this._fields;
};

QueryBuilder.prototype.eq = function (field, value) {
    this._fields.push(this._operatorGenerate("eq", field, value));

    return this;
};

QueryBuilder.prototype.gt = function (field, value) {
    this._fields.push(this._operatorGenerate("gt", field, value));

    return this;
};

QueryBuilder.prototype.in = function (field, values) {
    this._fields.push(this._operatorGenerate("in", field, values));

    return this;
};

QueryBuilder.prototype.toString = function () {

    var temp = [];

    this.getFields().reduce(function (prev, curr) {
        temp.push(this._fieldToString(curr));
    }.bind(this), {});

    return temp.join("&");
};
