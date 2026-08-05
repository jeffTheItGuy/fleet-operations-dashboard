from app.extensions import db
from app.models import Vehicle, MaintenanceRecord, Asset, Ticket, Route, ComplianceCheck, Incident
from datetime import datetime, date, timedelta


def seed_vehicles():
    vehicles = [
        {'id': 'EV-001', 'type': 'Electric Bus', 'model': 'BYD K8', 'reg': 'ZUP-201', 'loc': 'Harare Depot', 'fuel': 'electric', 'battery': 92, 'status': 'active', 'last_service': date(2026,6,15), 'next_service': date(2026,9,15), 'mileage': 34200},
        {'id': 'EV-002', 'type': 'Electric Bus', 'model': 'BYD K8', 'reg': 'ZUP-202', 'loc': 'Harare Depot', 'fuel': 'electric', 'battery': 45, 'status': 'charging', 'charging': 'Station #1', 'last_service': date(2026,5,20), 'next_service': date(2026,8,20), 'mileage': 28900},
        {'id': 'EV-003', 'type': 'Electric Mini-Bus', 'model': 'BYD T3', 'reg': 'ZUP-203', 'loc': 'Chitungwiza', 'fuel': 'electric', 'battery': 78, 'status': 'active', 'last_service': date(2026,7,1), 'next_service': date(2026,10,1), 'mileage': 15600},
        {'id': 'EV-004', 'type': 'Electric Bus', 'model': 'BYD K8', 'reg': 'ZUP-204', 'loc': 'Victoria Falls', 'fuel': 'electric', 'battery': 23, 'status': 'maintenance', 'last_service': date(2026,4,10), 'next_service': date(2026,7,10), 'mileage': 41200},
        {'id': 'EV-005', 'type': 'Electric Recovery', 'model': 'JAC N55 EV', 'reg': 'REC-101', 'loc': 'Harare Depot', 'fuel': 'electric', 'battery': 88, 'status': 'active', 'last_service': date(2026,6,28), 'next_service': date(2026,9,28), 'mileage': 18900},
        {'id': 'EV-006', 'type': 'Electric Luxury Coach', 'model': 'BYD C8', 'reg': 'ZUP-205', 'loc': 'Harare Depot', 'fuel': 'electric', 'battery': 65, 'status': 'active', 'last_service': date(2026,5,15), 'next_service': date(2026,8,15), 'mileage': 22100},
        {'id': 'EV-007', 'type': 'Electric Bus', 'model': 'BYD K8', 'reg': 'ZUP-206', 'loc': 'Bulawayo', 'fuel': 'electric', 'battery': 12, 'status': 'critical', 'last_service': date(2026,3,20), 'next_service': date(2026,6,20), 'mileage': 45600},
        {'id': 'EV-008', 'type': 'Electric Mini-Bus', 'model': 'BYD T3', 'reg': 'ZUP-207', 'loc': 'Harare Depot', 'fuel': 'electric', 'battery': 95, 'status': 'active', 'last_service': date(2026,7,10), 'next_service': date(2026,10,10), 'mileage': 12300},
        {'id': 'EV-009', 'type': 'Electric Recovery', 'model': 'JAC N55 EV', 'reg': 'REC-102', 'loc': 'Mutare', 'fuel': 'electric', 'battery': 56, 'status': 'active', 'last_service': date(2026,6,1), 'next_service': date(2026,9,1), 'mileage': 26700},
        {'id': 'EV-010', 'type': 'Electric Bus', 'model': 'BYD K8', 'reg': 'ZUP-208', 'loc': 'Harare Depot', 'fuel': 'electric', 'battery': 34, 'status': 'charging', 'charging': 'Station #2', 'last_service': date(2026,5,5), 'next_service': date(2026,8,5), 'mileage': 31500},
        {'id': 'EV-011', 'type': 'Electric Mini-Bus', 'model': 'BYD T3', 'reg': 'ZUP-209', 'loc': 'Chitungwiza', 'fuel': 'electric', 'battery': 81, 'status': 'active', 'last_service': date(2026,7,5), 'next_service': date(2026,10,5), 'mileage': 19800},
        {'id': 'EV-012', 'type': 'Electric Bus', 'model': 'BYD K8', 'reg': 'ZUP-210', 'loc': 'Victoria Falls', 'fuel': 'electric', 'battery': 67, 'status': 'active', 'last_service': date(2026,6,20), 'next_service': date(2026,9,20), 'mileage': 27400},
        {'id': 'COM-001', 'type': 'Urban Bus', 'model': 'Hino RK8', 'reg': 'ZUP-104', 'loc': 'Harare Depot', 'fuel': 'combustion', 'fuel_level': 78, 'status': 'active', 'last_service': date(2026,5,15), 'next_service': date(2026,8,20), 'mileage': 45200, 'hours': 3840},
        {'id': 'COM-002', 'type': 'Urban Bus', 'model': 'Hino RK8', 'reg': 'ZUP-105', 'loc': 'Harare Depot', 'fuel': 'combustion', 'fuel_level': 34, 'status': 'active', 'last_service': date(2026,5,20), 'next_service': date(2026,8,15), 'mileage': 38900, 'hours': 3210},
        {'id': 'COM-003', 'type': 'Recovery Truck', 'model': 'Isuzu FVR', 'reg': 'REC-033', 'loc': 'Bulawayo', 'fuel': 'combustion', 'fuel_level': 12, 'status': 'maintenance', 'last_service': date(2026,4,5), 'next_service': date(2026,8,5), 'mileage': 67800, 'hours': 5620},
        {'id': 'COM-004', 'type': 'Haulage Truck', 'model': 'Mercedes Actros', 'reg': 'HAU-015', 'loc': 'Harare Depot', 'fuel': 'combustion', 'fuel_level': 89, 'status': 'active', 'last_service': date(2026,6,1), 'next_service': date(2026,9,1), 'mileage': 123400, 'hours': 8900},
        {'id': 'COM-005', 'type': 'Urban Bus', 'model': 'Hino RK8', 'reg': 'ZUP-106', 'loc': 'Chitungwiza', 'fuel': 'combustion', 'fuel_level': 56, 'status': 'active', 'last_service': date(2026,5,18), 'next_service': date(2026,8,18), 'mileage': 32100, 'hours': 2780},
        {'id': 'COM-006', 'type': 'Recovery Truck', 'model': 'Isuzu FVR', 'reg': 'REC-034', 'loc': 'Mutare', 'fuel': 'combustion', 'fuel_level': 67, 'status': 'active', 'last_service': date(2026,5,25), 'next_service': date(2026,8,25), 'mileage': 54200, 'hours': 4450},
        {'id': 'COM-007', 'type': 'Urban Bus', 'model': 'Hino RK8', 'reg': 'ZUP-107', 'loc': 'Harare Depot', 'fuel': 'combustion', 'fuel_level': 23, 'status': 'critical', 'last_service': date(2026,5,8), 'next_service': date(2026,8,8), 'mileage': 47800, 'hours': 4100},
        {'id': 'COM-008', 'type': 'Haulage Truck', 'model': 'Mercedes Actros', 'reg': 'HAU-016', 'loc': 'Bulawayo', 'fuel': 'combustion', 'fuel_level': 91, 'status': 'active', 'last_service': date(2026,6,10), 'next_service': date(2026,9,10), 'mileage': 98700, 'hours': 7200},
        {'id': 'COM-009', 'type': 'Urban Bus', 'model': 'Hino RK8', 'reg': 'ZUP-108', 'loc': 'Victoria Falls', 'fuel': 'combustion', 'fuel_level': 45, 'status': 'active', 'last_service': date(2026,5,12), 'next_service': date(2026,8,12), 'mileage': 29500, 'hours': 2450},
        {'id': 'COM-010', 'type': 'Recovery Truck', 'model': 'Isuzu FVR', 'reg': 'REC-035', 'loc': 'Harare Depot', 'fuel': 'combustion', 'fuel_level': 8, 'status': 'critical', 'last_service': date(2026,5,3), 'next_service': date(2026,8,3), 'mileage': 71200, 'hours': 5890},
    ]

    for v_data in vehicles:
        if not Vehicle.query.get(v_data['id']):
            v = Vehicle(
                id=v_data['id'],
                type=v_data['type'],
                model=v_data['model'],
                reg_number=v_data['reg'],
                location=v_data['loc'],
                fuel_type=v_data['fuel'],
                battery_level=v_data.get('battery', 0),
                charging_status=v_data.get('charging', 'No'),
                fuel_level=v_data.get('fuel_level', 0),
                status=v_data['status'],
                last_service_date=v_data.get('last_service'),
                next_service_date=v_data.get('next_service'),
                mileage=v_data.get('mileage', 0),
                hours_run=v_data.get('hours', 0)
            )
            db.session.add(v)
    db.session.commit()
    print(f"Seeded {len(vehicles)} vehicles")


