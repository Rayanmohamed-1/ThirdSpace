# ThirdSpace | Community Space Discovery Platform

ThirdSpace is a full-stack web application I developed to help young adults discover free and affordable community spaces across Cardiff. I wanted to bring information from different websites into one place, making it easier to find somewhere to socialise, relax or explore.

## Problem & Product Vision

Finding affordable activities can take time when venue information is scattered online. My vision is to make community spaces easier to discover, starting with Cardiff and potentially expanding to other UK cities.

## Business Analysis & User Requirements

I considered three potential stakeholder groups: young adults looking for places to visit, community organisations seeking visibility, and future platform administrators.

**Assumption-based persona - Amina, 21:** A Cardiff student who wants affordable activities but finds comparing venues across websites frustrating. This persona helped guide my design; it was not developed from user interviews.

**User story:** As a young adult, I want to search and filter affordable community spaces so that I can find places suited to my interests and budget.

**Acceptance criteria:**

- Keyword searches return matching venues.
- Category, atmosphere and budget filters narrow the results.
- Unsuccessful searches display a clear message.

## Features & Technical Implementation

- **Search and filters:** JavaScript sends search criteria to a PHP API, which retrieves matching records from MySQL using PDO prepared statements.
- **Interactive map:** Leaflet.js displays venue locations and updates markers alongside search results.
- **Saved favourites:** Browser localStorage retains saved venue IDs without requiring accounts.
- **Responsive interface:** HTML and CSS support different screen sizes.

I used Figma to create low and high fidelity wireframes, user journeys and interaction states. Docker Compose provides a consistent local development environment.

## Venue Data & Sources

I populated the initial database with eight Cardiff venues using publicly available information. Sources include:

- Bute Park: [https://bute-park.co.uk/directions/](https://bute-park.co.uk/directions/)
- Chapter Arts Centre: [https://www.chapter.cymru/visit](https://www.chapter.cymru/visit)
- Museum of Cardiff: [https://cardiffmuseum.com/contact-us/](https://cardiffmuseum.com/contact-us/)
- Visit Cardiff: [https://www.visitcardiff.com/2026/01/free-things-to-do-in-cardiff/](https://www.visitcardiff.com/2026/01/free-things-to-do-in-cardiff/)
- Norwegian Church: [https://www.norwegianchurchcardiff.com/](https://www.norwegianchurchcardiff.com/)

Prices and accessibility information may change; users should check official websites before visiting.

## Run Locally

With Docker Desktop running, open the project directory and execute:

```bash
docker compose up --build -d
```

Once running, access the application through:

- **Homepage:** http://localhost:8080
- **Explore:** http://localhost:8080/explore.html
- **Saved Places:** http://localhost:8080/saved.html

To stop the application:

```bash
docker compose down
```

## Limitations & Reflection

ThirdSpace is an ongoing MVP. It has eight seeded venues, no account-based favourites and no automated test suite or documented usability study. Future work includes expanding the directory, testing accessibility and collecting user feedback.

This project strengthened my skills in SQL, API integration, UI/UX design and translating user needs into working features. It also helped me explore Business Analysis alongside software development.
