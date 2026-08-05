from app.extensions import db
from datetime import datetime

class Vehicle(db.Model):
    __tablename__ = 'vehicles'

    id = db.Column(db.String(20), primary_key=True)
    type = db.Column(db.String(50), nullable=False)
    model = db.Column(db.String(100), nullable=False)
    reg_number = db.Column(db.String(20), unique=True, nullable=False)
    location = db.Column(db.String(100), nullable=False)
    fuel_type = db.Column(db.String(20), nullable=False)  # 'electric' or 'combustion'

    # EV specific
    battery_level = db.Column(db.Integer, default=0)
    charging_status = db.Column(db.String(50), default='No')

    # Combustion specific
    fuel_level = db.Column(db.Integer, default=0)

    status = db.Column(db.String(20), default='active')  # active, inactive, maintenance, critical, charging
    last_service_date = db.Column(db.Date)
    next_service_date = db.Column(db.Date)
    mileage = db.Column(db.Integer, default=0)
    hours_run = db.Column(db.Integer, default=0)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    maintenance_records = db.relationship('MaintenanceRecord', backref='vehicle', lazy=True, cascade='all, delete-orphan')
    incidents = db.relationship('Incident', backref='vehicle', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'type': self.type,
            'model': self.model,
            'regNumber': self.reg_number,
            'location': self.location,
            'fuelType': self.fuel_type,
            'batteryLevel': self.battery_level,
            'chargingStatus': self.charging_status,
            'fuelLevel': self.fuel_level,
            'status': self.status,
            'lastServiceDate': self.last_service_date.isoformat() if self.last_service_date else None,
            'nextServiceDate': self.next_service_date.isoformat() if self.next_service_date else None,
            'mileage': self.mileage,
            'hoursRun': self.hours_run,
            'createdAt': self.created_at.isoformat(),
            'updatedAt': self.updated_at.isoformat()
        }