def seed_maintenance_records():
    records = [
        {'id': 'SRV-2026-089', 'vehicle': 'COM-001', 'type': 'Oil Change', 'date': date(2026,7,15), 'mechanic': 'T. Moyo', 'cost': 180, 'parts': 'Engine Oil, Filter', 'status': 'completed', 'next': '2026-10-15'},
        {'id': 'SRV-2026-088', 'vehicle': 'EV-002', 'type': 'Battery Check', 'date': date(2026,7,12), 'mechanic': 'P. Chiweshe', 'cost': 0, 'parts': 'N/A', 'status': 'completed', 'next': '2026-10-12'},
        {'id': 'SRV-2026-087', 'vehicle': 'COM-003', 'type': 'Brake Replacement', 'date': date(2026,7,8), 'mechanic': 'J. Ncube', 'cost': 420, 'parts': 'Brake Pads, Discs', 'status': 'completed', 'next': '2027-01-08'},
        {'id': 'SRV-2026-086', 'vehicle': 'COM-004', 'type': 'Tire Replacement', 'date': date(2026,7,5), 'mechanic': 'T. Moyo', 'cost': 1200, 'parts': '6x Truck Tires', 'status': 'completed', 'next': '2027-01-05'},
        {'id': 'SRV-2026-085', 'vehicle': 'COM-002', 'type': 'Transmission Service', 'date': date(2026,7,1), 'mechanic': 'J. Ncube', 'cost': 850, 'parts': 'Transmission Fluid', 'status': 'completed', 'next': '2027-01-01'},
        {'id': 'SRV-2026-084', 'vehicle': 'EV-003', 'type': 'Software Update', 'date': date(2026,6,28), 'mechanic': 'P. Chiweshe', 'cost': 0, 'parts': 'N/A', 'status': 'completed', 'next': '2026-09-28'},
        {'id': 'SRV-2026-083', 'vehicle': 'COM-001', 'type': 'Coolant Flush', 'date': date(2026,6,25), 'mechanic': 'T. Moyo', 'cost': 150, 'parts': 'Coolant', 'status': 'completed', 'next': '2026-12-25'},
        {'id': 'SRV-2026-082', 'vehicle': 'COM-006', 'type': 'Engine Tune-Up', 'date': date(2026,6,20), 'mechanic': 'J. Ncube', 'cost': 320, 'parts': 'Spark Plugs, Filters', 'status': 'completed', 'next': '2026-12-20'},
    ]

    for r_data in records:
        if not MaintenanceRecord.query.get(r_data['id']):
            r = MaintenanceRecord(
                id=r_data['id'],
                vehicle_id=r_data['vehicle'],
                service_type=r_data['type'],
                service_date=r_data['date'],
                mechanic=r_data['mechanic'],
                cost=r_data['cost'],
                parts_used=r_data['parts'],
                status=r_data['status'],
                next_due_date=datetime.strptime(r_data['next'], '%Y-%m-%d').date() if r_data['next'] else None
            )
            db.session.add(r)
    db.session.commit()
    print(f"Seeded {len(records)} maintenance records")


