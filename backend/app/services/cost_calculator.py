def calculate_ev_savings(distance_km, fuel_efficiency_l_per_100km, electricity_efficiency_kwh_per_100km,
                       fuel_price_per_l, electricity_price_per_kwh):
    """
    Calculate cost savings when switching from fuel to electric for a given route.

    Args:
        distance_km: Route distance in kilometers
        fuel_efficiency: Liters per 100km for combustion vehicle
        electricity_efficiency: kWh per 100km for EV
        fuel_price: Price per liter of fuel (USD)
        electricity_price: Price per kWh of electricity (USD)

    Returns:
        dict with fuel_cost, electric_cost, savings, savings_percentage
    """
    fuel_cost = (distance_km / 100) * fuel_efficiency_l_per_100km * fuel_price_per_l
    electric_cost = (distance_km / 100) * electricity_efficiency_kwh_per_100km * electricity_price_per_kwh
    savings = fuel_cost - electric_cost
    savings_percentage = (savings / fuel_cost * 100) if fuel_cost > 0 else 0

    return {
        'fuelCost': round(fuel_cost, 2),
        'electricCost': round(electric_cost, 2),
        'savings': round(savings, 2),
        'savingsPercentage': round(savings_percentage, 1)
    }

def calculate_fleet_savings(fleet_data):
    """Calculate total savings across all EV routes."""
    total_fuel = 0
    total_electric = 0

    for route in fleet_data:
        result = calculate_ev_savings(
            route['distance'],
            route.get('fuelEfficiency', 35),
            route.get('electricEfficiency', 120),
            route.get('fuelPrice', 1.50),
            route.get('electricityPrice', 0.15)
        )
        total_fuel += result['fuelCost']
        total_electric += result['electricCost']

    total_savings = total_fuel - total_electric

    return {
        'totalFuelCost': round(total_fuel, 2),
        'totalElectricCost': round(total_electric, 2),
        'totalSavings': round(total_savings, 2),
        'savingsPercentage': round((total_savings / total_fuel * 100), 1) if total_fuel > 0 else 0
    }
