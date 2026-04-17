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

def calculate_health_score(reading: BatteryReading) -> HealthScore:
    voltage_score = (reading.voltage - 40.0) / 15.0
    temp_score = 1.0 - (abs(reading.temperature - 25.0) / 35.0)
    score = round((voltage_score * 0.7) + (temp_score * 0.3), 2)

    if score >= 0.8:
        grade, message = "A", "Battery operating optimally"
    elif score >= 0.6:
        grade, message = "B", "Battery operating normally"
    elif score >= 0.4:
        grade, message = "C", "Battery performance degraded"
    else:
        grade, message = "D", "Battery requires immediate attention"

    logger.info(f"Health score for the {reading.device_id}: {score} ({grade})")
    return HealthScore(device_id=reading.device_id, score=score, grade=grade, message=message)