from pydantic import BaseModel,Field
from uuid import UUID,uuid4
class User(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    name: str
    email: str
    password: str