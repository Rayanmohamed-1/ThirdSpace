SET NAMES utf8mb4;

ALTER TABLE places
    MODIFY COLUMN price DECIMAL(8,2) NULL DEFAULT NULL;


SET @statement = (
    SELECT IF(
        COUNT(*) = 0,
        'ALTER TABLE places ADD COLUMN website_url VARCHAR(500) NULL',
        'SELECT 1'
    )
    FROM information_schema.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'places'
        AND COLUMN_NAME = 'website_url'
);

PREPARE statement FROM @statement;
EXECUTE statement;
DEALLOCATE PREPARE statement;


SET @statement = (
    SELECT IF(
        COUNT(*) = 0,
        'ALTER TABLE places ADD COLUMN source_url VARCHAR(500) NULL',
        'SELECT 1'
    )
    FROM information_schema.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'places'
        AND COLUMN_NAME = 'source_url'
);

PREPARE statement FROM @statement;
EXECUTE statement;
DEALLOCATE PREPARE statement;


UPDATE places
SET
    category = 'Outdoors',
    atmosphere = 'Relaxed',
    description = 'Riverside paths, leafy gardens and room to unwind or meet friends.',
    address = 'Bute Park Visitor Centre, 35 North Road, Cardiff CF10 3DX',
    city = 'Cardiff',
    price = 0,
    accessibility = 'Paths vary across the park. Check the official accessibility information.',
    latitude = 51.486,
    longitude = -3.187,
    image_url = NULL,
    website_url = 'https://bute-park.com/',
    source_url = 'https://bute-park.co.uk/directions/'
WHERE name = 'Bute Park';


UPDATE places
SET
    category = 'Arts & culture',
    atmosphere = 'Creative',
    description = 'Independent cinema, exhibitions, performances and a welcoming cafe-bar.',
    address = 'Market Road, Canton, Cardiff CF5 1QE',
    city = 'Cardiff',
    price = NULL,
    accessibility = 'access information from Chapter for individual spaces and events.',
    latitude = 51.48305,
    longitude = -3.20531,
    image_url = NULL,
    website_url = 'https://www.chapter.cymru/',
    source_url = 'https://www.chapter.cymru/visit'
WHERE name = 'Chapter Arts Centre';


UPDATE places
SET
    category = 'Museums',
    atmosphere = 'Quiet',
    description = 'Discover famous Cardiff stories in the historic Old Library building.',
    address = 'The Old Library, The Hayes, Cardiff CF10 1BH',
    city = 'Cardiff',
    price = 0,
    accessibility = 'Wheelchair-accessible lift and accessible toilet listed by the museum.',
    latitude = 51.480225,
    longitude = -3.177351,
    image_url = NULL,
    website_url = 'https://cardiffmuseum.com/',
    source_url = 'https://cardiffmuseum.com/contact-us/'
WHERE name = 'Museum of Cardiff';


UPDATE places
SET
    category = 'Museums',
    atmosphere = 'Quiet',
    description = 'Art and natural history collections in the civic centre.',
    address = 'Gorsedd Gardens Road, Cathays, Cardiff CF10 3NP',
    city = 'Cardiff',
    price = 0,
    accessibility = 'Check the museums access arrangements before visiting.',
    latitude = 51.4856,
    longitude = -3.1777,
    image_url = NULL,
    website_url = 'https://museum.wales/cardiff/',
    source_url = 'https://www.visitcardiff.com/2026/01/free-things-to-do-in-cardiff/'
WHERE name = 'National Museum Cardiff';


UPDATE places
SET
    category = 'Outdoors',
    atmosphere = 'Relaxed',
    description = 'A lakeside walk, gardens and green spaces for an easy afternoon outdoors.',
    address = 'Lake Road West, Roath, Cardiff CF23 5PA',
    city = 'Cardiff',
    price = 0,
    accessibility = 'Outdoor paths and gradients vary by route.',
    latitude = 51.5076,
    longitude = -3.1625,
    image_url = NULL,
    website_url = 'https://www.visitcardiff.com/2026/01/free-things-to-do-in-cardiff/',
    source_url = 'https://www.visitcardiff.com/2026/01/free-things-to-do-in-cardiff/'
