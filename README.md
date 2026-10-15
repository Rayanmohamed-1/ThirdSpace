# ThirdSpace — community discovery web app

A responsive portfolio project for finding real community venues in Cardiff. Frontend: HTML/CSS/JavaScript + Leaflet. Backend: PHP 8.2 + MySQL 8. Docker Compose runs both services.

## Project structure
- `frontend/`: home (`index.html`), explore (`explore.html`), saved (`saved.html`), CSS and JavaScript
- `backend/api/`: venue search, accounts, saved places
- `backend/database/`: new database schema and migration for existing installs
- `wireframes/`: low-fidelity, high-fidelity and prototype folders

## First-time setup
1. Start Docker Desktop.
2. Open a terminal in the `ThirdSpace` folder.
3. Run `docker compose up --build -d`.
4. Open http://localhost:8080; explore at http://localhost:8080/explore.html.

## IMPORTANT: Updating an existing ThirdSpace installation
If you previously ran the demo version, Docker **keeps your old database volume**. To replace fictional venues with real venue records while preserving accounts and favourites, run **once** after starting the new containers:

```bash
docker compose exec -T db sh -c 'exec mysql -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" "$MYSQL_DATABASE"' < backend/database/update_existing.sql
```

Then refresh the browser. Do **not** use `docker compose down -v`: that deletes the database volume.

## Features
- Compact landing page with CTA to Explore
- Separate Explore and Saved pages
- Server-side combined search/category/atmosphere/budget filtering
- Two-column results and smaller, sticky Leaflet map (stacks on mobile)
- Clicking “Show on map” highlights the relevant pin
- Map markers update with filtered results
- Venue detail modal with directions and official website
- Guest favourites stored in localStorage; signed-in favourites stored in MySQL
- Registration/login via PHP sessions and CSRF tokens

## Venue data and accuracy
The initial dataset contains **8 real Cardiff venues** with publicly listed addresses and links to sources. Coordinates are **approximate map pins**, not survey-grade entrance positions. General free entry is distinguished from paid food, workshops and events: a `NULL` price means **Prices vary**, not a made-up price. Verify access arrangements, prices and opening times directly with venues before travelling. No live event bookings or schedules are claimed.

Sources:
- Bute Park: https://bute-park.co.uk/directions/
- Chapter: https://www.chapter.cymru/visit
- Museum of Cardiff: https://cardiffmuseum.com/contact-us/
- National Museum Cardiff, Roath Park, Cardiff Bay Barrage, Insole Court: https://www.visitcardiff.com/2026/01/free-things-to-do-in-cardiff/
- Norwegian Church: https://www.norwegianchurchcardiff.com/

## Security and deployment
Development credentials in `docker-compose.yml` are for **local use only**. Change secrets and harden the stack before any public deployment. Leaflet uses public OpenStreetMap tiles; respect tile provider policies and attribution. This project is a portfolio demonstration, not an official venue directory.
