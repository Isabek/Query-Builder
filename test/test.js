var expect = chai.expect;

describe("QueryBuilder", function () {
    describe("constructor", function () {
        it("should create instance", function () {
            new QueryBuilder();
        });

        it("should create instance without new operator", function () {
            expect(QueryBuilder()).to.be.an.instanceof(QueryBuilder);
        });
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

    describe("#lt", function () {
        it("should add new field with value", function () {
            var qb = new QueryBuilder().lt("id", 10);

            expect(qb.getFields()).to.deep.equal([{
                operator: 'lt',
                field: {
                    id: 10
                }
            }]);
        });
    });

    describe("#gte", function () {
        it("should add new field with value", function () {
            var qb = new QueryBuilder().gte("id", 4);

            expect(qb.getFields()).to.deep.equal([{
                operator: 'gte',
                field: {
                    id: 4
                }
            }]);
        });
    });

    describe("#lte", function () {
        it("should add new field with value", function () {
            var qb = new QueryBuilder().lte("id", 10);

            expect(qb.getFields()).to.deep.equal([{
                operator: 'lte',
                field: {
                    id: 10
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


    describe("#neq", function () {
        it("should add new field with value", function () {
            var qb = new QueryBuilder().neq("id", 1);

            expect(qb.getFields()).to.deep.equal([{
                operator: 'neq',
                field: {
                    id: 1
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

    describe("#is", function () {
        it("should add new field with value", function () {
            var q = new QueryBuilder().is("active", true).toString();
            expect(q).to.equal("active=is.true");
        });

        it("should change string to boolean", function () {
            var q = new QueryBuilder().is("active", "test").toString();
            expect(q).to.equal("active=is.true");
        });

        it("should change int to boolean", function () {
            var q = new QueryBuilder().is("active", 12).toString();
            expect(q).to.equal("active=is.true");
        });

        it("should return null", function () {
            var q = new QueryBuilder().is("active", null).toString();
            expect(q).to.equal("active=is.null");
        });

        it("should return null if value empty", function () {
            var q = new QueryBuilder().is("active").toString();
            expect(q).to.equal("active=is.null");
        });
    });

    describe("#isnot", function () {
        it("should add new field with value", function () {
            var q = new QueryBuilder().isnot("active", true).toString();
            expect(q).to.equal("active=isnot.true");
        });

        it("should change string to boolean", function () {
            var q = new QueryBuilder().isnot("active", "test").toString();
            expect(q).to.equal("active=isnot.true");
        });

        it("should change int to boolean", function () {
            var q = new QueryBuilder().isnot("active", 12).toString();
            expect(q).to.equal("active=isnot.true");
        });

        it("should return null", function () {
            var q = new QueryBuilder().isnot("active", null).toString();
            expect(q).to.equal("active=isnot.null");
        });

        it("should return null if value empty", function () {
            var q = new QueryBuilder().isnot("active").toString();
            expect(q).to.equal("active=isnot.null");
        });
    });

    describe("#like", function () {
        it("should add new field with value", function () {
            var qb = new QueryBuilder().like("title", "javascript");
            expect(qb.getFields()).to.deep.equal([{
                operator: 'like',
                field: {
                    title: "javascript"
                }
            }]);
        });

        it("should return 'title=like.javascript'", function () {
            var q = new QueryBuilder().like("title", "javascript").toString();

            expect(q).to.equal("title=like.javascript");
        });
    });

    describe("#like", function () {
        it("should add new field with value", function () {
            var qb = new QueryBuilder().ilike("title", "javascript");
            expect(qb.getFields()).to.deep.equal([{
                operator: 'ilike',
                field: {
                    title: "javascript"
                }
            }]);
        });

        it("should return 'title=ilike.javascript'", function () {
            var q = new QueryBuilder().ilike("title", "javascript").toString();

            expect(q).to.equal("title=ilike.javascript");
        });
    });

    describe("#order", function () {
        it("should add new field with value", function () {
            var qb = QueryBuilder()
                .order("id", "desc");

            expect(qb.getOrder()).to.deep.equal([{
                operator: 'order',
                field: {
                    id: "desc"
                }
            }]);
        });

        it("should return 'order=id.desc,points.asc'", function () {
            var q = QueryBuilder()
                .order("id", "desc")
                .order("points", "asc")
                .toString();

            expect(q).to.equal("order=id.desc,points.asc");
        });

        it("should be asc by default", function () {
            var q = QueryBuilder()
                .order("id")
                .toString();

            expect(q).to.equal("order=id.asc");
        });

        it("should return 'school?id=in.1,2,3&order=id.desc,points.asc'", function () {
            var q = QueryBuilder()
                .from("school")
                .in("id", [1, 2, 3])
                .order("id", "desc")
                .order("points", "asc")
                .toString();

            expect(q).to.equal("school?id=in.1,2,3&order=id.desc,points.asc");
        });
    });
});