WHERE name = 'Roath Park';


UPDATE places
SET
    category = 'Arts & culture',
    atmosphere = 'Social',
    description = 'Waterfront arts venue with a cafe and views across Cardiff Bay.',
    address = 'Harbour Drive, Cardiff Bay, Cardiff CF10 4PA',
    city = 'Cardiff',
    price = NULL,
    accessibility = 'Contact the venue for up-to-date accessibility details.',
    latitude = 51.4629,
    longitude = -3.1627,
    image_url = NULL,
    website_url = 'https://www.norwegianchurchcardiff.com/',
    source_url = 'https://www.norwegianchurchcardiff.com/'
WHERE name = 'Norwegian Church Arts Centre';


UPDATE places
SET
    category = 'Outdoors',
    atmosphere = 'Social',
    description = 'Enjoy a long waterfront walk and views over the bay.',
    address = 'Cardiff Bay Barrage, Cardiff CF10 4LY',
    city = 'Cardiff',
    price = 0,
    accessibility = 'Check route suitability; the route covers a substantial distance.',
    latitude = 51.452,
    longitude = -3.17,
    image_url = NULL,
    website_url = 'https://www.visitcardiff.com/2026/01/free-things-to-do-in-cardiff/',
    source_url = 'https://www.visitcardiff.com/2026/01/free-things-to-do-in-cardiff/'
WHERE name = 'Cardiff Bay Barrage';


UPDATE places
SET
    category = 'Arts & culture',
    atmosphere = 'Relaxed',
    description = 'Historic house and gardens in Llandaff, with community activities and events.',
    address = 'Fairwater Road, Llandaff, Cardiff CF5 2LN',
    city = 'Cardiff',
    price = 0,
    accessibility = 'Check the venues access guide for the house and grounds.',
    latitude = 51.4941,
    longitude = -3.226,
    image_url = NULL,
    website_url = 'https://www.insolecourt.org/',
    source_url = 'https://www.visitcardiff.com/2026/01/free-things-to-do-in-cardiff/'
WHERE name = 'Insole Court';


INSERT INTO places (
    name,
    category,
    atmosphere,
    description,
    address,
    city,
    price,
    accessibility,
    latitude,
    longitude,
    image_url,
    website_url,
    source_url
)
SELECT
    'Cardiff Bay Barrage',
    'Outdoors',
    'Social',
    'Enjoy a long waterfront walk and views over the bay.',
    'Cardiff Bay Barrage, Cardiff CF10 4LY',
    'Cardiff',
    0,
    'Check route suitability; the route covers a substantial distance.',
    51.452,
    -3.17,
    NULL,
    'https://www.visitcardiff.com/2026/01/free-things-to-do-in-cardiff/',
    'https://www.visitcardiff.com/2026/01/free-things-to-do-in-cardiff/'
WHERE NOT EXISTS (
    SELECT 1
    FROM places
    WHERE name = 'Cardiff Bay Barrage'
);


INSERT INTO places (
    name,
    category,
    atmosphere,
    description,
    address,
    city,
    price,
    accessibility,
    latitude,
    longitude,
    image_url,
    website_url,
    source_url
)
SELECT
    'Insole Court',
    'Arts & culture',
    'Relaxed',
    'Historic house and gardens in Llandaff, with community activities and events.',
    'Fairwater Road, Llandaff, Cardiff CF5 2LN',
    'Cardiff',
    0,
    'Check the venues access guide for the house and grounds.',
    51.4941,
    -3.226,
    NULL,
    'https://www.insolecourt.org/',
    'https://www.visitcardiff.com/2026/01/free-things-to-do-in-cardiff/'
WHERE NOT EXISTS (
    SELECT 1
    FROM places
    WHERE name = 'Insole Court'
);


SELECT
    name,
    category,
    atmosphere,
    description,
    price,
    website_url
FROM places
ORDER BY name;