def seed_assets():
    assets = [
        {'id': 'AST-IT-001', 'name': 'Dell Latitude 5520', 'type': 'Laptop', 'serial': 'SN-DL5520-8842', 'dept': 'ICT', 'assigned': 'Graduate Trainee', 'purchase': date(2024,3,15), 'warranty': date(2027,3,15), 'status': 'active', 'loc': 'Head Office, Harare', 'specs': 'Intel i7-1165G7, 16GB RAM, 512GB SSD, Windows 11 Pro', 'supplier': 'Dell Zimbabwe', 'cost': 1850},
        {'id': 'AST-IT-002', 'name': 'HP ProDesk 400 G7', 'type': 'Desktop', 'serial': 'SN-HP400G7-1123', 'dept': 'Finance', 'assigned': 'A. Moyo', 'purchase': date(2023,8,20), 'warranty': date(2026,8,20), 'status': 'active', 'loc': 'Head Office, Harare', 'specs': 'Intel i5-10500, 8GB RAM, 256GB SSD, Windows 10 Pro', 'supplier': 'HP Zimbabwe', 'cost': 1200},
        {'id': 'AST-IT-003', 'name': 'Cisco Catalyst 2960', 'type': 'Network Switch', 'serial': 'SN-CC2960-4451', 'dept': 'ICT', 'assigned': 'Infrastructure', 'purchase': date(2022,11,10), 'warranty': date(2025,11,10), 'status': 'active', 'loc': 'Head Office, Harare', 'specs': '24-port Gigabit Ethernet, Layer 2', 'supplier': 'Cisco Africa', 'cost': 2800},
        {'id': 'AST-IT-004', 'name': 'Dell PowerEdge T340', 'type': 'Server', 'serial': 'SN-DPT340-9981', 'dept': 'ICT', 'assigned': 'Server Room', 'purchase': date(2023,1,5), 'warranty': date(2026,1,5), 'status': 'active', 'loc': 'Head Office, Harare', 'specs': 'Intel Xeon E-2224, 32GB RAM, 4x 2TB HDD RAID 5', 'supplier': 'Dell Zimbabwe', 'cost': 4500},
        {'id': 'AST-IT-005', 'name': 'HP LaserJet Pro M404', 'type': 'Printer', 'serial': 'SN-HPLJM404-2234', 'dept': 'HR', 'assigned': 'Shared', 'purchase': date(2024,6,12), 'warranty': date(2027,6,12), 'status': 'active', 'loc': 'Head Office, Harare', 'specs': 'Monochrome laser, 40ppm, duplex', 'supplier': 'HP Zimbabwe', 'cost': 450},
        {'id': 'AST-IT-006', 'name': 'Lenovo ThinkPad T14', 'type': 'Laptop', 'serial': 'SN-LTPT14-5567', 'dept': 'Operations', 'assigned': 'S. Mangwiro', 'purchase': date(2024,1,18), 'warranty': date(2027,1,18), 'status': 'maintenance', 'loc': 'Bulawayo Office', 'specs': 'AMD Ryzen 5 PRO, 16GB RAM, 512GB SSD', 'supplier': 'Lenovo Africa', 'cost': 1600},
        {'id': 'AST-IT-007', 'name': 'Ubiquiti UniFi AP', 'type': 'Access Point', 'serial': 'SN-UUAP-7789', 'dept': 'ICT', 'assigned': 'Infrastructure', 'purchase': date(2023,9,30), 'warranty': date(2026,9,30), 'status': 'active', 'loc': 'Victoria Falls Depot', 'specs': 'Wi-Fi 6, 4x4 MU-MIMO, PoE', 'supplier': 'Ubiquiti Africa', 'cost': 320},
        {'id': 'AST-IT-008', 'name': 'Dell Latitude 5520', 'type': 'Laptop', 'serial': 'SN-DL5520-8843', 'dept': 'Transport', 'assigned': 'J. Mupfumi', 'purchase': date(2024,3,15), 'warranty': date(2027,3,15), 'status': 'active', 'loc': 'Harare Depot', 'specs': 'Intel i7-1165G7, 16GB RAM, 512GB SSD, Windows 11 Pro', 'supplier': 'Dell Zimbabwe', 'cost': 1850},
        {'id': 'AST-IT-009', 'name': 'HP ProDesk 400 G7', 'type': 'Desktop', 'serial': 'SN-HP400G7-1124', 'dept': 'Maintenance', 'assigned': 'T. Moyo', 'purchase': date(2023,8,20), 'warranty': date(2026,8,20), 'status': 'inactive', 'loc': 'Head Office, Harare', 'specs': 'Intel i5-10500, 8GB RAM, 256GB SSD', 'supplier': 'HP Zimbabwe', 'cost': 1200},
        {'id': 'AST-IT-010', 'name': 'Cisco ISR 4331', 'type': 'Router', 'serial': 'SN-CISR4331-3344', 'dept': 'ICT', 'assigned': 'Infrastructure', 'purchase': date(2022,5,22), 'warranty': date(2025,5,22), 'status': 'active', 'loc': 'Head Office, Harare', 'specs': 'WAN router, 2x GE, 4x NIM slots', 'supplier': 'Cisco Africa', 'cost': 5200},
    ]

    for a_data in assets:
        if not Asset.query.get(a_data['id']):
            a = Asset(
                id=a_data['id'],
                name=a_data['name'],
                asset_type=a_data['type'],
                serial_number=a_data['serial'],
                department=a_data['dept'],
                assigned_to=a_data['assigned'],
                purchase_date=a_data['purchase'],
                warranty_expiry=a_data['warranty'],
                status=a_data['status'],
                location=a_data['loc'],
                specifications=a_data['specs'],
                supplier=a_data['supplier'],
                cost=a_data['cost']
            )
            db.session.add(a)
    db.session.commit()
    print(f"Seeded {len(assets)} assets")


