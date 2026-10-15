const $ = selector => document.querySelector(selector);

const STORAGE_KEY = 'thirdspace_guest_saved';

const state = {
    places: [],
    all: [],
    saved: new Set(),
    map: null,
    markers: new Map()
};

const icons = {
    'Outdoors': '🌳',
    'Arts & culture': '🎨',
    'Museums': '🏛️'
};

const money = amount => {
    if (amount === null || amount === undefined) {
        return 'Prices vary';
    }

    if (Number(amount) === 0) {
        return 'Free entry';
    }

    return `From £${Number(amount).toFixed(2)}`;
};

async function api(path) {
    const response = await fetch('/api/' + path);

    let data;

    try {
        data = await response.json();
    } catch {
        throw new Error(
            'Could not reach the server. Check that Docker is running.'
        );
    }

    if (!response.ok) {
        throw new Error(data.error || 'Something went wrong.');
    }

    return data;
}

function el(tag, className = '', text) {
    const element = document.createElement(tag);

    if (className) {
        element.className = className;
    }

    if (text !== undefined) {
        element.textContent = text;
    }

    return element;
}

function button(label, className, onClick) {
    const element = el('button', className, label);

    element.type = 'button';
    element.addEventListener('click', onClick);

    return element;
}

function loadSaved() {
    try {
        const stored = JSON.parse(
            localStorage.getItem(STORAGE_KEY) || '[]'
        );

        if (!Array.isArray(stored)) {
            state.saved = new Set();
            return;
        }

        state.saved = new Set(
            stored
                .map(Number)
                .filter(Number.isFinite)
        );
    } catch {
        state.saved = new Set();
    }
}

function persistSaved() {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify([...state.saved])
        );

        return true;
    } catch {
        showStorageError('Your browser could not save your favourites. Check your browser storage settings.');

        return false;
    }
}

function showStorageError(message) {
    let notice = $('#storage-message');

    if (!notice) {
        notice = el('p', 'storage-message');
        notice.id = 'storage-message';
        notice.setAttribute('role', 'alert');

        const main = $('main');

        if (main) main.prepend(notice);
    }

    if (notice) notice.textContent = message;
}

function updateSaveControls(id) {
    const saved = state.saved.has(Number(id));

    document.querySelectorAll('[data-save-id]').forEach(control => {
        if (Number(control.dataset.saveId) !== Number(id)) return;

        if (control.classList.contains('heart')) {
            control.textContent = saved ? '♥' : '♡';

            control.setAttribute(
                'aria-label',
                `${saved ? 'Remove' : 'Save'} ${control.dataset.placeName}${saved ? ' from saved places' : ''}`
            );

            control.setAttribute('aria-pressed', String(saved));
        } else {
            control.textContent = saved ? '♥ Remove saved' : '♡ Save place';
            control.setAttribute('aria-pressed', String(saved));
        }
    });
}

function toggleSaved(id) {
    id = Number(id);

    const wasSaved = state.saved.has(id);

    if (wasSaved) {
        state.saved.delete(id);
    } else {
        state.saved.add(id);
    }

    if (!persistSaved()) {
        if (wasSaved) {
            state.saved.add(id);
        } else {
            state.saved.delete(id);
        }
    }

    updateSaveControls(id);

    // Move focus before removing a saved-page card.
    if ($('#saved-cards') && wasSaved && !state.saved.has(id)) {
        const target = document.activeElement;

        if (target?.closest('[data-place-id="' + id + '"]')) {
            const heading = $('.saved-section h1');

            if (heading) {
                heading.tabIndex = -1;
                heading.focus();
            }
        }

        renderSaved();
    }

    if ($('#saved-cards') && !wasSaved) {
        renderSaved();
    }
}

