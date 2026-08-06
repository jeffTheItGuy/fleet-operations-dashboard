# Fleet & Operations Dashboard — Zimbabwe

A full-stack operational dashboard designed for Zimbabwe-focused fleet management, urban transit, transport operations, ICT support, asset management, and compliance tracking.

Built as a portfolio project to demonstrate end-to-end delivery using **React**, **Flask**, **PostgreSQL**, and **Docker**. The project was originally designed with the **CMED Private Limited Graduate Trainee ICT** context in mind, but is structured as a reusable demonstration of operational software for public-sector and transport environments.

---

## Status

- **Project type:** Portfolio / Demonstration project
- **Deployment model:** Docker-first
- **Primary focus:** Fleet, transport, ICT operations, asset management, and compliance
- **Target environment:** Zimbabwean public-sector and transport operations

---

## 1. Project Overview

This is a full-stack web application that consolidates multiple operational domains into a single dashboard:

- **Fleet Operations** — Monitor EV and combustion vehicle status, battery/fuel levels, mileage, and maintenance schedules
- **Transport Operations** — Track route status, delays, and driver-reported incidents
- **ICT Operations** — Manage asset inventory, helpdesk tickets, and cybersecurity compliance tracking

The goal is to show how operational data from vehicles, maintenance activities, transport routes, IT assets, support tickets, and compliance records can be combined into one practical management interface.

---

## 2. Built for Zimbabwe

This project is designed with Zimbabwean operational realities in mind:

- **Power and network interruptions** — Docker ensures the application stack can be moved between machines with minimal reconfiguration
- **Limited hardware budgets** — The backend is lightweight and uses open-source technologies
- **Public-sector cost constraints** — PostgreSQL, Flask, React, and Docker avoid expensive licensing costs
- **Field and mobile access** — The frontend is responsive and works on smaller screens
- **Audit and compliance needs** — Asset history, ticket tracking, maintenance logs, and compliance dashboards support record-keeping

---

## 3. Operational Alignment

The project aligns with common responsibilities in ICT support, fleet management, transport operations, and digital transformation environments.

| Operational Area | Module That Addresses It |
| --- | --- |
| First-line technical support | Helpdesk Ticket System |
| Network and infrastructure maintenance | IT Asset Inventory and system monitoring widgets |
| Transport and business applications | Route Status Monitor and Incident Log |
| ICT asset documentation and records | Asset Inventory with history tracking |
| Cybersecurity, backup, and compliance | Compliance Tracker dashboard |
| Innovation and digital transformation | EV Fleet monitoring and cost comparison tools |
| System performance and continuous improvement | Maintenance alerts and SLA tracking |

---

## 4. Features

### Module A: Fleet Management

- **EV Fleet Register** — Battery levels, charging status, and vehicle status tracking
- **Combustion Fleet Register** — Fuel levels, mileage, and hours-run tracking
- **Cost Comparison Chart** — Fuel versus electric cost comparison by route
- **Fleet Composition Analytics** — Pie chart breakdown by vehicle type

---

### Module B: Predictive Maintenance

- **Service Alerts** — Alerts triggered by mileage or hours-run thresholds
- **Overdue Indicators** — Visual flags for critical or overdue maintenance items
- **Service History Log** — Audit trail of maintenance activities
- **Cost Breakdown Chart** — Year-to-date maintenance spend by category

---

### Module C: Transport Operations

- **Route Status Board** — Active routes, passenger counts, and delay tracking
- **Incident Reporting** — Driver-submitted mechanical and road hazard logs
- **Severity Classification** — Low, Medium, and High incident triage

---

### Module D: IT Asset Management

- **Searchable Asset Inventory** — Hardware register with serial numbers, warranty dates, and assignments
- **Asset Detail View** — Procurement, assignment, upgrade, and maintenance history
- **Warranty Expiry Alerts** — Automatic flagging of assets nearing end of warranty

---

### Module E: Helpdesk & Support

- **Ticket Creation Portal** — Staff can log ICT issues with category and priority
- **SLA Tracking** — Response time targets visible on every ticket
- **Ticket Detail View** — Comments, assignment history, and status workflow
- **Resolution Metrics** — Average resolution time and weekly throughput

---

### Module F: Cybersecurity Compliance

- **Department Matrix** — Backup status, training completion, and policy acknowledgment per department
- **Action Items Panel** — Highlighted non-compliance items requiring attention
- **Progress Visualization** — Policy acknowledgment rates with progress indicators

---

## 5. Tech Stack

| Layer | Technology | Rationale |
| --- | --- | --- |
| Frontend | React 18 + Vite + Recharts | Fast, responsive, component-based UI |
| Backend | Python Flask + SQLAlchemy | Lightweight, easy to maintain, simple deployment |
| Database | PostgreSQL 15 | Robust, open-source, suitable for operational data |
| Containerization | Docker + Docker Compose | Portable deployment across environments |
| Styling | Custom CSS | Lightweight and easy to control without heavy UI frameworks |

---

## Why Docker?

In Zimbabwe’s operational environment, infrastructure may face hardware changes, network interruptions, and limited deployment time. Docker helps by packaging the database, backend, and frontend into a consistent environment.

This reduces:

- “Works on my machine” issues
- Manual environment setup
- Configuration drift
- Deployment errors when moving between machines