def seed_tickets():
    tickets = [
        {'id': 'HD-2042', 'title': 'Network outage in Bulawayo office', 'desc': 'All computers in the Bulawayo office have lost internet connectivity since 08:30 AM. The local router shows a red status light.', 'category': 'Network', 'priority': 'high', 'requester': 'S. Sibanda', 'dept': 'Operations', 'assigned': 'Graduate Trainee', 'status': 'open', 'sla': '4h'},
        {'id': 'HD-2041', 'title': 'Printer not responding - HR department', 'desc': 'HP LaserJet Pro M404 in HR is showing error code 79.00FE. Tried power cycle but issue persists.', 'category': 'Hardware', 'priority': 'medium', 'requester': 'A. Moyo', 'dept': 'HR', 'assigned': 'ICT Team', 'status': 'inprogress', 'sla': '8h'},
        {'id': 'HD-2040', 'title': 'Email access issue for new employee', 'desc': 'New finance clerk cannot access Outlook. Getting authentication error when trying to log in.', 'category': 'Account', 'priority': 'low', 'requester': 'HR Manager', 'dept': 'Finance', 'assigned': 'Graduate Trainee', 'status': 'resolved', 'sla': '24h'},
        {'id': 'HD-2039', 'title': 'Server backup failure - Head Office', 'desc': 'Dell PowerEdge T340 backup job failed last night with error "destination disk full". Need to clear old backups.', 'category': 'Infrastructure', 'priority': 'high', 'requester': 'ICT Manager', 'dept': 'ICT', 'assigned': 'ICT Team', 'status': 'inprogress', 'sla': '2h'},
        {'id': 'HD-2038', 'title': 'Laptop screen flickering', 'desc': 'Dell Latitude 5520 screen flickers intermittently, especially when on battery power. External monitor works fine.', 'category': 'Hardware', 'priority': 'medium', 'requester': 'T. Chikwava', 'dept': 'Transport', 'assigned': 'Graduate Trainee', 'status': 'open', 'sla': '8h'},
        {'id': 'HD-2037', 'title': 'VPN connection slow from Victoria Falls', 'desc': 'Remote access from Victoria Falls depot is extremely slow (<1Mbps). Affecting ability to update route schedules.', 'category': 'Network', 'priority': 'medium', 'requester': 'K. Ndhlovu', 'dept': 'Transport', 'assigned': 'ICT Team', 'status': 'resolved', 'sla': '8h'},
        {'id': 'HD-2036', 'title': 'Antivirus update failing on 3 machines', 'desc': 'Windows Defender update failing with error 0x80070643 on AST-IT-002, AST-IT-005, and AST-IT-008.', 'category': 'Security', 'priority': 'high', 'requester': 'ICT Manager', 'dept': 'ICT', 'assigned': 'Graduate Trainee', 'status': 'resolved', 'sla': '4h'},
        {'id': 'HD-2035', 'title': 'Password reset request - Finance dept', 'desc': 'Forgot password for SAP access. Need reset for user finance.clerk@cmed.co.zw.', 'category': 'Account', 'priority': 'low', 'requester': 'Finance Clerk', 'dept': 'Finance', 'assigned': 'Graduate Trainee', 'status': 'resolved', 'sla': '24h'},
    ]

    for t_data in tickets:
        if not Ticket.query.get(t_data['id']):
            sla_hours = {'high': 4, 'medium': 8, 'low': 24}
            sla_deadline = datetime.utcnow() + timedelta(hours=sla_hours.get(t_data['priority'], 8))
            t = Ticket(
                id=t_data['id'],
                title=t_data['title'],
                description=t_data['desc'],
                category=t_data['category'],
                priority=t_data['priority'],
                requester=t_data['requester'],
                department=t_data['dept'],
                assigned_to=t_data['assigned'],
                status=t_data['status'],
                sla_target=t_data['sla'],
                sla_deadline=sla_deadline
            )
            db.session.add(t)
    db.session.commit()
    print(f"Seeded {len(tickets)} tickets")


