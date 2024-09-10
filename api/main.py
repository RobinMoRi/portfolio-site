"""
Proxy for discord - used to go around discords stupid cors policy
"""

from fastapi import FastAPI
import requests
from fastapi.middleware.cors import CORSMiddleware
import os
from geopy.geocoders import Nominatim


app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:8000",
    "https://www.romori.se",
    "https://romori.se",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


CHANNEL_ID = os.getenv("DISCORD_CHANNEL_ID")
BOT_ID = os.getenv("DISCORD_BOT_ID")
AUTH_TOKEN = os.getenv("DISCORD_AUTH_TOKEN")
GITHUB_API_TOKEN = os.getenv("VITE_GITHUB_API_TOKEN")
HEADERS = {
    "Authorization": f"Bot {AUTH_TOKEN}",
    "Accept": "*/*",
    "Content-Type": "application/json",
}


GITHUB_API_HEADERS = {
    "accept": "application/vnd.github+json",
    "authorization": f"Bearer {GITHUB_API_TOKEN}",
    "X-GitHub-Api-Version": "2022-11-28",
}


@app.post("/startNewThread")
def start_new_thread(name: str):
    res = requests.post(
        url=f"https://discord.com/api/v10/channels/{CHANNEL_ID}/threads",
        json={
            "name": name,
            "auto_archive_duration": 10080,
        },
        headers=HEADERS,
    )
    res.raise_for_status()
    return res.json()


@app.put("/addBotToThread")
def add_bot_to_thread(thread_id: str):
    res = requests.put(
        url=f"https://discord.com/api/v10/channels/{thread_id}/thread-members/{BOT_ID}",
        headers=HEADERS,
    )
    res.raise_for_status()
    return


@app.post("/createThreadMessage")
def create_thread_message(message: str, thread_id: str, meta=False):
    data = {
        "content": message,
    }
    if meta:
        data.setdefault("embeds", [{"title": "Meta"}])
    res = requests.post(
        url=f"https://discord.com/api/v10/channels/{thread_id}/messages",
        json=data,
        headers=HEADERS,
    )
    res.raise_for_status()
    return res.json()


@app.get("/getThreadMessages")
def get_thread_message(thread_id: str):
    res = requests.get(
        url=f"https://discord.com/api/v10/channels/{thread_id}/messages",
        headers=HEADERS,
    )
    res.raise_for_status()
    return res.json()


@app.get("/getGithubRepos")
def get_gh_repos():
    res = requests.get(
        url="https://api.github.com/user/repos",
        headers=GITHUB_API_HEADERS,
    )
    res.raise_for_status()
    return res.json()


@app.get("/getGithubLanguages")
def get_gh_languages(url: str):
    res = requests.get(
        url=url,
        headers=GITHUB_API_HEADERS,
    )
    res.raise_for_status()
    return res.json()


@app.get("/locationNameFromLongLat")
def get_name_from_long_lat(long: str, lat: str):
    geolocator = Nominatim(user_agent="robin.moreno.rinding@gmail.com")
    location = geolocator.reverse(f"{lat},{long}")
    return location.raw
