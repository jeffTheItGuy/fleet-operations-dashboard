from flask import Blueprint, jsonify
from app.extensions import db
from app.models import MaintenanceRecord, Vehicle
from datetime import date

bp = Blueprint('maintenance', __name__)

@bp.route('/alerts', methods=['GET'])
def get_alerts():
    today = date.today()
    vehicles = Vehicle.query.filter(
        db.or_(
            Vehicle.next_service_date <= today,
            Vehicle.next_service_date <= db.func.date_add(today, db.text("INTERVAL '14 days'"))
        )
    ).all()

    alerts = []
    for v in vehicles:
        is_overdue = v.next_service_date and v.next_service_date < today
        alerts.append({
            'id': f"ALT-{v.id}",
            'vehicle': v.id,
            'type': 'Service Due',
            'dueDate': v.next_service_date.isoformat() if v.next_service_date else None,
            'dueIn': (v.next_service_date - today).days if v.next_service_date else 0,
            'trigger': f"Mileage: {v.mileage:,} km" if v.fuel_type == 'combustion' else f"Battery Health Check",
            'status': 'overdue' if is_overdue else 'pending',
            'assignedTo': 'Unassigned'
        })

    return jsonify(alerts)

@bp.route('/log', methods=['GET'])
def get_service_log():
    records = MaintenanceRecord.query.order_by(MaintenanceRecord.service_date.desc()).all()
    return jsonify([r.to_dict() for r in records])
