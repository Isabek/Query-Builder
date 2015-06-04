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

        it("should return 'id=eq.1'", function () {
            var q = new QueryBuilder().eq("id", 1).toString();
            expect(q).to.equal("id=eq.1");
        });

        it("should return 'id=in.1,2,3'", function () {
            var q = new QueryBuilder().in("id", [1, 2, 3]).toString();
            expect(q).to.equal("id=in.1,2,3");
        });

        it("should return 'id=eq.5&points=gt.12'", function () {
            var q = new QueryBuilder().eq("id", 5).gt("points", 12).toString();
            expect(q).to.equal("id=eq.5&points=gt.12");
        });
    });

    describe("#from", function () {
        it("should return 'school'", function () {
            var q = new QueryBuilder().from("school").toString();
            expect(q).to.equal("school");
        });

        it("should return 'school?id=1'", function () {
            var q = new QueryBuilder().from("school").eq('id', 1).toString();
            expect(q).to.equal("school?id=eq.1");
        });
    });
});
