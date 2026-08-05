from flask import Blueprint, jsonify
from app.models import ComplianceCheck

bp = Blueprint('compliance', __name__)

@bp.route('/departments', methods=['GET'])
def get_departments():
    depts = ComplianceCheck.query.all()
    return jsonify([d.to_dict() for d in depts])
