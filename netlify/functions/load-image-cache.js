const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
    const cacheFilePath = path.resolve(__dirname, 'image-cache.json');

    try {
        const data = fs.readFileSync(cacheFilePath, 'utf8');
        const imageCache = JSON.parse(data);
        return {
            statusCode: 200,
            body: JSON.stringify(imageCache)
        };
    } catch (error) {
        console.error('Errore nel caricamento della cache delle immagini:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Errore nel caricamento della cache delle immagini' })
        };
    }
};