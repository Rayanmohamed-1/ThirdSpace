# ThirdSpace | Community Discovery & Social Planning

Finding somewhere to go shouldn't mean endless scrolling or spending a fortune.

ThirdSpace is a responsive web application I'm developing to help young adults discover affordable community spaces, activities and social opportunities based on their interests, budgets and preferences.

Rather than simply showing what's nearby, ThirdSpace focuses on what makes a place worth visiting, whether that's a quiet café, a creative workshop, a free community event or somewhere to meet new people.

# Tech Stack

HTML5: Structures the website, including navigation, search and activity cards.
CSS3: Creates a responsive, user-friendly interface across different screen sizes.
JavaScript: Handles search functionality, multiple filters, dynamic results and saved places.
localStorage: Stores favourite places between browser sessions without requiring a backend.
JSON: Structures place information and manages stored favourites.
I chose this stack to strengthen my front-end development skills while keeping the application lightweight and accessible.

# Challenges & Solutions

One challenge was ensuring that search, category and budget filters worked together without interfering with one another. This was particularly tricky when users changed multiple selections. I addressed this by using JavaScript to dynamically update results based on the active filters.

Another challenge was allowing users to save their favourite places without a database. Since localStorage only stores strings, I had to convert JavaScript data into JSON and back again, ensuring favourites remained accessible after refreshing the page.
