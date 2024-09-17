"""
Proxy for discord - used to go around discords stupid cors policy
"""

from fastapi import APIRouter, FastAPI
import requests
from fastapi.middleware.cors import CORSMiddleware
import os
from geopy.geocoders import Nominatim

from models import InitThreadData
from discord import DiscordApi
from github import GithubApi


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
HEADERS = {
    "Authorization": f"Bot {AUTH_TOKEN}",
    "Accept": "*/*",
    "Content-Type": "application/json",
}


api_router = APIRouter(
    prefix="/api/v1",
    responses={404: {"description": "Not found"}},
)

discord_router = APIRouter(
    prefix="/discord",
    tags=["discord"],
    responses={404: {"description": "Not found"}},
)

thread_router = APIRouter(
    prefix="/thread",
    tags=["thread"],
    responses={404: {"description": "Not found"}},
)

github_router = APIRouter(
    prefix="/github",
    tags=["github"],
    responses={404: {"description": "Not found"}},
)

location_router = APIRouter(
    prefix="/location",
    tags=["location"],
    responses={404: {"description": "Not found"}},
)


# New endpoint to init thread - merges endpoints: startNewThread, addBotToThread and createThreadMessage
@thread_router.post("/init")
def init_conversation(data: InitThreadData):
    # Start new thread
    api = DiscordApi()
    thread = api.start_thread(data.name)
    api.add_bot_to_thread(thread.id)

    ## Meta data
    api.create_thread_message(message=data.meta, thread_id=thread.id, meta=True)

    ## Initial message
    api.create_thread_message(message=data.message, thread_id=thread.id)

    return thread


# TODO: include in init-conversation
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


# TODO: include in init-conversation
@app.put("/addBotToThread")
def add_bot_to_thread(thread_id: str):
    res = requests.put(
        url=f"https://discord.com/api/v10/channels/{thread_id}/thread-members/{BOT_ID}",
        headers=HEADERS,
    )
    res.raise_for_status()
    return


@thread_router.post("/message")
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


@thread_router.get("/messages")
def get_thread_message(thread_id: str):
    api = DiscordApi()
    return api.get_thread_messages(thread_id=thread_id)


@github_router.get("/repos")
def get_gh_repos():
    api = GithubApi()
    return api.get_repos()


@github_router.get("/languages")
def get_gh_languages(url: str):
    api = GithubApi()
    return api.get_langugages(url)


@location_router.get("/name")
def get_name_from_long_lat(long: str, lat: str):
    geolocator = Nominatim(user_agent="robin.moreno.rinding@gmail.com")
    location = geolocator.reverse(f"{lat},{long}")
    return location.raw


discord_router.include_router(thread_router)
api_router.include_router(discord_router)
api_router.include_router(location_router)
api_router.include_router(github_router)
app.include_router(api_router)
