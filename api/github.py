import os
import requests


class GithubApi:
    def __init__(self):
        self.auth_token = os.getenv("VITE_GITHUB_API_TOKEN")
        self.headers = {
            "accept": "application/vnd.github+json",
            "authorization": f"Bearer {self.auth_token}",
            "X-GitHub-Api-Version": "2022-11-28",
        }

    def _get(self, url: str):
        res = requests.get(
            url=url,
            headers=self.headers,
        )
        res.raise_for_status()
        return res.json()

    def get_repos(self):
        return self._get("https://api.github.com/user/repos")

    def get_langugages(self, url):
        return self._get(url)
