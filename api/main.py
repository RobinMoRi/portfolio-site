"""
Proxy for discord - used to go around discords stupid cors policy
Now also used for other backend tasks as fetching github and location data
"""

import secrets
from fastapi import APIRouter, FastAPI, Depends, HTTPException, Request, status
from contextlib import asynccontextmanager
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi_limiter import FastAPILimiter
from fastapi_limiter.depends import RateLimiter
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.docs import get_swagger_ui_html
from fastapi.staticfiles import StaticFiles
from geopy.geocoders import Nominatim
from datetime import datetime
import redis.asyncio as redis

from models import InitThreadData, Message, MessageDataResponse, InitThreadResponse
from discord import DiscordApi
from github import GithubApi


# TODO: Fix redis hos
@asynccontextmanager
async def lifespan(_: FastAPI):
    redis_connection = redis.from_url("redis://redis-dev/0", encoding="utf8")
    await FastAPILimiter.init(redis_connection)
    yield
    await FastAPILimiter.close()


app = FastAPI(
    lifespan=lifespan,
    docs_url=None,
    redoc_url=None,
    openapi_url=None,
)

security = HTTPBasic()

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

favicon_path = "favicon.ico"

app.mount("/static", StaticFiles(directory="static"), name="static")


## TODO: Put username and password in .env
def get_current_username(credentials: HTTPBasicCredentials = Depends(security)):
    correct_username = secrets.compare_digest(credentials.username, "user")
    correct_password = secrets.compare_digest(credentials.password, "password")
    if not (correct_username and correct_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username


@app.get("/docs")
async def get_documentation(
    request: Request, username: str = Depends(get_current_username)
):
    print(request.scope.get("root_path"))
    return get_swagger_ui_html(
        openapi_url=request.scope.get("root_path") + "/openapi.json", title="docs"
    )


@thread_router.post("/login")
def get_thread_id(login_id: str) -> str:
    api = DiscordApi()
    return api.get_thread_id_by_login_id(login_id)


@thread_router.get("/key")
def get_login_id(thread_id: str) -> str:
    api = DiscordApi()
    return api.get_encrypted_key_by_thread_id(thread_id)


@thread_router.post("/init", dependencies=[Depends(RateLimiter(times=2, hours=1))])
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

    messages.sort(
        key=lambda x: datetime.strptime(x.timestamp, "%Y-%m-%dT%H:%M:%S.%f%z")
    )
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
