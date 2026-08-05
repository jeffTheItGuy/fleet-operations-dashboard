from flask import Blueprint, jsonify
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
