from pydantic import BaseModel, Field
from typing import Optional
import logging

logger = logging.getLogger(__name__)

class BatteryReading(BaseModel):
    device_id: str
    voltage: float = Field(..., ge=40.0, le=55.0)
    temperature: float = Field(..., ge=-10.0, le=60.0)

class HealthScore(BaseModel):
    device_id: str
    score: float = Field(..., ge=0.0, le=1.0)
    grade: str
    message: Optional[str] = None
