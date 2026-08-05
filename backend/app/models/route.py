from app.extensions import db
from datetime import datetime

class Route(db.Model):
    __tablename__ = 'routes'

    id = db.Column(db.String(20), primary_key=True)
    route_name = db.Column(db.String(200), nullable=False)
    bus_id = db.Column(db.String(20), db.ForeignKey('vehicles.id'), nullable=False)
    driver = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(20), default='active')  # active, charging, maintenance, inactive
    passengers = db.Column(db.Integer, default=0)
    start_time = db.Column(db.String(10))
    current_location = db.Column(db.String(200))
    next_stop = db.Column(db.String(200))
    delay = db.Column(db.String(50), default='On time')

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'routeName': self.route_name,
            'bus': self.bus_id,
            'driver': self.driver,
            'status': self.status,
            'passengers': self.passengers,
            'startTime': self.start_time,
            'currentLocation': self.current_location,
            'nextStop': self.next_stop,
            'delay': self.delay,
            'createdAt': self.created_at.isoformat(),
            'updatedAt': self.updated_at.isoformat()
        }
