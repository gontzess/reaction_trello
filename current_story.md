# User can view lists and card summaries on the board home page

## User Story

As a user

GIVEN:
that a board has two lists
the first list has two cards
and the second list has three cards
when i'm on the board show page

SHOULD:
I should see the board title
I should see the titles of the lists
Within the first list, I should see card summaries of the two cards
Within the second list, I should see card summaries of the three cards

- Seed the database with the following data: X

  - A board X
  - Two lists belonging to that board X
  - Two cards in the first list, three in the second X

- Start with `src/components/Application.jsx` and add a route for `/boards/:id` to its render method.

## board component

- The component `Board` that will be rendered in response to that route will be responsible for:

  - parsing the URL for the id
  - sending a request to `/api/boards/:id`
  - dispatching an action to the store
  - rendering the board.

## Action creator

- Create an action creator in `actions/BoardActions.js`.
- This will return an async (functional) action you'll dispatch to the store from the `Board` component (inside useEffect).

## Redux Store

- The JSON response from the API is nested three levels deep but we want our store state to be flat like the following:

```
  {
  boards: [{...}, {...}],
  lists: [{...}, {...}, {...}],
  cards: [{...}, {...}, {...}, {...}, {}]
  }
```

## Lists and Cards Reducers

- You'll need to create the lists and cards reducers and handle the `BOARD_FETCHED` action in each one, extracting the relevant data out of it.
- That allows us to create an`ExistingLists` component where we can query the store for the lists belonging to a particular board.
