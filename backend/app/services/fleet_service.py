from app.models import Vehicle
from app.extensions import db

def get_fleet_summary():
    """Get aggregated fleet statistics."""
    total = Vehicle.query.count()
    ev_count = Vehicle.query.filter_by(fuel_type='electric').count()
    combustion_count = Vehicle.query.filter_by(fuel_type='combustion').count()
    active = Vehicle.query.filter_by(status='active').count()
    maintenance = Vehicle.query.filter(Vehicle.status.in_(['maintenance', 'critical'])).count()

    return {
        'total': total,
        'ev': ev_count,
        'combustion': combustion_count,
        'active': active,
        'maintenance': maintenance,
        'evPercentage': round((ev_count / total * 100), 1) if total > 0 else 0
    }

def get_vehicles_due_service(days=14):
    """Get vehicles due for service within specified days."""
    from datetime import date, timedelta
    target_date = date.today() + timedelta(days=days)

    return Vehicle.query.filter(
        Vehicle.next_service_date <= target_date
    ).all()