def seed_routes():
    routes = [
        {'id': 'R-001', 'name': 'Harare CBD - Mbare', 'bus': 'COM-001', 'driver': 'J. Mupfumi', 'status': 'active', 'passengers': 45, 'start': '05:30', 'current': 'Mbare Terminus', 'next': 'Copacabana', 'delay': 'On time'},
        {'id': 'R-002', 'name': 'Harare - Chitungwiza', 'bus': 'EV-003', 'driver': 'T. Chikwava', 'status': 'active', 'passengers': 38, 'start': '06:00', 'current': 'Chitungwiza Town Centre', 'next': 'Zengeza 4', 'delay': 'On time'},
        {'id': 'R-003', 'name': 'Harare - Borrowdale', 'bus': 'COM-002', 'driver': 'S. Mangwiro', 'status': 'active', 'passengers': 28, 'start': '06:15', 'current': 'Samora Machel Ave', 'next': 'Borrowdale Road', 'delay': '+10 min'},
        {'id': 'R-004', 'name': 'Harare - Kuwadzana', 'bus': 'COM-005', 'driver': 'P. Musvuri', 'status': 'active', 'passengers': 52, 'start': '05:45', 'current': 'Kuwadzana Roundabout', 'next': 'Kuwadzana 3', 'delay': 'On time'},
        {'id': 'R-005', 'name': 'Harare - Highfield', 'bus': 'EV-002', 'driver': 'R. Gumbo', 'status': 'charging', 'passengers': 0, 'start': '07:00', 'current': 'Harare Depot', 'next': 'Glenara Shops', 'delay': 'Delayed'},
        {'id': 'R-006', 'name': 'Harare - Epworth', 'bus': 'COM-007', 'driver': 'M. Chari', 'status': 'active', 'passengers': 41, 'start': '06:30', 'current': 'Dombo Shops', 'next': 'Stop 4', 'delay': 'On time'},
        {'id': 'R-007', 'name': 'Victoria Falls - Airport', 'bus': 'EV-010', 'driver': 'K. Ndhlovu', 'status': 'active', 'passengers': 22, 'start': '08:00', 'current': 'Airport Road', 'next': 'Victoria Falls Airport', 'delay': 'On time'},
        {'id': 'R-008', 'name': 'Bulawayo - Nketa', 'bus': 'COM-009', 'driver': 'L. Sibanda', 'status': 'maintenance', 'passengers': 0, 'start': None, 'current': 'Bulawayo Depot', 'next': None, 'delay': 'Out of Service'},
    ]

    for r_data in routes:
        if not Route.query.get(r_data['id']):
            r = Route(
                id=r_data['id'],
                route_name=r_data['name'],
                bus_id=r_data['bus'],
                driver=r_data['driver'],
                status=r_data['status'],
                passengers=r_data['passengers'],
                start_time=r_data['start'],
                current_location=r_data['current'],
                next_stop=r_data['next'],
                delay=r_data['delay']
            )
            db.session.add(r)
    db.session.commit()
    print(f"Seeded {len(routes)} routes")


