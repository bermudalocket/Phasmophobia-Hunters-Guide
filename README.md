Demo (9.7 MB) - https://github.com/bermudalocket/Phasmophobia-Hunters-Guide/blob/main/Demo.mp4

#### `start.sh`

The start script will

1. build `phasmodb` image from `Database/`,
2. build `phasmoapp` image from `Frontend/`,
3. start the stack with `docker-compose`.

### Notes

- At this point this is an old project and hasn't been maintained . It will likely not work with modern versions of Node. Dependency conflicts abound when using React 17+ with ChakraUI. **For this reason it's highly recommended to use Docker to get a full and accurate snapshot of this project's functionality.**
- Since this project is two years old and I have grown as a developer in that time, there are some things I can identify that I would do differently. For example, 
    - I would likely use a WebSocket-based messaging system with session instancing controlled by a single client, rather than relying on a centrally-controlled relational database being polled by all clients on a timer. This is especially true since it is quite literally useless to persist a game for more than its lifetime.
    - Postgres queries should be prepared statements to harden against SQL injection.
- CORS expects this to be run out of `localhost`. If you encounter CORS errors, you may need to make changes to the array `CORS_WHITELIST` on line 20 of `Database/index.ts`. 
- The database schema is included at `Database/phasmo-schema.sql` and, when using Docker, will be automatically loaded (line 45 of composefile). Otherwise it'll need to be loaded manually with `psql phasmo-schema.sql [id args]`.

### Flow

1. User loads `www.mysite.com/phasmo`.
2. Frontend code detects there is no game id in the URL, so it sends an async post request to the backend for a new game (`/api/game/create`).
3. Backend receives request at endpoint `/api/game/create`. A new game is generated with a UUID and this UUID is returned in JSON.
4. Frontend awaiter receives response from backend and pulls game id from response data. The user is then sent to `www.mysite.com/phasmo/<gameid>`.
5. User loads `www.mysite.com/phasmo/<gameid>`. Frontend code detects a game id in the URL and  renders the React tree, passing in the game id as a property (`<Main uuid={GAME_ID} />`).