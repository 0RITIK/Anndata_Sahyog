# Agricultural E-Commerce and Market Prediction Platform

A comprehensive platform connecting farmers with buyers and providing market price predictions for agricultural products.

## Features

- Buyer-Seller Network
- Market Price Prediction
- User Authentication
- Product Listings
- Real-time Messaging
- Price Analytics
- Mobile-Friendly Design

## Setup Instructions

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
Create a `.env` file with the following:
```
SECRET_KEY=your_secret_key
DATABASE_URL=sqlite:///agrimarket.db
```

4. Initialize the database:
```bash
python init_db.py
```

5. Run the application:
```bash
python app.py
```

## Project Structure

```
├── backend/
│   ├── __init__.py
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── utils/
├── frontend/
│   ├── public/
│   └── src/
├── requirements.txt
└── README.md
```

## API Documentation

Detailed API documentation can be found in the `/docs` directory.

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