def seed_compliance():
    depts = [
        {'dept': 'ICT', 'staff': 8, 'backup': 'compliant', 'last_backup': datetime(2026,8,5,2,0), 'training': 'compliant', 'last_training': datetime(2026,7,20), 'ack': 100},
        {'dept': 'Finance', 'staff': 12, 'backup': 'compliant', 'last_backup': datetime(2026,8,4,23,0), 'training': 'compliant', 'last_training': datetime(2026,7,18), 'ack': 100},
        {'dept': 'HR', 'staff': 6, 'backup': 'compliant', 'last_backup': datetime(2026,8,5,1,0), 'training': 'pending', 'last_training': datetime(2026,6,15), 'ack': 83},
        {'dept': 'Operations', 'staff': 24, 'backup': 'noncompliant', 'last_backup': datetime(2026,8,1,22,0), 'training': 'compliant', 'last_training': datetime(2026,7,22), 'ack': 92},
        {'dept': 'Transport', 'staff': 18, 'backup': 'compliant', 'last_backup': datetime(2026,8,5,3,0), 'training': 'pending', 'last_training': datetime(2026,6,20), 'ack': 78},
        {'dept': 'Maintenance', 'staff': 15, 'backup': 'compliant', 'last_backup': datetime(2026,8,4,21,0), 'training': 'compliant', 'last_training': datetime(2026,7,25), 'ack': 100},
    ]

    for d_data in depts:
        existing = ComplianceCheck.query.filter_by(department=d_data['dept']).first()
        if not existing:
            d = ComplianceCheck(
                department=d_data['dept'],
                staff_count=d_data['staff'],
                backup_status=d_data['backup'],
                last_backup=d_data['last_backup'],
                training_status=d_data['training'],
                last_training=d_data['last_training'],
                policy_ack_rate=d_data['ack']
            )
            db.session.add(d)
    db.session.commit()
    print(f"Seeded {len(depts)} compliance departments")


