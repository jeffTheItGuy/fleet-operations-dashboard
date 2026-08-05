from flask import Blueprint, jsonify, request
from app.extensions import db
from app.models import Vehicle

bp = Blueprint('fleet', __name__)

@bp.route('/ev', methods=['GET'])
def get_ev_fleet():
    vehicles = Vehicle.query.filter_by(fuel_type='electric').all()
    return jsonify([v.to_dict() for v in vehicles])

@bp.route('/combustion', methods=['GET'])
def get_combustion_fleet():
    vehicles = Vehicle.query.filter_by(fuel_type='combustion').all()
    return jsonify([v.to_dict() for v in vehicles])

@bp.route('/vehicles/<id>', methods=['GET'])
def get_vehicle(id):
    vehicle = Vehicle.query.get_or_404(id)
    return jsonify(vehicle.to_dict())

@bp.route('/vehicles/<id>/status', methods=['PATCH'])
def update_vehicle_status(id):
    vehicle = Vehicle.query.get_or_404(id)
    data = request.get_json()

    if 'status' in data:
        vehicle.status = data['status']
    if 'batteryLevel' in data:
        vehicle.battery_level = data['batteryLevel']
    if 'fuelLevel' in data:
        vehicle.fuel_level = data['fuelLevel']
    if 'location' in data:
        vehicle.location = data['location']

    db.session.commit()
    return jsonify(vehicle.to_dict())

@bp.route('/stats', methods=['GET'])
def get_fleet_stats():
    total = Vehicle.query.count()
    ev = Vehicle.query.filter_by(fuel_type='electric').count()
    combustion = Vehicle.query.filter_by(fuel_type='combustion').count()
    active = Vehicle.query.filter_by(status='active').count()
    maintenance = Vehicle.query.filter(Vehicle.status.in_(['maintenance', 'critical'])).count()
    critical = Vehicle.query.filter_by(status='critical').count()

    return jsonify({
        'total': total,
        'ev': ev,
        'combustion': combustion,
        'active': active,
        'maintenance': maintenance,
        'critical': critical
    })
