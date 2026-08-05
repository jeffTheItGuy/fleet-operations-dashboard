from flask import Blueprint, jsonify, request
from app.extensions import db
from app.models import ComplianceCheck

bp = Blueprint('compliance', __name__)

@bp.route('/departments', methods=['GET'])
def get_departments():
    depts = ComplianceCheck.query.all()
    return jsonify([d.to_dict() for d in depts])

@bp.route('/departments/<int:id>/backup', methods=['PATCH'])
def update_backup_status(id):
    dept = ComplianceCheck.query.get_or_404(id)
    data = request.get_json()

    if 'backupStatus' in data:
        dept.backup_status = data['backupStatus']
    if 'lastBackup' in data:
        from datetime import datetime
        dept.last_backup = datetime.fromisoformat(data['lastBackup'])

    db.session.commit()
    return jsonify(dept.to_dict())

@bp.route('/departments/<int:id>/training', methods=['PATCH'])
def update_training_status(id):
    dept = ComplianceCheck.query.get_or_404(id)
    data = request.get_json()

    if 'trainingStatus' in data:
        dept.training_status = data['trainingStatus']
    if 'lastTraining' in data:
        from datetime import datetime
        dept.last_training = datetime.fromisoformat(data['lastTraining'])
    if 'policyAck' in data:
        dept.policy_ack_rate = data['policyAck']

    db.session.commit()
    return jsonify(dept.to_dict())
