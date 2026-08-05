from app.extensions import db
from datetime import datetime

class Incident(db.Model):
    __tablename__ = 'incidents'

    id = db.Column(db.String(30), primary_key=True)
    vehicle_id = db.Column(db.String(20), db.ForeignKey('vehicles.id'), nullable=False)
    driver = db.Column(db.String(100), nullable=False)
    incident_type = db.Column(db.String(50), nullable=False)  # Mechanical, Electrical, Road Hazard, Passenger
    severity = db.Column(db.String(20), default='low')  # low, medium, high
    description = db.Column(db.Text, nullable=False)
    location = db.Column(db.String(200), nullable=False)
    reported_at = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(20), default='open')  # open, inprogress, resolved
    assigned_to = db.Column(db.String(100))

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'vehicle': self.vehicle_id,
            'driver': self.driver,
            'type': self.incident_type,
            'severity': self.severity,
            'description': self.description,
            'location': self.location,
            'reportedAt': self.reported_at.isoformat(),
            'status': self.status,
            'assignedTo': self.assigned_to,
            'createdAt': self.created_at.isoformat(),
            'updatedAt': self.updated_at.isoformat()
        }
