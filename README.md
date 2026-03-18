# bball-score-server
API back-end for the various bball-score apps.

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