# UnicornShid

UnicornShid is a web application that allows users to download YouTube videos by entering a YouTube URL. Users can select the video resolution and download the video directly from their browser.

## Features

- Paste YouTube URLs directly from the clipboard.
- Automatically fetch available video resolutions.
- Download videos in the selected resolution.
- Responsive design optimized for mobile devices.

**Note**: This version of UnicornShid can only download video and audio separately, not as a merged single file.

## Prerequisites

To run this project locally, you will need to have the following installed on your machine:

- **Python 3.7+**: Make sure you have Python installed. If not, download it from the [official Python website](https://www.python.org/downloads/).
- **pip**: This is the package installer for Python. It should come pre-installed with Python. You can check if you have it by running:
  
  ```bash
  pip --version
yt-dlp: A command-line program to download videos from YouTube and other video platforms.
Installation
Follow these steps to set up the project on your local machine.

1. Clone the Repository
First, you need to clone the repository from GitHub:

bash
Copy code
git clone https://github.com/yourusername/UnicornShid.git
cd UnicornShid
2. Set Up a Virtual Environment
It's recommended to use a virtual environment to manage your dependencies and avoid conflicts with other projects.

bash
Copy code
python -m venv venv
Activate the virtual environment:

On Windows:

bash
Copy code
venv\Scripts\activate
On macOS/Linux:

bash
Copy code
source venv/bin/activate
3. Install Python Dependencies
Install the required Python packages using pip:

bash
Copy code
pip install Flask yt-dlp
4. Install yt-dlp
Install yt-dlp directly using pip:

bash
Copy code
pip install yt-dlp
5. Running the Application
Once everything is set up, you can start the Flask development server:

bash
Copy code
flask run
This will start the application on http://127.0.0.1:5000/. You can access it by navigating to this URL in your web browser.

6. Deploying to Production
For production deployment, it is recommended to use a production-ready server like Gunicorn or a cloud service like Heroku, AWS, or DigitalOcean.

Project Structure
graphql
Copy code
UnicornShid/
│
├── static/
│   ├── styles.css     # Custom CSS for the application
│   └── scripts.js     # JavaScript functions and event listeners
│
├── templates/
│   └── index.html     # Main HTML file for the application
│
├── app.py             # Main Flask application file
├── requirements.txt   # Python dependencies
└── README.md          # Project documentation
Usage
Enter or paste a YouTube URL into the input field.
The video will be loaded into the embedded player.
Select a resolution from the dropdown menu.
Click the "Download Video" button to download the video.
Note: The downloaded video and audio will be separate files.

Contributing
Contributions are welcome! Please fork this repository and submit a pull request for review.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgments
yt-dlp for providing the video downloading capabilities.
Flask for the web framework.


### How to Add This to GitHub:

1. **Add the README.md**: Place this `README.md` file in the root directory of your project.
2. **Commit and Push**: Commit the changes and push them to your GitHub repository.

```bash
git add README.md
git commit -m "Added README.md for UnicornShid"
git push origin main
