from flask import Flask, render_template, request, jsonify, send_file
import yt_dlp
import os
import json

app = Flask(__name__)

DOWNLOAD_DIR = "downloads"

# Ensure the download directory exists
if not os.path.exists(DOWNLOAD_DIR):
    os.makedirs(DOWNLOAD_DIR)

@app.after_request
def add_header(response):
    response.headers['Cache-Control'] = 'no-store'
    return response


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_formats', methods=['POST'])
def get_formats():
    data = request.json
    url = data.get('url')
    if not url:
        return jsonify({'error': 'No URL provided'}), 400

    ydl_opts = {
        'quiet': True,
        'no_warnings': True,
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info_dict = ydl.extract_info(url, download=False)
            print(json.dumps(info_dict, indent=4))  # Pretty print the JSON output

            # Simplified filtering logic to capture all valid formats
            formats = [{
                'format_id': f.get('format_id'),
                'format_note': f.get('format_note', 'unknown'),
                'ext': f.get('ext'),
                'filesize': f.get('filesize', 'unknown'),
                'resolution': f.get('resolution', f"{f.get('width', 'unknown')}x{f.get('height', 'unknown')}"),
            } for f in info_dict.get('formats', []) if f.get('format_id') and f.get('resolution') != 'unknownxunknown']

            # Debugging: Print the formats that are being sent to the frontend
            print("Formats to send:", formats)

            if formats:
                return jsonify({'formats': formats})
            else:
                return jsonify({'formats': []})
    except Exception as e:
        return jsonify({'error': str(e)}), 500



@app.route('/download', methods=['POST'])
def download_video():
    data = request.json
    url = data.get('url')
    format_id = data.get('format_id')

    print(f"Downloading video with format ID: {format_id}")  # Log the format ID

    if not url or not format_id:
        return jsonify({'error': 'No URL or format ID provided'}), 400

    ydl_opts = {
        'format': format_id,
        'outtmpl': os.path.join(DOWNLOAD_DIR, '%(title)s.%(ext)s'),
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info_dict = ydl.extract_info(url, download=True)
            filename = ydl.prepare_filename(info_dict)
            return send_file(filename, as_attachment=True)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, port=8000)
