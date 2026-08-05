from flask import Blueprint, jsonify, request
from app.extensions import db
from app.models import MaintenanceRecord, Vehicle
from datetime import datetime, date

bp = Blueprint('maintenance', __name__)

@bp.route('/alerts', methods=['GET'])
def get_alerts():
    # Get vehicles with upcoming or overdue maintenance
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

@bp.route('/schedule', methods=['POST'])
def schedule_service():
    data = request.get_json()

    record = MaintenanceRecord(
        id=data.get('id'),
        vehicle_id=data.get('vehicleId'),
        service_type=data.get('serviceType'),
        service_date=datetime.strptime(data.get('serviceDate'), '%Y-%m-%d').date(),
        mechanic=data.get('mechanic', 'Unassigned'),
        cost=data.get('cost', 0),
        parts_used=data.get('partsUsed', ''),
        status='pending',
        next_due_date=datetime.strptime(data.get('nextDueDate'), '%Y-%m-%d').date() if data.get('nextDueDate') else None,
        notes=data.get('notes', '')
    )

    db.session.add(record)
    db.session.commit()

    return jsonify(record.to_dict()), 201

@bp.route('/complete/<id>', methods=['POST'])
def complete_service(id):
    record = MaintenanceRecord.query.get_or_404(id)
    data = request.get_json()

    record.status = 'completed'
    if data.get('cost'):
        record.cost = data['cost']
    if data.get('partsUsed'):
        record.parts_used = data['partsUsed']

    # Update vehicle next service date
    vehicle = Vehicle.query.get(record.vehicle_id)
    if vehicle and record.next_due_date:
        vehicle.next_service_date = record.next_due_date
        vehicle.last_service_date = record.service_date

    db.session.commit()
    return jsonify(record.to_dict())
