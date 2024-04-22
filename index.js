const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;
const axios = require( 'axios' );

app.use(express.static(path.join(__dirname, 'public')));


async function searchOnFacebook(id) {
    const accessToken = '6628568379|c1e620fa708a1d5696fb991c1bde5662';
    const url = `https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=${accessToken}&type=large`; // Specify type=large to get the image in PNG format
    
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        return response.data; 
    } catch (error) {
        console.error('Error searching on Facebook:', error.response.data);
        throw new Error('Failed to search on Facebook');
    }
}

app.get('/profilePicture', async (req, res) => {
    const userId = req.query.userId; 
    try {
        const profilePictureData = await searchOnFacebook(userId);
        res.set('Content-Type', 'image/png'); 
        res.send(profilePictureData); 
    } catch (error) {
        console.error('Error fetching profile picture:', error.message);
        res.status(500).json({ error: 'Failed to fetch profile picture' });
    }
});




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
