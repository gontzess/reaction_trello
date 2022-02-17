## Overview

- Refer to the docs to see the expected response of this API end-point
- The response JSON is expected to contain:
  The board is returned with the following nested data:

```
{
    //boardProperties...
    ...
    lists: [
        {
            //listProperties...
            ...
            cards: [
                {
                    //cardProperties...
                    ...
                }
            ]
        },
        ...
        {

        }
    ],
}
```

The response status code is 200.

- lists nested within the board and cards nested within the lists.

## Mongoose Stuff

- Create List and Card schema. x
  Refer to the API docs to decide the attributes these schemas need at this point. Since `labels` is an array you can add it to the schema as written below:

```
labels: [
  {
    type: String
  }
]
```

- Establish the necessary association between Board, List, and Card model. x

## API & Controller Stuff

- Add a new `get` route to `/boards/:id`.
- Add a new `getBoard` function inside of the `boardsController.js` file.
- Within the `getBoard` function you will use `populate` method to replace the specified paths in the document with the document(s) from other collection(s). You can read more about it [here](https://mongoosejs.com/docs/populate.html).
- Handle the error when the board with the specified id doesn't exist.
- If you want to test your api response in a browser, make sure to change the port number to `5000` and use a url like `/api/boards/:id`.
