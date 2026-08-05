from flask import Blueprint, jsonify, request
from app.extensions import db
from app.models import Route, Incident

bp = Blueprint('transport', __name__)

@bp.route('/routes', methods=['GET'])
def get_routes():
    routes = Route.query.all()
    return jsonify([r.to_dict() for r in routes])

@bp.route('/incidents', methods=['GET'])
def get_incidents():
    incidents = Incident.query.order_by(Incident.reported_at.desc()).all()
    return jsonify([i.to_dict() for i in incidents])

@bp.route('/incidents', methods=['POST'])
def report_incident():
    data = request.get_json()

    incident = Incident(
        id=data.get('id'),
        vehicle_id=data.get('vehicle'),
        driver=data.get('driver'),
        incident_type=data.get('type'),
        severity=data.get('severity', 'low'),
        description=data.get('description'),
        location=data.get('location'),
        assigned_to=data.get('assignedTo', 'Unassigned')
    )

    db.session.add(incident)
    db.session.commit()

    return jsonify(incident.to_dict()), 201

@bp.route('/incidents/<id>/status', methods=['PATCH'])
def update_incident_status(id):
    incident = Incident.query.get_or_404(id)
    data = request.get_json()

    if 'status' in data:
        incident.status = data['status']
    if 'assignedTo' in data:
        incident.assigned_to = data['assignedTo']

    db.session.commit()
    return jsonify(incident.to_dict())
