- Add POST route x
- Add PUT route x
- Add list controller x
- CreateList function x
- UpdateList function x

## 1.6. POST /api/lists

Creates a list.

### 1.6.1. Expected Payload

NOTE: The `boardId` where the list will reside is required.

```json
{
  "boardId": 1,
  "list": {
    "title": "My list"
  }
}
```

### 1.6.2. Successful Response

The list is returned in JSON form with a 201 status code.

#### 1.6.2.1. Example Response

```json
{
  "_id": 10,
  "title": "My list",
  "boardId": 1,
  "createdAt": "2020-10-06T23:40:26.606Z",
  "updatedAt": "2020-10-06T23:40:26.606Z",
  "position": 65535.0
}
```

### 1.6.4. Error Response

If a board with the provided `boardId` doesn’t exist, an error will be returned with a 404 status code. If no title is provided, an error is returned with a 422 “Unprocessable Entity” status code.

## 1.7. PUT/PATCH /api/lists/:id

Update a list.

### 1.7.1. Expected Payload

Any combination of `title` and `position` can be provided. The only requirement is that at least one must be provided.

```json
{
  "title": "Updated title",
  "position": 137882
}
```

### 1.7.2. Successful Response

The list is returned in JSON form with a 200 status code.

#### 1.7.2.1. Example Response

```json
{
  "_id": 1,
  "title": "Updated title",
  "position": 137882.0,
  "boardId": 1,
  "createdAt": "2020-10-04T05:57:07.222Z",
  "updatedAt": "2020-10-06T23:48:44.540Z"
}
```

### 1.7.2. Error Response

If a list with the provided `_id` doesn’t exist, an error will be returned with a 404 status code. If no title or position is provided, an error is returned with a 422 “Unprocessable Entity” status code.
