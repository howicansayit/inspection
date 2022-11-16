import eel
import requests
import json
import webbrowser

eel.init('web')

TOKEN = 'Bot MTAzMTk0MjU0MDcwMzgyNTk0MQ.GDuJnG.aa6dwq0YCwHsyYD83I0JFudLvsJ6Y7amK1Rmpw'

@eel.expose
def get_inspection_reports():
    url = "https://discord.com/api/channels/1026204385417633902/messages?limit=100"
    response = requests.request("GET", url, headers={
        'Authorization': TOKEN,
    })
    return response.text

@eel.expose
def send_report_embed(inspector_data, text):
    inspector_data = json.loads(inspector_data)
    url = "https://discord.com/api/channels/1026204385417633902/messages"
    response = requests.request("POST", url, headers = {
        'Authorization': TOKEN,
        'Content-Type': 'application/json',
    }, data = json.dumps({
        "embeds": [
            {
                "title": "REPORT",
                "description": text,
                "author": {
                    "name": inspector_data["user"]["username"],
                    "icon_url": "https://cdn.discordapp.com/avatars/" + inspector_data["user"]["id"] + "/" + inspector_data["user"]["avatar"]
                }
            }
        ]
    }))
    return response.text

@eel.expose
def eel_exit():
    exit()

eel.start("auth.html", size=(1200, 750), shutdown_delay=0.1, port=8000)