# Users
- Users identified by Spotify user name

`user`
| Field    | Description       |
| -------- | ----------------- |
| **name** | Spotify user name |

- User entries will be searched for on login and created if not found.

# Followers
- followers identified by follower and followee (user being followed)

`follower`
| Field        | Description                               |
| ------------ | ----------------------------------------- |
| **follower** | Following user name. References user.name |
| **followee** | Followed user name. References user.name  |

# Track
`track`
| Field  | Description           |
| ------ | --------------------- |
| **id** | Spotify api track id. |

# Posts
`post`
| Field       | Description                                      |
| ----------- | ------------------------------------------------ |
| **id**      | Unique identifier                                |
| creator     | User that created the post. References user.name |
| track       | Track the post references. References track.id   |
| create_date | Date the post was created                        |
| content     | User created content of the post (text)          |

# Party
`party`
| Field     | Description         |
| --------- | ------------------- |
| **id**    | Unique identifier  |
| name      |                     |
| party_type      | "local" or "remote" |
| host      | id of host user     |
| attendees | attending users     |


# Appendix A: TODO
- Create database schemas.
- Add data models for all requirements.

# Appendix B: Changelog
- 2/19/2022: Initial version.