function focusPlace(place) {
    const marker = state.markers.get(Number(place.id));

    if (!marker || !state.map) {
        return;
    }

    state.map.setView(marker.getLatLng(), 15, {
        animate: true
    });

    marker.openPopup();

    if (window.matchMedia('(max-width: 900px)').matches) {
        $('#map')?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
}

function card(place) {
    const article = el('article', 'place-card');
    article.dataset.placeId = String(place.id);

    const art = el('div', 'card-art');

    const symbol = el(
        'span',
        'card-symbol',
        icons[place.category] || '📍'
    );

    symbol.setAttribute('aria-hidden', 'true');
    art.append(symbol);

    const isSaved = state.saved.has(Number(place.id));

    const heart = button(
        isSaved ? '♥' : '♡',
        'heart',
        () => toggleSaved(place.id)
    );

    heart.dataset.saveId = String(place.id);
    heart.dataset.placeName = place.name;

    heart.setAttribute(
        'aria-label',
        isSaved
            ? `Remove ${place.name} from saved places`
            : `Save ${place.name}`
    );

    heart.setAttribute('aria-pressed', String(isSaved));

    art.append(heart);

    const body = el('div', 'card-body');

    body.append(
        el(
            'span',
            'card-kicker',
            `${place.category} · ${place.atmosphere}`
        ),
        el('h3', '', place.name),
        el('p', 'card-desc', place.description)
    );

    const meta = el('div', 'card-meta');

    meta.append(
        el('span', '', `📍 ${place.city}`)
    );

    body.append(meta);

    const bottom = el('div', 'card-bottom');

    bottom.append(
        el('span', 'price', money(place.price)),
        button(
            'View details ↗',
            'details-btn',
            () => openPlace(place)
        )
    );

    body.append(bottom);

    if ($('#map')) {
        const locate = button(
            '⌖ Show on map',
            'map-locate',
            () => focusPlace(place)
        );

        body.append(locate);
    }

    article.append(art, body);

    return article;
}

function render() {
    const container = $('#cards');

    if (container) {
        container.replaceChildren(
            ...state.places.map(card)
        );

        if (!state.places.length) {
            container.append(
                el(
                    'p',
                    'empty',
                    'No matches yet. Try a different search or clear your filters.'
                )
            );
        }

        const count = $('#result-count');

        if (count) {
            count.textContent =
                `${state.places.length} place${state.places.length === 1 ? '' : 's'} found`;
        }
    }

    renderSaved();
    renderMap();
}

function renderSaved() {
    const container = $('#saved-cards');

    if (container) {
        const savedPlaces = state.all.filter(
            place => state.saved.has(Number(place.id))
        );

        container.replaceChildren(
            ...savedPlaces.map(card)
        );

        const empty = $('#saved-empty');

        if (empty) {
            empty.hidden = savedPlaces.length > 0;
        }
    }
}

let filterTimer;
let latestRequest = 0;

async function loadPlaces() {
    const filters = $('#filters');

    if (!filters) {
        return;
    }

    const requestId = ++latestRequest;

    const params = new URLSearchParams(
        new FormData(filters)
    );

    const count = $('#result-count');

    try {
        const data = await api(
            'places.php?' + params.toString()
        );

        if (requestId !== latestRequest) {
            return;
        }

        state.places = data.places || [];

        render();
    } catch (error) {
        if (requestId !== latestRequest) {
            return;
        }

        state.places = [];

        if (count) {
            count.textContent = error.message;
        }

        const cards = $('#cards');

        if (cards) {
            cards.replaceChildren(
                el('p', 'empty', error.message)
            );
        }

        renderMap();
    }
}

async function loadAll() {
    try {
        const data = await api('places.php');

        state.all = data.places || [];
    } catch (error) {
        state.all = [];

        const count = $('#result-count');

        if (count) {
            count.textContent = error.message;
        }

        const savedCards = $('#saved-cards');

        if (savedCards) {
            savedCards.replaceChildren(
                el('p', 'empty', error.message)
            );
        }

        return false;
    }

    renderSaved();

    return true;
}

function openPlace(place) {
    const dialog = $('#place-dialog');
    const detail = $('#place-detail');

    if (!dialog || !detail) {
        return;
    }

    detail.replaceChildren(
        el(
            'p',
            'eyebrow',
            `${place.category} · ${place.atmosphere}`
        ),
        el('h2', '', place.name),
        el('p', 'detail-desc', place.description)
    );

    const info = el('div', 'detail-meta');

    info.append(
        el('p', '', `Cost: ${money(place.price)}`),
        el('p', '', `Address: ${place.address}`),
        el(
            'p',
            '',
            `Accessibility: ${place.accessibility || 'Contact the venue for details'}`
        )
    );

    detail.append(info);

    const actions = el('div', 'detail-actions');

    const directions = el(
        'a',
        'secondary-link',
        'Get directions ↗'
    );

    directions.href =
        'https://www.google.com/maps/search/?api=1&query=' +
        encodeURIComponent(place.address);

    directions.target = '_blank';
    directions.rel = 'noopener noreferrer';

    actions.append(directions);

    if (place.website_url) {
        const website = el(
            'a',
            'secondary-link',
            'Venue website ↗'
        );

        website.href = place.website_url;
        website.target = '_blank';
        website.rel = 'noopener noreferrer';

        actions.append(website);
    }

    const isSaved = state.saved.has(Number(place.id));

    const saveButton = button(
        isSaved ? '♥ Remove saved' : '♡ Save place',
        'primary-link',
        () => toggleSaved(place.id)
    );

    saveButton.dataset.saveId = String(place.id);
    saveButton.setAttribute('aria-pressed', String(isSaved));

    actions.append(saveButton);

    detail.append(actions);

    dialog.showModal();
}

function renderMap() {
    const mapElement = $('#map');

    if (!mapElement || !window.L) {
        return;
    }

    if (!state.map) {
        state.map = L.map('map', {
            scrollWheelZoom: false
        }).setView([51.4816, -3.1791], 12);

        L.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
                attribution: '© OpenStreetMap contributors',
                maxZoom: 19
            }
        ).addTo(state.map);
    }

    state.markers.forEach(marker => marker.remove());
    state.markers.clear();

    for (const place of state.places) {
        if (
            place.latitude === null ||
            place.latitude === undefined ||
            place.longitude === null ||
            place.longitude === undefined
        ) {
            continue;
        }

        const latitude = Number(place.latitude);
        const longitude = Number(place.longitude);

        if (
            !Number.isFinite(latitude) ||
            !Number.isFinite(longitude)
        ) {
            continue;
        }

        const marker = L.marker([
            latitude,
            longitude
        ]).addTo(state.map);

        const popup = el('div', 'map-popup');

        popup.append(
            el('strong', '', place.name),
            el('p', '', place.address)
        );

        popup.append(
            button(
                'View details ↗',
                'map-popup-link',
                () => openPlace(place)
            )
        );

        marker.bindPopup(popup);

        state.markers.set(Number(place.id), marker);
    }

    if (state.markers.size) {
        const bounds = L.featureGroup(
            [...state.markers.values()]
        ).getBounds();

        state.map.fitBounds(
            bounds.pad(0.17),
            {
                maxZoom: 13
            }
        );
    } else {
        state.map.setView([51.4816, -3.1791], 12);
    }

    setTimeout(() => {
        state.map.invalidateSize();
    }, 150);
}

