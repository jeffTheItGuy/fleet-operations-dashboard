from app.extensions import db
from datetime import datetime

class Ticket(db.Model):
    __tablename__ = 'tickets'

    id = db.Column(db.String(20), primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    priority = db.Column(db.String(20), default='medium')  # low, medium, high
    requester = db.Column(db.String(100), nullable=False)
    requester_email = db.Column(db.String(100))
    department = db.Column(db.String(50), nullable=False)
    assigned_to = db.Column(db.String(100))
    status = db.Column(db.String(20), default='open')  # open, inprogress, resolved, closed
    sla_target = db.Column(db.String(20), default='8h')
    sla_deadline = db.Column(db.DateTime)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    resolved_at = db.Column(db.DateTime)

    comments = db.relationship('TicketComment', backref='ticket', lazy=True, cascade='all, delete-orphan', order_by='TicketComment.created_at.desc()')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'category': self.category,
            'priority': self.priority,
            'requester': self.requester,
            'requesterEmail': self.requester_email,
            'department': self.department,
            'assignedTo': self.assigned_to,
            'status': self.status,
            'sla': self.sla_target,
            'slaDeadline': self.sla_deadline.isoformat() if self.sla_deadline else None,
            'createdAt': self.created_at.isoformat(),
            'updatedAt': self.updated_at.isoformat(),
            'resolvedAt': self.resolved_at.isoformat() if self.resolved_at else None,
            'commentCount': len(self.comments)
        }

    def to_detail_dict(self):
        data = self.to_dict()
        data['comments'] = [c.to_dict() for c in self.comments]
        return data

class TicketComment(db.Model):
    __tablename__ = 'ticket_comments'

    id = db.Column(db.Integer, primary_key=True)
    ticket_id = db.Column(db.String(20), db.ForeignKey('tickets.id'), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    author_role = db.Column(db.String(50), default='Requester')
    text = db.Column(db.Text, nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'ticketId': self.ticket_id,
            'author': self.author,
            'authorRole': self.author_role,
            'text': self.text,
            'time': self.created_at.isoformat()
        }
