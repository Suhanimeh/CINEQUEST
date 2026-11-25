# CineQuest – Film Research and Discovery Lab

CineQuest is an extension of my existing movie application. My goal is to develop it into more than a regular movie catalogue: a platform where users can discover films, explore the ideas and storytelling behind them, and keep their own movie research in one place.

The project builds on the movie dataset from my earlier assignment. I plan to expand the movie information with details such as country, language, runtime, and release date. I also want to introduce features that help users explore films in greater depth—for example, examining the meaning or context of particular scenes, identifying possible symbolism or hidden messages, and considering what a filmmaker may be communicating.

Planned features include movie comparisons and personal research dossiers. A dossier will give a user a place to save movies, questions, and their own observations. These features are intended to make CineQuest useful for film exploration and personal research, not just browsing a list of titles.

Alongside the user-facing features, I am developing the project using the database, REST API, and authentication concepts required by ITE5315. The work is being completed in phases, so planned features are distinguished below from what has already been implemented.

## Project goals

- Build on the existing movie application and dataset.
- Enrich movie records with additional film information where reliable data is available.
- Give users ways to explore scenes, context, themes, symbolism, and possible filmmaker intentions.
- Allow users to compare movies.
- Provide user-owned research dossiers for saving movies, questions, and personal observations.
- Improve the user interface as the project develops.
- Use MongoDB Atlas, Mongoose, Express, REST API routes, and authentication as required by the course.

## Phase 0 – Planning and project design

Phase 0 focused on reviewing the existing application and dataset, planning the database structure and API routes, and choosing a new user-owned capability.

### Existing dataset

- **Source:** The movie dataset provided with my earlier Assignment 2 project (`data/dataset.json`).
- **Usable records:** 150 movie records.
- **Existing application:** The project began as a movie application that read its records from a local JSON dataset.
- **Planned data enrichment:** Country, language, runtime, and release date are intended additions. They are not described as completed unless they are present in the current database records.

### Planned user-owned capability: Research Dossiers

A Research Dossier is a personal space where an authenticated user can save movies they want to explore, add questions about a film, and record their own observations. The purpose is to support deeper film exploration and keep a user's research together.

The source movie records are intended to remain the shared movie catalogue. Personal dossiers and their contents are user-owned data and will be associated with the authenticated user's ID.

### Planned data structure

The planned design separates shared movie information from each user's personal research:

- **Movie collection:** Shared movie records imported from the original dataset. Fields include the movie ID, title, genre information, year, rating, director, and available image/metadata fields. Additional film details such as country, language, runtime, and release date may be added as the dataset is enriched.
- **User collection:** Account information needed for registration and authentication. Passwords must be stored securely as hashes, not plain text.
- **Research Dossier collection:** User-created dossiers associated with a `userId`. A dossier may contain a title, saved movie references, research questions, observations, and timestamps.

The exact schema may be refined as later phases are implemented.

### Planned route map

The following is the planned API direction for the full project. Routes marked as planned are not claimed as completed in Phase 1.

| Method | Route | Purpose | Access |
|---|---|---|---|
| GET | `/api/health` | Check whether the API is running | Public |
| GET | `/api/resources` | List movie records | Public |
| GET | `/api/resources/:id` | Get one movie by dataset ID | Public |
| POST | `/api/resources` | Create a movie record (course CRUD checkpoint) | Phase 1 API |
| PUT | `/api/resources/:id` | Update a movie record | Planned – Phase 2 |
| DELETE | `/api/resources/:id` | Delete a movie record | Planned – Phase 2 |
| GET | `/api/dossiers` | List the signed-in user's dossiers | Planned – authenticated |
| POST | `/api/dossiers` | Create a dossier for the signed-in user | Planned – authenticated |
| GET | `/api/dossiers/:id` | Get one dossier owned by the signed-in user | Planned – authenticated |
| PUT | `/api/dossiers/:id` | Update an owned dossier | Planned – authenticated |
| DELETE | `/api/dossiers/:id` | Delete an owned dossier | Planned – authenticated |

The original imported movie records are treated as shared catalogue data. Research dossiers are the collection intended to support authenticated, user-owned CRUD. Ownership checks will be important when authentication is added.

## Phase 1 – Database foundation and persistent CRUD

Phase 1 establishes the database-backed API foundation for CineQuest.

### Completed in Phase 1

- Connected the Express application to MongoDB Atlas through a reusable database configuration module.
- Imported the 150 existing movie records into the Atlas `cinequest` database and `movie` collection.
- Created a Mongoose Movie model with defined field types and required validation.
- Implemented `GET /api/health`.
- Implemented `GET /api/resources` with a safe result limit.
- Implemented `GET /api/resources/:id`.
- Implemented `POST /api/resources` with basic required-field and data-type validation.
- Tested a valid POST request and received a successful creation response.
- Confirmed that the created movie appeared in MongoDB Atlas.
- Restarted the server and retrieved the created movie again using GET, confirming that the data persisted in the database.
- Prepared a named Postman collection with requests for the health check, movie list, movie details, and movie creation, including an invalid-input example.

### Phase 1 API routes

| Method | Route | Description |
|---|---|---|
| GET | `/api/health` | Returns API health information |
| GET | `/api/resources` | Returns a limited list of movies |
| GET | `/api/resources/:id` | Returns one movie using its dataset ID |
| POST | `/api/resources` | Creates a movie after validating the request body |


## Technology stack

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Postman
- Git and GitHub

## Project structure

```text
CineQuest/
├── config/
│   └── db.js
├── data/
│   └── dataset.json
├── models/
│   └── Movie.js
├── routes/
│   └── resourceRoutes.js
├── .gitignore
├── package.json
├── server.js
└── README.md
```

## Run the project locally

1. Clone the repository.
2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root. Add your own MongoDB Atlas connection string and port. Do not commit this file.

   ```env
   MONGODB_URI=your_mongodb_atlas_connection_string
   PORT=5000
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Test the API at `http://localhost:5000/api/health`.

## Security and configuration

The MongoDB connection string and other private configuration values belong in the local `.env` file. The `.env` file and `node_modules/` are excluded through `.gitignore` and should not be uploaded to GitHub.

## Next phases

- **Phase 2 – REST API:** Complete CRUD operations, query parameters, filtering, sorting, pagination, and stronger validation.
- **Phase 3 – Security:** Add registration, login, password hashing, JWT authentication, middleware, and ownership checks.
- **Phase 4 – Release:** Deploy the application, complete documentation and testing evidence, and prepare the final project demonstration.


