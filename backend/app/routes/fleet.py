from flask import Blueprint, jsonify
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
