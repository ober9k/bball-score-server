# bball-score-server
API back-end for the various bball-score apps.

This will eventually be consumed by the various front-end variations of bball-score (incl. bball-live) built on each of Angular, React and Vue as part of keeping up to date with each of the frameworks/libraries.

## Configuration
### Environment Settings (.env)
This can be configured as desired, but the base values should be as such:
```
PORT="8080"
```
### Postgres Settings
This can be configured as desired, however the `docker-compose` file just has some filler values for the `user` and `secret` used for the connection.
```
DATABASE_URL="postgresql://postgres:secret@localhost:5432/bball_score?schema=public"
```
