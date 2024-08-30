export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }


    const { videoId } = req.query;

    if (!videoId) {
        return res.status(400).json({ error: 'Video ID is required' });
    }

    // Construct YouTube thumbnail URL
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    try {
        // Fetch the thumbnail URL to ensure it's valid
        const response = await fetch(thumbnailUrl);

        if (!response.ok) {
            return res.status(404).json({ error: 'Thumbnail not found' });
        }

        // Send the thumbnail URL as a JSON response
        res.status(200).json({ thumbnailUrl });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch thumbnail' });
    }
}