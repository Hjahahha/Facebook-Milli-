import unittest
from app import app, db, User


class TestApp(unittest.TestCase):
    """Test cases for the Flask application."""

    def setUp(self):
        """Set up test client and database."""
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        self.app = app
        self.client = app.test_client()
        
        with app.app_context():
            db.create_all()

    def tearDown(self):
        """Clean up after tests."""
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def test_index_redirect(self):
        """Test that index page redirects to login."""
        response = self.client.get('/')
        self.assertEqual(response.status_code, 302)
        self.assertIn('/login', response.location)

    def test_login_page_get(self):
        """Test that login page loads."""
        response = self.client.get('/login')
        self.assertEqual(response.status_code, 200)

    def test_register_page_get(self):
        """Test that register page loads."""
        response = self.client.get('/register')
        self.assertEqual(response.status_code, 200)

    def test_user_model(self):
        """Test User model creation."""
        with self.app.app_context():
            user = User(
                name='Test User',
                phone='1234567890',
                email='test@example.com',
                password='hashedpassword',
                balance_iqd=100.0,
                balance_usd=50.0
            )
            db.session.add(user)
            db.session.commit()
            
            saved_user = User.query.filter_by(phone='1234567890').first()
            self.assertIsNotNone(saved_user)
            self.assertEqual(saved_user.name, 'Test User')
            self.assertEqual(saved_user.balance_iqd, 100.0)


if __name__ == '__main__':
    unittest.main()
