# Music App Backend API Reference
Read this if you're working on the frontend and need data from the backend.

- [Music App Backend API Reference](#music-app-backend-api-reference)
- [User](#user)
    - [Get current party](#get-current-party)
- [Posts](#posts)
    - [Create a post](#create-a-post)
    - [Delete a post](#delete-a-post)
    - [Get a post by id](#get-a-post-by-id)
    - [Get all posts by user](#get-all-posts-by-user)
- [Followers](#followers)
    - [Get followers](#get-followers)
    - [Get following users](#get-following-users)
    - [Follow](#follow)
    - [Unfollow](#unfollow)
- [Party](#party)
    - [Party Details](#party-details)
    - [Create a party](#create-a-party)
    - [Remove a party](#remove-a-party)
    - [Join a party](#join-a-party)
    - [Leave a party](#leave-a-party)
    - [Party Users](#party-users)
- [Appendix A: Documentation Format](#appendix-a-documentation-format)
    - [Name of endpoint](#name-of-endpoint)
- [Appendix B: TODO](#appendix-b-todo)
- [Appendix C: Changelog](#appendix-c-changelog)

# User

### Get current party
> GET `/user/party`

Returns the user's current party

| Field  | Description                 |
| ------ | --------------------------- |
| `user` | User id (Spotify username). |

Response Format:
```js
{
  party: {
    id: str,
    name: str,  // name of party
    party_type: str,  // ("local", "remote")
    host: str,  // id or user
    attendees: str[]  // list of user ids
  }
}
```

# Posts

### Create a post
> POST `/post/create`

Creates a post in the database.

| Field     | Description                |
| --------- | -------------------------- |
| `user`    | Spotify username.          |
| `track`   | Track the post references. |
| `content` | Post content.              |

*may be updated to include auth tokens when we add authorization checks*

### Delete a post
> POST `/post/delete`

Deletes a post from the database.

| Field     | Description |
| --------- | ----------- |
| `post_id` | Post id.    |

### Get a post by id
> GET `/post/get`

Retrieves a post from the database.

| Field     | Description |
| --------- | ----------- |
| `post_id` | Post id.    |

Response Format:
```
{
  post: {
    post_id: <post id>,
    creator: <username of creator>,
    track: <track referenced>,
    create_date: <datetime the post was created>,
    content: <post content>
  }
}
```

### Get all posts by user
> GET `/post/getbyuser`

Retrieves all posts by a user.

| Field  | Description |
| ------ | ----------- |
| `user` | Username.   |

Response Format:
```
{
  posts: [
    {
      post_id: <post id>,
      creator: <username of creator>,
      track: <track referenced>,
      create_date: <datetime the post was created>,
      content: <post content>
    },
    ...
  ]
}
```

# Followers

### Get followers
> GET `/followers/user`

Retrieves all followers of a user.

| Field  | Description                          |
| ------ | ------------------------------------ |
| `user` | Username of user to get followers of |

Response Format:
```
{
  followers: [
    <user_name>,
    ...
  ]
}
```

### Get following users
> GET `/followers/following`

Retrives the users the provided user is following.

| Field  | Description                              |
| ------ | ---------------------------------------- |
| `user` | Username of user to get following users. |

Response Format:
```
{
  following: [
    <user_name>,
    ...
  ]
}
```

### Follow
> POST `/followers/follow`

Follows a user.

| Field  | Description                 |
| ------ | --------------------------- |
| `user` | Username of user to follow. |

### Unfollow
> POST `/followers/unfollow`

Unfollows a user.

| Field  | Description                   |
| ------ | ----------------------------- |
| `user` | Username of user to unfollow. |

# Party

### Party Details
> GET `/party`

Retrieves information about a party by id.

| Field    | Description |
| -------- | ----------- |
| party_id | Party id    |

Response Format:
```js
{
  party: {
    id: str,
    name: str,  // name of party
    party_type: str,  // ("local", "remote")
    host: str,  // id or user
    attendees: str[]  // list of user ids
  }
}
```

### Create a party
> POST `/party/create`

Retrieves information about a party by id.

| Field | Description         |
| ----- | ------------------- |
| host  | User id of the host |
| name  | Party name          |
| party_type  | Type of party       |

Response Format:
```js
{
  party: {
    id: str,
    name: str,  // name of party
    party_type: str,  // ("local", "remote")
    host: str,  // id or user
    attendees: str[]  // list of user ids
  }
}
```

### Remove a party
> POST `/party/remove`

Permanently deletes a party.
| Field    | Description     |
| -------- | --------------- |
| party_id | id of the party |

### Join a party
> POST `/party/join`

Retrieves information about a party by id.

| Field    | Description             |
| -------- | ----------------------- |
| user     | User id of user joining |
| party_id | Party id                |

### Leave a party
> POST `/party/leave`

Retrieves information about a party by id.

| Field    | Description             |
| -------- | ----------------------- |
| user     | User id of user joining |
| party_id | Party id                |


### Party Users
> GET `/party/details`

Returns all users in a party.

| Field    | Description |
| -------- | ----------- |
| party_id | Party id    |

Response Format:
```js
{
  users: str[]  // list of user ids
}
```

# Appendix A: Documentation Format
Categorize endpoints by feature (users, posts, parties, etc.) and follow the format below:

### Name of endpoint
> GET/POST `path/to/api`

Description: This is an example of the api reference format.
| Field             | Description |
| ----------------- | ----------- |
| `required_field`  | Description |
| `optional_field?` | Description |

Response Format:
```
{
  field1: value,
  optional_field?: value
}
```

# Appendix B: TODO
- update request to include auth tokens or session management

# Appendix C: Changelog
- 2/20/2022: Updated route for all posts by user to `GET /post/getbyuser`
- 2/19/2022: Initial version.