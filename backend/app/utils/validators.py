import re
from datetime import datetime

def validate_email(email):
    """Validate email format."""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def validate_vehicle_id(vehicle_id):
    """Validate vehicle ID format (e.g., EV-001, ZUP-104)."""
    pattern = r'^[A-Z]{2,3}-\d{3}$'
    return re.match(pattern, vehicle_id) is not None

def validate_date_string(date_str, format='%Y-%m-%d'):
    """Validate date string format."""
    try:
        datetime.strptime(date_str, format)
        return True
    except ValueError:
        return False

def sanitize_input(text, max_length=500):
    """Sanitize user input to prevent injection."""
    if not text:
        return ''
    text = str(text).strip()
    if len(text) > max_length:
        text = text[:max_length]
    text = text.replace('<script>', '').replace('</script>', '')
    return text
