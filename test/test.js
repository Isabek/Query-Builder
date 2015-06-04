var expect = chai.expect;

describe("QueryBuilder", function () {
    describe("constructor", function () {
        it("should create instance", function () {
            new QueryBuilder();
        })
    });

    describe("#eq", function () {
        it("should add new field with value", function () {
            var qb = new QueryBuilder().eq("id", 1);

            expect(qb.getFields()).to.deep.equal([{
                operator: 'eq',
                field: {
                    id: 1
                }
            }]);
        });
    });

    describe("#gt", function () {
        it("should add new field with value", function () {
            var qb = new QueryBuilder().gt("id", 4);

            expect(qb.getFields()).to.deep.equal([{
                operator: 'gt',
                field: {
                    id: 4
                }
            }]);
        });
    });

    describe("#in", function () {
        it("should add new field with value", function () {
            var qb = new QueryBuilder().in("id", [1, 2, 3]);

            expect(qb.getFields()).to.deep.equal([{
                operator: 'in',
                field: {
                    id: [1, 2, 3]
                }
            }]);
        });
    });

    describe("#toString", function () {
        it("should return empty string", function () {
            var qb = new QueryBuilder().toString();
            expect(qb).to.equal("");
        });
    });
});
