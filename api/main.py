"""
Proxy for discord - used to go around discords stupid cors policy
Now also used for other backend tasks as fetching github and location data
"""

from fastapi import APIRouter, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from geopy.geocoders import Nominatim

from models import InitThreadData, Message, MessageDataResponse, InitThreadResponse
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


@thread_router.post("/login")
def get_thread_id(login_id: str) -> str:
    api = DiscordApi()
    return api.get_thread_id_by_login_id(login_id)


@thread_router.get("/key")
def get_login_id(thread_id: str) -> str:
    api = DiscordApi()
    return api.get_encrypted_key_by_thread_id(thread_id)


@thread_router.post("/init")
def init_conversation(data: InitThreadData) -> InitThreadResponse:
    # Start new thread
    api = DiscordApi()
    thread = api.start_thread(data.name)
    api.add_bot_to_thread(thread.id)

    ## Meta data
    api.create_thread_message(message=data.meta, thread_id=thread.id, meta=True)

    ## Initial message
    api.create_thread_message(message=data.message, thread_id=thread.id)

    return thread


@thread_router.post("/message")
def create_thread_message(data: MessageDataResponse):
    api = DiscordApi()
    return api.create_thread_message(
        message=data.message, thread_id=data.thread_id, meta=data.meta
    )


@thread_router.get("/messages")
def get_thread_message(thread_id: str, exclude_meta: bool = True) -> list[Message]:
    api = DiscordApi()
    messages = [
        Message(**message) for message in api.get_thread_messages(thread_id=thread_id)
    ]
    if exclude_meta:
        return filter(lambda x: len(x.embeds) == 0 and x.content != "", messages)
    return messages


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
