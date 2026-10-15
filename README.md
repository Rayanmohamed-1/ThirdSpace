# ThirdSpace | Community Space Discovery Web Application

**Finding somewhere to go shouldn't involve endless scrolling or spending a fortune.**

ThirdSpace is an independent full-stack development project where I'm applying my software engineering skills to solve a real-world problem: making affordable community spaces easier to discover.

I'm developing a responsive web application that helps young adults explore free and low-cost venues across Cardiff through search filters, interactive maps and saved favourites.

The current version features eight real venues across three categories: outdoors, arts and culture, and museums.

## Current Features

- **Venue Discovery:** Browse real Cardiff venues with descriptions, locations and accessibility information.
- **Search & Filtering:** Filter venues by keyword, category, atmosphere and budget.
- **Interactive Map:** Explore venue locations using Leaflet.js, with markers that update alongside search results.
- **Saved Places:** Save favourite venues without creating an account.
- **Venue Details:** View additional information, directions and links to official websites.
- **Responsive Design:** Explore the application across desktop, tablet and mobile devices.

## Tech Stack

- **HTML5 & CSS3:** Responsive interface, website structure and styling.
- **JavaScript:** Dynamic filtering, search functionality and interactive features.
- **PHP 8.2 & MySQL 8:** API development, database integration and venue retrieval.
- **Leaflet.js:** Interactive maps and venue markers.
- **localStorage:** Persistent favourites on the same browser and device.
- **Docker Compose:** Consistent local development environment.

## Challenges & Solutions

One of the main challenges was ensuring multiple search filters worked together accurately. I connected JavaScript to a PHP API that retrieves matching venues from MySQL and implemented request tracking to prevent outdated responses from overwriting newer results.

Another challenge was keeping the interactive map consistent with search results. I synchronised Leaflet markers with filtered venue data and added functionality to highlight selected locations.

I also implemented persistent favourites using localStorage and handled missing venue prices appropriately, displaying "Prices vary" rather than presenting misleading information.

These challenges have helped me strengthen my problem-solving skills and understand how frontend, backend and database technologies work together.

## Run It Locally

**Requirements:** Docker Desktop and Docker Compose.

1. Clone or download the repository.
2. Start Docker Desktop.
3. Open a terminal in the `ThirdSpace` project folder.
4. Run:

```bash
docker compose up --build -d
```

Once the containers are running, open:

- **Home:** http://localhost:8080
- **Explore:** http://localhost:8080/explore.html
- **Saved Places:** http://localhost:8080/saved.html

To stop the application:

```bash
docker compose down
```

### Updating an Existing Installation

If you previously ran an older version of ThirdSpace, Docker may retain the previous database volume.

After starting the containers, run the database migration:

```bash
docker compose exec -T db sh -c 'exec mysql -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" "$MYSQL_DATABASE"' < backend/database/update_existing.sql
```

Back up important data before running migrations.

**Important:** Avoid running `docker compose down -v` unless you intentionally want to delete the database volume and its stored data.

## Venue Data & Sources

ThirdSpace currently contains eight real Cardiff venues, using publicly available information from official websites and local listings.

Sources include:

- [Bute Park](https://bute-park.co.uk/directions/)
- [Chapter Arts Centre](https://www.chapter.cymru/visit)
- [Museum of Cardiff](https://cardiffmuseum.com/contact-us/)
- [Visit Cardiff](https://www.visitcardiff.com/2026/01/free-things-to-do-in-cardiff/)
- [Norwegian Church](https://www.norwegianchurchcardiff.com/)

Venue coordinates are approximate. Admission prices, opening times and accessibility arrangements may change, so users should check official sources before visiting.

Missing or variable prices are displayed as "Prices vary" rather than estimated amounts.

## Security & Accessibility

The PHP API uses PDO prepared statements for database queries, with server-side error logging and generic error responses.

The frontend uses safe DOM text insertion when displaying venue information.

Accessibility considerations include labelled form controls, descriptive buttons, keyboard focus indicators, a skip-navigation link and live result-count announcements.

Further accessibility testing is planned.

**Security note:** Database credentials in `docker-compose.yml` are intended for local development only. Credentials and deployment settings must be reviewed before making the application publicly accessible.

The interactive map uses OpenStreetMap tiles through Leaflet.js, subject to the tile provider's usage and attribution requirements.

## Limitations & Future Development

ThirdSpace is an ongoing portfolio project. The current version focuses on venue discovery rather than social planning or event booking.

As I continue developing the application, I plan to:

- Expand the venue directory across Cardiff and potentially other cities.
- Introduce community events, workshops and local activities.
- Explore more personalised discovery based on users' interests.
- Conduct usability testing and improve accessibility.
- Investigate optional user accounts and cross-device favourites.
- Improve how venue information is maintained and updated.

## Project Reflection

Developing ThirdSpace has given me the opportunity to apply my technical knowledge independently while exploring the relationship between software development, user experience and real-world problem-solving.

Through this project, I'm strengthening my skills in full-stack development, database integration, analytical thinking and technical decision-making.

ThirdSpace is an independent portfolio project and is not an official venue directory.
