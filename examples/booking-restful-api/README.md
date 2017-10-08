# RESTful API Server

```bash
npm run dev
```

## Docs

### All docs

```bash
curl -s -X GET http://localhost:3000/flights/_all_docs?include_docs=true
```

```bash
curl -s -X GET http://localhost:3000/flights/_all_docs?include_docs=true | jq .rows
```

## Doc by ID

```bash
curl -s -X GET http://localhost:3000/flights/64b667a0-d5dd-455b-8338-68bdbd66b3fc
```

### Create doc

```bash
curl -s -X POST \
  http://localhost:3000/flights \
  -H 'content-type: application/json' \
  -d '{
  "location": "MUC"
}'
```

### Update doc

```bash
curl -s -X PUT \
  http://localhost:3000/flights/64b667a0-d5dd-455b-8338-68bdbd66b3fc \
  -H 'content-type: application/json' \
  -d '{
  "_id":"64b667a0-d5dd-455b-8338-68bdbd66b3fc",
  "_rev":"1-ba60e486f63ecfafcfd577fbadd1c436",
  "location": "BER"
}'
```

### Delete doc

```bash
curl -s -X DELETE http://localhost:3000/flights/64b667a0-d5dd-455b-8338-68bdbd66b3fc
```