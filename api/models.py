from typing import Optional, List
from pydantic import BaseModel, RootModel
from datetime import datetime


class ThreadMetadata(BaseModel):
    archived: bool
    archive_timestamp: datetime
    auto_archive_duration: int
    locked: bool
    create_timestamp: datetime
    invitable: bool


class Member(BaseModel):
    id: str
    user_id: str
    join_timestamp: datetime
    flags: int
    muted: bool
    mute_config: Optional[str]


class Thread(BaseModel):
    id: str
    type: int
    last_message_id: Optional[str]
    flags: int
    guild_id: str
    name: str
    parent_id: str
    rate_limit_per_user: int
    bitrate: int
    user_limit: int
    rtc_region: Optional[str]
    owner_id: str
    thread_metadata: ThreadMetadata
    message_count: int
    member_count: int
    total_message_sent: int
    member: Member


# TODO: add pydantic validators
class InitThreadData(BaseModel):
    name: str
    phone: str
    email: str
    message: str
    meta: str


class User(BaseModel):
    id: str
    username: str
    avatar: Optional[str]
    discriminator: str
    public_flags: int
    flags: int
    bot: bool
    banner: Optional[str]
    accent_color: Optional[str]
    global_name: Optional[str]
    avatar_decoration_data: Optional[dict]
    banner_color: Optional[str]
    clan: Optional[str]


class Embed(BaseModel):
    type: str
    title: Optional[str]
    content_scan_version: Optional[int]


class Mention(BaseModel):
    id: str
    username: str
    avatar: Optional[str]
    discriminator: str
    public_flags: int
    flags: int
    banner: Optional[str]
    accent_color: Optional[str]
    global_name: Optional[str]
    avatar_decoration_data: Optional[dict]
    banner_color: Optional[str]
    clan: Optional[str]


class Message(BaseModel):
    type: int
    content: str
    mentions: List[Mention]
    mention_roles: List[str]  # Assuming roles are represented by their IDs as strings
    attachments: List[
        dict
    ]  # Assuming attachments are represented by generic dictionaries
    embeds: List[Embed]
    timestamp: str
    edited_timestamp: Optional[str]
    flags: int
    components: List[
        dict
    ]  # Assuming components are represented by generic dictionaries
    id: str
    channel_id: str
    author: User
    pinned: bool
    mention_everyone: bool
    tts: bool
    position: Optional[int]  # This field is not present in all objects
