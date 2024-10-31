require('dotenv').config();

exports.handler = async function(event, context) {
    console.log('Evento ricevuto:', event);
    const { prompt } = JSON.parse(event.body);
    console.log('Prompt ricevuto:', prompt);

    const replicateApiToken = process.env.REPLICATE_API_TOKEN;

    if (!replicateApiToken) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'API token non configurato' })
        };
    }

    try {
        // Prima richiesta per creare la predizione
        const response = await fetch('https://api.replicate.com/v1/predictions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${replicateApiToken}`
            },
            body: JSON.stringify({
                version: 'a45f82a1382bed5c7aeb861dac7c7d191b0fdf74d8d57c4a0e6ed7d4d0bf7d24', // Sostituisci con l'ID corretto
                input: { prompt }
            })
        });

        if (!response.ok) {
            const errorDetails = await response.text();
            console.error('Errore nella risposta da Replicate API:', response.status, errorDetails);
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: 'Errore nella richiesta a Replicate API' })
            };
        }

        const prediction = await response.json();

        // Attendi finché la predizione non è completata
        let predictionResult = prediction;
        while (predictionResult.status !== 'succeeded' && predictionResult.status !== 'failed') {
            await new Promise(r => setTimeout(r, 1000));

            const resultResponse = await fetch(`https://api.replicate.com/v1/predictions/${prediction.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${replicateApiToken}`
                }
            });

            if (!resultResponse.ok) {
                const errorDetails = await resultResponse.text();
                console.error('Errore nell\'aggiornamento dello stato della predizione:', resultResponse.status, errorDetails);
                return {
                    statusCode: resultResponse.status,
                    body: JSON.stringify({ error: 'Errore nell\'aggiornamento dello stato della predizione' })
                };
            }

            predictionResult = await resultResponse.json(); // Assicurati di chiamare .json() una sola volta
            console.log('Stato attuale della predizione:', predictionResult.status);
        }

        if (predictionResult.status === 'succeeded') {
            const imageUrl = predictionResult.output[0];
            console.log('Immagine generata con successo:', imageUrl);
            return {
                statusCode: 200,
                body: JSON.stringify({ image_url: imageUrl })
            };
        } else {
            console.error('La generazione dell\'immagine è fallita:', predictionResult);
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Errore nella generazione dell\'immagine' })
            };
        }
    } catch (error) {
        console.error('Errore nella funzione serverless:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Errore interno del server' })
        };
    }
};