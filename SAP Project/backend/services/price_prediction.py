import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from datetime import datetime, timedelta
from backend.models.product import PriceHistory
from backend import db

class PricePredictionService:
    def __init__(self):
        self.model = RandomForestRegressor(n_estimators=100, random_state=42)
        
    def prepare_data(self, product_id):
        # Get historical price data
        price_history = PriceHistory.query.filter_by(product_id=product_id).all()
        
        if not price_history:
            return None, None
            
        # Convert to DataFrame
        df = pd.DataFrame([{
            'date': ph.date,
            'price': ph.price,
            'day_of_week': ph.date.weekday(),
            'month': ph.date.month,
            'year': ph.date.year
        } for ph in price_history])
        
        # Create features
        X = df[['day_of_week', 'month', 'year']].values
        y = df['price'].values
        
        return X, y
        
    def train_model(self, product_id):
        X, y = self.prepare_data(product_id)
        
        if X is None or y is None:
            return False
            
        self.model.fit(X, y)
        return True
        
    def predict_price(self, product_id, future_date):
        # Train model with historical data
        success = self.train_model(product_id)
        
        if not success:
            return None
            
        # Prepare future date features
        X_pred = [[
            future_date.weekday(),
            future_date.month,
            future_date.year
        ]]
        
        # Make prediction
        predicted_price = self.model.predict(X_pred)[0]
        
        return predicted_price
        
    def get_price_forecast(self, product_id, days=7):
        forecasts = []
        current_date = datetime.now()
        
        for i in range(days):
            future_date = current_date + timedelta(days=i)
            predicted_price = self.predict_price(product_id, future_date)
            
            if predicted_price is not None:
                forecasts.append({
                    'date': future_date.strftime('%Y-%m-%d'),
                    'price': round(predicted_price, 2)
                })
                
        return forecasts
