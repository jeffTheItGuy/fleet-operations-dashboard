from flask import Blueprint, jsonify
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
