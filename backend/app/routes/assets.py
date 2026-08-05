from flask import Blueprint, jsonify, request
from app.extensions import db
from app.models import Asset

bp = Blueprint('assets', __name__)

@bp.route('', methods=['GET'])
def get_assets():
    assets = Asset.query.all()
    return jsonify([a.to_dict() for a in assets])

@bp.route('/<id>', methods=['GET'])
def get_asset(id):
    asset = Asset.query.get_or_404(id)
    return jsonify(asset.to_dict())

@bp.route('', methods=['POST'])
def create_asset():
    data = request.get_json()

    asset = Asset(
        id=data.get('id'),
        name=data.get('name'),
        asset_type=data.get('type'),
        serial_number=data.get('serial'),
        department=data.get('department'),
        assigned_to=data.get('assignedTo'),
        purchase_date=datetime.strptime(data.get('purchaseDate'), '%Y-%m-%d').date(),
        warranty_expiry=datetime.strptime(data.get('warranty'), '%Y-%m-%d').date(),
        status=data.get('status', 'active'),
        location=data.get('location'),
        specifications=data.get('specs'),
        supplier=data.get('supplier'),
        cost=data.get('cost', 0)
    )

    db.session.add(asset)
    db.session.commit()

    return jsonify(asset.to_dict()), 201

@bp.route('/<id>', methods=['PATCH'])
def update_asset(id):
    asset = Asset.query.get_or_404(id)
    data = request.get_json()

    if 'status' in data:
        asset.status = data['status']
    if 'assignedTo' in data:
        asset.assigned_to = data['assignedTo']
    if 'location' in data:
        asset.location = data['location']

    db.session.commit()
    return jsonify(asset.to_dict())