def seed_incidents():
    incidents = [
        {'id': 'INC-2026-042', 'vehicle': 'COM-002', 'driver': 'S. Mangwiro', 'type': 'Mechanical', 'severity': 'medium', 'desc': 'Air conditioning unit failure on Route 3', 'loc': 'Samora Machel Ave', 'status': 'open', 'assigned': 'T. Moyo'},
        {'id': 'INC-2026-041', 'vehicle': 'EV-004', 'driver': 'P. Chiweshe', 'type': 'Electrical', 'severity': 'high', 'desc': 'Charging port damaged at Victoria Falls depot', 'loc': 'Victoria Falls Depot', 'status': 'inprogress', 'assigned': 'P. Chiweshe'},
        {'id': 'INC-2026-040', 'vehicle': 'COM-004', 'driver': 'K. Dube', 'type': 'Road Hazard', 'severity': 'low', 'desc': 'Pothole damage to tire on A5 highway', 'loc': 'A5 Highway, km 45', 'status': 'resolved', 'assigned': 'T. Moyo'},
        {'id': 'INC-2026-039', 'vehicle': 'COM-001', 'driver': 'J. Mupfumi', 'type': 'Mechanical', 'severity': 'medium', 'desc': 'Brake squeaking reported by passengers', 'loc': 'Mbare Terminus', 'status': 'resolved', 'assigned': 'J. Ncube'},
        {'id': 'INC-2026-038', 'vehicle': 'COM-003', 'driver': 'M. Tshuma', 'type': 'Mechanical', 'severity': 'high', 'desc': 'Engine overheating during recovery operation', 'loc': 'Bulawayo Road', 'status': 'inprogress', 'assigned': 'J. Ncube'},
        {'id': 'INC-2026-037', 'vehicle': 'EV-003', 'driver': 'T. Chikwava', 'type': 'Passenger', 'severity': 'low', 'desc': 'Seat damage in rear row', 'loc': 'Chitungwiza Depot', 'status': 'resolved', 'assigned': 'T. Moyo'},
    ]

    for i_data in incidents:
        if not Incident.query.get(i_data['id']):
            i = Incident(
                id=i_data['id'],
                vehicle_id=i_data['vehicle'],
                driver=i_data['driver'],
                incident_type=i_data['type'],
                severity=i_data['severity'],
                description=i_data['desc'],
                location=i_data['loc'],
                status=i_data['status'],
                assigned_to=i_data['assigned']
            )
            db.session.add(i)
    db.session.commit()
    print(f"Seeded {len(incidents)} incidents")


def seed_all_data():
    """Seed all demo data."""
    seed_vehicles()
    seed_maintenance_records()
    seed_assets()
    seed_tickets()
    seed_routes()
    seed_compliance()
    seed_incidents()
    print("All demo data seeded successfully!")