const prompts = [
    "Genera l'immagine ironica di un adulto che compra un caffè da asporto da 5 euro e subito dopo guarda con tristezza il conto in banca.",
    "Genera l'immagine ironica di una persona che aspetta da un’ora il proprio turno per un taglio di capelli e scopre che il barbiere va a pranzo.",
    "Genera l’immagine ironica di qualcuno che si prepara per uscire e trova la pioggia appena varcata la porta.",
    "Genera l'immagine ironica di una sveglia impostata alle 7:00, e la persona che si sveglia alle 6:59 da sola.",
    "Genera l’immagine ironica di una persona che cerca di fermare un autobus, che però si allontana all’ultimo secondo.",
    "Genera l’immagine ironica di qualcuno che, dopo un’ora di attesa in un ristorante, si sente dire che il piatto che voleva è finito.",
    "Genera l’immagine ironica di un bambino che ha detto di non volere il gelato e ora guarda con invidia chi lo mangia.",
    "Genera l'immagine ironica di una persona che prenota una vacanza all-inclusive e scopre che tutte le attività sono già piene.",
    "Genera l'immagine ironica di qualcuno che, dopo aver cercato di non addormentarsi, crolla sul divano cinque minuti prima che finisca il film.",
    "Genera l'immagine ironica di un 40enne che si accorge di avere più medicine che snack nel cassetto della scrivania.",
    "Genera l'immagine ironica di qualcuno che apre il frigo pieno e dice 'Non c'è niente da mangiare'.",
    "Genera l'immagine ironica di una persona che manda un messaggio al capo per errore, pensando fosse un amico.",
    "Genera l'immagine ironica di un adulto che compra giochi costosi per consolle, ma poi non trova mai il tempo per giocarci.",
    "Genera l’immagine ironica di un genitore che dice di non avere preferenze sui ristoranti e boccia tutte le proposte ricevute.",
    "Genera l’immagine ironica di qualcuno che alza il volume della sveglia al massimo e poi riesce comunque a non sentirla.",
    "Genera l'immagine ironica di una persona che esce dal parrucchiere e, sotto la pioggia, si rovina i capelli appena fatti.",
    "Genera l’immagine ironica di qualcuno che mangia una pizza con extra formaggio e si rende conto di essere intollerante al lattosio.",
    "Genera l’immagine ironica di una persona che pianifica la dieta ma passa ogni giorno davanti a una pasticceria.",
    "Genera l’immagine ironica di qualcuno che ordina un pacco con spedizione rapida ma finisce per aspettarlo per settimane.",
    "Genera l’immagine ironica di un adulto che compra l’attrezzatura per fare palestra a casa e poi la usa per appendere vestiti.",
    "Genera l’immagine ironica di una persona che cambia look per una festa e scopre che l’evento è stato annullato.",
    "Genera l’immagine ironica di qualcuno che riceve una notifica di aggiornamento del telefono mentre cerca di scattare una foto importante.",
    "Genera l’immagine ironica di un adulto che pensa 'Quando ero piccolo, non vedevo l’ora di essere grande'.",
    "Genera l’immagine ironica di qualcuno che va a fare una passeggiata in montagna e si perde a 10 minuti dall’inizio.",
    "Genera l’immagine ironica di un adulto che si rende conto di preferire il divano a qualsiasi programma sociale.",
    "Genera l’immagine ironica di qualcuno che cerca di mangiare sano per un giorno e viene subito invitato a un pranzo ricco di dolci.",
    "Genera l’immagine ironica di una persona che vuole partire in vacanza ma ha dimenticato il caricatore del telefono.",
    "Genera l’immagine ironica di un adulto che prova a risparmiare per le vacanze e alla fine usa tutto per riparazioni domestiche.",
    "Genera l’immagine ironica di qualcuno che va a fare jogging e torna con la busta della spesa invece di correre.",
    "Genera l’immagine ironica di un adulto che scopre di avere più bollette che messaggi di amici sul telefono.",
    "Genera l’immagine ironica di qualcuno che prova a mangiare sano ma la tentazione del fast food è sempre dietro l’angolo.",
    "Genera l’immagine ironica di una persona che si sveglia presto per fare attività fisica, ma si riaddormenta subito.",
    "Genera l’immagine ironica di qualcuno che dimentica l'ombrello a casa e viene sorpreso da un temporale.",
    "Genera l’immagine ironica di un adulto che si lamenta per la musica rumorosa e poi si rende conto di averlo fatto per la prima volta.",
    "Genera l’immagine ironica di qualcuno che pianifica di dormire di più nel weekend, ma viene svegliato dai vicini rumorosi.",
    "Genera l’immagine ironica di un adulto che riceve una notifica di compleanno, ma realizza di non avere soldi per il regalo.",
    "Genera l’immagine ironica di una persona che cerca di fare colpo a un appuntamento e si rovescia il vino addosso.",
    "Genera l’immagine ironica di qualcuno che va a letto presto per dormire meglio e si sveglia ogni ora.",
    "Genera l’immagine ironica di un adulto che si lamenta del lavoro il lunedì e dimentica che venerdì era lo stesso lavoro.",
    "Genera l’immagine ironica di qualcuno che si iscrive in palestra e la prima volta prende l’ascensore invece delle scale.",
    "Genera l’immagine ironica di una persona che si prepara per un appuntamento e scopre di avere la cerniera rotta.",
    "Genera l'immagine ironica di un 30enne che si trova a dover pagare le bollette, pulire in casa, fare mansioni e non avere tempo libero, quando fino a poco tempo prima era un bambino e non doveva fare nulla.",
    "Genera l'immagine ironica della spia della macchina sempre in riserva e il tuo portafoglio sempre vuoto.",
    "Genera l'immagine ironica di una persona che si sveglia alle 6:00 del mattino per andare a lavorare e si ritrova a fare la spesa alle 23:00.",
    "Genera l'immagine ironica dell'insofferenza di una persona che si trova a dover fare la fila in posta.",
    "Genera l'immagine ironica di una persona che addenta un dolce pensando sia al cioccolato e scopre che è all'uvetta. (Cioccolato e uvetta si confondono)",
    "Genera l'immagine di una ragazza che ti dice 'Ti devo parlare': spoiler vuole lasciarti"
];

// Cache per memorizzare i prompt e gli URL delle immagini generate
const imageCache = {};

document.getElementById('generate-button').addEventListener('click', async () => {
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    const loadingBar = document.getElementById('loading-bar');
    const imageContainer = document.getElementById('image-container');
    const promptText = document.getElementById('prompt-text');

    // Mostra la barra di caricamento e il prompt scelto
    loadingBar.style.display = 'block';
    promptText.textContent = `Prompt: ${randomPrompt}`;
    imageContainer.innerHTML = '';

    // Controlla se l'immagine per il prompt è già nella cache
    if (imageCache[randomPrompt]) {
        // Usa l'immagine dalla cache
        const cachedImageUrl = imageCache[randomPrompt];
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
            imageCache[randomPrompt] = imageUrl;
        } catch (error) {
            console.error('Errore nella generazione dell\'immagine:', error);
            loadingBar.style.display = 'none';
            imageContainer.innerHTML = '<p>Errore nella generazione dell\'immagine. Riprova.</p>';
        }
    }
});