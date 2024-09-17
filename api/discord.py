from models import Message, Thread
import requests
import os


class DiscordApi:
    def __init__(self):
        self.channel_id = os.getenv("DISCORD_CHANNEL_ID")
        self.auth_token = os.getenv("DISCORD_AUTH_TOKEN")
        self.bot_id = os.getenv("DISCORD_BOT_ID")
        self.headers = {
            "Authorization": f"Bot {self.auth_token}",
            "Accept": "*/*",
            "Content-Type": "application/json",
        }

    def start_thread(self, name: str) -> Thread:
        res = requests.post(
            url=f"https://discord.com/api/v10/channels/{self.channel_id}/threads",
            json={
                "name": name,
                "auto_archive_duration": 10080,
            },
            headers=self.headers,
        )
        res.raise_for_status()
        return Thread(**res.json())

    def add_bot_to_thread(self, thread_id: str):
        res = requests.put(
            url=f"https://discord.com/api/v10/channels/{thread_id}/thread-members/{self.bot_id}",
            headers=self.headers,
        )
        res.raise_for_status()

    def create_thread_message(self, message: str, thread_id: str, meta=False):
        data = {
            "content": message,
        }
        if meta:
            data.setdefault("embeds", [{"title": "Meta"}])
        res = requests.post(
            url=f"https://discord.com/api/v10/channels/{thread_id}/messages",
            json=data,
            headers=self.headers,
        )
        res.raise_for_status()
        return res.json()

    def get_thread_messages(self, thread_id: str):
        res = requests.get(
            url=f"https://discord.com/api/v10/channels/{thread_id}/messages",
            headers=self.headers,
        )
        res.raise_for_status()
        return [Message(**message) for message in res.json()]
