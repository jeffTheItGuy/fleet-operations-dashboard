from flask import Blueprint, jsonify, request
from app.extensions import db
from app.models import Ticket, TicketComment
from datetime import datetime, timedelta

bp = Blueprint('helpdesk', __name__)

@bp.route('', methods=['GET'])
def get_tickets():
    tickets = Ticket.query.order_by(Ticket.created_at.desc()).all()
    return jsonify([t.to_dict() for t in tickets])

@bp.route('/<id>', methods=['GET'])
def get_ticket(id):
    ticket = Ticket.query.get_or_404(id)
    return jsonify(ticket.to_detail_dict())

@bp.route('', methods=['POST'])
def create_ticket():
    data = request.get_json()

    # Calculate SLA deadline
    priority = data.get('priority', 'medium')
    sla_hours = {'high': 4, 'medium': 8, 'low': 24}
    sla_deadline = datetime.utcnow() + timedelta(hours=sla_hours.get(priority, 8))

    ticket = Ticket(
        id=data.get('id'),
        title=data.get('title'),
        description=data.get('description'),
        category=data.get('category'),
        priority=priority,
        requester=data.get('requester', 'Anonymous'),
        requester_email=data.get('requesterEmail'),
        department=data.get('department'),
        assigned_to=data.get('assignedTo', 'Unassigned'),
        sla_target=f"{sla_hours.get(priority, 8)}h",
        sla_deadline=sla_deadline
    )

    db.session.add(ticket)
    db.session.commit()

    return jsonify(ticket.to_dict()), 201

@bp.route('/<id>/comments', methods=['POST'])
def add_comment(id):
    ticket = Ticket.query.get_or_404(id)
    data = request.get_json()

    comment = TicketComment(
        ticket_id=id,
        author=data.get('author', 'System'),
        author_role=data.get('authorRole', 'System'),
        text=data.get('text')
    )

    db.session.add(comment)
    db.session.commit()

    return jsonify(comment.to_dict()), 201

@bp.route('/<id>/status', methods=['PATCH'])
def update_ticket_status(id):
    ticket = Ticket.query.get_or_404(id)
    data = request.get_json()

    if 'status' in data:
        ticket.status = data['status']
        if data['status'] == 'resolved':
            ticket.resolved_at = datetime.utcnow()
    if 'assignedTo' in data:
        ticket.assigned_to = data['assignedTo']

    db.session.commit()
    return jsonify(ticket.to_dict())
