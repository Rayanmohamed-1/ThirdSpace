# ThirdSpace | Community Discovery & Social Planning

Finding somewhere to go shouldn't involve endless scrolling or spending a fortune.

ThirdSpace is a responsive web application I'm developing to help young adults discover affordable community spaces, activities and social opportunities that match their interests, budgets and preferences.

The idea behind ThirdSpace is to make it easier for people to find places where they can spend time, try something new and connect with others. Whether it's a quiet café, a creative workshop, a free community event or somewhere to meet new people, the application focuses on helping users discover places that suit them rather than simply showing what's nearby.

## Tech Stack

- HTML5: Structures the website, including navigation, search filters, venue cards and information.
- CSS3: Creates a responsive, accessible and user-friendly interface across different screen sizes.
- JavaScript: Manages interactive features, search functionality, multiple filters, dynamic results and saved places.
- PHP: Connects the frontend to the database through an API, retrieving venue information based on users' selected filters.
- MySQL: Stores venue information, including locations, categories, descriptions, prices and accessibility details.
- Leaflet.js: Provides an interactive map displaying the locations of community spaces and activities.
- localStorage: Allows users to save their favourite places and access them across browser sessions without creating an account.
- Docker: Creates a consistent environment for developing and running the application and its database.

I chose this technology stack to build on my existing frontend development skills while gaining more experience with backend development, databases and API integration. It also gives me the opportunity to explore how different technologies work together to create a functional and accessible web application.

## Challenges & Solutions

One of the main challenges was making sure the search, category, atmosphere and budget filters worked together correctly. Users needed to be able to change multiple filters without affecting the accuracy of their results. To address this, I used JavaScript to pass the selected filters to a PHP API, which retrieves matching venues from the MySQL database. I also added request tracking to ensure that older responses do not overwrite more recent search results.

Another challenge was allowing users to save places without needing to register or log in. I used localStorage to store saved venue IDs, allowing users to return to their favourites even after closing or refreshing the browser. I also refined this functionality so that saving or removing a place updates the relevant buttons without unnecessarily refreshing the results or resetting the map.

Integrating the interactive map was another area that required some problem-solving. I wanted the map to reflect the same venues shown in the search results, particularly when users applied different filters. Using Leaflet.js, I connected the map markers to the filtered venue data so that both the map and results update together.
