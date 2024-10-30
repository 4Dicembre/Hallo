const prompts = [
    "Un paesaggio surreale con montagne fluttuanti",
    "Un ritratto in stile Picasso di un gatto",
    "Una città futuristica al tramonto",
    "Un robot che dipinge un quadro",
    "Una foresta incantata con creature magiche"
];

document.getElementById('generate-button').addEventListener('click', async () => {
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    try {
        const response = await fetch('/.netlify/functions/generate-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: randomPrompt })
        });
        const data = await response.json();
        const imageUrl = data.image_url;
        const imageContainer = document.getElementById('image-container');
        imageContainer.innerHTML = `<img src="${imageUrl}" alt="Immagine generata" />`;
    } catch (error) {
        console.error('Errore nella generazione dell\'immagine:', error);
    }
});