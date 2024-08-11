// Function to extract the video ID from the YouTube URL
function extractVideoId(url) {
    const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    console.log("Extracted video ID:", match ? match[1] : null);
    return match ? match[1] : null;
}

// Function to load the video in the iframe
function loadVideoInIframe(videoId) {
    const iframe = document.getElementById('video-player');
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    document.getElementById('video-wrapper').style.display = 'block';
    console.log("Video loaded in iframe with ID:", videoId);
}

// Function to fetch resolutions
function fetchResolutions(url) {
    const videoId = extractVideoId(url);
    
    if (videoId) {
        loadVideoInIframe(videoId);  // Load the video in the iframe

        // Show the loader
        document.getElementById('loader').style.display = 'block';
        console.log("Fetching resolutions for video ID:", videoId);

        fetch('/get_formats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: url })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Received data:", data);  // Log the received data

            // Hide the loader
            document.getElementById('loader').style.display = 'none';

            if (data.formats && data.formats.length > 0) {
                const formatSelect = document.getElementById('format-select');
                formatSelect.style.display = 'block';
                formatSelect.innerHTML = '<option value="">Select resolution</option>';
                data.formats.forEach(format => {
                    const option = document.createElement('option');
                    option.value = format.format_id;
                    option.text = `${format.resolution} (${format.ext}) - ${format.filesize ? (format.filesize / (1024 * 1024)).toFixed(2) + ' MB' : 'Unknown size'}`;
                    formatSelect.appendChild(option);
                });
                console.log("Resolutions loaded:", data.formats);
                document.getElementById('fetch-button').style.display = 'block';
                document.getElementById('refresh-button').style.display = 'block'; // Show the refresh button
            } else {
                console.log("No formats available for this video.");
                alert('No formats available.');
            }
        })
        .catch(error => {
            console.error('Error fetching formats:', error);
            // Hide the loader
            document.getElementById('loader').style.display = 'none';
            alert('Error fetching formats: ' + error.message);
        });
    } else {
        console.log("Invalid YouTube URL provided.");
        alert('Please enter a valid YouTube URL');
    }
}

// Event listener for pasting from clipboard
document.getElementById('paste-button').addEventListener('click', function() {
    navigator.clipboard.readText().then(text => {
        console.log("Clipboard content:", text);
        const urlField = document.getElementById('youtube-url');
        urlField.value = text;
        if (text && extractVideoId(text)) {
            fetchResolutions(text);  // Automatically fetch resolutions and load video
        } else {
            alert('Clipboard content is not a valid YouTube URL');
        }
    }).catch(err => {
        console.error('Failed to read clipboard contents:', err);
        alert('Could not paste from clipboard. Please try manually.');
    });
});

// Event listener for manual URL input (if user types URL manually)
document.getElementById('youtube-url').addEventListener('input', function() {
    const url = this.value;
    console.log("Manual URL input:", url);
    if (url && extractVideoId(url)) {
        fetchResolutions(url);  // Automatically fetch resolutions and load video
    }
});

// Event listener for the "Download Video" button
document.getElementById('fetch-button').addEventListener('click', function() {
    const url = document.getElementById('youtube-url').value;
    const formatId = document.getElementById('format-select').value;

    if (url && formatId) {
        console.log("Starting download for format ID:", formatId);
        fetch('/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: url, format_id: formatId })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to download video');
            }
            return response.blob();
        })
        .then(blob => {
            const downloadUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = 'video.mp4';  // You can set this dynamically based on the title or filename
            document.body.appendChild(a);
            a.click();
            a.remove();
            console.log("Download initiated for video.");
        })
        .catch(error => {
            console.error('Error downloading video:', error);
            alert('Error downloading video: ' + error.message);
        });
    } else {
        alert('Please select a resolution and enter a YouTube URL');
    }
});

// Event listener for the "Download Another Video" button
document.getElementById('refresh-button').addEventListener('click', function() {
    console.log("Page refresh initiated.");
    location.reload();
});
