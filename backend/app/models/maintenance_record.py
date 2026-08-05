from app.extensions import db
from datetime import datetime

class MaintenanceRecord(db.Model):
    __tablename__ = 'maintenance_records'

    id = db.Column(db.String(30), primary_key=True)
    vehicle_id = db.Column(db.String(20), db.ForeignKey('vehicles.id'), nullable=False)
    service_type = db.Column(db.String(100), nullable=False)
    service_date = db.Column(db.Date, nullable=False)
    mechanic = db.Column(db.String(100), nullable=False)
    cost = db.Column(db.Numeric(10, 2), default=0)
    parts_used = db.Column(db.Text)
    status = db.Column(db.String(20), default='completed')  # completed, pending, cancelled
    next_due_date = db.Column(db.Date)
    notes = db.Column(db.Text)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'vehicleId': self.vehicle_id,
            'serviceType': self.service_type,
            'serviceDate': self.service_date.isoformat(),
            'mechanic': self.mechanic,
            'cost': float(self.cost),
            'partsUsed': self.parts_used,
            'status': self.status,
            'nextDueDate': self.next_due_date.isoformat() if self.next_due_date else None,
            'notes': self.notes,
            'createdAt': self.created_at.isoformat()
        }
