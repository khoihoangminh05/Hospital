from datetime import datetime

class Message:
    def __init__(self, sender_id, receiver_id, content, sender_role):
        self.sender_id = str(sender_id)
        self.receiver_id = str(receiver_id) 
        self.content = content
        self.sender_role = sender_role 
        self.timestamp = datetime.utcnow()
        self.read = False

    def to_dict(self):
        return {
            "sender_id": self.sender_id,
            "receiver_id": self.receiver_id,
            "content": self.content,
            "sender_role": self.sender_role,
            "timestamp": self.timestamp,
            "read": self.read
        }