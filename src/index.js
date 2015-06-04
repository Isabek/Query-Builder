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
    return "";
};
