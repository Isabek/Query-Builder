Query Builder [![Build Status](https://api.travis-ci.org/Isabek/Query-Builder.png?branch=master)](https://api.travis-ci.org/Isabek/Query-Builder)
=======

Query Builder is a lib created for Opendata Hackathon.

Create Query Builder instance

```js
var qb = new QueryBuilder();

var qb = QueryBuilder();
```

##API Methods

### from

Function that selects a `dataset`

```js
QueryBuilder().from([dataset])

Example

QueryBuilder().from("school")

```


### eq

```js
QueryBuilder().eq([field], value)

Example

QueryBuilder().eq("id", 1)

```

### gt

```js
QueryBuilder().gt([field], value)

Example

QueryBuilder().gt("points", 10)

```

### lt

```js
QueryBuilder().lt([field], value)

Example

QueryBuilder().lt("points", 10)

```

### gte

```js
QueryBuilder().gte([field], value)

Example

QueryBuilder().gte("points", 10)

```

### lte

```js
QueryBuilder().lte([field], value)

Example

QueryBuilder().lte("points", 10)

```

### neq

```js
QueryBuilder().neq([field], value)

Example

QueryBuilder().neq("id", 10)

```

### in

```js
QueryBuilder().in([field], values)

Example

QueryBuilder().in("id", [1,2,3,4])

```

### is

```js
QueryBuilder().is([field], value[true, false, null])

Example

QueryBuilder().is("active", true)

```

### isnot

```js
QueryBuilder().isnot([field], value[true, false, null])

Example

QueryBuilder().isnot("active", true)

```

### like

```js
QueryBuilder().like([field], value)

Example

QueryBuilder().like("title", "%Hackathon")

```

### ilike

```js
QueryBuilder().ilike([field], value)

Example

QueryBuilder().ilike("title", "%hackathon")

```

### order

```js
QueryBuilder().order([field], operator[asc, desc])

Example

QueryBuilder().order("points", "desc")

```

### toString

This method converts object to string.

Example

```js

var q = QueryBuilder()
        .from("school")
        .eq("id", 12)
        .gte("points", 10)
        .lte("points", 30)
        .is("active", true)
        .order("points")
        .toString();

Result: school?id=eq.12&points=gte.10&points=lte.30&active=is.true&order=points.asc

```
