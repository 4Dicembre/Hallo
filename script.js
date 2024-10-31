const prompts = [
    " un 30enne che si trova a dover pagare le bollette, pulire in casa, fare mansioni e non avere tempo libero, quando fino a poco tempo prima era un bambino e non doveva fare nulla.",
    " spia della macchina sempre in riserva e il tuo portafoglio sempre vuoto.",
    " una persona che si sveglia alle 6:00 del mattino per andare a lavorare e si ritrova a fare la spesa alle 23:00.",
    " insofferenza di una persona che si trova a dover fare la fila in posta.",
    " una persona che addenta un dolce pensando sia al cioccolato e scopre che è all'uvetta. (Cioccolato e uvetta si confondono)",
    " una ragazza che ti dice 'Ti devo parlare': spoiler vuole lasciarti",
    " un adulto che compra un caffè da asporto da 5 euro e subito dopo guarda con tristezza il conto in banca.",
    " una persona che aspetta da un’ora il proprio turno per un taglio di capelli e scopre che il barbiere va a pranzo.",
    " qualcuno che si prepara per uscire e trova la pioggia appena varcata la porta.",
    " una sveglia impostata alle 7:00, e la persona che si sveglia alle 6:59 da sola.",
    " una persona che cerca di fermare un autobus, che però si allontana all’ultimo secondo.",
    " qualcuno che, dopo un’ora di attesa in un ristorante, si sente dire che il piatto che voleva è finito.",
    " un bambino che ha detto di non volere il gelato e ora guarda con invidia chi lo mangia.",
    " una persona che prenota una vacanza all-inclusive e scopre che tutte le attività sono già piene.",
    " qualcuno che, dopo aver cercato di non addormentarsi, crolla sul divano cinque minuti prima che finisca il film.",
    " un 40enne che si accorge di avere più medicine che snack nel cassetto della scrivania.",
    " qualcuno che apre il frigo pieno e dice 'Non c'è niente da mangiare'.",
    " una persona che manda un messaggio al capo per errore, pensando fosse un amico.",
    " un adulto che compra giochi costosi per consolle, ma poi non trova mai il tempo per giocarci.",
    " un genitore che dice di non avere preferenze sui ristoranti e boccia tutte le proposte ricevute.",
    " qualcuno che alza il volume della sveglia al massimo e poi riesce comunque a non sentirla.",
    " una persona che esce dal parrucchiere e, sotto la pioggia, si rovina i capelli appena fatti.",
    " qualcuno che mangia una pizza con extra formaggio e si rende conto di essere intollerante al lattosio.",
    " una persona che pianifica la dieta ma passa ogni giorno davanti a una pasticceria.",
    " qualcuno che ordina un pacco con spedizione rapida ma finisce per aspettarlo per settimane.",
    " un adulto che compra l’attrezzatura per fare palestra a casa e poi la usa per appendere vestiti.",
    " una persona che cambia look per una festa e scopre che l’evento è stato annullato.",
    " qualcuno che riceve una notifica di aggiornamento del telefono mentre cerca di scattare una foto importante.",
    " un adulto che pensa 'Quando ero piccolo, non vedevo l’ora di essere grande'.",
    " qualcuno che va a fare una passeggiata in montagna e si perde a 10 minuti dall’inizio.",
    " un adulto che si rende conto di preferire il divano a qualsiasi programma sociale.",
    " qualcuno che cerca di mangiare sano per un giorno e viene subito invitato a un pranzo ricco di dolci.",
    " una persona che vuole partire in vacanza ma ha dimenticato il caricatore del telefono.",
    " un adulto che prova a risparmiare per le vacanze e alla fine usa tutto per riparazioni domestiche.",
    " qualcuno che va a fare jogging e torna con la busta della spesa invece di correre.",
    " un adulto che scopre di avere più bollette che messaggi di amici sul telefono.",
    " qualcuno che prova a mangiare sano ma la tentazione del fast food è sempre dietro l’angolo.",
    " una persona che si sveglia presto per fare attività fisica, ma si riaddormenta subito.",
    " qualcuno che dimentica l'ombrello a casa e viene sorpreso da un temporale.",
    " un adulto che si lamenta per la musica rumorosa e poi si rende conto di averlo fatto per la prima volta.",
    " qualcuno che pianifica di dormire di più nel weekend, ma viene svegliato dai vicini rumorosi.",
    " un adulto che riceve una notifica di compleanno, ma realizza di non avere soldi per il regalo.",
    " una persona che cerca di fare colpo a un appuntamento e si rovescia il vino addosso.",
    " qualcuno che va a letto presto per dormire meglio e si sveglia ogni ora.",
    " un adulto che si lamenta del lavoro il lunedì e dimentica che venerdì era lo stesso lavoro.",
    " qualcuno che si iscrive in palestra e la prima volta prende l’ascensore invece delle scale."

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
        imageContainer.innerHTML = `<img src="${cachedImageUrl}" alt="Immagine generata" /><div class="watermark">Hallo</div>`;
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

            // Mostra l'immagine generata con il watermark
            imageContainer.innerHTML = `<img src="${imageUrl}" alt="Immagine generata" /><div class="watermark">Hallo</div>`;

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

// Funzione per condividere su WhatsApp
document.getElementById('share-whatsapp').addEventListener('click', () => {
    const promptText = document.getElementById('prompt-text').textContent;
    const imageUrl = document.querySelector('#image-container img')?.src;

    if (promptText && imageUrl) {
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(promptText)}%0A${encodeURIComponent(imageUrl)}`;
        window.open(whatsappUrl, '_blank');
    } else {
        alert('Genera un\'immagine prima di condividerla.');
    }
});