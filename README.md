Here is the full content of the README.md file formatted for you to copy and paste directly:

```markdown
# UnicornShid

**UnicornShid** is a command-line tool and web application to download videos from YouTube and other video platforms.

## Installation

Follow these steps to set up the project on your local machine.

### 1. Clone the Repository

First, you need to clone the repository from GitHub:

```bash
git clone https://github.com/Swotboysandy/UnicornShid.git
cd UnicornShid
```

### 2. Set Up a Virtual Environment

It's recommended to use a virtual environment to manage your dependencies and avoid conflicts with other projects.

**On Windows:**

```bash
python -m venv venv
venv\Scripts\activate
```

**On macOS/Linux:**

```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Python Dependencies

Install the required Python packages using pip:

```bash
pip install -r requirements.txt
```

### 4. Install `yt-dlp`

Install `yt-dlp` directly using pip:

```bash
pip install yt-dlp
```

### 5. Running the Application

Once everything is set up, you can start the Flask development server:

```bash
flask run
```

This will start the application on [http://127.0.0.1:5000/](http://127.0.0.1:5000/). You can access it by navigating to this URL in your web browser.

## Usage

1. Enter or paste a YouTube URL into the input field.
2. The video will be loaded into the embedded player.
3. Select a resolution from the dropdown menu.
4. Click the "Download Video" button to download the video.

**Note:** The downloaded video and audio will be separate files.

## Project Structure

The project structure is as follows:

```
UnicornShid/
│
├── static/
│   ├── styles.css        # Custom CSS for the application
│   └── scripts.js        # JavaScript functions and event listeners
│
├── templates/
│   └── index.html        # Main HTML file for the application
│
├── app.py                # Main Flask application file
├── requirements.txt      # Python dependencies
└── README.md             # Project documentation
```

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request for review.

---

**Important:** This version of the application can only download video and audio separately, not as a single merged file.
```
