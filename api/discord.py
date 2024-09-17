from models import Thread
import requests
import os
import string

BASE62_ALPHABET = string.digits + string.ascii_letters


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
        return res.json()

    def get_encrypted_key_by_thread_id(self, thread_id: str):
        num = int(thread_id)  # Convert string to integer (base-10)
        if num == 0:
            return BASE62_ALPHABET[0]

        base62 = []
        base = len(BASE62_ALPHABET)  # Base-62

        while num > 0:
            num, remainder = divmod(num, base)
            base62.append(BASE62_ALPHABET[remainder])

        return "".join(reversed(base62))

    def get_thread_id_by_login_id(self, login_id: str):
        base = len(BASE62_ALPHABET)
        num = 0

        for char in login_id:
            num = num * base + BASE62_ALPHABET.index(char)

        return str(num)
