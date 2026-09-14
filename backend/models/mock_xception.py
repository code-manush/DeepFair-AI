import random

class MockXception:
    """
    This is a placeholder for the actual Xception model.
    Replace this with the real PyTorch model loading and inference logic.
    """
    def __init__(self):
        self.is_loaded = True
        
    def predict(self, image_bytes):
        # Mocking a prediction score (0.0 = Real, 1.0 = Fake)
        confidence = random.uniform(0.7, 0.99)
        prediction = "fake" if confidence > 0.8 else "real"
        
        # Mocking attributes
        attributes = {
            "Gender": random.choice(["Male", "Female"]),
            "Age Group": random.choice(["Young", "Older"]),
            "Smiling": random.choice(["Yes", "No"]),
            "Glasses": random.choice(["Yes", "No"]),
            "Hat": random.choice(["Yes", "No"]),
            "Beard": random.choice(["Yes", "No"])
        }
        
        return {
            "prediction": prediction,
            "confidence": round(confidence * 100, 2),
            "attributes": attributes
        }
        
mock_model = MockXception()
