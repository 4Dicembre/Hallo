const prompts = [
    "Genera l'immagine ironica di un 30enne che si trova a dover pagare le bollette, pulire in casa, fare mansioni e non avere tempo libero, quando fino a poco tempo prima era un bambino e non doveva fare nulla.",
    "Genera l'immagine ironica della spia della macchina sempre in riserva e il tuo portafoglio sempre vuoto.",
    "Genera l'immagine ironica di una persona che si sveglia alle 6:00 del mattino per andare a lavorare e si ritrova a fare la spesa alle 23:00.",
    "Genera l'immagine ironica dell'insofferenza di una persona che si trova a dover fare la fila in posta.",
    "Genera l'immagine ironica di una persona che addenta un dolce pensando sia al cioccolato e scopre che è all'uvetta. (Cioccolato e uvetta si confondono)",
    "Genera l'immagine di una ragazza che ti dice 'Ti devo parlare': spoiler vuole lasciarti"
];

// Funzione per generare un GUID
function generateGUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Carica la cache delle immagini dal file JSON
async function loadImageCache() {
    try {
        const response = await fetch('/.netlify/functions/load-image-cache');
        return await response.json();
    } catch (error) {
        console.error('Errore nel caricamento della cache delle immagini:', error);
        return {};
    }
}

// Salva la cache delle immagini nel file JSON
async function saveImageCache(imageCache) {
    try {
        await fetch('/.netlify/functions/save-image-cache', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(imageCache)
        });
    } catch (error) {
        console.error('Errore nel salvataggio della cache delle immagini:', error);
    }
}

document.getElementById('generate-button').addEventListener('click', async () => {
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    const loadingBar = document.getElementById('loading-bar');
    const imageContainer = document.getElementById('image-container');
    const promptText = document.getElementById('prompt-text');

    // Mostra la barra di caricamento e il prompt scelto
    loadingBar.style.display = 'block';
    promptText.textContent = `Prompt: ${randomPrompt}`;
    imageContainer.innerHTML = '';

    // Carica la cache delle immagini
    const imageCache = await loadImageCache();

    // Genera un GUID per il prompt
    const promptGUID = generateGUID();

    // Controlla se l'immagine per il prompt è già nella cache
    if (imageCache[promptGUID]) {
        // Usa l'immagine dalla cache
        const cachedImageUrl = imageCache[promptGUID];
        loadingBar.style.display = 'none';
        imageContainer.innerHTML = `<img src="${cachedImageUrl}" alt="Immagine generata" />`;
    } else {
        // Genera una nuova immagine chiamando l'API
        try {
            const response = await fetch('/.netlify/functions/generate-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: randomPrompt })
            });
            const data = await response.json();
            const imageUrl = data.image_url;

            // Nascondi la barra di caricamento
            loadingBar.style.display = 'none';

            // Mostra l'immagine generata
            imageContainer.innerHTML = `<img src="${imageUrl}" alt="Immagine generata" />`;

            // Aggiungi l'immagine alla cache
            imageCache[promptGUID] = imageUrl;
            await saveImageCache(imageCache);
        } catch (error) {
            console.error('Errore nella generazione dell\'immagine:', error);
            loadingBar.style.display = 'none';
            imageContainer.innerHTML = '<p>Errore nella generazione dell\'immagine. Riprova.</p>';
        }
    }
});