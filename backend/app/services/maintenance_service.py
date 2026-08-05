from app.models import MaintenanceRecord, Vehicle
from app.extensions import db
from datetime import datetime

def calculate_maintenance_costs(year=None):
    """Calculate YTD maintenance costs by category."""
    if year is None:
        year = datetime.now().year

    records = MaintenanceRecord.query.filter(
        db.extract('year', MaintenanceRecord.service_date) == year,
        MaintenanceRecord.status == 'completed'
    ).all()

    costs = {}
    for r in records:
        category = categorize_service(r.service_type)
        costs[category] = costs.get(category, 0) + float(r.cost)

    return costs

def categorize_service(service_type):
    """Categorize a service type into a cost category."""
    service_type = service_type.lower()

    if any(word in service_type for word in ['engine', 'transmission', 'overhaul']):
        return 'Engine & Transmission'
    elif any(word in service_type for word in ['brake', 'pad']):
        return 'Brake Systems'
    elif any(word in service_type for word in ['battery', 'electrical', 'software']):
        return 'Electrical & Battery'
    elif any(word in service_type for word in ['tire', 'suspension']):
        return 'Tires & Suspension'
    elif any(word in service_type for word in ['body', 'paint']):
        return 'Body & Paint'
    else:
        return 'General Service'

def get_overdue_maintenance():
    """Get all overdue maintenance records."""
    from datetime import date
    today = date.today()

    return Vehicle.query.filter(
        Vehicle.next_service_date < today
    ).all()
