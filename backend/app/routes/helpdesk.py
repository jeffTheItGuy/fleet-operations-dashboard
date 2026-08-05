from flask import Blueprint, jsonify
from app.models import Ticket

bp = Blueprint('helpdesk', __name__)

@bp.route('', methods=['GET'])
def get_tickets():
    tickets = Ticket.query.order_by(Ticket.created_at.desc()).all()
    return jsonify([t.to_dict() for t in tickets])

@bp.route('/<id>', methods=['GET'])
def get_ticket(id):
    ticket = Ticket.query.get_or_404(id)
    return jsonify(ticket.to_detail_dict())
