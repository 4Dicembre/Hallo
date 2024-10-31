const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
    const cacheFilePath = path.resolve(__dirname, 'image-cache.json');
    const imageCache = JSON.parse(event.body);

    try {
        fs.writeFileSync(cacheFilePath, JSON.stringify(imageCache, null, 2), 'utf8');
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Cache salvata con successo' })
        };
    } catch (error) {
        console.error('Errore nel salvataggio della cache delle immagini:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Errore nel salvataggio della cache delle immagini' })
        };
    }
};