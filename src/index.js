function QueryBuilder() {
    this._dataset = null;
    this._fields = [];
    this._order = [];

    if (!(this instanceof QueryBuilder))
        return new QueryBuilder();
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

QueryBuilder.prototype._orderToString = function (obj) {
    return this._getFieldKey(obj) + "." + this._fieldValuesToString(obj);
};

QueryBuilder.prototype.getFields = function () {
    return this._fields;
};

QueryBuilder.prototype.getOrder = function () {
    return this._order;
};

QueryBuilder.prototype.from = function (dataset) {
    this._dataset = dataset;
    return this;
};

QueryBuilder.prototype.eq = function (field, value) {
    this._fields.push(this._operatorGenerate("eq", field, value));

    return this;
};

QueryBuilder.prototype.gt = function (field, value) {
    this._fields.push(this._operatorGenerate("gt", field, value));

    return this;
};

QueryBuilder.prototype.lt = function (field, value) {
    this._fields.push(this._operatorGenerate("lt", field, value));

    return this;
};

QueryBuilder.prototype.gte = function (field, value) {
    this._fields.push(this._operatorGenerate("gte", field, value));

    return this;
};

QueryBuilder.prototype.lte = function (field, value) {
    this._fields.push(this._operatorGenerate("lte", field, value));

    return this;
};

QueryBuilder.prototype.neq = function (field, value) {
    this._fields.push(this._operatorGenerate("neq", field, value));

    return this;
};

QueryBuilder.prototype.in = function (field, values) {
    this._fields.push(this._operatorGenerate("in", field, values));

    return this;
};

QueryBuilder.prototype.is = function (field, value) {
    if (value === undefined) value = null;
    if (value !== null) value = !!value;
    this._fields.push(this._operatorGenerate("is", field, value));

    return this;
};

QueryBuilder.prototype.isnot = function (field, value) {
    if (value === undefined) value = null;
    if (value !== null) value = !!value;
    this._fields.push(this._operatorGenerate("isnot", field, value));

    return this;
};

QueryBuilder.prototype.like = function (field, value) {
    this._fields.push(this._operatorGenerate("like", field, value));

    return this;
};

QueryBuilder.prototype.ilike = function (field, value) {
    this._fields.push(this._operatorGenerate("ilike", field, value));

    return this;
};

QueryBuilder.prototype.order = function (field, value) {
    if (value === undefined) value = "asc";
    this._order.push(this._operatorGenerate("order", field, value));

    return this;
};

QueryBuilder.prototype.toString = function () {

    var fields = [], order = [];

    this.getFields().reduce(function (prev, curr) {
        fields.push(this._fieldToString(curr));
    }.bind(this), {});

    this.getOrder().reduce(function (prev, curr) {
        order.push(this._orderToString(curr));
    }.bind(this), {});

    if (order.length)
        fields.push("order=" + order.join(","));

    var query = "";
    if (this._dataset) query = this._dataset;
    if (this._dataset && (fields.length || order.length)) query = query + "?";
    query = query + fields.join("&");

    return query;
};