function setupFilters() {
    const filters = $('#filters');

    if (!filters) {
        return;
    }

    filters.addEventListener('submit', event => {
        event.preventDefault();
        loadPlaces();
    });

    filters.addEventListener('input', () => {
        clearTimeout(filterTimer);

        filterTimer = setTimeout(
            loadPlaces,
            240
        );
    });

    filters.addEventListener('change', () => {
        clearTimeout(filterTimer);
        loadPlaces();
    });

    filters.addEventListener('reset', () => {
        clearTimeout(filterTimer);

        setTimeout(
            loadPlaces,
            0
        );
    });

    const showAll = $('#show-all');

    if (showAll) {
        showAll.addEventListener('click', () => {
            filters.reset();
        });
    }
}

function setupDialogs() {
    document.querySelectorAll('[data-close]').forEach(
        element => {
            element.addEventListener('click', () => {
                element.closest('dialog')?.close();
            });
        }
    );

    document.querySelectorAll('dialog').forEach(
        dialog => {
            dialog.addEventListener('click', event => {
                if (event.target === dialog) {
                    dialog.close();
                }
            });
        }
    );
}

async function init() {
    loadSaved();

    setupFilters();
    setupDialogs();

    const loaded = await loadAll();

    if (loaded) {
        renderSaved();
    }

    await loadPlaces();
}

init();
