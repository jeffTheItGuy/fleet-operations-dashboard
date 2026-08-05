from app.extensions import db
from datetime import datetime

class ComplianceCheck(db.Model):
    __tablename__ = 'compliance_checks'

    id = db.Column(db.Integer, primary_key=True)
    department = db.Column(db.String(50), nullable=False, unique=True)
    staff_count = db.Column(db.Integer, default=0)

    # Backup compliance
    backup_status = db.Column(db.String(20), default='compliant')  # compliant, noncompliant
    last_backup = db.Column(db.DateTime)

    # Training compliance
    training_status = db.Column(db.String(20), default='compliant')  # compliant, pending
    last_training = db.Column(db.DateTime)

    # Policy acknowledgment
    policy_ack_rate = db.Column(db.Integer, default=100)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'department': self.department,
            'staffCount': self.staff_count,
            'backupStatus': self.backup_status,
            'lastBackup': self.last_backup.isoformat() if self.last_backup else None,
            'trainingStatus': self.training_status,
            'lastTraining': self.last_training.isoformat() if self.last_training else None,
            'policyAck': self.policy_ack_rate,
            'createdAt': self.created_at.isoformat(),
            'updatedAt': self.updated_at.isoformat()
        }
