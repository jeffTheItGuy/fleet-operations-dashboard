from app.extensions import db
from datetime import datetime

class Asset(db.Model):
    __tablename__ = 'assets'

    id = db.Column(db.String(20), primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    asset_type = db.Column(db.String(50), nullable=False)
    serial_number = db.Column(db.String(100), unique=True, nullable=False)
    department = db.Column(db.String(50), nullable=False)
    assigned_to = db.Column(db.String(100))
    purchase_date = db.Column(db.Date, nullable=False)
    warranty_expiry = db.Column(db.Date, nullable=False)
    status = db.Column(db.String(20), default='active')  # active, inactive, maintenance
    location = db.Column(db.String(100), nullable=False)
    specifications = db.Column(db.Text)
    supplier = db.Column(db.String(100))
    cost = db.Column(db.Numeric(10, 2), default=0)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'type': self.asset_type,
            'serial': self.serial_number,
            'department': self.department,
            'assignedTo': self.assigned_to,
            'purchaseDate': self.purchase_date.isoformat(),
            'warranty': self.warranty_expiry.isoformat(),
            'status': self.status,
            'location': self.location,
            'specs': self.specifications,
            'supplier': self.supplier,
            'cost': float(self.cost),
            'createdAt': self.created_at.isoformat(),
            'updatedAt': self.updated_at.isoformat()
        }
